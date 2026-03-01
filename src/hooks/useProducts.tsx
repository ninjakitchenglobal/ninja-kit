import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { DEV_API } from '../lib/utils/api-url';

//IMPORTING TYPES AND INTERFACES
import type IProduct from '../interfaces/IProduct';

const useProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>();
  const [popular, setPopular] = useState<IProduct[]>();
  const [recommendations, setRecommendations] = useState<IProduct[]>();

  const getProductCategory = async (category: string) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${DEV_API}/product/get-product-by-category/${category}`,
      );
      setProducts(res.data.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${DEV_API}/product/get-all-products`);
      setProducts(res.data.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  const getPopularRecommendations = async (option: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${DEV_API}/product/${option}`);

      if (option === 'get-popular') {
        setPopular(response.data.data);
      } else {
        setRecommendations(response.data.data);
      }
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.response.message);
      setIsLoading(false);
    }
  };

  return {
    getProductCategory,
    getAllProducts,
    isLoading,
    products,
    popular,
    recommendations,
    getPopularRecommendations,
  };
};

export default useProducts;
