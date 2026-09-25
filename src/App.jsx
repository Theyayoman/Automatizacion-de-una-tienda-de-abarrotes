// src/App.jsx
// Componente raíz mínimo. El diseño de la interfaz gráfica para registrar
// y consultar productos se desarrollará en el Sprint 2 (ver sección 1.2 y 5.1
// de la Actividad 2.2 - PB10: Interfaz inicial de punto de venta).
//
// Este componente solo confirma que la app y la conexión a Firebase
// están correctamente inicializadas.

import { useEffect, useState } from "react";
import { consultarProductos } from "./services/productService.js";

function App() {
  const [status, setStatus] = useState("Verificando conexión con Firebase...");

  useEffect(() => {
    consultarProductos()
      .then((productos) => {
        setStatus(
          `Conexión exitosa. Productos registrados: ${productos.length}`
        );
      })
      .catch((err) => {
        setStatus(`Error de conexión con Firestore: ${err.message}`);
      });
  }, []);

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Automatización de una tienda de abarrotes</h1>
      <p>Sprint 1 - Infraestructura base (sin interfaz de usuario todavía)</p>
      <p>{status}</p>
    </main>
  );
}

export default App;
