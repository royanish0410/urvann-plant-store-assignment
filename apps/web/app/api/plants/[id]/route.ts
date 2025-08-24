import { type NextRequest, NextResponse } from "next/server"
import { plantsData, type Plant } from "@/lib/plants-data"

// In-memory storage for demo purposes (in real app, this would be a database)
const plants: Plant[] = [...plantsData]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const plant = plants.find((p) => p.id === params.id)

    if (!plant) {
      return NextResponse.json(
        {
          success: false,
          error: "Plant not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: plant,
    })
  } catch (error) {
    console.error("Error fetching plant:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch plant",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const plantIndex = plants.findIndex((p) => p.id === params.id)

    if (plantIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Plant not found",
        },
        { status: 404 },
      )
    }

    // Update plant
    plants[plantIndex] = {
      ...plants[plantIndex],
      ...body,
      id: params.id, // Ensure ID doesn't change
    }

    return NextResponse.json({
      success: true,
      data: plants[plantIndex],
      message: "Plant updated successfully",
    })
  } catch (error) {
    console.error("Error updating plant:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update plant",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const plantIndex = plants.findIndex((p) => p.id === params.id)

    if (plantIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Plant not found",
        },
        { status: 404 },
      )
    }

    // Remove plant
    const deletedPlant = plants.splice(plantIndex, 1)[0]

    return NextResponse.json({
      success: true,
      data: deletedPlant,
      message: "Plant deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting plant:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete plant",
      },
      { status: 500 },
    )
  }
}
