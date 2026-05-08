"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import InputAdornment from "@mui/material/InputAdornment"
import SearchIcon from "@mui/icons-material/Search"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import SpeedIcon from "@mui/icons-material/Speed"
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation"
import VisibilityIcon from "@mui/icons-material/Visibility"
import TuneIcon from "@mui/icons-material/Tune"

type Car = {
  id: number
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  color: string
  transmission: string
  fuel: string
  condition: string
  images: string
  views: number
  status: string
}

const BRANDS = ["Semua", "Toyota", "Honda", "Suzuki", "Mitsubishi", "Daihatsu", "Nissan", "BMW", "Mercedes"]
const TRANSMISSIONS = ["Semua", "Manual", "Automatic"]

const content = {
  id: {
    login: "Masuk", register: "Daftar",
    badge: "Terpercaya & Terjangkau",
    heroTitle: "Temukan Mobil Impianmu",
    heroDesc: "Ribuan mobil second berkualitas dengan harga terbaik",
    searchPlaceholder: "Cari merk atau model...",
    brandLabel: "Merk", transmisiLabel: "Transmisi", searchBtn: "Cari",
    allBrands: "Semua", allTrans: "Semua",
    stats: [
      { value: "500+", label: "Mobil Tersedia" },
      { value: "1000+", label: "Pelanggan Puas" },
      { value: "5 Tahun", label: "Pengalaman" },
      { value: "100%", label: "Terpercaya" },
    ],
    availableTitle: "Mobil Tersedia",
    found: (n: number) => `${n} mobil ditemukan`,
    loading: "Memuat...", filterBtn: "Filter",
    notFound: "Tidak ada mobil ditemukan",
    notFoundDesc: "Coba ubah filter pencarian",
    footer: "2026 CarMarket - Toko Mobil Second Terpercaya",
    views: "dilihat",
  },
  en: {
    login: "Login", register: "Register",
    badge: "Trusted & Affordable",
    heroTitle: "Find Your Dream Car",
    heroDesc: "Thousands of quality used cars at the best prices",
    searchPlaceholder: "Search brand or model...",
    brandLabel: "Brand", transmisiLabel: "Transmission", searchBtn: "Search",
    allBrands: "All", allTrans: "All",
    stats: [
      { value: "500+", label: "Cars Available" },
      { value: "1000+", label: "Happy Customers" },
      { value: "5 Years", label: "Experience" },
      { value: "100%", label: "Trusted" },
    ],
    availableTitle: "Available Cars",
    found: (n: number) => `${n} cars found`,
    loading: "Loading...", filterBtn: "Filter",
    notFound: "No cars found",
    notFoundDesc: "Try changing your search filters",
    footer: "2026 CarMarket - Trusted Used Car Store",
    views: "views",
  },
  zh: {
    login: "登录", register: "注册",
    badge: "可信赖 & 实惠",
    heroTitle: "找到你梦想中的车",
    heroDesc: "数千辆优质二手车，价格最优惠",
    searchPlaceholder: "搜索品牌或型号...",
    brandLabel: "品牌", transmisiLabel: "变速箱", searchBtn: "搜索",
    allBrands: "全部", allTrans: "全部",
    stats: [
      { value: "500+", label: "可用车辆" },
      { value: "1000+", label: "满意客户" },
      { value: "5年", label: "经验" },
      { value: "100%", label: "值得信赖" },
    ],
    availableTitle: "可用车辆",
    found: (n: number) => `找到 ${n} 辆车`,
    loading: "加载中...", filterBtn: "筛选",
    notFound: "未找到车辆",
    notFoundDesc: "请尝试更改搜索条件",
    footer: "2026 CarMarket - 值得信赖的二手车商店",
    views: "次查看",
  }
}

