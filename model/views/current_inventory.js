view(`current_inventory`, {
  description: `Current inventory of products`,
  cubes: [
    {
      join_path: purchases,
      includes: [
        `inventory_item_name`,
        `purchase_item_name`,
        `total_purchased`,
        `total_stock`,
        `waste_rate`
      ]
    },
    {
      join_path: purchases.orders,
      includes: [
        {
          name: `item_name`,
          alias: `order_item_name`
        },
        `total_sold`,
        `last_sold`
      ]
    }
  ],

  segments: {
    food_items: {
      sql: `${purchases.inventory_item_name} LIKE 'food-%'`
    }
  }
})