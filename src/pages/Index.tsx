import { ProductGrid } from "@/components/ProductGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-primary">Product Dashboard</h1>
        </div>
      </header>
      <main>
        <ProductGrid />
      </main>
    </div>
  );
};

export default Index;