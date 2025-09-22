import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Navigation as NavigationIcon, Search, Bot, Scan, ArrowLeft, MapPin, ArrowRight } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Navigation = () => {
  const [selectedOption, setSelectedOption] = useState<'ai' | 'ar' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [navigationResult, setNavigationResult] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Demo product locations
  const productLocations = {
    'milk': { aisle: 'Aisle 3', shelf: 'Shelf 2', row: 'Row A', category: 'Dairy' },
    'bread': { aisle: 'Aisle 1', shelf: 'Shelf 1', row: 'Row C', category: 'Bakery' },
    'apples': { aisle: 'Aisle 5', shelf: 'Shelf 3', row: 'Row B', category: 'Fresh Produce' },
    'shampoo': { aisle: 'Aisle 7', shelf: 'Shelf 4', row: 'Row A', category: 'Personal Care' },
    'rice': { aisle: 'Aisle 2', shelf: 'Shelf 2', row: 'Row D', category: 'Pantry' },
    'chicken': { aisle: 'Aisle 4', shelf: 'Shelf 1', row: 'Row B', category: 'Meat' },
  };

  const handleAINavigation = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter a product to search for",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);

    // Simulate AI search
    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const productKey = Object.keys(productLocations).find(key => 
        key.includes(query) || query.includes(key)
      );

      if (productKey) {
        const location = productLocations[productKey as keyof typeof productLocations];
        setNavigationResult({
          product: searchQuery,
          found: true,
          location,
          steps: [
            `Head to ${location.aisle}`,
            `Look for ${location.shelf}`,
            `Find ${location.row}`,
            `You'll find ${searchQuery} in the ${location.category} section`
          ]
        });
      } else {
        setNavigationResult({
          product: searchQuery,
          found: false,
          message: "Product not found in our store. Please check with customer service."
        });
      }
      setIsSearching(false);
    }, 2000);
  };

  const handleARNavigation = () => {
    toast({
      title: "AR Navigation",
      description: "AR Navigation will be available in a future update!",
    });
  };

  const resetSearch = () => {
    setNavigationResult(null);
    setSearchQuery('');
    setSelectedOption(null);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <NavigationIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">In-Store Navigation</h1>
          <p className="text-muted-foreground">Find any product with smart guidance</p>
        </div>

        {!selectedOption && !navigationResult && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* AI Navigation Option */}
            <Card 
              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-blue-200 bg-blue-50"
              onClick={() => setSelectedOption('ai')}
            >
              <CardHeader className="text-center">
                <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">AI Navigation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-4">
                  Search for any product and get step-by-step directions from our AI assistant
                </CardDescription>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Recommended
                </Badge>
              </CardContent>
            </Card>

            {/* AR Navigation Option */}
            <Card 
              className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-purple-200 bg-purple-50"
              onClick={() => handleARNavigation()}
            >
              <CardHeader className="text-center">
                <div className="mx-auto h-16 w-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                  <Scan className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">AR Navigation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-4">
                  Use augmented reality to see directions overlaid on your camera view
                </CardDescription>
                <Badge variant="outline" className="border-purple-300 text-purple-700">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}

        {/* AI Navigation Interface */}
        {selectedOption === 'ai' && !navigationResult && (
          <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-blue-600" />
                AI Product Search
              </CardTitle>
              <CardDescription>
                What product are you looking for?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="e.g., milk, bread, apples, shampoo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                    onKeyPress={(e) => e.key === 'Enter' && handleAINavigation()}
                  />
                </div>
                <Button 
                  onClick={handleAINavigation}
                  disabled={isSearching}
                  className="h-12 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
                >
                  {isSearching ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Searching...
                    </div>
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="flex gap-2 flex-wrap">
                {Object.keys(productLocations).map((product) => (
                  <Button
                    key={product}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(product)}
                    className="capitalize"
                  >
                    {product}
                  </Button>
                ))}
              </div>

              <Button 
                variant="ghost" 
                onClick={() => setSelectedOption(null)}
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Options
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Navigation Result */}
        {navigationResult && (
          <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-blue-600" />
                Navigation Result
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {navigationResult.found ? (
                <>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      Found: {navigationResult.product}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-green-700">
                      <MapPin className="h-4 w-4" />
                      <span>{navigationResult.location.aisle} → {navigationResult.location.shelf} → {navigationResult.location.row}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">Step-by-step directions:</h4>
                    {navigationResult.steps.map((step: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="h-8 w-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Product Not Found
                  </h3>
                  <p className="text-red-700">{navigationResult.message}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={resetSearch}
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Search Again
                </Button>
                <Button 
                  onClick={() => navigate('/home')}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
                >
                  Back to Home
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default Navigation;