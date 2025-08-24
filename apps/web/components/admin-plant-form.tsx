"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Plant } from "@/lib/plants-data"
import { apiClient } from "@/lib/api-client"

interface AdminPlantFormProps {
  onPlantAdd: (plant: Plant) => void
}

export function AdminPlantForm({ onPlantAdd }: AdminPlantFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    scientificName: "",
    price: "",
    category: "",
    difficulty: "",
    lightRequirement: "",
    wateringFrequency: "",
    description: "",
    image: "",
    inStock: true,
    featured: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Plant name is required"
    if (!formData.scientificName.trim()) newErrors.scientificName = "Scientific name is required"
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Valid price is required"
    }
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.difficulty) newErrors.difficulty = "Difficulty level is required"
    if (!formData.lightRequirement) newErrors.lightRequirement = "Light requirement is required"
    if (!formData.wateringFrequency.trim()) newErrors.wateringFrequency = "Watering frequency is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError("")

    try {
      const newPlantData: Omit<Plant, "id"> = {
        name: formData.name.trim(),
        scientificName: formData.scientificName.trim(),
        price: Number(formData.price) * 100, // Convert to cents
        category: formData.category,
        difficulty: formData.difficulty as "Easy" | "Medium" | "Hard",
        lightRequirement: formData.lightRequirement as "Low" | "Medium" | "High",
        wateringFrequency: formData.wateringFrequency.trim(),
        description: formData.description.trim(),
        image: formData.image.trim() || "/placeholder.svg?height=300&width=300",
        inStock: formData.inStock,
        featured: formData.featured,
      }

      const response = await apiClient.addPlant(newPlantData)

      if (response.success && response.data) {
        onPlantAdd(response.data)
        setSubmitSuccess(true)

        // Reset form
        setFormData({
          name: "",
          scientificName: "",
          price: "",
          category: "",
          difficulty: "",
          lightRequirement: "",
          wateringFrequency: "",
          description: "",
          image: "",
          inStock: true,
          featured: false,
        })
        setErrors({})
      } else {
        setSubmitError(response.error || "Failed to add plant")
      }
    } catch (error) {
      console.error("Error adding plant:", error)
      setSubmitError("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
    setSubmitSuccess(false)
    setSubmitError("")
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Add New Plant</CardTitle>
        <p className="text-muted-foreground text-center">Fill in the details to add a new plant to the catalog</p>
      </CardHeader>
      <CardContent>
        {submitSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Plant added successfully! It will appear in the catalog.
            </AlertDescription>
          </Alert>
        )}

        {submitError && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{submitError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Plant Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Monstera Deliciosa"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="scientificName">Scientific Name *</Label>
                <Input
                  id="scientificName"
                  value={formData.scientificName}
                  onChange={(e) => handleInputChange("scientificName", e.target.value)}
                  placeholder="e.g., Monstera deliciosa"
                  className={errors.scientificName ? "border-red-500" : ""}
                />
                {errors.scientificName && <p className="text-sm text-red-500 mt-1">{errors.scientificName}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the plant's appearance, benefits, and characteristics..."
                rows={3}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
            </div>

            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="https://example.com/plant-image.jpg (optional)"
              />
              <p className="text-sm text-muted-foreground mt-1">Leave empty to use placeholder image</p>
            </div>
          </div>

          {/* Plant Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Plant Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="1"
                  step="1"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="e.g., 1299"
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Indoor">Indoor</SelectItem>
                    <SelectItem value="Outdoor">Outdoor</SelectItem>
                    <SelectItem value="Succulent">Succulent</SelectItem>
                    <SelectItem value="Flowering">Flowering</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="difficulty">Care Level *</Label>
                <Select value={formData.difficulty} onValueChange={(value) => handleInputChange("difficulty", value)}>
                  <SelectTrigger className={errors.difficulty ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                {errors.difficulty && <p className="text-sm text-red-500 mt-1">{errors.difficulty}</p>}
              </div>

              <div>
                <Label htmlFor="lightRequirement">Light Requirement *</Label>
                <Select
                  value={formData.lightRequirement}
                  onValueChange={(value) => handleInputChange("lightRequirement", value)}
                >
                  <SelectTrigger className={errors.lightRequirement ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select light needs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low Light</SelectItem>
                    <SelectItem value="Medium">Medium Light</SelectItem>
                    <SelectItem value="High">High Light</SelectItem>
                  </SelectContent>
                </Select>
                {errors.lightRequirement && <p className="text-sm text-red-500 mt-1">{errors.lightRequirement}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="wateringFrequency">Watering Frequency *</Label>
              <Input
                id="wateringFrequency"
                value={formData.wateringFrequency}
                onChange={(e) => handleInputChange("wateringFrequency", e.target.value)}
                placeholder="e.g., Weekly, Bi-weekly, Daily"
                className={errors.wateringFrequency ? "border-red-500" : ""}
              />
              {errors.wateringFrequency && <p className="text-sm text-red-500 mt-1">{errors.wateringFrequency}</p>}
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Settings</h3>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="inStock">In Stock</Label>
                <p className="text-sm text-muted-foreground">Is this plant currently available?</p>
              </div>
              <Switch
                id="inStock"
                checked={formData.inStock}
                onCheckedChange={(checked) => handleInputChange("inStock", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="featured">Featured Plant</Label>
                <p className="text-sm text-muted-foreground">Show this plant in the featured section</p>
              </div>
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleInputChange("featured", checked)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Adding Plant..." : "Add Plant"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  name: "",
                  scientificName: "",
                  price: "",
                  category: "",
                  difficulty: "",
                  lightRequirement: "",
                  wateringFrequency: "",
                  description: "",
                  image: "",
                  inStock: true,
                  featured: false,
                })
                setErrors({})
                setSubmitSuccess(false)
                setSubmitError("")
              }}
            >
              Clear Form
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
