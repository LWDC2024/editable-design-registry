import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id?: string;
  image?: string;
  title?: string;
  category?: string;
  description?: string;
  dimensions?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isNew?: boolean;
}

export const ProductCard = ({
  id,
  image,
  title = "",
  category = "",
  description = "",
  dimensions = "",
  onEdit,
  onDelete,
  isNew = false,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="relative overflow-hidden transition-all duration-200 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full bg-gray-100">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Plus className="h-12 w-12 text-gray-400" />
            </div>
          )}
          {isHovered && !isNew && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 transition-all duration-200">
              <Button
                variant="secondary"
                size="icon"
                onClick={onEdit}
                className="h-10 w-10"
              >
                <Edit2 className="h-5 w-5" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={onDelete}
                className="h-10 w-10"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{title || "New Product"}</h3>
        <p className="text-sm text-gray-500 mb-2">{category || "No category"}</p>
        {description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{description}</p>
        )}
        {dimensions && (
          <p className="text-sm text-gray-500">
            <span className="font-medium">Dimensions:</span> {dimensions}
          </p>
        )}
      </CardContent>
      {isNew && (
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={onEdit}
            className="w-full bg-primary hover:bg-primary-dark"
          >
            Add New Product
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};