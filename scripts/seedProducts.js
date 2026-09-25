// scripts/seedProducts.js
// Script opcional para registrar productos de ejemplo y validar la conexión
// con Firebase/Firestore durante el Sprint 1.
//
// Uso: npm run seed

import { registrarProducto, consultarProductos } from "../src/services/productService.js";

const productosDePrueba = [
  {
    codigoBarras: "7501234567890",
    nombre: "Arroz Morelos 1kg",
    descripcion: "Arroz blanco de grano largo, bolsa de 1 kilogramo",
    categoria: "Abarrotes",
    subcategoria: "Granos",
    precioCompra: 18.5,
    precioVenta: 24.0,
    existencia: 50,
  },
  {
    codigoBarras: "7501234567891",
    nombre: "Refresco Cola 600ml",
    descripcion: "Refresco de cola, botella de 600 mililitros",
    categoria: "Bebidas",
    subcategoria: "Refrescos",
    precioCompra: 10.0,
    precioVenta: 15.0,
    existencia: 80,
  },
  {
    codigoBarras: "7501234567892",
    nombre: "Jabón en polvo 1kg",
    descripcion: "Detergente en polvo para ropa, bolsa de 1 kilogramo",
    categoria: "Limpieza",
    subcategoria: "Lavandería",
    precioCompra: 22.0,
    precioVenta: 30.0,
    existencia: 35,
  },
];

async function seed() {
  console.log("Registrando productos de prueba en Firestore...");

  for (const producto of productosDePrueba) {
    const id = await registrarProducto(producto);
    console.log(`✔ Producto registrado: ${producto.nombre} (id: ${id})`);
  }

  console.log("\nConsultando catálogo completo...");
  const productos = await consultarProductos();
  console.table(productos);
}

seed().catch((err) => {
  console.error("Error al poblar la base de datos:", err.message);
  process.exit(1);
});
