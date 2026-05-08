"use client"

import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Alert from "@mui/material/Alert"
import Divider from "@mui/material/Divider"

const content = {
  id: {
    title: "Daftar ke CarMarket",
    subtitle: "Buat akun baru gratis!",
    google: "Daftar dengan Google",
    orEmail: "atau daftar dengan email",
    name: "Nama Lengkap",
    email: "Email",
    password: "Password",
    registerBtn: "Daftar",
    loading: "Loading...",
    errorGeneral: "Terjadi kesalahan!",
    hasAccount: "Sudah punya akun?",
    login: "Masuk",
  },
  en: {
    title: "Register to CarMarket",
    subtitle: "Create a free account!",
    google: "Sign up with Google",
    orEmail: "or sign up with email",
    name: "Full Name",
    email: "Email",
    password: "Password",
    registerBtn: "Register",
    loading: "Loading...",
    errorGeneral: "Something went wrong!",
    hasAccount: "Already have an account?",
    login: "Login",
  },
  zh: {
    title: "注册 CarMarket",
    subtitle: "免费创建账号！",
    google: "使用 Google 注册",
    orEmail: "或使用邮箱注册",
    name: "全名",
    email: "邮箱",
    password: "密码",
    registerBtn: "注册",
    loading: "加载中...",
    errorGeneral: "发生错误！",
    hasAccount: "已有账号？",
    login: "登录",
  }
}

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [lang, setLang] = useState<"id" | "en" | "zh">("id")
  const t = content[lang]

  useEffect(() => {
    const saved = localStorage.getItem("lang") as "id" | "en" | "zh" | null
    if (saved) setLang(saved)
  }, [])

  async function handleRegister() {
    setLoading(true)
    setError("")
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) {
      setError(data.message || t.errorGeneral)
    } else {
      router.push("/auth/login")
    }
  }

  async function handleGoogleRegister() {
    await signIn("google", { callbackUrl: "/" })
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f8fafc" }}>

      {/* Language Switch */}
      <Box sx={{ position: "fixed", top: 16, right: 16, display: "flex", border: "1px solid #e2e8f0", borderRadius: 2, overflow: "hidden" }}>
        {(["id", "en", "zh"] as const).map(l => (
          <Button key={l} onClick={() => { setLang(l); localStorage.setItem("lang", l) }} sx={{
            px: 1.5, py: 0.5, minWidth: 0,
            bgcolor: lang === l ? "#2563eb" : "transparent",
            color: lang === l ? "white" : "#64748b",
            borderRadius: 0, textTransform: "none", fontSize: 12,
            "&:hover": { bgcolor: lang === l ? "#2563eb" : "#f1f5f9" }
          }}>
            {l.toUpperCase()}
          </Button>
        ))}
      </Box>

      <Card sx={{ width: 400, p: 2, borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1, textAlign: "center", color: "#1e293b" }}>
            {t.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center", mb: 3 }}>
            {t.subtitle}
          </Typography>

          {/* Google Register */}
          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleRegister}
            sx={{
              mb: 3, py: 1.2, borderRadius: 2, borderColor: "#e2e8f0",
              color: "#1e293b", textTransform: "none", fontSize: 15,
              "&:hover": { bgcolor: "#f8fafc", borderColor: "#cbd5e1" }
            }}
            startIcon={
              <Box component="img" src="https://www.google.com/favicon.ico" sx={{ width: 18, height: 18 }} />
            }
          >
            {t.google}
          </Button>

          <Divider sx={{ mb: 3 }}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>{t.orEmail}</Typography>
          </Divider>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label={t.name} fullWidth size="small" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <TextField label={t.email} type="email" fullWidth size="small" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <TextField
              label={t.password} type="password" fullWidth size="small"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyDown={e => e.key === "Enter" && handleRegister()}
            />
            <Button
              variant="contained" fullWidth onClick={handleRegister} disabled={loading}
              sx={{ py: 1.2, borderRadius: 2, bgcolor: "#2563eb", "&:hover": { bgcolor: "#1d4ed8" }, textTransform: "none", fontSize: 15 }}
            >
              {loading ? t.loading : t.registerBtn}
            </Button>
            <Button variant="text" onClick={() => router.push("/auth/login")} sx={{ textTransform: "none", color: "#64748b" }}>
              {t.hasAccount} <span style={{ color: "#2563eb", marginLeft: 4 }}>{t.login}</span>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}