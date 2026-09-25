// src/firebase/config.js
// Inicialización del proyecto de Firebase (Sprint 1 - PB1: Elección de Base de Datos y Modelo).
//
// Se eligió Firebase / Cloud Firestore por su sincronización en tiempo real,
// su sinergia con React, autenticación integrada y su infraestructura en la nube
// (ver Actividad 2.2 - Primer Sprint, sección 3.3).
//
// Las credenciales NUNCA se hardcodean: se leen desde variables de entorno
// definidas en un archivo .env (ver .env.example).

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicialización de la app de Firebase
export const app = initializeApp(firebaseConfig);

// Instancia de Firestore (base de datos de productos, categorías, etc.)
export const db = getFirestore(app);

// Instancia de Auth (se usará para roles Administrador / Cajero en sprints futuros)
export const auth = getAuth(app);
