import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  const cars = [
    {
      brand: "Toyota",
      model: "Innova",
      year: 2020,
      price: 285000000,
      mileage: 45000,
      color: "Putih",
      transmission: "Manual",
      fuel: "Bensin",
      condition: "Sangat Baik",
      description: "Mobil keluarga Toyota Innova tahun 2020, kondisi sangat baik, terawat, tidak ada lecet. Cocok untuk keluarga.",
      whatsapp: "6281234567890",
      images: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/2016_Toyota_Innova_2.0_G_%28facelift%2C_black%29%2C_front_8.21.19.jpg/1280px-2016_Toyota_Innova_2.0_G_%28facelift%2C_black%29%2C_front_8.21.19.jpg",
      status: "available",
      views: 0
    },
    {
      brand: "Honda",
      model: "Jazz",
      year: 2019,
      price: 195000000,
      mileage: 32000,
      color: "Merah",
      transmission: "Automatic",
      fuel: "Bensin",
      condition: "Sangat Baik",
      description: "Honda Jazz 2019 warna merah, transmisi otomatis, kondisi prima. Cocok untuk anak muda.",
      whatsapp: "6281234567890",
      images: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/2018_Honda_Jazz_1.5_RS_%28facelift%2C_red%29%2C_front_8.21.19.jpg/1280px-2018_Honda_Jazz_1.5_RS_%28facelift%2C_red%29%2C_front_8.21.19.jpg",
      status: "available",
      views: 0
    },
    {
      brand: "Suzuki",
      model: "Ertiga",
      year: 2021,
      price: 210000000,
      mileage: 28000,
      color: "Silver",
      transmission: "Automatic",
      fuel: "Bensin",
      condition: "Sangat Baik",
      description: "Suzuki Ertiga 2021 silver, matic, kondisi sangat baik. Mobil keluarga 7 penumpang.",
      whatsapp: "6281234567890",
      images: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/2018_Suzuki_Ertiga_1.5_GL_MT_%28facelift%29%2C_front_8.21.19.jpg/1280px-2018_Suzuki_Ertiga_1.5_GL_MT_%28facelift%29%2C_front_8.21.19.jpg",
      status: "available",
      views: 0
    },
    {
      brand: "Daihatsu",
      model: "Xenia",
      year: 2020,
      price: 165000000,
      mileage: 38000,
      color: "Hitam",
      transmission: "Manual",
      fuel: "Bensin",
      condition: "Baik",
      description: "Daihatsu Xenia 2020 hitam, manual, kondisi baik. Irit bahan bakar.",
      whatsapp: "6281234567890",
      images: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/2019_Daihatsu_Xenia_1.3_R_MT_%28facelift%2C_black%29%2C_front_8.21.19.jpg/1280px-2019_Daihatsu_Xenia_1.3_R_MT_%28facelift%2C_black%29%2C_front_8.21.19.jpg",
      status: "available",
      views: 0
    },
    {
      brand: "Mitsubishi",
      model: "Xpander",
      year: 2022,
      price: 245000000,
      mileage: 18000,
      color: "Putih",
      transmission: "Automatic",
      fuel: "Bensin",
      condition: "Sangat Baik",
      description: "Mitsubishi Xpander 2022 putih, matic, masih sangat baru. Garansi resmi masih berlaku.",
      whatsapp: "6281234567890",
      images: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/2022_Mitsubishi_Xpander_1.5_Ultimate_AT_%28facelift%29%2C_front_8.12.22.jpg/1280px-2022_Mitsubishi_Xpander_1.5_Ultimate_AT_%28facelift%29%2C_front_8.12.22.jpg",
      status: "available",
      views: 0
    },
    {
      brand: "Toyota",
      model: "Avanza",
      year: 2018,
      price: 145000000,
      mileage: 62000,
      color: "Silver",
      transmission: "Manual",
      fuel: "Bensin",
      condition: "Baik",
      description: "Toyota Avanza 2018 silver, manual, kondisi baik. Harga bisa nego.",
      whatsapp: "6281234567890",
      images: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Toyota_Avanza_facelift_2019_%28cropped%29.jpg/1280px-Toyota_Avanza_facelift_2019_%28cropped%29.jpg",
      status: "available",
      views: 0
    },
    {
      brand: "Honda",
      model: "Brio",
      year: 2021,
      price: 155000000,
      mileage: 22000,
      color: "Merah",
      transmission: "Automatic",
      fuel: "Bensin",
      condition: "Sangat Baik",
      description: "Honda Brio 2021 merah, matic, kondisi sangat baik. Cocok untuk dalam kota.",
      whatsapp: "6281234567890",
      images: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Honda_Brio_RS_%28facelift%2C_red%29%2C_front_9.12.19.jpg/1280px-Honda_Brio_RS_%28facelift%2C_red%29%2C_front_9.12.19.jpg",
      status: "available",
      views: 0
    },
    {
      brand: "Nissan",
      model: "Grand Livina",
      year: 2017,
      price: 125000000,
      mileage: 75000,
      color: "Abu-abu",
      transmission: "Automatic",
      fuel: "Bensin",
      condition: "Baik",
      description: "Nissan Grand Livina 2017 abu-abu, matic, kondisi baik. Harga sangat terjangkau.",
      whatsapp: "6281234567890",
      images: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Nissan_Grand_Livina_facelift%2C_front_8.21.19.jpg/1280px-Nissan_Grand_Livina_facelift%2C_front_8.21.19.jpg",
      status: "available",
      views: 0
    },
  ]

  for (const car of cars) {
    await prisma.car.create({ data: car })
    console.log(`Added: ${car.brand} ${car.model} ${car.year}`)
  }

  console.log("Seeding selesai!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())