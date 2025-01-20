import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { X, Plus, Image as ImageIcon, Eye } from "lucide-react";
import html2pdf from "html2pdf.js";

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
  const [showPreview, setShowPreview] = useState(false);

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

  const exportPreviewToPDF = async () => {
    const element = document.getElementById("preview-content");
    if (!element) return;

    const opt = {
      margin: 1,
      filename: `${formData.title || "producto"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    try {
      await html2pdf().set(opt).from(element).save();
      toast.success("PDF exportado exitosamente!");
    } catch (error) {
      toast.error("Error al exportar PDF");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-6xl relative">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensiones</Label>
              <Input
                id="dimensions"
                value={formData.dimensions}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dimensions: e.target.value }))
                }
                className="border-teal-600"
              />
            </div>
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
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                Guardar Producto
              </Button>
            </div>
          </form>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-teal-800">
                Vista Previa
              </h3>
              <Button
                onClick={exportPreviewToPDF}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Exportar PDF
              </Button>
            </div>
            <div
              id="preview-content"
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="max-w-2xl mx-auto">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt={formData.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                )}
                <h1 className="text-2xl font-bold text-teal-800 mb-2">
                  {formData.title || "Título del Producto"}
                </h1>
                <div className="text-sm text-teal-600 mb-4">
                  {formData.category || "Categoría"}
                </div>
                {formData.description && (
                  <p className="text-gray-700 mb-4">{formData.description}</p>
                )}
                {formData.dimensions && (
                  <div className="text-sm text-gray-600">
                    <strong>Dimensiones:</strong> {formData.dimensions}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};