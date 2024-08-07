CREATE VIEW current_inventory AS
SELECT
	p.inventory_item_name,
	p.purchase_item_name,
	p.total_purchased,
	o.total_sold,
	(COALESCE(p.total_purchased, 0) - COALESCE(o.total_sold, 0)) as total_stock,
	(total_purchased - COALESCE(total_sold*1.0, 0)) / total_purchased as waste_rate,
	CASE WHEN (COALESCE(p.total_purchased, 0) - COALESCE(o.total_sold, 0)) = 0 THEN o.last_sold ELSE NULL END as sold_out_time
FROM (
	SELECT DISTINCT(inventory_item_name),
		(STRING_TO_ARRAY(inventory_item_name, '-'))[3] as unique_item_name,
		purchase_item_name,
		(case_quantity * packs_per_case * items_per_pack) as total_purchased
	FROM purchases
	WHERE inventory_item_name LIKE 'food-%'
) p
LEFT JOIN (
	SELECT item_id,
		item_name,
		LOWER(REPLACE(item_name, ' ', '')) as formatted_item_name,
		SUM(quantity) as total_sold,
    MAX(created_at)::TIME as last_sold
	FROM orders
	WHERE is_food
	GROUP BY item_id, item_name
) o ON o.formatted_item_name LIKE CONCAT('%', p.unique_item_name, '%')