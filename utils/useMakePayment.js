import { useState } from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";

const useMakePayment = () => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);

  const makePayment = async (reservationId, security, data, callback) => {
    setLoading(true);
    try {
      const response = await API.makePayment(reservationId, data, security);
      const statusCode = response[0];
      const res = response[1];
      const status = response[2];

      if (status) {
        setPayment(res.data);
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

  return { payment, loading, makePayment };
};

export default useMakePayment;
