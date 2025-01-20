import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { X, Plus, Image as ImageIcon } from "lucide-react";

interface ProductEditorProps {
  product?: {
    id: string;
    title: string;
    category: string;
    description?: string;
    image?: string;
    dimensions?: string;
    specifications?: {
      [key: string]: string;
    };
  };
  onSave: (product: any) => void;
  onClose: () => void;
}

export const ProductEditor = ({ product, onSave, onClose }: ProductEditorProps) => {
  const [formData, setFormData] = useState({
    title: product?.title || "",
    category: product?.category || "",
    description: product?.description || "",
    dimensions: product?.dimensions || "",
    image: product?.image || "",
    specifications: product?.specifications || {},
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.image || null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category) {
      toast.error("Por favor complete los campos requeridos");
      return;
    }
    onSave({ ...product, ...formData });
    toast.success("Producto guardado exitosamente!");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData((prev) => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold mb-6 text-teal-800">
          {product ? "Editar Producto" : "Agregar Nuevo Producto"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Nombre</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                  className="border-teal-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, category: e.target.value }))
                  }
                  required
                  className="border-teal-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                  className="border-teal-600"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Imagen del Producto</Label>
                <div className="border-2 border-dashed border-teal-600 rounded-lg p-4 text-center">
                  {imagePreview ? (
                    <div className="relative aspect-square w-full">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 right-2"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData((prev) => ({ ...prev, image: "" }));
                        }}
                      >
                        Cambiar
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-48">
                      <ImageIcon className="h-12 w-12 text-teal-600 mb-2" />
                      <Label
                        htmlFor="image-upload"
                        className="cursor-pointer text-teal-600 hover:text-teal-700"
                      >
                        Agregar Imagen
                      </Label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Guardar Producto
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};