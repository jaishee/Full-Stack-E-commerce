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
      const response = await axios
        .get(`http://localhost:8000/api/v1/authentication/verify-email/${token}`)
        .catch(() => ({ data: "Server Error" })); // handle error without try/catch

      if (response.data === "Email verified successfully!") {
        toast.success("Email Verification Successful!");
        setTimeout(() => navigate("/login"), 2000);
      } else if (response.data === "Server Error") {
        toast.error("Server Error. Try again!");
      } else {
        toast.error("Verification Unsuccessful!");
      }

      setLoading(false); // stop loader
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
