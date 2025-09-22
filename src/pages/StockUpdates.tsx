import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Package, Search, AlertCircle, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { useToast } from '@/hooks/use-toast';

const StockUpdates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Demo product data
  const demoProducts = [
    { id: 1, name: 'Organic Milk 1L', category: 'Dairy', price: 4.99, stock: 25, location: 'Aisle 3, Shelf 2' },
    { id: 2, name: 'Whole Wheat Bread', category: 'Bakery', price: 3.49, stock: 12, location: 'Aisle 1, Shelf 1' },
    { id: 3, name: 'Red Apples 1kg', category: 'Fresh Produce', price: 5.99, stock: 0, location: 'Aisle 5, Shelf 3' },
    { id: 4, name: 'Shampoo 500ml', category: 'Personal Care', price: 12.99, stock: 8, location: 'Aisle 7, Shelf 4' },
    { id: 5, name: 'Basmati Rice 2kg', category: 'Pantry', price: 8.99, stock: 45, location: 'Aisle 2, Shelf 2' },
    { id: 6, name: 'Chicken Breast 1kg', category: 'Meat', price: 15.99, stock: 3, location: 'Aisle 4, Shelf 1' },
    { id: 7, name: 'Greek Yogurt 500g', category: 'Dairy', price: 6.49, stock: 18, location: 'Aisle 3, Shelf 1' },
    { id: 8, name: 'Olive Oil 750ml', category: 'Pantry', price: 9.99, stock: 22, location: 'Aisle 2, Shelf 3' },
    { id: 9, name: 'Fresh Salmon 500g', category: 'Seafood', price: 18.99, stock: 6, location: 'Aisle 4, Shelf 2' },
    { id: 10, name: 'Bananas 1kg', category: 'Fresh Produce', price: 2.99, stock: 0, location: 'Aisle 5, Shelf 1' },
  ];

  useEffect(() => {
    // Simulate loading products
    setTimeout(() => {
      setProducts(demoProducts);
      setFilteredProducts(demoProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product: any) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { status: 'out', color: 'bg-red-100 text-red-800 border-red-200', icon: AlertCircle };
    if (stock <= 5) return { status: 'low', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock };
    return { status: 'good', color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle };
  };

  const handleRequestRestock = (productName: string) => {
    toast({
      title: "Restock Requested",
      description: `Restock request submitted for ${productName}`,
    });
  };

  const refreshStock = () => {
    setIsLoading(true);
    // Simulate refresh with slight stock changes
    setTimeout(() => {
      const updatedProducts = demoProducts.map(product => ({
        ...product,
        stock: Math.max(0, product.stock + Math.floor(Math.random() * 6) - 2)
      }));
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      setIsLoading(false);
      toast({
        title: "Stock Updated",
        description: "Product stock levels have been refreshed",
      });
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-green-600 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Package className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Live Stock Updates</h1>
          <p className="text-muted-foreground">Real-time product availability and pricing</p>
        </div>

        {/* Search and Refresh */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
              <Button 
                onClick={refreshStock}
                disabled={isLoading}
                variant="outline"
                className="h-11"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stock Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-green-600">
              {filteredProducts.filter((p: any) => p.stock > 5).length}
            </div>
            <div className="text-sm text-gray-600">In Stock</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {filteredProducts.filter((p: any) => p.stock > 0 && p.stock <= 5).length}
            </div>
            <div className="text-sm text-gray-600">Low Stock</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-red-600">
              {filteredProducts.filter((p: any) => p.stock === 0).length}
            </div>
            <div className="text-sm text-gray-600">Out of Stock</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-blue-600">{filteredProducts.length}</div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent mx-auto mb-4" />
            <p className="text-muted-foreground">Loading product information...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product: any) => {
              const stockInfo = getStockStatus(product.stock);
              const StatusIcon = stockInfo.icon;
              
              return (
                <Card key={product.id} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight mb-1">{product.name}</CardTitle>
                        <CardDescription className="text-sm">{product.category}</CardDescription>
                      </div>
                      <Badge variant="outline" className={`${stockInfo.color} border`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {product.stock === 0 ? 'Out' : product.stock <= 5 ? 'Low' : 'In Stock'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-green-600">${product.price}</span>
                        <span className="text-sm text-gray-600">
                          Stock: <span className={`font-semibold ${product.stock === 0 ? 'text-red-600' : product.stock <= 5 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {product.stock === 0 ? 'Out of Stock' : `${product.stock} units`}
                          </span>
                        </span>
                      </div>
                      
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {product.location}
                      </div>

                      {product.stock === 0 && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
                          onClick={() => handleRequestRestock(product.name)}
                        >
                          Request Restock
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {filteredProducts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default StockUpdates;