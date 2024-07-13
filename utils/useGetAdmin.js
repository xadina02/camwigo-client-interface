import React from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";
import { useUserStore } from "@/zustand/Admin";
import { useAdminsStore } from "@/zustand/Admin";

const useGetAdmins = () => {
  const { user } = useUserStore();
  const { setAdmins, addAdmin } = useAdminsStore();

  const getAdmins = async () => {
    try {
      const response = await API.getAllAdmins(user?.accessToken);
      const statusCode = response[0];
      const res = await response[1];
      const status = response[2];

      if (status) {
        const data = res.data;
        const admins = data.map((item) => {
          return {
            id: item.admin.id,
            email: item.admin.email,
          };
        });

        setAdmins(admins);
        console.log("admins", admins, data);
        toast.success(res.message);
      } else {
        const message =
          statusCode === 500
            ? "Oops! Something went wrong on our end. Please try again later."
            : res.message;
        toast.error(message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addNewAdmin = async (values) => {
    try {
      const response = await API.createAdmin(values, user?.accessToken);
      console.log("response", response);
      const statusCode = response[0];
      const res = await response[1];
      const status = response[2];

      if (status) {
        const user = res.data.admin;
        const admin = {
          id: user.id,
          email: user.email,
        };
        addAdmin(admin);
        toast.success(res.message);

        console.log("new admins", values);
      } else {
        const message =
          statusCode === 500
            ? "Oops! Something went wrong on our end. Please try again later."
            : res.message;
        toast.error(message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
    getAdmins,
    addNewAdmin,
  };
};

export default useGetAdmins;
