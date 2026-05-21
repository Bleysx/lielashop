import { useState } from "react";
import AdminPanel from "./AdminPanel";

export default function AdminLayout({ user }) {

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-pink-50">

      {/* BOTÓN FLOTANTE PEQUEÑO */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 
          bg-black text-white 
          w-8 h-8 
          flex items-center justify-center 
          rounded-md shadow
          text-xs"
        >
          ☰
        </button>
      )}

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* SIDEBAR DRAWER */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-56 z-50
          bg-pink-100 border-r border-pink-200
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* HEADER */}
        <div className="p-3 flex justify-between items-center">

          <span className="text-xs font-semibold text-gray-600">
            Admin
          </span>

          <button
            onClick={() => setOpen(false)}
            className="text-xs bg-pink-200 hover:bg-pink-300 px-2 py-1 rounded"
          >
            ✕
          </button>

        </div>

        {/* EMAIL */}
        <div className="px-3 mt-2 text-[11px] text-gray-700 break-all">
          {user?.email}
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="p-6">
        <AdminPanel />
      </main>

    </div>
  );
}