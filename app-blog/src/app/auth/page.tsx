// app/auth/page.tsx
"use client"

import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/lib/supabase"

export default function AuthPage() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
          localization={{
            variables: {
              sign_in: { email_label: "Email", password_label: "Пароль" },
              sign_up: { email_label: "Email", password_label: "Пароль" },
            },
          }}
        />
      </div>
    </div>
  )
}
