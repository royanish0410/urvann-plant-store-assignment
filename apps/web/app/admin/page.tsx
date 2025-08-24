"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft, 
  Plus, 
  Settings, 
  Leaf,
  Check,
  AlertCircle,
  X
} from "lucide-react"
import Link from "next/link"

interface Plant {
  id: string
  name: string
  price: number
  categories: string[]
  availability: boolean
  description?: string
  dateAdded: string
}

interface FormData {
  name: string
  price: string
  categories: string
  availability: boolean
  description: string
}

interface FormErrors {
  name?: string
  price?: string
  categories?: string
}

export default function AdminPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: '',
    categories: '',
    availability: true,
    description: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Mock database - in real app, this would be an API call
  const [plants, setPlants] = useState<Plant[]>([])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Plant name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Plant name must be at least 2 characters'
    }

    // Validate price
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required'
    } else {
      const priceNum = parseFloat(formData.price)
      if (isNaN(priceNum) || priceNum <= 0) {
        newErrors.price = 'Price must be a valid positive number'
      }
    }

    // Validate categories
    if (!formData.categories.trim()) {
      newErrors.categories = 'At least one category is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newPlant: Plant = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        categories: formData.categories.split(',').map(cat => cat.trim()).filter(cat => cat.length > 0),
        availability: formData.availability,
        description: formData.description.trim(),
        dateAdded: new Date().toISOString()
      }

      // Add to mock database
      setPlants(prev => [newPlant, ...prev])
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        categories: '',
        availability: true,
        description: ''
      })
      
      setSubmitStatus('success')
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000)

    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="hover:bg-green-50 hover:text-green-600 rounded-xl">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Store
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-2">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Admin Dashboard
                    </h1>
                    <p className="text-gray-600 text-sm">Add new plants to your catalog</p>
                  </div>
                </div>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-2 rounded-full">
              <Settings className="w-4 h-4 mr-2" />
              Admin Mode
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-green-500 rounded-full p-1">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800">Plant Added Successfully!</h3>
              <p className="text-sm text-green-600">The plant has been added to your catalog and is now visible on the main page.</p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-red-500 rounded-full p-1">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-red-800">Error Adding Plant</h3>
              <p className="text-sm text-red-600">There was an error adding the plant. Please try again.</p>
            </div>
          </div>
        )}

        {/* Add Plant Form */}
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <Plus className="w-6 h-6" />
              </div>
              Add New Plant
            </CardTitle>
            <p className="text-green-100">Fill out the form below to add a new plant to your catalog</p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Plant Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                    Plant Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., Monstera Deliciosa"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${
                      errors.name 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-200 focus:border-green-500 focus:ring-green-500'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-semibold text-gray-700">
                    Price ($) *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="e.g., 29.99"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${
                      errors.price 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-200 focus:border-green-500 focus:ring-green-500'
                    }`}
                  />
                  {errors.price && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.price}
                    </p>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <Label htmlFor="categories" className="text-sm font-semibold text-gray-700">
                  Categories *
                </Label>
                <Input
                  id="categories"
                  placeholder="e.g., Indoor Plants, Low Light, Pet-Friendly (separate with commas)"
                  value={formData.categories}
                  onChange={(e) => handleInputChange('categories', e.target.value)}
                  className={`h-12 rounded-xl border-2 transition-all duration-200 ${
                    errors.categories 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-200 focus:border-green-500 focus:ring-green-500'
                  }`}
                />
                <p className="text-xs text-gray-500">
                  Enter multiple categories separated by commas. This helps customers find your plant more easily.
                </p>
                {errors.categories && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.categories}
                  </p>
                )}
                
                {/* Preview categories */}
                {formData.categories.trim() && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.categories.split(',').map((cat, index) => {
                      const trimmedCat = cat.trim()
                      return trimmedCat ? (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                          {trimmedCat}
                        </Badge>
                      ) : null
                    })}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                  Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the plant, care instructions, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="min-h-[100px] rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                />
              </div>

              {/* Availability */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">Availability</Label>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="availability"
                      checked={formData.availability}
                      onChange={(e) => handleInputChange('availability', e.target.checked)}
                      className="w-5 h-5 text-green-600 rounded focus:ring-green-500 transition-all duration-200"
                    />
                    <Label htmlFor="availability" className="font-medium text-gray-700 cursor-pointer">
                      Plant is currently in stock
                    </Label>
                  </div>
                  <Badge variant={formData.availability ? "default" : "secondary"} className={
                    formData.availability 
                      ? "bg-green-500 hover:bg-green-600" 
                      : "bg-gray-400"
                  }>
                    {formData.availability ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold disabled:opacity-70 transition-all duration-200"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Adding Plant...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Add Plant to Catalog
                    </div>
                  )}
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => {
                    setFormData({
                      name: '',
                      price: '',
                      categories: '',
                      availability: true,
                      description: ''
                    })
                    setErrors({})
                  }}
                  className="px-8 h-12 rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-200"
                >
                  Clear Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Recently Added Plants Preview */}
        {plants.length > 0 && (
          <Card className="mt-8 border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
              <CardTitle className="text-xl">Recently Added Plants</CardTitle>
              <p className="text-blue-100">Plants added in this session (will appear on main page)</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plants.slice(0, 6).map((plant, index) => (
                  <div
                    key={plant.id}
                    className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{plant.name}</h3>
                      <Badge variant={plant.availability ? "default" : "secondary"} className="text-xs">
                        {plant.availability ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                    <p className="text-lg font-bold text-green-600 mb-2">${plant.price.toFixed(2)}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {plant.categories.slice(0, 3).map((category, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                      {plant.categories.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{plant.categories.length - 3} more
                        </Badge>
                      )}
                    </div>
                    {plant.description && (
                      <p className="text-xs text-gray-600 line-clamp-2">{plant.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}