import { DEV_API } from '../lib/utils/api-url';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../lib/redux/hooks';
import { toast } from 'react-toastify';
import { removeFromCart } from '../lib/redux/features/cartSlice';

//IMPORTING TYPES AND INTERFACES
import type IProduct from '../interfaces/IProduct';

//IMPORTING HELPER HOOKS
import { useState } from 'react';

const useCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((store) => store.cartReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [cartDetails, setCartDetails] = useState<IProduct[]>([]);

  const getCartProducts = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(
        `${DEV_API}/product/get-particular-products`,
        {

          params: {
            productIds: cart.join(','),
          },
        },
      );

      setCartDetails(res.data.data);
    } catch (error: any) {
      console.error(error.response);
      toast.error('Failed to load cart products');
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = (productId?: string) => {
    dispatch(removeFromCart(productId));
    setCartDetails((prev) => prev.filter((item) => item._id !== productId));
  };

  return {
    isLoading,
    removeItem,
    getCartProducts,
    cartDetails,
  };
};

export default useCart;
