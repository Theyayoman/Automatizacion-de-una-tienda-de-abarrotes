// src/models/Product.js
// Estructura inicial de la colección "productos" en Firestore (Sprint 1 - PB2).
//
// Campos definidos en la Actividad 2.2, sección 3.2 "Base de datos y catálogo
// de productos". El campo "codigoBarras" queda contemplado desde ahora en el
// modelo, pero su lectura física con lector de código de barras se implementará
// hasta el Sprint 7 (ver retrospectiva, sección 4).

/**
 * @typedef {Object} Product
 * @property {string} codigoBarras     - Identificador único del producto (uso futuro: lector de código de barras, Sprint 7)
 * @property {string} nombre           - Nombre del producto
 * @property {string} descripcion      - Descripción breve del producto
 * @property {string} categoria        - Categoría principal (ej. "Abarrotes", "Bebidas", "Limpieza")
 * @property {string} subcategoria     - Subcategoría dentro de la categoría principal
 * @property {number} precioCompra     - Precio de compra al proveedor
 * @property {number} precioVenta      - Precio de venta al público
 * @property {number} existencia       - Cantidad disponible en inventario
 * @property {Date}   fechaRegistro    - Fecha en que el producto fue dado de alta
 */

// Plantilla / valores por defecto usada al crear un nuevo producto.
export const emptyProduct = {
  codigoBarras: "",
  nombre: "",
  descripcion: "",
  categoria: "",
  subcategoria: "",
  precioCompra: 0,
  precioVenta: 0,
  existencia: 0,
  fechaRegistro: null, // se asigna con serverTimestamp() al guardar
};

/**
 * Valida los campos mínimos de un producto antes de guardarlo en Firestore.
 * @param {Partial<Product>} product
 * @returns {string[]} lista de errores encontrados (vacía si es válido)
 */
export function validateProduct(product) {
  const errors = [];

  if (!product.nombre || product.nombre.trim() === "") {
    errors.push("El nombre del producto es obligatorio.");
  }
  if (!product.categoria || product.categoria.trim() === "") {
    errors.push("La categoría es obligatoria.");
  }
  if (product.precioCompra == null || product.precioCompra < 0) {
    errors.push("El precio de compra debe ser un número mayor o igual a 0.");
  }
  if (product.precioVenta == null || product.precioVenta < 0) {
    errors.push("El precio de venta debe ser un número mayor o igual a 0.");
  }
  if (product.existencia == null || product.existencia < 0) {
    errors.push("La existencia debe ser un número mayor o igual a 0.");
  }

  return errors;
}
