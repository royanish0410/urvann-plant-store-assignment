"use client"

import { useState, useEffect } from "react"
import { AdminPlantForm } from "@/components/admin-plant-form"
import { PlantCard } from "@/components/plant-card"
import { PlantCardSkeleton } from "@/components/plant-card-skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Settings, BarChart3, TrendingUp, Package, Star } from "lucide-react"
import Link from "next/link"
import type { Plant } from "@/lib/plants-data"
import { apiClient } from "@/lib/api-client"

export default function AdminPage() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [recentlyAdded, setRecentlyAdded] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const [plantsResponse, statsResponse] = await Promise.all([apiClient.getPlants(), apiClient.getStats()])

      if (plantsResponse.success && plantsResponse.data) {
        setPlants(plantsResponse.data)
      }

      if (statsResponse.success && statsResponse.data) {
        setStats(statsResponse.data)
      }

      setLoading(false)
    }

    loadData()
  }, [])

  const handlePlantAdd = (newPlant: Plant) => {
    setPlants((prev) => [...prev, newPlant])
    setRecentlyAdded((prev) => [newPlant, ...prev.slice(0, 4)])

    // Update stats
    if (stats) {
      setStats((prev: any) => ({
        ...prev,
        totalPlants: prev.totalPlants + 1,
        inStock: newPlant.inStock ? prev.inStock + 1 : prev.inStock,
        featured: newPlant.featured ? prev.featured + 1 : prev.featured,
        categories: {
          ...prev.categories,
          [newPlant.category]: prev.categories[newPlant.category] + 1,
        },
      }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="hover:bg-white/50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Store
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage your plant catalog and inventory</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Settings className="w-3 h-3 mr-1" />
              Admin Mode
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="overview" className="flex items-center gap-2 text-sm">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="add-plant" className="flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              Add Plant
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-2 text-sm">
              <Settings className="w-4 h-4" />
              Manage
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="pb-2">
                      <div className="h-4 bg-muted rounded w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-8 bg-muted rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Total Plants</CardTitle>
                      <Package className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-foreground">{stats?.totalPlants || 0}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        <TrendingUp className="w-3 h-3 inline mr-1" />
                        +12% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">In Stock</CardTitle>
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">{stats?.inStock || 0}</div>
                      <p className="text-xs text-muted-foreground mt-1">Available for sale</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Out of Stock</CardTitle>
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-red-600">{stats?.outOfStock || 0}</div>
                      <p className="text-xs text-muted-foreground mt-1">Need restocking</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Featured</CardTitle>
                      <Star className="w-4 h-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">{stats?.featured || 0}</div>
                      <p className="text-xs text-muted-foreground mt-1">Highlighted plants</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Category Breakdown */}
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-xl">Plants by Category</CardTitle>
                    <p className="text-muted-foreground">Distribution across different plant types</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {stats &&
                        Object.entries(stats.categories).map(([category, count]) => (
                          <div
                            key={category}
                            className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="text-3xl font-bold text-primary mb-2">{count as number}</div>
                            <div className="text-sm font-medium text-foreground">{category}</div>
                            <div className="text-xs text-muted-foreground mt-1">plants</div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recently Added Plants */}
                {recentlyAdded.length > 0 && (
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-xl">Recently Added Plants</CardTitle>
                      <p className="text-muted-foreground">Plants you've added in this session</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentlyAdded.map((plant, index) => (
                          <div
                            key={plant.id}
                            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <PlantCard plant={plant} />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>

          {/* Add Plant Tab */}
          <TabsContent value="add-plant">
            <AdminPlantForm onPlantAdd={handlePlantAdd} />
          </TabsContent>

          {/* Manage Tab */}
          <TabsContent value="manage" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Plant Management</CardTitle>
                <p className="text-muted-foreground">View and manage all plants in your catalog</p>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <PlantCardSkeleton key={i} />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {plants.map((plant, index) => (
                      <div
                        key={plant.id}
                        className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <PlantCard plant={plant} />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
