"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import Divider from "@mui/material/Divider"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import SpeedIcon from "@mui/icons-material/Speed"
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation"
import ColorLensIcon from "@mui/icons-material/ColorLens"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"

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
  description: string
  whatsapp: string
  images: string
  views: number
  status: string
}

export default function CarDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    params.then(({ id }) => {
      fetch(`/api/cars/${id}`)
        .then(res => res.json())
        .then(data => { setCar(data); setLoading(false) })
    })
  }, [params])

  if (loading) return <Box sx={{ p: 4, textAlign: "center" }}>Memuat...</Box>
  if (!car) return <Box sx={{ p: 4, textAlign: "center" }}>Mobil tidak ditemukan</Box>

  const images = car.images.split(",").filter(Boolean)
  if (images.length === 0) images.push("https://via.placeholder.com/800x400?text=No+Image")

  function formatPrice(price: number) {
    return "Rp " + price.toLocaleString("id-ID")
  }

  function handleWhatsApp() {
    const msg = `Halo, saya tertarik dengan ${car!.brand} ${car!.model} ${car!.year} seharga ${formatPrice(car!.price)}`
    window.open(`https://wa.me/${car!.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank")
  }

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>

      {/* Navbar */}
      <Box sx={{ bgcolor: "#1a1a2e", py: 2, px: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }} onClick={() => router.push("/")}>
          <DirectionsCarIcon sx={{ color: "#00b4ff", fontSize: 28 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>CarMarket</Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} sx={{ mb: 3 }}>
          Kembali
        </Button>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>

          {/* Images */}
          <Box sx={{ flex: "1 1 400px" }}>
            <Box
              component="img"
              src={images[activeImg]}
              alt={`${car.brand} ${car.model}`}
              sx={{ width: "100%", height: 350, objectFit: "cover", borderRadius: 2, mb: 1 }}
            />
            {images.length > 1 && (
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {images.map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img}
                    onClick={() => setActiveImg(i)}
                    sx={{ width: 80, height: 60, objectFit: "cover", borderRadius: 1, cursor: "pointer", border: activeImg === i ? "2px solid #00b4ff" : "2px solid transparent" }}
                  />
                ))}
              </Box>
            )}
          </Box>

          {/* Detail */}
          <Box sx={{ flex: "1 1 300px" }}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>{car.brand} {car.model}</Typography>
                  <Chip label={car.status === "available" ? "Tersedia" : "Terjual"} color={car.status === "available" ? "success" : "error"} />
                </Box>
                <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold", mb: 2 }}>
                  {formatPrice(car.price)}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
                  {[
                    { icon: <CalendarMonthIcon />, label: "Tahun", value: car.year },
                    { icon: <SpeedIcon />, label: "Kilometer", value: `${car.mileage.toLocaleString()} km` },
                    { icon: <LocalGasStationIcon />, label: "Bahan Bakar", value: car.fuel },
                    { icon: <DirectionsCarIcon />, label: "Transmisi", value: car.transmission },
                    { icon: <ColorLensIcon />, label: "Warna", value: car.color },
                  ].map((item, i) => (
                    <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box sx={{ color: "#00b4ff" }}>{item.icon}</Box>
                      <Typography sx={{ color: "text.secondary" }}>{item.label}</Typography>
                      <Typography sx={{ fontWeight: "bold", ml: "auto" }}>{item.value}</Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>Deskripsi</Typography>
                <Typography sx={{ color: "text.secondary", mb: 3 }}>{car.description}</Typography>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<WhatsAppIcon />}
                  onClick={handleWhatsApp}
                  sx={{ bgcolor: "#25d366", "&:hover": { bgcolor: "#128c7e" }, py: 1.5, fontSize: 16 }}
                >
                  Hubungi via WhatsApp
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}