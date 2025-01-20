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
  specifications?: {
    [key: string]: string;
  };
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
  specifications = {},
  onEdit,
  onDelete,
  isNew = false,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="relative overflow-hidden transition-all duration-200 hover:shadow-lg bg-teal-800 text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full bg-teal-700">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Plus className="h-12 w-12 text-teal-300" />
            </div>
          )}
          {isHovered && !isNew && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 transition-all duration-200">
              <Button
                variant="secondary"
                size="icon"
                onClick={onEdit}
                className="h-10 w-10 bg-teal-600 hover:bg-teal-700"
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
        <div className="text-xs text-teal-300 mb-1">{category || "Sin categoría"}</div>
        <h3 className="text-lg font-semibold text-white">{title || "Nuevo Producto"}</h3>
        {description && (
          <p className="text-sm text-teal-100 line-clamp-2 mt-2">{description}</p>
        )}
        {dimensions && (
          <p className="text-sm text-teal-200 mt-2">
            <span className="font-medium">Dimensiones:</span> {dimensions}
          </p>
        )}
      </CardContent>
      {isNew && (
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={onEdit}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
          >
            Agregar Nuevo Producto
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};