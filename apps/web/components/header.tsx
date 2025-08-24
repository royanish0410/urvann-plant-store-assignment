"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Search,
  ShoppingCart,
  User,
  Leaf,
  Filter,
  X,
  ChevronDown,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  MessageCircle,
  Mail,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock data - replace with your actual data
const categories = ["All", "Indoor Plants", "Outdoor Plants", "Succulents", "Flowering Plants"];
const difficulties = ["All", "Easy", "Medium", "Hard"];
const lightRequirements = ["All", "Low", "Medium", "High"];

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedCategory?: string;
  selectedDifficulty?: string;
  selectedLight?: string;
  onCategoryChange?: (category: string) => void;
  onDifficultyChange?: (difficulty: string) => void;
  onLightChange?: (light: string) => void;
  onClearFilters?: () => void;
  resultCount?: number;
}

function FilterContent({
  selectedCategory = "All",
  selectedDifficulty = "All",
  selectedLight = "All",
  onCategoryChange = () => {},
  onDifficultyChange = () => {},
  onLightChange = () => {},
  onClearFilters = () => {},
  resultCount = 0,
}: Omit<HeaderProps, "searchQuery" | "onSearchChange">) {
  return (
    <div className="space-y-4 w-full">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category Filter */}
        <div>
          <h4 className="font-medium mb-3 text-sm">Category</h4>
          <div className="space-y-1">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start text-xs h-8"
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        {/* Difficulty Filter */}
        <div>
          <h4 className="font-medium mb-3 text-sm">Care Level</h4>
          <div className="space-y-1">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start text-xs h-8"
                onClick={() => onDifficultyChange(difficulty)}
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>
        {/* Light Requirement Filter */}
        <div>
          <h4 className="font-medium mb-3 text-sm">Light Needs</h4>
          <div className="space-y-1">
            {lightRequirements.map((light) => (
              <Button
                key={light}
                variant={selectedLight === light ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start text-xs h-8"
                onClick={() => onLightChange(light)}
              >
                {light} Light
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Header({
  searchQuery = "",
  onSearchChange = () => {},
  selectedCategory = "All",
  selectedDifficulty = "All",
  selectedLight = "All",
  onCategoryChange = () => {},
  onDifficultyChange = () => {},
  onLightChange = () => {},
  onClearFilters = () => {},
  resultCount = 0,
}: HeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const hasActiveFilters = selectedCategory !== "All" || selectedDifficulty !== "All" || selectedLight !== "All";

  return (
    <div className="w-full">
      {/* Top Banner */}
      <div className="bg-green-600 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1 h-6 w-6">
              <Instagram className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1 h-6 w-6">
              <Facebook className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1 h-6 w-6">
              <Youtube className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1 h-6 w-6">
              <Linkedin className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1 h-6 w-6">
              <MessageCircle className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1 h-6 w-6">
              <Mail className="w-3 h-3" />
            </Button>
          </div>
          <div className="text-center text-xs md:text-sm w-full">
            <span className="block">
              ✨ Flat Discount on orders above 999. Use code WOW50. Free Next Day Delivery on orders received by 7 PM ✨
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl md:text-4xl font-bold text-green-600 group-hover:text-green-500 transition-colors">
              urvann
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-full md:max-w-2xl mx-2 md:mx-8 flex items-center gap-2">
            <div className="flex-1 relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                  isSearchFocused ? "text-green-600" : "text-muted-foreground"
                }`}
              />
              <Input
                placeholder="Search by Products"
                className={`pl-10 bg-muted/50 border-2 transition-all duration-200 w-full ${
                  isSearchFocused ? "ring-2 ring-green-600/20 bg-background border-green-600" : "border-gray-200"
                }`}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Button
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-black h-7 w-7 p-0 md:h-8 md:px-3"
              >
                <Search className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
            </div>
          </div>

          {/* Filters for larger screens */}
          <div className="hidden md:block">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`relative min-w-[100px] ${hasActiveFilters ? "border-green-600 text-green-600" : ""}`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {hasActiveFilters && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-600 rounded-full" />}
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="p-4 w-96">
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

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center space-x-1 hover:bg-green-50 hover:text-green-600 transition-colors text-xs"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="text-xs">GET HELP</span>
            </Button>

            <Link href="/admin">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 hover:bg-green-50 hover:text-green-600 transition-colors text-xs"
              >
                <User className="w-4 h-4" />
                <span className="md:inline hidden">LOGIN</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-green-50 hover:text-green-600 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                0
              </span>
            </Button>

            {/* Mobile Filter Button */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`relative ${hasActiveFilters ? "border-green-600 text-green-600" : ""}`}
                  >
                    <Filter className="w-4 h-4" />
                    {hasActiveFilters && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-600 rounded-full" />}
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
        </div>
      </header>
    </div>
  );
}
