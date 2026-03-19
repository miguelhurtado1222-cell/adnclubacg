"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import QRCode from "react-qr-code";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [logueado, setLogueado] = useState(false);
  const [rol, setRol] = useState("");
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");

  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [club, setClub] = useState("Jerusalén");

  const [miembros, setMiembros] = useState<any[]>([]);

  const login = async () => {
    const { data } = await supabase
      .from("usuarios")
      .select("*")
      .eq("usuario", usuario)
      .eq("clave", clave)
      .single();

    if (data) {
      setLogueado(true);
      setRol(data.rol);
    } else {
      alert("Datos incorrectos");
    }
  };

  const cargar = async () => {
    const { data } = await supabase.from("miembros").select("*");
    setMiembros(data || []);
  };

  const guardar = async () => {
    await supabase.from("miembros").insert({
      nombre,
      fecha_nacimiento: fecha,
      telefono,
      direccion,
      club,
    });

    setNombre(""); setFecha(""); setTelefono(""); setDireccion("");
    cargar();
  };

  const eliminar = async (id: string) => {
    await supabase.from("miembros").delete().eq("id", id);
    cargar();
  };

  const asistencia = async (id: string) => {
    await supabase.from("asistencia").insert({
      miembro_id: id,
      fecha: new Date().toISOString(),
      presente: true,
    });
    alert("Asistencia guardada");
  };

  useEffect(() => {
    if (logueado) cargar();
  }, [logueado]);

  if (!logueado) {
    return (
      <div style={{ padding: 40 }}>
        <h1>🔐 ADNclubACG</h1>
        <input placeholder="Usuario" onChange={(e) => setUsuario(e.target.value)} /><br />
        <input type="password" placeholder="Clave" onChange={(e) => setClave(e.target.value)} /><br /><br />
        <button onClick={login}>Entrar</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🏕️ ADNclubACG PRO MAX ({rol})</h1>

      {rol === "director" && (
        <>
          <h2>Registrar</h2>
          <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} /><br />
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} /><br />
          <input placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} /><br />
          <input placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} /><br />

          <select value={club} onChange={(e) => setClub(e.target.value)}>
            <option>Jerusalén</option>
            <option>Betania</option>
          </select>

          <br /><br />
          <button onClick={guardar}>Guardar</button>

          <br /><br />
          <input type="file" onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            await supabase.storage
              .from("archivos")
              .upload(file.name, file);

            alert("Archivo subido");
          }} />
        </>
      )}

      <h2>Miembros</h2>

      {miembros.map((m) => (
        <div key={m.id} style={{ border: "1px solid #ccc", margin: 5, padding: 10 }}>
          <b>{m.nombre}</b> - {m.club}

          <br />

          <button onClick={() => asistencia(m.id)}>✅ Asistencia</button>

          {rol === "director" && (
            <button onClick={() => eliminar(m.id)}>❌ Eliminar</button>
          )}

          <div style={{ marginTop: 10 }}>
            🪪 Carnet:
            <div style={{ border: "1px solid black", padding: 10 }}>
              {m.nombre} <br />
              {m.club}
              <QRCode value={m.nombre + "-" + m.club} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}