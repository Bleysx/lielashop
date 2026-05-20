import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoginAdmin({
  onLogin
}) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin =
    async (e) => {

      e.preventDefault();

      setLoading(true);
      setError("");

      const {
        data,
        error
      } =
      await supabase.auth
      .signInWithPassword({

        email,
        password

      });

      if (error) {

        setError(
          "Credenciales incorrectas"
        );

        setLoading(false);
        return;

      }

      onLogin(
        data.user
      );

      setLoading(false);

    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-pink-50">

      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-md w-80"
      >

        <h1 className="text-2xl font-bold text-center mb-5">

          Admin

        </h1>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e)=>
            setEmail(
              e.target.value
            )
          }
          className="border w-full p-2 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
          className="border w-full p-2 rounded mb-3"
        />

        {error && (

          <p className="text-red-500 text-sm mb-2">

            {error}

          </p>

        )}

        <button
          disabled={loading}
          className="w-full bg-pink-500 text-white py-2 rounded-lg"
        >

          {
            loading
            ? "Entrando..."
            : "Ingresar"
          }

        </button>

      </form>

    </div>

  );

}