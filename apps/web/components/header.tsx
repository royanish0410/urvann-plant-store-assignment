"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, ShoppingCart, User, Leaf, Settings, Filter, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { categories, difficulties, lightRequirements } from "@/lib/plants-data"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  selectedDifficulty: string
  selectedLight: string
  onCategoryChange: (category: string) => void
  onDifficultyChange: (difficulty: string) => void
  onLightChange: (light: string) => void
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
}: Omit<HeaderProps, "searchQuery" | "onSearchChange">) {
  return (
    <div className="space-y-4 w-80">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Filters</h3>
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

      {/* Active Filters */}
      {(selectedCategory !== "All" || selectedDifficulty !== "All" || selectedLight !== "All") && (
        <div>
          <h4 className="font-medium mb-2 text-sm">Active Filters</h4>
          <div className="flex flex-wrap gap-1">
            {selectedCategory !== "All" && (
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors text-xs"
                onClick={() => onCategoryChange("All")}
              >
                {selectedCategory} <X className="w-3 h-3 ml-1" />
              </Badge>
            )}
            {selectedDifficulty !== "All" && (
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors text-xs"
                onClick={() => onDifficultyChange("All")}
              >
                {selectedDifficulty} <X className="w-3 h-3 ml-1" />
              </Badge>
            )}
            {selectedLight !== "All" && (
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors text-xs"
                onClick={() => onLightChange("All")}
              >
                {selectedLight} Light <X className="w-3 h-3 ml-1" />
              </Badge>
            )}
          </div>
          <Separator className="mt-3" />
        </div>
      )}

      {/* Category Filter */}
      <div>
        <h4 className="font-medium mb-2 text-sm">Category</h4>
        <div className="grid grid-cols-2 gap-1">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              size="sm"
              className="justify-start text-xs h-8"
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
        <h4 className="font-medium mb-2 text-sm">Care Level</h4>
        <div className="grid grid-cols-2 gap-1">
          {difficulties.map((difficulty) => (
            <Button
              key={difficulty}
              variant={selectedDifficulty === difficulty ? "default" : "ghost"}
              size="sm"
              className="justify-start text-xs h-8"
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
        <h4 className="font-medium mb-2 text-sm">Light Needs</h4>
        <div className="grid grid-cols-1 gap-1">
          {lightRequirements.map((light) => (
            <Button
              key={light}
              variant={selectedLight === light ? "default" : "ghost"}
              size="sm"
              className="justify-start text-xs h-8"
              onClick={() => onLightChange(light)}
            >
              {light} Light
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Header({
  searchQuery,
  onSearchChange,
  selectedCategory,
  selectedDifficulty,
  selectedLight,
  onCategoryChange,
  onDifficultyChange,
  onLightChange,
  onClearFilters,
  resultCount,
}: HeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const hasActiveFilters = selectedCategory !== "All" || selectedDifficulty !== "All" || selectedLight !== "All"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full group-hover:scale-110 transition-transform duration-200">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">Urvann</span>
        </Link>

        {/* Search and Filters */}
        <div className="flex-1 max-w-2xl mx-8 flex items-center gap-3">
          <div className="flex-1 relative">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                isSearchFocused ? "text-primary" : "text-muted-foreground"
              }`}
            />
            <Input
              placeholder="Search plants..."
              className={`pl-10 bg-muted/50 transition-all duration-200 ${
                isSearchFocused ? "ring-2 ring-primary/20 bg-background" : ""
              }`}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>

          <div className="hidden md:block">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`relative ${hasActiveFilters ? "border-primary text-primary" : ""}`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {hasActiveFilters && <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />}
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="p-4">
                <FilterContent
                  selectedCategory={selectedCategory}
                  selectedDifficulty={selectedDifficulty}
                  selectedLight={selectedLight}
                  onCategoryChange={onCategoryChange}
                  onDifficultyChange={onDifficultyChange}
                  onLightChange={onLightChange}
                  onClearFilters={onClearFilters}
                  resultCount={resultCount}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`relative ${hasActiveFilters ? "border-primary text-primary" : ""}`}
                >
                  <Filter className="w-4 h-4" />
                  {hasActiveFilters && <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filter Plants</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent
                    selectedCategory={selectedCategory}
                    selectedDifficulty={selectedDifficulty}
                    selectedLight={selectedLight}
                    onCategoryChange={onCategoryChange}
                    onDifficultyChange={onDifficultyChange}
                    onLightChange={onLightChange}
                    onClearFilters={onClearFilters}
                    resultCount={resultCount}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Link href="/admin">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
            <User className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              0
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
}
