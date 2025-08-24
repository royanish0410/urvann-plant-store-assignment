"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Filter, X } from "lucide-react"
import { categories, difficulties, lightRequirements } from "@/lib/plants-data"

interface PlantFiltersProps {
  selectedCategory: string
  selectedDifficulty: string
  selectedLight: string
  priceRange: [number, number]
  onCategoryChange: (category: string) => void
  onDifficultyChange: (difficulty: string) => void
  onLightChange: (light: string) => void
  onPriceRangeChange: (range: [number, number]) => void
  onClearFilters: () => void
  resultCount: number
}

function FilterContent({
  selectedCategory,
  selectedDifficulty,
  selectedLight,
  onCategoryChange,
  onDifficultyChange,
  onLightChange,
  onClearFilters,
  resultCount,
}: PlantFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">Filters</h3>
          <p className="text-sm text-muted-foreground">{resultCount} plants found</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4 mr-1" />
          Clear All
        </Button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="font-medium mb-3 text-foreground">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              size="sm"
              className="w-full justify-start transition-all duration-200 hover:translate-x-1"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Difficulty Filter */}
      <div>
        <h4 className="font-medium mb-3 text-foreground">Care Level</h4>
        <div className="space-y-2">
          {difficulties.map((difficulty) => (
            <Button
              key={difficulty}
              variant={selectedDifficulty === difficulty ? "default" : "ghost"}
              size="sm"
              className="w-full justify-start transition-all duration-200 hover:translate-x-1"
              onClick={() => onDifficultyChange(difficulty)}
            >
              {difficulty}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Light Requirement Filter */}
      <div>
        <h4 className="font-medium mb-3 text-foreground">Light Needs</h4>
        <div className="space-y-2">
          {lightRequirements.map((light) => (
            <Button
              key={light}
              variant={selectedLight === light ? "default" : "ghost"}
              size="sm"
              className="w-full justify-start transition-all duration-200 hover:translate-x-1"
              onClick={() => onLightChange(light)}
            >
              {light} Light
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Active Filters */}
      {(selectedCategory !== "All" || selectedDifficulty !== "All" || selectedLight !== "All") && (
        <div>
          <h4 className="font-medium mb-3 text-foreground">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== "All" && (
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                onClick={() => onCategoryChange("All")}
              >
                {selectedCategory} <X className="w-3 h-3 ml-1" />
              </Badge>
            )}
            {selectedDifficulty !== "All" && (
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                onClick={() => onDifficultyChange("All")}
              >
                {selectedDifficulty} <X className="w-3 h-3 ml-1" />
              </Badge>
            )}
            {selectedLight !== "All" && (
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                onClick={() => onLightChange("All")}
              >
                {selectedLight} Light <X className="w-3 h-3 ml-1" />
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function PlantFilters(props: PlantFiltersProps) {
  return (
    <>
      <div className="lg:hidden mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filters ({props.resultCount} results)
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filter Plants</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent {...props} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block">
        <Card className="sticky top-20 shadow-lg border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Filter Plants</CardTitle>
          </CardHeader>
          <CardContent>
            <FilterContent {...props} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
