import { type NextRequest, NextResponse } from "next/server"
import { plantsData, type Plant } from "@/lib/plants-data"

// In-memory storage for demo purposes (in real app, this would be a database)
const plants: Plant[] = [...plantsData]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const difficulty = searchParams.get("difficulty")
    const lightRequirement = searchParams.get("lightRequirement")
    const search = searchParams.get("search")
    const featured = searchParams.get("featured")

    let filteredPlants = [...plants]

    // Apply filters
    if (category && category !== "All") {
      filteredPlants = filteredPlants.filter((plant) => plant.category === category)
    }

    if (difficulty && difficulty !== "All") {
      filteredPlants = filteredPlants.filter((plant) => plant.difficulty === difficulty)
    }

    if (lightRequirement && lightRequirement !== "All") {
      filteredPlants = filteredPlants.filter((plant) => plant.lightRequirement === lightRequirement)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredPlants = filteredPlants.filter(
        (plant) =>
          plant.name.toLowerCase().includes(searchLower) ||
          plant.scientificName.toLowerCase().includes(searchLower) ||
          plant.description.toLowerCase().includes(searchLower),
      )
    }

    if (featured === "true") {
      filteredPlants = filteredPlants.filter((plant) => plant.featured)
    }

    return NextResponse.json({
      success: true,
      data: filteredPlants,
      count: filteredPlants.length,
    })
  } catch (error) {
    console.error("Error fetching plants:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch plants",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "name",
      "scientificName",
      "price",
      "category",
      "difficulty",
      "lightRequirement",
      "description",
    ]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 },
        )
      }
    }

    // Create new plant
    const newPlant: Plant = {
      id: `plant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: body.name,
      scientificName: body.scientificName,
      price: Number(body.price),
      category: body.category,
      difficulty: body.difficulty,
      lightRequirement: body.lightRequirement,
      wateringFrequency: body.wateringFrequency || "Weekly",
      description: body.description,
      image: body.image || "/placeholder.svg?height=300&width=300",
      inStock: body.inStock !== undefined ? body.inStock : true,
      featured: body.featured !== undefined ? body.featured : false,
    }

    // Add to plants array
    plants.push(newPlant)

    return NextResponse.json({
      success: true,
      data: newPlant,
      message: "Plant added successfully",
    })
  } catch (error) {
    console.error("Error adding plant:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add plant",
      },
      { status: 500 },
    )
  }
}
