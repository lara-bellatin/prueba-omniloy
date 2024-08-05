# Prueba Técnica Omniloy

## Instructions
### Tasks
- Upload the CSVs to any SQL database, we use PostgreSQL.
- Create a view for the current inventory on a given date.
- Calculate the waste rate of food items (compare purchased vs. sold items with a shelf life of 1 day).
- Determine the sold-out time for items on given dates (same 1-day shelf life assumption).

### Extra Points:
- Provide the solution in a GitHub project.
- Create a semantic layer using Cube.js to showcase these queries.
- Describe additional data structures/patterns you could use in the future for efficient problem-solving (Just describe, no need to implement anything).


## Implementation
- Run `node main.js` to get data on the current inventory, including waste rate and sold out time (if available), for each product and as a general metric. The default date is 09/30/2022, but you can set a different date by going into the `main.js` file and changing variable `date_str`
- `create_current_inventory_view.sql` contains code to create a view of an updated inventory
- Current inventory view available in Cube.js as well
- Additional data structures/patterns analysis in `extra_structures.md`