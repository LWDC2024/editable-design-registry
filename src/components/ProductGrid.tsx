import { ProductCard } from "./ProductCard";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Product {
  id: string;
  image?: string;
  title: string;
  category: string;
}

export const ProductGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      title: "Sample Product",
      category: "Category 1",
    },
  ]);

  const handleEdit = (id?: string) => {
    console.log("Edit product", id);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
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
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
    </div>
  );
};