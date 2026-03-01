import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import { useAppSelector } from '../lib/redux/hooks';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { DEV_API } from '../lib/utils/api-url';

const usePayment = () => {
  const { user, token } = useAppContext();
  const cart = useAppSelector((store) => store.cartReducer);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const sellerId = '6988e97855e9a3d54af22435';

  const buyNow = async (paymentOption: string) => {
    try {
      if (!token || !user) {
        toast.error('Please login to continue');
        navigate('/');
        return;
      }
      if (isLoading) {
        return;
      }

      if (cart.length === 0) {
        toast.error('Your cart is empty!');
        return;
      }

      setIsLoading(true);
      const response = await axios.post(`${DEV_API}/chat/get-or-create`, {
        productIds: cart,
        buyerId: user,
        sellerId,
        chatId: null,
        paymentOption,
      });

      navigate(`/customer-care-chat/${response.data.data.chatId}`);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  return {
    buyNow,
  };
};

export default usePayment;
