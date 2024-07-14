import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";

const useGetTravelJourneyDetails = () => {
  const [travelJourneyDetails, setTravelJourneyDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTravelJourneyDetails = async (vehicleRouteDestinationId, security, callback) => {
    // console.log('UseGetTravelJourneyDetails hook called!');
    setLoading(true);
    try {
      const response = await API.getTravelJourneyDetails(
        vehicleRouteDestinationId,
        security
      );
      const statusCode = response[0];
      const res = response[1];
      const status = response[2];

      if (status) {
        setTravelJourneyDetails(res.data);
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

  return { travelJourneyDetails, loading, fetchTravelJourneyDetails };
};

export default useGetTravelJourneyDetails;
