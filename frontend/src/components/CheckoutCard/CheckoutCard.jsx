import React,{ useState,useEffect,useCallback } from "react";
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import toast from 'react-hot-toast';
import { AxiosRequest } from '../../AxiosRequest/AxiosRequest';
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/emailSlice";
import { selectToken } from '../../redux/tokenSlice';
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";



export default function CheckoutCard() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cartData, setCartData] = useState({ totalPrice: 0, products: [] });
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    zipcode: '',
    phoneNumber: '',
  });
  const fetchedEmail = useSelector(selectEmail);
  const email = fetchedEmail;
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);  // State to control dialog


  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await AxiosRequest.get(`/api/cart/get-cart/${email}`);
        const { totalPrice, updatedCart } = response.data;
        
        setCartData({ totalPrice, products: updatedCart.products });
      } catch (error) {
        console.error('Error fetching cart:', error);
        toast.error("Failed to load cart details");
      }
    };

    fetchCartData();
  }, [email]);
  console.log('Cart Data in checkout',cartData);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleNumberChange = (e, field) => {
    const { value } = e.target;
    const newValue = value && Number(value) >= 0 ? Number(value) : "";
    setFormData({ ...formData, [field]: newValue });
  };  

  const handleSubmitOrder = async () => {
    const { address, city, zipcode,phoneNumber } = formData;
    if ( !address || !city || !zipcode || !phoneNumber || !paymentMethod) {
      toast.error('Please fill in all the fields.');
      return;
    }

    try {
      const response = await AxiosRequest.post('/api/orders/create-order', {
        products: cartData.products,
        address,
        city,
        zipcode,
        phoneNumber,
        totalPrice: cartData.totalPrice,
        paymentMethod
      },{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success('Order placed successfully');
      console.log('Order created:', response.data);
      setFormData(
        {
          address: '',
          city: '',
          zipcode: '',
          phoneNumber: '',
        }
      );
      setDialogOpen(true);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create the order');
    }
  };

  const handleCancel =()=>{
    navigate('/cart');
  }

  const handleDialogClose = () => {
    navigate("/home"); 
  };

  return (
    <div className="flex items-center justify-center text-center min-h-screen font-poppins">
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="p-4 max-w-md w-screen"
    >
    <Card className="w-[400px] shadow-lg shadow-black rounded-lg bg-white transform transition duration-300 hover:-translate-y-2 hover:shadow-3xl">
      <CardHeader>
        <CardTitle className='text-center'>Checkout</CardTitle>
        <CardDescription className='text-center'>Complete your order details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="fullname" placeholder="John Doe" value={formData.fullname} onChange={handleInputChange}/>
            </div> */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 Main St" value={formData.address} onChange={handleInputChange}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="New York" value={formData.city} onChange={handleInputChange}/>
            </div>
                     <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="zipcode">Zip Code</Label>
                  <Input
                    id="zipcode"
                    type="number"
                    placeholder="10001"
                    value={formData.zipcode}
                    onChange={(e) => handleNumberChange(e, "zipcode")}
                    min={0}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="number"
                    placeholder="1234567890"
                    value={formData.phoneNumber}
                    onChange={(e) => handleNumberChange(e, "phoneNumber")}
                    min={0}
                    className="w-full"
                  />
                </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="payment">Payment Method</Label>
              <Select onValueChange={(value) => setPaymentMethod(value)}>
                <SelectTrigger id="payment">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <SelectItem value="Credit Card" disabled>Credit Card</SelectItem>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Only cash is accepted at the moment</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <SelectItem value="Mobile Account" disabled>Mobile Account</SelectItem>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Only cash is accepted at the moment</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <SelectItem value="Bank Transfer" disabled>Bank Transfer</SelectItem>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Only cash is accepted at the moment</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <SelectItem value="Cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
        <Button disabled={paymentMethod !== "Cash"} onClick={handleSubmitOrder}>Complete Order</Button>
      </CardFooter>
    </Card>
    </motion.div>
    <ConfirmationDialog isOpen={dialogOpen} onClose={handleDialogClose}/>
    </div>
  )
}