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
      {/* Active Filters Section */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Filters</h3>
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
        {(selectedCategory !== "All" || selectedDifficulty !== "All" || selectedLight !== "All") && (
          <div>
            <h4 className="font-medium mb-3 text-sm text-muted-foreground">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== "All" && (
                <Badge
                  variant="secondary"
                  className="bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                  onClick={() => onCategoryChange("All")}
                >
                  {selectedCategory} <X className="w-3 h-3 ml-1" />
                </Badge>
              )}
              {selectedDifficulty !== "All" && (
                <Badge
                  variant="secondary"
                  className="bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                  onClick={() => onDifficultyChange("All")}
                >
                  {selectedDifficulty} <X className="w-3 h-3 ml-1" />
                </Badge>
              )}
              {selectedLight !== "All" && (
                <Badge
                  variant="secondary"
                  className="bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                  onClick={() => onLightChange("All")}
                >
                  {selectedLight} <X className="w-3 h-3 ml-1" />
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="font-semibold mb-4">Category</h4>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className={`w-full justify-start py-2 px-3 transition-all duration-200 ${
                selectedCategory === category ? "bg-green-500 hover:bg-green-600 text-white" : "hover:bg-gray-100"
              }`}
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
        <h4 className="font-semibold mb-4">Care Level</h4>
        <div className="grid grid-cols-2 gap-2">
          {difficulties.map((difficulty) => (
            <Button
              key={difficulty}
              variant={selectedDifficulty === difficulty ? "default" : "outline"}
              size="sm"
              className={`w-full justify-start py-2 px-3 transition-all duration-200 ${
                selectedDifficulty === difficulty ? "bg-green-500 hover:bg-green-600 text-white" : "hover:bg-gray-100"
              }`}
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
        <h4 className="font-semibold mb-4">Light Needs</h4>
        <div className="grid grid-cols-2 gap-2">
          {lightRequirements.map((light) => (
            <Button
              key={light}
              variant={selectedLight === light ? "default" : "outline"}
              size="sm"
              className={`w-full justify-start py-2 px-3 transition-all duration-200 ${
                selectedLight === light ? "bg-green-500 hover:bg-green-600 text-white" : "hover:bg-gray-100"
              }`}
              onClick={() => onLightChange(light)}
            >
              {light}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PlantFilters(props: PlantFiltersProps) {
  return (
    <>
      {/* Mobile Filter Sheet */}
      <div className="lg:hidden mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full bg-background shadow-sm hover:bg-accent">
              <Filter className="w-4 h-4 mr-2" />
              Filters ({props.resultCount})
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[320px] p-0">
            <SheetHeader className="p-6 pb-4 border-b">
              <SheetTitle className="text-xl font-bold">Filter Plants</SheetTitle>
            </SheetHeader>
            <div className="p-6 pt-0">
              <FilterContent {...props} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filter Card */}
      <div className="hidden lg:block">
        <Card className="sticky top-20 w-[320px] shadow-lg border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">Filter Plants</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <FilterContent {...props} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
