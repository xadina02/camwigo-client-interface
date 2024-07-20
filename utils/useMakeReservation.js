import { useState } from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";

const useMakeReservation = () => {
  const [reservation, setReservation] = useState(null);
  const [loading1, setLoading] = useState(false);

  const makeReservation = async (token, vehicleRouteDestinationId, security, data, callback) => {
    setLoading(true);
    try {
      const response = await API.makeReservation(token, vehicleRouteDestinationId, data, security);
      const statusCode = response[0];
      const res = response[1];
      const status = response[2];

      if (status) {
        setReservation(res.data);
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

  return { reservation, loading1, makeReservation };
};

export default useMakeReservation;
