import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = ({ position = "top-center" }) => {
  return (
    <ToastContainer
      position={position}
      className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 max-w-xs w-full "
      toastClassName="flex items-center justify-between w-full p-1 text-sm font-small text-black rounded-lg shadow-md"
      bodyClassName="text-sm text-black"
      style={{ maxWidth: "25rem", width: "100%" }}
    />
  );
};
export const notifySuccess = (message) => {
  toast.success(message);
};

export const notifyError = (message) => {
  toast.error(message);
};

export default Notification;