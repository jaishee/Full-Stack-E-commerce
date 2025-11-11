import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../App.css";

const OTP = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // loader state

  useEffect(() => {
  const verifyEmail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/authentication/verify-email/${token}`
      );

      console.log(data); // check the response structure

      if (data.message === "Email verified successfully!") {
        toast.success("Email Verification Successful!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error("Verification Unsuccessful!");
      }

    } catch {
      toast.error("Server Error. Try again!");
    } finally {
      setLoading(false);
    }
  };

  verifyEmail();
}, [token, navigate]);

  return (
    <div className="otp-container">
      <ToastContainer autoClose={2000} theme="light" />
      {loading 
      ?
        <div className="spinner"></div>
      :
        <div className="spinner"></div>
      }
    </div>
  );
};

export default OTP;
