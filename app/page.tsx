"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [vista, setVista] = useState("menu");
  const [miembros, setMiembros] = useState([]);
  const [nombre, setNombre] = useState("");

  const cargar = async () => {
    const { data } = await supabase.from("miembros").select("*");
    setMiembros(data || []);
  };

  useEffect(() => {
    cargar();
  }, []);

  // MENÚ
  if (vista === "menu") {
    return (
      <div style={{ padding: 20 }}>
        <h1>🏕️ ADNclubACG</h1>

        <button onClick={() => setVista("miembros")}>👥 Miembros</button>
        <button onClick={() => setVista("asistencia")}>📅 Asistencia</button>
        <button onClick={() => setVista("archivos")}>📄 Archivos</button>
      </div>
    );
  }

  // MIEMBROS
  if (vista === "miembros") {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => setVista("menu")}>⬅️ Volver</button>

        <h2>👥 Miembros</h2>

        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <button
          onClick={async () => {
            await supabase.from("miembros").insert({ nombre });
            setNombre("");
            cargar();
          }}
        >
          Guardar
        </button>

        {miembros.map((m: any) => (
          <div key={m.id}>{m.nombre}</div>
        ))}
      </div>
    );
  }

  // ASISTENCIA
  if (vista === "asistencia") {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => setVista("menu")}>⬅️ Volver</button>
        <h2>📅 Asistencia</h2>

        {miembros.map((m: any) => (
          <div key={m.id}>
            {m.nombre}
            <button
              onClick={async () => {
                await supabase.from("asistencia").insert({
                  miembro_id: m.id,
                  fecha: new Date().toISOString(),
                  presente: true,
                });
                alert("Asistencia guardada");
              }}
            >
              ✅
            </button>
          </div>
        ))}
      </div>
    );
  }

  // ARCHIVOS
  if (vista === "archivos") {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => setVista("menu")}>⬅️ Volver</button>
        <h2>📄 Archivos</h2>

        <input
          type="file"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            await supabase.storage
              .from("archivos")
              .upload(file.name, file);

            alert("Subido");
          }}
        />
      </div>
    );
  }
}