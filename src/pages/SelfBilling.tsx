import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Scan, Plus, Minus, Trash2, ShoppingCart, CheckCircle } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { useToast } from '@/hooks/use-toast';

const SelfBilling = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [scanMode, setScanMode] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const { toast } = useToast();

  // Demo product database
  const productDatabase: any = {
    '1234567890123': { name: 'Organic Milk 1L', price: 4.99, category: 'Dairy' },
    '2345678901234': { name: 'Whole Wheat Bread', price: 3.49, category: 'Bakery' },
    '3456789012345': { name: 'Red Apples 1kg', price: 5.99, category: 'Fresh Produce' },
    '4567890123456': { name: 'Shampoo 500ml', price: 12.99, category: 'Personal Care' },
    '5678901234567': { name: 'Basmati Rice 2kg', price: 8.99, category: 'Pantry' },
    '6789012345678': { name: 'Greek Yogurt 500g', price: 6.49, category: 'Dairy' },
  };

  const handleScanProduct = (barcode: string) => {
    const product = productDatabase[barcode];
    
    if (product) {
      const existingItem = cart.find(item => item.barcode === barcode);
      
      if (existingItem) {
        setCart(cart.map(item => 
          item.barcode === barcode 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCart([...cart, { 
          barcode, 
          ...product, 
          quantity: 1,
          id: Date.now()
        }]);
      }
      
      toast({
        title: "Product Added",
        description: `${product.name} added to cart`,
      });
    } else {
      toast({
        title: "Product Not Found",
        description: "Please try scanning again or check the barcode",
        variant: "destructive"
      });
    }
    
    setManualBarcode('');
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean));
  };

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item removed from cart",
    });
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePayment = async () => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before payment",
        variant: "destructive"
      });
      return;
    }

    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentComplete(true);
      
      toast({
        title: "Payment Successful",
        description: `Payment of $${getTotalAmount().toFixed(2)} completed successfully`,
      });
      
      // Reset after showing success
      setTimeout(() => {
        setPaymentComplete(false);
        setCart([]);
      }, 3000);
    }, 2000);
  };

  const simulateBarcodeScan = () => {
    const barcodes = Object.keys(productDatabase);
    const randomBarcode = barcodes[Math.floor(Math.random() * barcodes.length)];
    handleScanProduct(randomBarcode);
  };

  if (paymentComplete) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="mx-auto h-24 w-24 bg-green-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for shopping with WayIn. Your receipt has been sent to your email.
          </p>
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-semibold">
              Total Paid: ${getTotalAmount().toFixed(2)}
            </p>
          </div>
          <p className="text-sm text-gray-500">Redirecting to new transaction...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <CreditCard className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Self-Billing</h1>
          <p className="text-muted-foreground">Scan products and checkout instantly</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Scanning Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scan Options */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scan className="h-5 w-5" />
                  Add Products
                </CardTitle>
                <CardDescription>
                  Scan barcodes or enter them manually
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    onClick={simulateBarcodeScan}
                    className="h-16 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                  >
                    <Scan className="h-6 w-6 mr-2" />
                    Scan Barcode
                  </Button>
                  
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter barcode manually"
                        value={manualBarcode}
                        onChange={(e) => setManualBarcode(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && manualBarcode && handleScanProduct(manualBarcode)}
                      />
                      <Button 
                        onClick={() => manualBarcode && handleScanProduct(manualBarcode)}
                        disabled={!manualBarcode}
                        variant="outline"
                      >
                        Add
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Try: 1234567890123, 2345678901234, 3456789012345
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cart Items */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Cart Items ({getTotalItems()})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Your cart is empty</p>
                    <p className="text-sm">Scan or add products to get started</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.category}</p>
                          <p className="text-sm font-semibold text-green-600">${item.price}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Checkout Section */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Items ({getTotalItems()})</span>
                    <span>${getTotalAmount().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>${(getTotalAmount() * 0.08).toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(getTotalAmount() * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessingPayment || cart.length === 0}
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 text-white font-medium"
                >
                  {isProcessingPayment ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing Payment...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Pay Now
                    </div>
                  )}
                </Button>

                <div className="text-center">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Secure Payment
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SelfBilling;