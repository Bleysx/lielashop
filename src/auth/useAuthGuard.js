import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useAuthGuard() {
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        window.location.href = "/login";
      }
    };

    checkAuth();
  }, []);
}