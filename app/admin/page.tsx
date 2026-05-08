"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Chip from "@mui/material/Chip"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import AddIcon from "@mui/icons-material/Add"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"

type Car = {
  id: number
  brand: string
  model: string
  year: number
  price: number
  status: string
  views: number
}

const content = {
  id: {
    title: "CarMarket Admin",
    viewStore: "Lihat Toko",
    totalCars: "Total Mobil",
    available: "Tersedia",
    sold: "Terjual",
    totalViews: "Total Views",
    carList: "Daftar Mobil",
    addCar: "Tambah Mobil",
    car: "Mobil",
    year: "Tahun",
    price: "Harga",
    status: "Status",
    views: "Views",
    action: "Aksi",
    loading: "Memuat...",
    noCars: "Belum ada mobil",
    availableChip: "Tersedia",
    soldChip: "Terjual",
    confirmDelete: "Yakin ingin menghapus mobil ini?",
  },
  en: {
    title: "CarMarket Admin",
    viewStore: "View Store",
    totalCars: "Total Cars",
    available: "Available",
    sold: "Sold",
    totalViews: "Total Views",
    carList: "Car List",
    addCar: "Add Car",
    car: "Car",
    year: "Year",
    price: "Price",
    status: "Status",
    views: "Views",
    action: "Action",
    loading: "Loading...",
    noCars: "No cars yet",
    availableChip: "Available",
    soldChip: "Sold",
    confirmDelete: "Are you sure you want to delete this car?",
  },
  zh: {
    title: "CarMarket 管理",
    viewStore: "查看商店",
    totalCars: "总车辆",
    available: "可用",
    sold: "已售",
    totalViews: "总浏览量",
    carList: "车辆列表",
    addCar: "添加车辆",
    car: "车辆",
    year: "年份",
    price: "价格",
    status: "状态",
    views: "浏览量",
    action: "操作",
    loading: "加载中...",
    noCars: "暂无车辆",
    availableChip: "可用",
    soldChip: "已售",
    confirmDelete: "确定要删除这辆车吗？",
  }
}

export default function AdminPage() {
  const router = useRouter()
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState<"id" | "en" | "zh">("id")
  const t = content[lang]

  useEffect(() => {
    const saved = localStorage.getItem("lang") as "id" | "en" | "zh" | null
    if (saved) setLang(saved)
    fetchCars()
  }, [])

  async function fetchCars() {
    const res = await fetch("/api/cars")
    const data = await res.json()
    setCars(data)
    setLoading(false)
  }

  async function handleDelete(id: number) {
    if (!confirm(t.confirmDelete)) return
    await fetch(`/api/cars/${id}`, { method: "DELETE" })
    fetchCars()
  }

  function formatPrice(price: number) {
    return "Rp " + price.toLocaleString("id-ID")
  }

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>

      {/* Navbar */}
      <Box sx={{ bgcolor: "#1a1a2e", py: 2, px: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DirectionsCarIcon sx={{ color: "#00b4ff", fontSize: 28 }} />
          <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>{t.title}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {/* Language Switch */}
          <Box sx={{ display: "flex", border: "1px solid #ffffff33", borderRadius: 2, overflow: "hidden", mr: 1 }}>
            {(["id", "en", "zh"] as const).map(l => (
              <Button key={l} onClick={() => { setLang(l); localStorage.setItem("lang", l) }} sx={{
                px: 1.5, py: 0.5, minWidth: 0,
                bgcolor: lang === l ? "#00b4ff" : "transparent",
                color: lang === l ? "white" : "#aaaaaa",
                borderRadius: 0, textTransform: "none", fontSize: 12,
                "&:hover": { bgcolor: lang === l ? "#00b4ff" : "#ffffff22" }
              }}>
                {l.toUpperCase()}
              </Button>
            ))}
          </Box>
          <Button onClick={() => router.push("/")} sx={{ color: "white", textTransform: "none" }}>{t.viewStore}</Button>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>

        {/* Stats */}
        <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: "wrap" }}>
          {[
            { label: t.totalCars, value: cars.length, color: "#00b4ff" },
            { label: t.available, value: cars.filter(c => c.status === "available").length, color: "#25d366" },
            { label: t.sold, value: cars.filter(c => c.status === "sold").length, color: "#ff4444" },
            { label: t.totalViews, value: cars.reduce((a, c) => a + c.views, 0), color: "#ff9800" },
          ].map((stat, i) => (
            <Card key={i} sx={{ flex: "1 1 150px" }}>
              <CardContent>
                <Typography variant="h4" fontWeight="bold" sx={{ color: stat.color }}>{stat.value}</Typography>
                <Typography color="text.secondary">{stat.label}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">{t.carList}</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => router.push("/admin/cars/new")}
            sx={{ bgcolor: "#00b4ff", "&:hover": { bgcolor: "#0066ff" }, textTransform: "none" }}>
            {t.addCar}
          </Button>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#1a1a2e" }}>
                <TableCell sx={{ color: "white" }}>{t.car}</TableCell>
                <TableCell sx={{ color: "white" }}>{t.year}</TableCell>
                <TableCell sx={{ color: "white" }}>{t.price}</TableCell>
                <TableCell sx={{ color: "white" }}>{t.status}</TableCell>
                <TableCell sx={{ color: "white" }}>{t.views}</TableCell>
                <TableCell sx={{ color: "white" }}>{t.action}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">{t.loading}</TableCell>
                </TableRow>
              ) : cars.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">{t.noCars}</TableCell>
                </TableRow>
              ) : (
                cars.map(car => (
                  <TableRow key={car.id} hover>
                    <TableCell><Typography fontWeight="bold">{car.brand} {car.model}</Typography></TableCell>
                    <TableCell>{car.year}</TableCell>
                    <TableCell>{formatPrice(car.price)}</TableCell>
                    <TableCell>
                      <Chip
                        label={car.status === "available" ? t.availableChip : t.soldChip}
                        color={car.status === "available" ? "success" : "error"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{car.views}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => router.push(`/admin/cars/${car.id}`)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(car.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  )
}