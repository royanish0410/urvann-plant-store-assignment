"use client"

import type { Plant } from "@/lib/plants-data"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface PlantCardProps {
  plant: Plant
}

export function PlantCard({ plant }: PlantCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-md hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={plant.image || "/placeholder.svg?height=300&width=300"}
            alt={plant.name}
            fill
            className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
          />
          {imageLoading && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-lg"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>

          {plant.featured && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground shadow-lg">Featured</Badge>
          )}
          {!plant.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
              {plant.name}
            </h3>
            <p className="text-sm text-muted-foreground italic">{plant.scientificName}</p>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{plant.description}</p>

          <div className="flex flex-wrap gap-1.5">
            <Badge variant="secondary" className="text-xs font-medium">
              {plant.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {plant.lightRequirement} Light
            </Badge>
            <Badge variant="outline" className="text-xs">
              {plant.wateringFrequency}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-primary">₹{(plant.price / 100).toFixed(0)}</span>
          <span className="text-xs text-muted-foreground">Free Delivery</span>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 transition-all duration-200 hover:shadow-lg"
          disabled={!plant.inStock}
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {plant.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  )
}