export default function Home() {
  const router = useRouter()
  const [cars, setCars] = useState<Car[]>([])
  const [search, setSearch] = useState("")
  const [brand, setBrand] = useState("Semua")
  const [transmission, setTransmission] = useState("Semua")
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState<"id" | "en" | "zh">("id")
  const t = content[lang]

  useEffect(() => {
    const saved = localStorage.getItem("lang") as "id" | "en" | "zh" | null
    if (saved) setLang(saved)
  }, [])

  useEffect(() => { fetchCars() }, [brand, transmission])

  async function fetchCars() {
    setLoading(true)
    const params = new URLSearchParams()
    if (brand !== "Semua" && brand !== "All" && brand !== "全部") params.append("brand", brand)
    if (transmission !== "Semua" && transmission !== "All" && transmission !== "全部") params.append("transmission", transmission)
    if (search) params.append("search", search)
    const res = await fetch(`/api/cars?${params}`)
    const data = await res.json()
    setCars(data)
    setLoading(false)
  }

  function formatPrice(price: number) {
    return "Rp " + price.toLocaleString("id-ID")
  }

  function translateCondition(val: string) {
    const map: Record<string, Record<string, string>> = {
      "Sangat Baik": { id: "Sangat Baik", en: "Excellent", zh: "非常好" },
      "Baik": { id: "Baik", en: "Good", zh: "好" },
      "Cukup": { id: "Cukup", en: "Fair", zh: "一般" },
    }
    return map[val]?.[lang] || val
  }

  function translateFuel(val: string) {
    const map: Record<string, Record<string, string>> = {
      "Bensin": { id: "Bensin", en: "Petrol", zh: "汽油" },
      "Solar": { id: "Solar", en: "Diesel", zh: "柴油" },
      "Hybrid": { id: "Hybrid", en: "Hybrid", zh: "混合动力" },
      "Listrik": { id: "Listrik", en: "Electric", zh: "电动" },
    }
    return map[val]?.[lang] || val
  }

  function translateTransmission(val: string) {
    const map: Record<string, Record<string, string>> = {
      "Manual": { id: "Manual", en: "Manual", zh: "手动" },
      "Automatic": { id: "Automatic", en: "Automatic", zh: "自动" },
    }
    return map[val]?.[lang] || val
  }

  function translateColor(val: string) {
    const map: Record<string, Record<string, string>> = {
      "Putih": { id: "Putih", en: "White", zh: "白色" },
      "Hitam": { id: "Hitam", en: "Black", zh: "黑色" },
      "Silver": { id: "Silver", en: "Silver", zh: "银色" },
      "Merah": { id: "Merah", en: "Red", zh: "红色" },
      "Biru": { id: "Biru", en: "Blue", zh: "蓝色" },
      "Abu-abu": { id: "Abu-abu", en: "Gray", zh: "灰色" },
      "Coklat": { id: "Coklat", en: "Brown", zh: "棕色" },
      "Kuning": { id: "Kuning", en: "Yellow", zh: "黄色" },
      "Orange": { id: "Orange", en: "Orange", zh: "橙色" },
      "Hijau": { id: "Hijau", en: "Green", zh: "绿色" },
    }
    return map[val]?.[lang] || val
  }

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>

      {/* Navbar */}
      <Box sx={{
        bgcolor: "white", borderBottom: "1px solid #e2e8f0",
        py: 2, px: 3, display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }} onClick={() => router.push("/")}>
          <Box sx={{ bgcolor: "#2563eb", borderRadius: 2, p: 0.7, display: "flex" }}>
            <DirectionsCarIcon sx={{ color: "white", fontSize: 22 }} />
          </Box>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#1e293b" }}>
            Car<span style={{ color: "#2563eb" }}>Market</span>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {/* Language Switch */}
          <Box sx={{ display: "flex", border: "1px solid #e2e8f0", borderRadius: 2, overflow: "hidden", mr: 1 }}>
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
          <Button onClick={() => router.push("/auth/login")} sx={{ color: "#64748b", textTransform: "none" }}>{t.login}</Button>
          <Button variant="contained" onClick={() => router.push("/auth/register")}
            sx={{ bgcolor: "#2563eb", "&:hover": { bgcolor: "#1d4ed8" }, textTransform: "none", borderRadius: 2 }}>
            {t.register}
          </Button>
        </Box>
      </Box>

      {/* Hero */}
      <Box sx={{ background: "linear-gradient(135deg, #1e293b 0%, #2563eb 100%)", py: { xs: 6, md: 10 }, textAlign: "center", px: 2 }}>
        <Chip label={t.badge} sx={{ bgcolor: "#ffffff22", color: "white", mb: 2, fontSize: 12 }} />
        <Typography variant="h3" fontWeight="bold" sx={{ color: "white", mb: 1, fontSize: { xs: 28, md: 42 } }}>
          {t.heroTitle}
        </Typography>
        <Typography sx={{ color: "#94a3b8", mb: 5, fontSize: 16 }}>{t.heroDesc}</Typography>

        <Box sx={{ bgcolor: "white", borderRadius: 3, p: 2, maxWidth: 800, mx: "auto", display: "flex", gap: 2, flexWrap: "wrap", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
          <TextField
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === "Enter" && fetchCars()}
            sx={{ flex: "1 1 200px" }}
            size="small"
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "#94a3b8" }} /></InputAdornment> }}
          />
          <FormControl size="small" sx={{ flex: "1 1 130px" }}>
            <InputLabel>{t.brandLabel}</InputLabel>
            <Select value={brand} onChange={e => setBrand(e.target.value)} label={t.brandLabel}>
              {BRANDS.map(b => <MenuItem key={b} value={b}>{b === "Semua" ? t.allBrands : b}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ flex: "1 1 130px" }}>
            <InputLabel>{t.transmisiLabel}</InputLabel>
            <Select value={transmission} onChange={e => setTransmission(e.target.value)} label={t.transmisiLabel}>
              {TRANSMISSIONS.map(tr => <MenuItem key={tr} value={tr}>{tr === "Semua" ? t.allTrans : tr}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={fetchCars} startIcon={<SearchIcon />}
            sx={{ bgcolor: "#2563eb", "&:hover": { bgcolor: "#1d4ed8" }, px: 3, borderRadius: 2, textTransform: "none" }}>
            {t.searchBtn}
          </Button>
        </Box>
      </Box>

      {/* Stats */}
      <Box sx={{ bgcolor: "white", borderBottom: "1px solid #e2e8f0" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "center", gap: { xs: 4, md: 8 }, py: 3, flexWrap: "wrap" }}>
            {t.stats.map((stat, i) => (
              <Box key={i} sx={{ textAlign: "center" }}>
                <Typography variant="h5" fontWeight="bold" color="primary">{stat.value}</Typography>
                <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Car Listing */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box>
            <Typography variant="h5" fontWeight="bold" color="#1e293b">{t.availableTitle}</Typography>
            <Typography variant="body2" color="text.secondary">
              {loading ? t.loading : t.found(cars.length)}
            </Typography>
          </Box>
          <Button startIcon={<TuneIcon />} variant="outlined"
            sx={{ textTransform: "none", borderRadius: 2, borderColor: "#e2e8f0", color: "#64748b" }}>
            {t.filterBtn}
          </Button>
        </Box>

        {cars.length === 0 && !loading && (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <DirectionsCarIcon sx={{ fontSize: 80, color: "#e2e8f0" }} />
            <Typography color="text.secondary" mt={2} variant="h6">{t.notFound}</Typography>
            <Typography color="text.secondary" variant="body2">{t.notFoundDesc}</Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {cars.map(car => (
            <Box key={car.id} sx={{ flex: "1 1 280px", maxWidth: 360 }}>
              <Card
                sx={{ cursor: "pointer", borderRadius: 3, border: "1px solid #e2e8f0", boxShadow: "none", "&:hover": { transform: "translateY(-4px)", boxShadow: "0 12px 40px rgba(0,0,0,0.1)", borderColor: "#2563eb" }, transition: "all 0.25s" }}
                onClick={() => router.push(`/cars/${car.id}`)}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={car.images.split(",")[0] || "https://via.placeholder.com/400x200?text=No+Image"}
                    alt={`${car.brand} ${car.model}`}
                    sx={{ objectFit: "cover" }}
                  />
                  <Chip label={car.year} size="small" sx={{ position: "absolute", top: 12, right: 12, bgcolor: "#2563eb", color: "white", fontWeight: "bold" }} />
                  <Chip
                    label={translateCondition(car.condition)}
                    size="small"
                    sx={{
                      position: "absolute", top: 12, left: 12,
                      bgcolor: car.condition === "Sangat Baik" ? "#dcfce7" : "#fef9c3",
                      color: car.condition === "Sangat Baik" ? "#16a34a" : "#ca8a04", fontWeight: "bold"
                    }}
                  />
                </Box>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="h6" fontWeight="bold" color="#1e293b" mb={0.5}>{car.brand} {car.model}</Typography>
                  <Typography variant="h6" sx={{ color: "#2563eb", fontWeight: "bold", mb: 2 }}>{formatPrice(car.price)}</Typography>
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <SpeedIcon sx={{ fontSize: 15, color: "#94a3b8" }} />
                      <Typography variant="caption" color="text.secondary">{car.mileage.toLocaleString()} km</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <LocalGasStationIcon sx={{ fontSize: 15, color: "#94a3b8" }} />
                      <Typography variant="caption" color="text.secondary">{translateFuel(car.fuel)}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <VisibilityIcon sx={{ fontSize: 15, color: "#94a3b8" }} />
                      <Typography variant="caption" color="text.secondary">{car.views} {t.views}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Chip label={translateTransmission(car.transmission)} size="small" sx={{ bgcolor: "#f1f5f9", color: "#475569", fontSize: 11 }} />
                    <Chip label={translateColor(car.color)} size="small" sx={{ bgcolor: "#f1f5f9", color: "#475569", fontSize: 11 }} />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: "#1e293b", py: 4, textAlign: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center", mb: 1 }}>
          <Box sx={{ bgcolor: "#2563eb", borderRadius: 2, p: 0.5, display: "flex" }}>
            <DirectionsCarIcon sx={{ color: "white", fontSize: 18 }} />
          </Box>
          <Typography fontWeight="bold" sx={{ color: "white" }}>CarMarket</Typography>
        </Box>
        <Typography variant="caption" sx={{ color: "#64748b" }}>{t.footer}</Typography>
      </Box>

    </Box>
  )
}