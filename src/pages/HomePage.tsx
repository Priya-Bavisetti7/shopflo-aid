import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation, Package, CreditCard, Store, MapPin, Clock } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import ChatBot from '@/components/ChatBot';

const HomePage = () => {
  const navigate = useNavigate();
  const [currentStore, setCurrentStore] = useState<any>(null);

  useEffect(() => {
    const storeData = localStorage.getItem('currentStore');
    if (storeData) {
      setCurrentStore(JSON.parse(storeData));
    }
  }, []);

  const features = [
    {
      id: 'navigation',
      title: 'In-Store Navigation',
      description: 'Find any product with AI-powered directions',
      icon: Navigation,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      path: '/navigation'
    },
    {
      id: 'stock',
      title: 'Live Stock Updates',
      description: 'Check real-time product availability and prices',
      icon: Package,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100',
      path: '/stock'
    },
    {
      id: 'billing',
      title: 'Self-Billing',
      description: 'Scan and pay for products without queues',
      icon: CreditCard,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      path: '/billing'
    }
  ];

  const handleFeatureClick = (path: string) => {
    navigate(path);
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mb-4">
            Welcome to WayIn
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Your smart shopping experience starts here
          </p>

          {/* Current Store Info */}
          {currentStore && (
            <Card className="max-w-md mx-auto mb-8 bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-green-500 rounded-xl flex items-center justify-center">
                    <Store className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">{currentStore.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-3 w-3" />
                      {currentStore.location}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <Clock className="h-3 w-3" />
                      Connected
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            
            return (
              <Card
                key={feature.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 ${feature.bgColor}`}
                onClick={() => handleFeatureClick(feature.path)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto h-16 w-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm">
            <div className="text-2xl font-bold text-blue-600">500+</div>
            <div className="text-sm text-gray-600">Products Available</div>
          </div>
          <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-sm text-gray-600">In Stock</div>
          </div>
          <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm">
            <div className="text-2xl font-bold text-purple-600">2min</div>
            <div className="text-sm text-gray-600">Avg. Checkout</div>
          </div>
          <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm">
            <div className="text-2xl font-bold text-orange-600">4.9★</div>
            <div className="text-sm text-gray-600">User Rating</div>
          </div>
        </div>
      </div>
      <ChatBot />
    </AppLayout>
  );
};

export default HomePage;