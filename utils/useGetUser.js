import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";
import useUserStore from '../zustand/useUserStore';

const useGetUser = () => {
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore(state => state.setUser);

    const fetchUser = async (data, security, callback) => {
      setLoading(true);
      try {
        const response = await API.registerUser(data, security);
        const statusCode = response[0];
        const res = response[1];
        const status = response[2];

        if (status) {
          setUser(res.data);
          if (callback) {
            callback(res.data);
          }
        } else if (statusCode === 404) {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

  return { loading, fetchUser };
};

export default useGetUser;
