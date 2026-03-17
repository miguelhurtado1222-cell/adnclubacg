"use client";

import { useState } from "react";

export default function Home() {
  const [vista, setVista] = useState("menu");

  if (vista === "registro")
    return (
      <main style={estilo}>
        <h1>👤 Registrar Conquistador</h1>

        <input placeholder="Nombre completo" style={input} />
        <input placeholder="Edad" style={input} />
        <input placeholder="Club" style={input} />
        <input placeholder="Unidad" style={input} />

        <button style={btn}>💾 Guardar</button>
        <button style={btnSec} onClick={() => setVista("menu")}>
          ⬅️ Volver
        </button>
      </main>
    );

  if (vista === "asistencia")
    return (
      <main style={estilo}>
        <h1>📅 Control de Asistencia</h1>
        <p>Registro por fecha próximamente</p>

        <button style={btnSec} onClick={() => setVista("menu")}>
          ⬅️ Volver
        </button>
      </main>
    );

  if (vista === "clases")
    return (
      <main style={estilo}>
        <h1>🎓 Clases y Especialidades</h1>
        <p>Seguimiento de progreso JA</p>

        <button style={btnSec} onClick={() => setVista("menu")}>
          ⬅️ Volver
        </button>
      </main>
    );

  if (vista === "documentos")
    return (
      <main style={estilo}>
        <h1>📄 Subir Documentos PDF</h1>
        <input type="file" accept=".pdf" />
        <p>Sube tarjetas de clase u otros documentos</p>

        <button style={btnSec} onClick={() => setVista("menu")}>
          ⬅️ Volver
        </button>
      </main>
    );

  return (
    <main style={estilo}>
      <h1>🏕️ ADNclubACG — Sistema Oficial</h1>
      <h3>Asociación Dominicana del Norte 🇩🇴</h3>

      <hr />

      <button style={btn} onClick={() => setVista("registro")}>
        👥 Registrar Conquistador
      </button>

      <button style={btn} onClick={() => setVista("asistencia")}>
        📅 Control de Asistencia
      </button>

      <button style={btn} onClick={() => setVista("clases")}>
        🎓 Clases y Especialidades
      </button>

      <button style={btn} onClick={() => setVista("documentos")}>
        📄 Subir PDFs
      </button>

      <p style={{ marginTop: 40 }}>
        💻 Plataforma institucional ADNclubACG
      </p>
    </main>
  );
}

const estilo = {
  padding: 40,
  fontFamily: "Arial",
};

const btn = {
  display: "block",
  width: 320,
  padding: 15,
  margin: "10px 0",
  fontSize: 18,
  cursor: "pointer",
};

const btnSec = {
  padding: 12,
  marginTop: 20,
  fontSize: 16,
  cursor: "pointer",
};

const input = {
  display: "block",
  padding: 10,
  margin: "8px 0",
  width: 300,
};