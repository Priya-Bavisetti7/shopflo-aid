import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Store, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';

const StoreLogin = () => {
  const [storeId, setStoreId] = useState('');
  const [storeLocation, setStoreLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Demo store data
  const stores = [
    { id: 'ST001', name: 'WayIn Downtown', location: 'Downtown Mall, 1st Floor' },
    { id: 'ST002', name: 'WayIn Central', location: 'Central Plaza, Ground Floor' },
    { id: 'ST003', name: 'WayIn North', location: 'North Point Shopping Center' },
    { id: 'ST004', name: 'WayIn South', location: 'South Gate Mall, 2nd Floor' },
  ];

  const handleStoreLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!storeId || !storeLocation) {
      toast({
        title: "Validation Error",
        description: "Please select both store ID and location",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate store validation and product loading
    setTimeout(() => {
      toast({
        title: "Store Connected",
        description: `Connected to ${stores.find(s => s.id === storeId)?.name}`,
      });
      
      // Save store info to localStorage for demo
      localStorage.setItem('currentStore', JSON.stringify({
        id: storeId,
        name: stores.find(s => s.id === storeId)?.name,
        location: storeLocation
      }));
      
      navigate('/info');
      setIsLoading(false);
    }, 1500);
  };

  const handleStoreSelect = (selectedStoreId: string) => {
    setStoreId(selectedStoreId);
    const store = stores.find(s => s.id === selectedStoreId);
    if (store) {
      setStoreLocation(store.location);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <Store className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Select Your Store
          </h1>
          <p className="text-muted-foreground mt-2">Choose the store you're visiting</p>
        </div>

        {/* Store Selection Form */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Store Login</CardTitle>
            <CardDescription className="text-center">
              Connect to your store to access products and services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStoreLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="store-select">Store Location</Label>
                <Select value={storeId} onValueChange={handleStoreSelect}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select your store" />
                  </SelectTrigger>
                  <SelectContent>
                    {stores.map((store) => (
                      <SelectItem key={store.id} value={store.id}>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{store.name}</div>
                            <div className="text-xs text-muted-foreground">{store.location}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-id">Store ID</Label>
                <Input
                  id="store-id"
                  type="text"
                  placeholder="Store ID will auto-fill"
                  value={storeId}
                  readOnly
                  className="h-11 bg-muted/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Store Address</Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Location will auto-fill"
                  value={storeLocation}
                  readOnly
                  className="h-11 bg-muted/50"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-medium"
                disabled={isLoading || !storeId}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Connecting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Connect to Store
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>

              <Button 
                type="button"
                variant="outline" 
                className="w-full h-11"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreLogin;