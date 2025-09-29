// src/app/page.tsx (пример на главной)
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function HomePage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Получаем текущую сессию
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })

    // Подписка на изменения (вход/выход)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Главная страница</h1>
      {user ? (
        <p>Привет, {user.email} 👋</p>
      ) : (
        <p>Вы не авторизованы</p>
      )}
    </div>
  )
}
