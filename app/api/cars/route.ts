import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const brand = searchParams.get("brand")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const transmission = searchParams.get("transmission")
  const search = searchParams.get("search")

  const cars = await prisma.car.findMany({
    where: {
      status: "available",
      ...(brand && { brand }),
      ...(transmission && { transmission }),
      ...(minPrice && { price: { gte: Number(minPrice) } }),
      ...(maxPrice && { price: { lte: Number(maxPrice) } }),
      ...(search && {
        OR: [
          { brand: { contains: search } },
          { model: { contains: search } },
        ]
      })
    },
    orderBy: { createdAt: "desc" }
  })

  return NextResponse.json(cars)
}

export async function POST(req: Request) {
  const data = await req.json()
  const car = await prisma.car.create({ data })
  return NextResponse.json(car)
}