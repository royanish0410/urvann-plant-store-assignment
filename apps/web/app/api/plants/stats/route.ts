import { NextResponse } from "next/server"
import { plantsData, type Plant } from "@/lib/plants-data"

// In-memory storage for demo purposes (in real app, this would be a database)
const plants: Plant[] = [...plantsData]

export async function GET() {
  try {
    const stats = {
      totalPlants: plants.length,
      inStock: plants.filter((p) => p.inStock).length,
      outOfStock: plants.filter((p) => !p.inStock).length,
      featured: plants.filter((p) => p.featured).length,
      categories: {
        Indoor: plants.filter((p) => p.category === "Indoor").length,
        Outdoor: plants.filter((p) => p.category === "Outdoor").length,
        Succulent: plants.filter((p) => p.category === "Succulent").length,
        Flowering: plants.filter((p) => p.category === "Flowering").length,
      },
      difficulties: {
        Easy: plants.filter((p) => p.difficulty === "Easy").length,
        Medium: plants.filter((p) => p.difficulty === "Medium").length,
        Hard: plants.filter((p) => p.difficulty === "Hard").length,
      },
      lightRequirements: {
        Low: plants.filter((p) => p.lightRequirement === "Low").length,
        Medium: plants.filter((p) => p.lightRequirement === "Medium").length,
        High: plants.filter((p) => p.lightRequirement === "High").length,
      },
      priceRange: {
        min: Math.min(...plants.map((p) => p.price)),
        max: Math.max(...plants.map((p) => p.price)),
        average: Math.round(plants.reduce((sum, p) => sum + p.price, 0) / plants.length),
      },
    }

    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch statistics",
      },
      { status: 500 },
    )
  }
}
