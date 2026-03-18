"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [logueado, setLogueado] = useState(false);
  const [nombre, setNombre] = useState("");

  const login = async () => {
    const { data } = await supabase
      .from("usuarios")
      .select("*")
      .eq("usuario", usuario)
      .eq("clave", clave)
      .single();

    if (data) setLogueado(true);
    else alert("Usuario o contraseña incorrectos");
  };

  const guardar = async () => {
    await supabase.from("miembros").insert({
      nombre,
      club: "Jerusalén",
    });
    alert("Conquistador guardado");
    setNombre("");
  };

  if (!logueado) {
    return (
      <div style={{ padding: 40 }}>
        <h1>🔐 ADNclubACG — Iniciar sesión</h1>
        <input
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <br /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
        <br /><br />
        <button onClick={login}>Entrar</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🏕️ Panel ADNclubACG</h1>

      <h2>👥 Registrar conquistador</h2>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <br /><br />
      <button onClick={guardar}>Guardar</button>
    </div>
  );
}