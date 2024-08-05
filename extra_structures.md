## Additional Data Structures and Patterns

#### Sistema General
- Tener IDs únicos para cada producto vendido que se repita en ambas tablas, minimizando la pérdida de valores al unir la información
- Tener un formato único de fechas que se use en toda la base de datos por igual
- Guardar datos de localidad en una tabla separada, relacionada a la de órdenes, para reducir data duplicada entre columnas
- No guardar datos específicos de tiempo (semana, año, etc.) como columnas separadas en la tabla para reducir data duplicada y uso de memoria innecesario

#### Tablas
- Productos - tabla única de productos con un ID que se usa en otras tablas para referenciarlos (orders y purchases)
- Lista de Ingredientes - recetas para cada producto que se vende, sirve para identificar qué se tiene que comprar y en qué cantidades para poder ofrecer cada producto

#### Datos
- En qué tienda se vende más y menos cada producto para distribuir mejor las compras
- Qué día de la semana se vende más y menos cada producto para optimizar los pedidos diarios
- Margen neto por producto para identificar su rentabilidad
- Rotación de productos por día para definir stock de seguridad y reducir sold outs
- Cantidad de primeras compras por tienda para identificar locales populares