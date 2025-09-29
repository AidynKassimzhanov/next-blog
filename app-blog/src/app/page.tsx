// src/app/page.tsx
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Post = {
  id: string
  title: string
  content: string | null
  author: string | null
  created_at: string
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, content, author, created_at")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Ошибка загрузки:", error.message)
      } else {
        setPosts(data as Post[])
      }
      setLoading(false)
    }

    fetchPosts()
  }, [])

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Список постов</h1>

      {loading ? (
        <p>Загрузка...</p>
      ) : posts.length === 0 ? (
        <p>Постов пока нет.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                Автор: {post.author || "Неизвестен"} |{" "}
                {new Date(post.created_at).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                {post.content?.slice(0, 150) || "Без содержимого"}...
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
