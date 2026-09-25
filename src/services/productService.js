// src/services/productService.js
// Lógica de "registro y consulta de productos" (objetivo del Sprint 1).
// Esta capa de servicios funciona de forma independiente a la interfaz gráfica,
// la cual se desarrollará hasta el Sprint 2 (ver Actividad 2.2, sección 1.2 y 5).

import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config.js";
import { emptyProduct, validateProduct } from "../models/Product.js";

const PRODUCTS_COLLECTION = "productos";

/**
 * Registra un nuevo producto en la colección "productos".
 * @param {Partial<import("../models/Product.js").Product>} productData
 * @returns {Promise<string>} id del documento creado
 */
export async function registrarProducto(productData) {
  const product = { ...emptyProduct, ...productData };

  const errors = validateProduct(product);
  if (errors.length > 0) {
    throw new Error(`No se pudo registrar el producto: ${errors.join(" ")}`);
  }

  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...product,
    fechaRegistro: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Consulta todos los productos registrados.
 * @returns {Promise<Array<Object>>}
 */
export async function consultarProductos() {
  const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

/**
 * Consulta un producto por su id de documento en Firestore.
 * @param {string} productId
 * @returns {Promise<Object|null>}
 */
export async function consultarProductoPorId(productId) {
  const docRef = doc(db, PRODUCTS_COLLECTION, productId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

/**
 * Consulta productos filtrando por categoría.
 * (Base para futuras búsquedas manuales sin código de barras, ver PB16 del Sprint 2).
 * @param {string} categoria
 * @returns {Promise<Array<Object>>}
 */
export async function consultarProductosPorCategoria(categoria) {
  const q = query(collection(db, PRODUCTS_COLLECTION), where("categoria", "==", categoria));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}
