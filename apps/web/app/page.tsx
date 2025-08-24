"use client"

import { useState, useMemo, useEffect } from "react"
import { Header } from "@/components/header"
import { PlantCard } from "@/components/plant-card"
import { PlantCardSkeleton } from "@/components/plant-card-skeleton"
import { filterPlants, type Plant } from "@/lib/plants-data"
import { apiClient } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUp } from "lucide-react"

export default function HomePage() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [selectedLight, setSelectedLight] = useState("All")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const loadPlants = async () => {
      setLoading(true)
      const response = await apiClient.getPlants()
      if (response.success && response.data) {
        setPlants(response.data)
      }
      setLoading(false)
    }

    loadPlants()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const filteredPlants = useMemo(() => {
    return filterPlants(plants, searchQuery, selectedCategory, selectedDifficulty, selectedLight)
  }, [plants, searchQuery, selectedCategory, selectedDifficulty, selectedLight])

  const featuredPlants = useMemo(() => {
    return filteredPlants.filter((plant) => plant.featured)
  }, [filteredPlants])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSelectedDifficulty("All")
    setSelectedLight("All")
    setPriceRange([0, 5000])
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          selectedLight={selectedLight}
          onCategoryChange={setSelectedCategory}
          onDifficultyChange={setSelectedDifficulty}
          onLightChange={setSelectedLight}
          onClearFilters={clearFilters}
          resultCount={0}
        />
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <PlantCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        selectedDifficulty={selectedDifficulty}
        selectedLight={selectedLight}
        onCategoryChange={setSelectedCategory}
        onDifficultyChange={setSelectedDifficulty}
        onLightChange={setSelectedLight}
        onClearFilters={clearFilters}
        resultCount={filteredPlants.length}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Bring Nature Home
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Discover our curated collection of beautiful plants that transform your space into a green paradise
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Free Delivery
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Expert Care Tips
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              30-Day Guarantee
            </Badge>
          </div>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600 hover:shadow-xl transition-all"
          >
            Shop Now
          </Button>
        </div>
      </section>

      {featuredPlants.length > 0 &&
        !searchQuery &&
        selectedCategory === "All" &&
        selectedDifficulty === "All" &&
        selectedLight === "All" && (
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Plants</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                  Hand-picked favorites that are perfect for beginners and plant enthusiasts alike
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {featuredPlants.map((plant, index) => (
                  <div
                    key={plant.id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <PlantCard plant={plant} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {searchQuery || selectedCategory !== "All" || selectedDifficulty !== "All" || selectedLight !== "All"
                ? "Search Results"
                : "Our Plant Collection"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              {searchQuery || selectedCategory !== "All" || selectedDifficulty !== "All" || selectedLight !== "All"
                ? `Found ${filteredPlants.length} plants matching your criteria`
                : "Browse our complete selection of indoor plants, succulents, and more"}
            </p>
          </div>

          <div className="w-full">
            {filteredPlants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {filteredPlants.map((plant, index) => (
                  <div
                    key={plant.id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <PlantCard plant={plant} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 text-muted-foreground">🌱</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No plants found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any plants matching your criteria. Try adjusting your filters.
                  </p>
                  <Button onClick={clearFilters} variant="outline" size="lg">
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-card border-t py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="md:col-span-1">
              <h3 className="font-semibold text-lg mb-4">About Urvann</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your trusted partner in bringing nature closer to home with premium quality plants and expert care
                guidance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="hover:text-foreground transition-colors cursor-pointer">Indoor Plants</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Outdoor Plants</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Succulents</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Flowering Plants</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="hover:text-foreground transition-colors cursor-pointer">Plant Care Guide</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Delivery Info</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Return Policy</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Contact Us</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Connect</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="hover:text-foreground transition-colors cursor-pointer">Instagram</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Facebook</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Twitter</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Newsletter</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Urvann Plant Store. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}
