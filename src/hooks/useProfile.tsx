import { DEV_API } from '../lib/utils/api-url';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';

interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<IUser | null>(null);

  const { user } = useAppContext();

  const getUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${DEV_API}/auth/get-user/${user}`);
      setUserDetails(res.data.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getUser,
    isLoading,
    userDetails,
  };
};

export default useProfile;
