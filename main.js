const { Pool } = require('pg');
const dotenv = require('dotenv');
const moment = require('moment');

dotenv.config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB_NAME,
  password: process.env.POSTGRES_PASS,
  port: 5432, // default PostgreSQL port
});


async function getInventoryDataForDate(dateStr) {
  try {
    const connection = await pool.connect();

    const date = moment(dateStr, 'MM/DD/YYYY');

    const query = `
      SELECT
        p.inventory_item_name,
        p.purchase_item_name,
        p.total_purchased,
        o.total_sold,
        (COALESCE(p.total_purchased, 0) - COALESCE(o.total_sold, 0))::INT as total_stock,
        CAST((total_purchased - COALESCE(total_sold*1.0, 0)) / total_purchased as decimal(18, 2))::FLOAT as waste_rate,
        CASE WHEN (COALESCE(p.total_purchased, 0) - COALESCE(o.total_sold, 0)) = 0 THEN o.last_sold ELSE NULL END as sold_out_time,
        o.last_sold
      FROM (
        SELECT DISTINCT(inventory_item_name),
          (STRING_TO_ARRAY(inventory_item_name, '-'))[3] as unique_item_name,
          purchase_item_name,
          (case_quantity * packs_per_case * items_per_pack) as total_purchased
        FROM purchases
        WHERE
          inventory_item_name LIKE 'food-%' AND
          TO_DATE(delivery_date, 'DD/MM/YYYY') = '${date.format()}'::date
      ) p
      LEFT JOIN (
        SELECT item_id,
          item_name,
          LOWER(REPLACE(item_name, ' ', '')) as formatted_item_name,
          SUM(quantity)::INT as total_sold,
          MAX(created_at)::TIME as last_sold
        FROM orders
        WHERE
          is_food AND
          created_at::date = '${date.format()}'::date
        GROUP BY item_id, item_name
      ) o ON o.formatted_item_name LIKE CONCAT('%', p.unique_item_name, '%')
    `;

    const result = await connection.query(query);

    connection.release();

    return result.rows
  } catch (error) {
    console.error('Error getting inventory for date:', error);
    throw error;
  }
}



// Choose a date string in the format MM/DD/YYYY
const date_str = '09/30/2022'
getInventoryDataForDate(date_str)
  .then((inventory) => {
    console.log(`Food Inventory for ${date_str}`, inventory);

    const totalPurchased = inventory.reduce((sum, i) => sum + parseFloat(i.total_purchased | 0), 0);
    const totalSold = inventory.reduce((sum, i) => sum + parseFloat(i.total_sold | 0), 0);
    const totalWasteRate = (totalPurchased - totalSold) / totalPurchased;

    const soldOutTimes = inventory.filter(i => i.sold_out_time);

    console.log(`Total Waste Rate: ${(totalWasteRate * 100).toFixed(2)}%`);
    console.log(`Total Sold Out Items: ${soldOutTimes.length}`);
  })