cube(`purchases`, {
  sql_table: `public.purchases`,
  
  data_source: `default`,
  
  joins: {
    orders: {
      relationship: `one_to_many`,
      sql: `LOWER(REPLACE(${orders.item_name}, ' ', '')) LIKE CONCAT('%', (STRING_TO_ARRAY(inventory_item_name, '-'))[3], '%')`
    }
  },
  
  dimensions: {
    exchange_rate: {
      sql: `exchange_rate`,
      type: `string`
    },
    
    unit_price: {
      sql: `unit_price`,
      type: `string`
    },
    
    total_amount: {
      sql: `total_amount`,
      type: `string`
    },
    
    purchase_item_id: {
      sql: `purchase_item_id`,
      type: `string`
    },
    
    purchase_item_name: {
      sql: `purchase_item_name`,
      type: `string`
    },
    
    inventory_item_name: {
      sql: `inventory_item_name`,
      type: `string`
    },
    
    status: {
      sql: `status`,
      type: `string`
    },
    
    unit_measure: {
      sql: `unit_measure`,
      type: `string`
    },
    
    currency: {
      sql: `currency`,
      type: `string`
    },
    
    sent_date: {
      sql: `sent_date`,
      type: `string`
    },
    
    delivery_date: {
      sql: `delivery_date`,
      type: `string`
    },
    
    purchase_order_line_item_id: {
      sql: `purchase_order_line_item_id`,
      type: `string`,
      primary_key: true
    },
    
    purchase_order_id: {
      sql: `purchase_order_id`,
      type: `string`
    },
    
    location_id: {
      sql: `location_id`,
      type: `string`
    },
    
    market_name: {
      sql: `market_name`,
      type: `string`
    },
    
    country_name: {
      sql: `country_name`,
      type: `string`
    },
    
    vendor_id: {
      sql: `vendor_id`,
      type: `string`
    },
    
    vendor_name: {
      sql: `vendor_name`,
      type: `string`
    },

    total_sold: {
      sql: `${orders.total_sold}`,
      type: `number`,
      sub_query: true
    },

    purchased_at: {
      sql: `TO_DATE(delivery_date, 'DD/MM/YYYY')`,
      type: `time`
    }
  },
  
  measures: {
    count: {
      type: `count`
    },

    total_items: {
      sql: `inventory_item_name`,
      type: `count_distinct`
    },

    total_purchased: {
      sql: `case_quantity * packs_per_case * items_per_pack`,
      type: `sum`
    },

    total_stock: {
      sql: `(case_quantity * packs_per_case * items_per_pack) - COALESCE(${total_sold}, 0)`,
      type: `sum`
    },

    waste_rate: {
      sql: `CAST(((case_quantity * packs_per_case * items_per_pack) - COALESCE(${total_sold}*1.0, 0)) / (case_quantity * packs_per_case * items_per_pack) as decimal(18, 2))`,
      type: `avg`,
    }
  }
});
