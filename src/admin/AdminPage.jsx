import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import LoginAdmin from "./LoginAdmin";
import AdminLayout from "./AdminLayout";

export default function AdminPage() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
      setLoading(false);
    };

    getUser();

    const { data: listener } =
      supabase.auth.onAuthStateChange((_, session) => {
        setUser(session?.user || null);
      });

    return () => listener.subscription.unsubscribe();

  }, []);

  if (loading) return <div>Cargando...</div>;

  if (!user) return <LoginAdmin onLogin={setUser} />;

  return <AdminLayout user={user} />;
}