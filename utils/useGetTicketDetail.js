import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";

const useGetTicketDetails = () => {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [loading, setLoading] = useState(false);

    const fetchTicketDetails = async (token, tokenId, security, callback) => {
      setLoading(true);
      try {
        const response = await API.getTicket(token, tokenId, security);
        const statusCode = response[0];
        const res = response[1];
        const status = response[2];

        if (status) {
          setTicketDetails(res.data);
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

  return { ticketDetails, loading, fetchTicketDetails };
};

export default useGetTicketDetails;
