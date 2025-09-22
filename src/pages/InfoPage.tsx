import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Navigation, Package, CreditCard, ArrowRight } from 'lucide-react';

const InfoPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      icon: Navigation,
      title: "In-Store Navigation",
      description: "Never get lost in the store again! Our AI-powered navigation system guides you to any product with step-by-step directions.",
      features: ["AI Assistant guides you", "Real-time directions", "Find products instantly"],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Package,
      title: "Live Stock Updates",
      description: "Get real-time information about product availability, prices, and stock levels throughout the store.",
      features: ["Real-time stock levels", "Price updates", "Restock notifications"],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: CreditCard,
      title: "Self-Billing",
      description: "Skip the queues with our smart self-checkout system. Scan, pay, and go - it's that simple!",
      features: ["Scan products easily", "Multiple payment options", "Skip checkout lines"],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleContinue = () => {
    navigate('/home');
  };

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mb-2">
            Welcome to WayIn
          </h1>
          <p className="text-muted-foreground">Discover what makes shopping smarter</p>
        </div>

        {/* Carousel Card */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <div className={`${currentSlideData.bgColor} p-8 text-center transition-all duration-500`}>
              <div className={`mx-auto h-20 w-20 bg-gradient-to-r ${currentSlideData.color} rounded-full flex items-center justify-center mb-6 shadow-lg`}>
                <IconComponent className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {currentSlideData.title}
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {currentSlideData.description}
              </p>
              
              <div className="space-y-3">
                {currentSlideData.features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-center gap-2 text-gray-700">
                    <div className="h-2 w-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="p-6 bg-white">
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevSlide}
                  className="h-10 w-10 rounded-full p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 w-8 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-gradient-to-r from-blue-500 to-green-500' 
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextSlide}
                  className="h-10 w-10 rounded-full p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <Button 
                onClick={handleContinue}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-medium text-lg"
              >
                <div className="flex items-center gap-2">
                  Continue to App
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Slide Counter */}
        <div className="text-center mt-4">
          <span className="text-sm text-muted-foreground">
            {currentSlide + 1} of {slides.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;