cube(`orders`, {
  sql_table: `public.orders`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    is_food: {
      sql: `is_food`,
      type: `string`
    },
    
    is_food_attached: {
      sql: `is_food_attached`,
      type: `string`
    },
    
    is_cold: {
      sql: `is_cold`,
      type: `string`
    },
    
    is_signature: {
      sql: `is_signature`,
      type: `string`
    },
    
    exchange_rate: {
      sql: `exchange_rate`,
      type: `string`
    },
    
    base_price: {
      sql: `base_price`,
      type: `string`
    },
    
    tax: {
      sql: `tax`,
      type: `string`
    },
    
    discount: {
      sql: `discount`,
      type: `string`
    },
    
    service_charge: {
      sql: `service_charge`,
      type: `string`
    },
    
    tip: {
      sql: `tip`,
      type: `string`
    },
    
    gross_revenue: {
      sql: `gross_revenue`,
      type: `string`
    },
    
    net_revenue: {
      sql: `net_revenue`,
      type: `string`
    },
    
    refund: {
      sql: `refund`,
      type: `string`
    },
    
    payment_processing_fee: {
      sql: `payment_processing_fee`,
      type: `string`
    },
    
    cost: {
      sql: `cost`,
      type: `string`
    },
    
    is_subscriber_order: {
      sql: `is_subscriber_order`,
      type: `string`
    },
    
    is_first_order: {
      sql: `is_first_order`,
      type: `string`
    },
    
    is_scheduled_order: {
      sql: `is_scheduled_order`,
      type: `string`
    },
    
    labor_hours_per_order_line_item: {
      sql: `labor_hours_per_order_line_item`,
      type: `string`
    },
    
    order_id: {
      sql: `order_id`,
      type: `string`
    },
    
    item_id: {
      sql: `item_id`,
      type: `string`
    },
    
    location_id: {
      sql: `location_id`,
      type: `string`
    },
    
    square_customer_id: {
      sql: `square_customer_id`,
      type: `string`
    },
    
    user_id: {
      sql: `user_id`,
      type: `string`
    },
    
    credit_card_fingerprint: {
      sql: `credit_card_fingerprint`,
      type: `string`
    },
    
    item_name: {
      sql: `item_name`,
      type: `string`
    },
    
    item_variation_name: {
      sql: `item_variation_name`,
      type: `string`
    },
    
    square_category: {
      sql: `square_category`,
      type: `string`
    },
    
    item_type: {
      sql: `item_type`,
      type: `string`
    },
    
    app_category: {
      sql: `app_category`,
      type: `string`
    },
    
    location_name: {
      sql: `location_name`,
      type: `string`
    },
    
    neighborhood_name: {
      sql: `neighborhood_name`,
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
    
    real_estate_neighborhood_name: {
      sql: `real_estate_neighborhood_name`,
      type: `string`
    },
    
    real_estate_neighborhood_type: {
      sql: `real_estate_neighborhood_type`,
      type: `string`
    },
    
    source: {
      sql: `source`,
      type: `string`
    },
    
    detailed_source: {
      sql: `detailed_source`,
      type: `string`
    },
    
    currency: {
      sql: `currency`,
      type: `string`
    },
    
    order_line_item_id: {
      sql: `order_line_item_id`,
      type: `string`,
      primary_key: true
    },
    
    day_of_week: {
      sql: `day_of_week`,
      type: `string`
    },
    
    week_part: {
      sql: `week_part`,
      type: `string`
    },
    
    local_created_at: {
      sql: `local_created_at`,
      type: `time`
    },
    
    year: {
      sql: `year`,
      type: `time`
    },
    
    quarter: {
      sql: `quarter`,
      type: `time`
    },
    
    month: {
      sql: `month`,
      type: `time`
    },
    
    week: {
      sql: `week`,
      type: `time`
    },
    
    day: {
      sql: `day`,
      type: `time`
    },
    
    local_time_of_day_by_30min: {
      sql: `local_time_of_day_by_30min`,
      type: `time`
    },

    sold_at: {
      sql: `created_at`,
      type: `time`
    },

    name: {
      sql: `LOWER(REPLACE(${orders.item_name}, ' ', ''))`,
      type: `string`
    }
  },
  
  measures: {
    count: {
      type: `count`
    },
    
    total_sold: {
      sql: `quantity`,
      type: `sum`
    },

    last_sold: {
      sql: `created_at::TIME`,
      type: `max`
    }
  },

  segments: {
    food_items: {
      sql: `${CUBE}.is_food::bool`
    }
  }
});
