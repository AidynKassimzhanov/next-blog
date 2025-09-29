"use client"

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

export default function Header() {
  const { session, signOut } = useAuth()

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      {/* Левое меню */}
      <nav className="flex gap-6">
        <Link href="/" className="hover:text-gray-300">
          Главная
        </Link>
        <Link href="/admin" className="hover:text-gray-300">
          Админка
        </Link>
      </nav>

      {/* Правый блок */}
      <div>
        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">
              {session.user.email}
            </span>
            <button
              onClick={signOut}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-500 text-sm"
            >
              Выйти
            </button>
          </div>
        ) : (
          <Link
            href="/auth"
            className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 text-sm"
          >
            Войти
          </Link>
        )}
      </div>
    </header>
  )
}
