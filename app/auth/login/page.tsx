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
    title: "Masuk ke CarMarket",
    subtitle: "Selamat datang kembali!",
    google: "Masuk dengan Google",
    orEmail: "atau masuk dengan email",
    email: "Email",
    password: "Password",
    loginBtn: "Masuk",
    loading: "Loading...",
    error: "Email atau password salah!",
    noAccount: "Belum punya akun?",
    register: "Daftar",
  },
  en: {
    title: "Login to CarMarket",
    subtitle: "Welcome back!",
    google: "Sign in with Google",
    orEmail: "or sign in with email",
    email: "Email",
    password: "Password",
    loginBtn: "Login",
    loading: "Loading...",
    error: "Wrong email or password!",
    noAccount: "Don't have an account?",
    register: "Register",
  },
  zh: {
    title: "登录 CarMarket",
    subtitle: "欢迎回来！",
    google: "使用 Google 登录",
    orEmail: "或使用邮箱登录",
    email: "邮箱",
    password: "密码",
    loginBtn: "登录",
    loading: "加载中...",
    error: "邮箱或密码错误！",
    noAccount: "还没有账号？",
    register: "注册",
  }
}

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [lang, setLang] = useState<"id" | "en" | "zh">("id")
  const t = content[lang]

  useEffect(() => {
    const saved = localStorage.getItem("lang") as "id" | "en" | "zh" | null
    if (saved) setLang(saved)
  }, [])

  async function handleLogin() {
    setLoading(true)
    setError("")
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false
    })
    setLoading(false)
    if (res?.error) {
      setError(t.error)
    } else {
      router.push("/")
    }
  }

  async function handleGoogleLogin() {
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

          {/* Google Login */}
          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleLogin}
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
            <TextField
              label={t.email}
              type="email"
              fullWidth
              size="small"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              label={t.password}
              type="password"
              fullWidth
              size="small"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              disabled={loading}
              sx={{ py: 1.2, borderRadius: 2, bgcolor: "#2563eb", "&:hover": { bgcolor: "#1d4ed8" }, textTransform: "none", fontSize: 15 }}
            >
              {loading ? t.loading : t.loginBtn}
            </Button>
            <Button variant="text" onClick={() => router.push("/auth/register")} sx={{ textTransform: "none", color: "#64748b" }}>
              {t.noAccount} <span style={{ color: "#2563eb", marginLeft: 4 }}>{t.register}</span>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}