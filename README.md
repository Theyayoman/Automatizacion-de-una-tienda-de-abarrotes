# Automatización de una tienda de abarrotes — Proyecto VII

**Sprint 1**

Equipo:
- Carlos Castellanos Hernández
- Jesús Yael Romero Juárez
- Jair Orozco Domínguez

Profesor: Sergio Ulises Lillingston Pérez

## 1. Objetivo del Sprint 1

Establecer la infraestructura inicial y técnica del proyecto: creación del
repositorio de control de versiones y diseño de la base de datos, con énfasis
en la estructura de los productos y los datos necesarios para la futura
generación de etiquetas (código de barras, nombre, precio, etc.). El diseño
de la interfaz gráfica queda pospuesto para el Sprint 2.

## 2. Tecnologías utilizadas

- **React** (con **Vite** como bundler)
- **Firebase / Cloud Firestore** como base de datos en tiempo real
- **Firebase Authentication** (integración base; roles Administrador/Cajero
  se implementarán en sprints posteriores)

Firebase se eligió por su sincronización en tiempo real, su sinergia con
React, su autenticación integrada y por eliminar la necesidad de servidores
físicos locales (ver detalle en la sección 3.3 del documento de la Actividad
2.2).

## 3. Estructura del repositorio

```
tienda-abarrotes/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── .gitignore
├── firestore.rules
├── scripts/
│   └── seedProducts.js      # Script para poblar Firestore con productos de prueba
└── src/
    ├── main.jsx
    ├── App.jsx               # Componente raíz mínimo (sin UI de negocio todavía)
    ├── firebase/
    │   └── config.js         # Inicialización de Firebase/Firestore
    ├── models/
    │   └── Product.js        # Estructura de datos y validación del producto
    └── services/
        └── productService.js # Registro y consulta de productos en Firestore
```

## 4. Estructura de la base de datos (colección `productos`)

| Campo          | Tipo   | Descripción                                    |
|----------------|--------|-------------------------------------------------|
| codigoBarras   | string | Identificador único (lectura física: Sprint 7) |
| nombre         | string | Nombre del producto                             |
| descripcion    | string | Descripción breve                               |
| categoria      | string | Categoría principal                             |
| subcategoria   | string | Subcategoría                                    |
| precioCompra   | number | Precio de compra al proveedor                   |
| precioVenta    | number | Precio de venta al público                      |
| existencia     | number | Cantidad disponible en inventario                |
| fechaRegistro  | date   | Fecha de alta (asignada automáticamente)         |

Se contempla además una colección `etiquetas` reservada para la futura
generación de etiquetas con código de barras (Sprint 7).

## 5. Instrucciones de ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Theyayoman/Automatizacion-de-una-tienda-de-abarrotes.git
   cd Automatizacion-de-una-tienda-de-abarrotes
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/),
   habilitar **Cloud Firestore** y copiar las credenciales del SDK web.

4. Configurar las variables de entorno:
   ```bash
   cp .env.example .env
   ```
   y completar `.env` con los valores del proyecto de Firebase.

5. (Opcional) Poblar la base de datos con productos de prueba:
   ```bash
   npm run seed
   ```

6. Ejecutar el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```

## 6. Alcance de este Sprint

Incluido:
- Repositorio de GitHub configurado.
- Proyecto de Firebase inicializado.
- Colección `productos` definida y validada mediante `models/Product.js`.
- Funciones de **registro** y **consulta** de productos (`services/productService.js`),
  probadas mediante `scripts/seedProducts.js`.

No incluido (queda para el Sprint 2):
- Interfaz gráfica de usuario (punto de venta, formularios de alta/consulta).
- Registro de entradas/salidas de inventario y actualización automática de existencias.
- Lectura de código de barras (pospuesta hasta el Sprint 7).

## 7. Retrospectiva del Sprint 1

| Categoría | Observaciones |
|---|---|
| ¿Qué salió bien? | Definir Firebase como base de datos dio claridad técnica; planear la estructura de datos desde ahora prepara el terreno para la lectura de código de barras en el Sprint 7. |
| ¿Qué dificultades hubo? | Definir cómo estructurar las colecciones de Firestore para categorías, subcategorías y código de barras sin afectar el rendimiento de futuras consultas. |
| ¿Qué aprendimos? | Resolver primero la infraestructura (GitHub + Firebase) evita bloqueos y refactorizaciones al desarrollar el frontend. |
| Plan de acción Sprint 2 | Iniciar el desarrollo del frontend en React: interfaces para registrar y consultar productos conectadas a Firebase. |
