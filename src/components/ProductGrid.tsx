import { ProductCard } from "./ProductCard";
import { ProductEditor } from "./ProductEditor";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileDown } from "lucide-react";
import html2pdf from "html2pdf.js";
import { toast } from "sonner";

interface Product {
  id: string;
  image?: string;
  title: string;
  category: string;
  description?: string;
  dimensions?: string;
}

export const ProductGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      title: "Producto de Ejemplo",
      category: "Categoría 1",
      description: "Esta es una descripción de ejemplo del producto",
      dimensions: "100x200cm",
    },
  ]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleEdit = (id?: string) => {
    if (!id) {
      setEditingProduct(null);
      setIsEditorOpen(true);
      return;
    }
    const product = products.find((p) => p.id === id);
    if (product) {
      setEditingProduct(product);
      setIsEditorOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Producto eliminado exitosamente!");
  };

  const handleSave = (product: Product) => {
    if (product.id) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
    } else {
      setProducts((prev) => [
        ...prev,
        { ...product, id: Math.random().toString(36).substr(2, 9) },
      ]);
    }
    setIsEditorOpen(false);
    setEditingProduct(null);
  };

  const exportToPDF = async () => {
    const element = document.getElementById("product-grid");
    if (!element) return;

    const opt = {
      margin: 1,
      filename: "catalogo-productos.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    try {
      await html2pdf().set(opt).from(element).save();
      toast.success("Catálogo exportado exitosamente!");
    } catch (error) {
      toast.error("Error al exportar el catálogo");
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-600" />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-teal-600"
          />
        </div>
        <Button 
          onClick={exportToPDF} 
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700"
        >
          <FileDown className="h-4 w-4" />
          Exportar Catálogo
        </Button>
      </div>
      <div
        id="product-grid"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <ProductCard isNew onEdit={() => handleEdit()} />
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onEdit={() => handleEdit(product.id)}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>
      {isEditorOpen && (
        <ProductEditor
          product={editingProduct || undefined}
          onSave={handleSave}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};
