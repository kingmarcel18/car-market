"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import Alert from "@mui/material/Alert"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

export default function NewCarPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    color: "",
    transmission: "Manual",
    fuel: "Bensin",
    condition: "Baik",
    description: "",
    whatsapp: "",
    images: "",
    status: "available"
  })

  async function handleSubmit() {
    if (!form.brand || !form.model || !form.year || !form.price || !form.whatsapp) {
      setError("Harap isi semua field yang wajib!")
      return
    }
    setLoading(true)
    setError("")
    const res = await fetch("/api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        year: Number(form.year),
        price: Number(form.price),
        mileage: Number(form.mileage),
      })
    })
    setLoading(false)
    if (res.ok) {
      setSuccess("Mobil berhasil ditambahkan!")
      setTimeout(() => router.push("/admin"), 1500)
    } else {
      setError("Gagal menambahkan mobil!")
    }
  }

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>

      {/* Navbar */}
      <Box sx={{ bgcolor: "#1a1a2e", py: 2, px: 3, display: "flex", alignItems: "center", gap: 1 }}>
        <DirectionsCarIcon sx={{ color: "#00b4ff", fontSize: 28 }} />
        <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>CarMarket Admin</Typography>
      </Box>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} sx={{ mb: 3 }}>Kembali</Button>

        <Typography variant="h5" fontWeight="bold" mb={3}>Tambah Mobil Baru</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Card>
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

              {/* Info Dasar */}
              <Typography variant="subtitle1" fontWeight="bold" color="primary">Informasi Dasar</Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField label="Merk *" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} sx={{ flex: "1 1 200px" }} />
                <TextField label="Model *" value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} sx={{ flex: "1 1 200px" }} />
                <TextField label="Tahun *" type="number" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} sx={{ flex: "1 1 120px" }} />
              </Box>

              {/* Harga & KM */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField label="Harga (Rp) *" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} sx={{ flex: "1 1 200px" }} />
                <TextField label="Kilometer" type="number" value={form.mileage} onChange={e => setForm({ ...form, mileage: e.target.value })} sx={{ flex: "1 1 200px" }} />
                <TextField label="Warna" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} sx={{ flex: "1 1 150px" }} />
              </Box>

              {/* Spesifikasi */}
              <Typography variant="subtitle1" fontWeight="bold" color="primary">Spesifikasi</Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <FormControl sx={{ flex: "1 1 150px" }}>
                  <InputLabel>Transmisi</InputLabel>
                  <Select value={form.transmission} onChange={e => setForm({ ...form, transmission: e.target.value })} label="Transmisi">
                    <MenuItem value="Manual">Manual</MenuItem>
                    <MenuItem value="Automatic">Automatic</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ flex: "1 1 150px" }}>
                  <InputLabel>Bahan Bakar</InputLabel>
                  <Select value={form.fuel} onChange={e => setForm({ ...form, fuel: e.target.value })} label="Bahan Bakar">
                    <MenuItem value="Bensin">Bensin</MenuItem>
                    <MenuItem value="Solar">Solar</MenuItem>
                    <MenuItem value="Hybrid">Hybrid</MenuItem>
                    <MenuItem value="Listrik">Listrik</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ flex: "1 1 150px" }}>
                  <InputLabel>Kondisi</InputLabel>
                  <Select value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })} label="Kondisi">
                    <MenuItem value="Sangat Baik">Sangat Baik</MenuItem>
                    <MenuItem value="Baik">Baik</MenuItem>
                    <MenuItem value="Cukup">Cukup</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ flex: "1 1 150px" }}>
                  <InputLabel>Status</InputLabel>
                  <Select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} label="Status">
                    <MenuItem value="available">Tersedia</MenuItem>
                    <MenuItem value="sold">Terjual</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Kontak & Foto */}
              <Typography variant="subtitle1" fontWeight="bold" color="primary">Kontak & Foto</Typography>
              <TextField
                label="No WhatsApp * (contoh: 6281234567890)"
                value={form.whatsapp}
                onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                fullWidth
              />
              <TextField
                label="URL Foto (pisahkan dengan koma)"
                value={form.images}
                onChange={e => setForm({ ...form, images: e.target.value })}
                fullWidth
                helperText="Contoh: https://img1.jpg,https://img2.jpg"
              />
              <TextField
                label="Deskripsi"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                fullWidth
                multiline
                rows={4}
              />

              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={loading}
                sx={{ bgcolor: "#00b4ff", "&:hover": { bgcolor: "#0066ff" }, py: 1.5 }}
              >
                {loading ? "Menyimpan..." : "Tambah Mobil"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}