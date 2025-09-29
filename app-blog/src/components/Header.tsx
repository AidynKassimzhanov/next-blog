"use client"

import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth") // после выхода перенаправляем
  }

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-xl font-bold">Блог</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Выйти
      </button>
    </header>
  )
}
