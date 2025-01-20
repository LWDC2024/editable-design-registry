import { ProductGrid } from "@/components/ProductGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-teal-800 shadow">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Panel de Productos</h1>
            <img 
              src="/lovable-uploads/31529705-dd5d-43a8-b275-ee0c681e7e26.png" 
              alt="CPanel Logo" 
              className="h-8"
            />
          </div>
        </div>
      </header>
      <main>
        <ProductGrid />
      </main>
    </div>
  );
};

export default Index;