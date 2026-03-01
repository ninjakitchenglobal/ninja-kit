import { useNavigate } from 'react-router';
import { useState } from 'react';
import type IProduct from '../interfaces/IProduct';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DEV_API } from '../lib/utils/api-url';
import { uploadAndGetPublicUrl } from '../lib/utils/supabseUpload';

const useAdmin = () => {
  const navigate = useNavigate();

  //PRODUCT DETAILS FOR UPLOAD AND THE STATE MANAGEMENT FOR IT
  const [productDetails, setProductDetails] = useState<IProduct>({
    title: '',
    description: '',
    price: 0,
    category: '',
    picture: '',
  });
  const [file, setFile] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [products, setProducts] = useState<IProduct[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddLoading, setIsAddLoading] = useState<boolean>(false);

  //ONCHANGE FOR THE PRODUCT DETAILS INPUT FIELDS
  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setProductDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  //ONCHANGE FOR THE PRODUCT DETAILS FILE
  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setImagePreview(url);
    }
  };

  //FUNCTIONALITY TO ADD PRODUCTS
  const addProduct = async () => {
    try {
      setIsAddLoading(true);

      const pictureUrl = await uploadAndGetPublicUrl(file as File, 'ninja-img');

      await axios.post(`${DEV_API}/product/add-product`, {
        ...productDetails,
        picture: pictureUrl,
      });

      setIsAddLoading(false);
      toast.success('Product added successfully!');

      setProductDetails({
        title: '',
        description: '',
        price: 0,
        category: '',
      });
    } catch (error: any) {
      console.log(error.response);
      setIsAddLoading(false);
    }
  };

  //FUNCTIONALITY TO GET PRODUCTS
  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${DEV_API}/product/get-all-products`);
      setProducts(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return {
    isAddLoading,
    addProduct,
    products,
    isLoading,
    handleChange,
    getProducts,
    navigate,
    productDetails,
    setProducts,
    handleFileChange,
    file,
    imagePreview,
    setImagePreview,
  };
};

export default useAdmin;
