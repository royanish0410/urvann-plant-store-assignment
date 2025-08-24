import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function PlantCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square bg-muted animate-pulse" />
        <div className="p-4 space-y-3">
          <div className="h-6 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
          <div className="flex gap-2">
            <div className="h-6 bg-muted rounded w-16 animate-pulse" />
            <div className="h-6 bg-muted rounded w-20 animate-pulse" />
            <div className="h-6 bg-muted rounded w-14 animate-pulse" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 bg-muted rounded w-20 animate-pulse" />
          <div className="h-3 bg-muted rounded w-16 animate-pulse" />
        </div>
        <div className="h-10 bg-muted rounded w-24 animate-pulse" />
      </CardFooter>
    </Card>
  )
}
