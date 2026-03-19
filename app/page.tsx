"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [vista, setVista] = useState("menu");
  const [miembros, setMiembros] = useState<any[]>([]);
  const [nombre, setNombre] = useState("");

  const cargar = async () => {
    const { data } = await supabase.from("miembros").select("*");
    setMiembros(data || []);
  };

  useEffect(() => {
    cargar();
  }, []);

  const estiloBoton = {
    padding: 20,
    margin: 10,
    fontSize: 18,
    borderRadius: 15,
    border: "none",
    width: "100%",
    background: "linear-gradient(red, orange)",
    color: "white",
  };

  // 🏕️ MENU PRINCIPAL
  if (vista === "menu") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(yellow, red)",
        padding: 20
      }}>
        <h1 style={{ textAlign: "center", color: "white" }}>
          🏕️ ADNclubACG
        </h1>

        <button style={estiloBoton} onClick={() => setVista("miembros")}>
          👥 Miembros
        </button>

        <button style={estiloBoton} onClick={() => setVista("asistencia")}>
          📅 Asistencia
        </button>

        <button style={estiloBoton} onClick={() => setVista("archivos")}>
          📄 Archivos
        </button>
      </div>
    );
  }

  // 👥 MIEMBROS
  if (vista === "miembros") {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => setVista("menu")}>⬅️ Volver</button>

        <h2>👥 Miembros</h2>

        <input
          style={{ width: "100%", padding: 10 }}
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <button
          style={estiloBoton}
          onClick={async () => {
            await supabase.from("miembros").insert({ nombre });
            setNombre("");
            cargar();
          }}
        >
          Guardar
        </button>

        {miembros.map((m) => (
          <div key={m.id} style={{
            background: "#fff",
            padding: 10,
            marginTop: 10,
            borderRadius: 10
          }}>
            {m.nombre}
          </div>
        ))}
      </div>
    );
  }

  // 📅 ASISTENCIA
  if (vista === "asistencia") {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => setVista("menu")}>⬅️ Volver</button>
        <h2>📅 Asistencia</h2>

        {miembros.map((m) => (
          <div key={m.id} style={{
            background: "#fff",
            padding: 10,
            marginTop: 10,
            borderRadius: 10
          }}>
            {m.nombre}

            <button
              style={{ marginLeft: 10 }}
              onClick={async () => {
                await supabase.from("asistencia").insert({
                  miembro_id: m.id,
                  fecha: new Date().toISOString(),
                  presente: true,
                });
                alert("Guardado");
              }}
            >
              ✅
            </button>
          </div>
        ))}
      </div>
    );
  }

  // 📄 ARCHIVOS
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