import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const OTP = () => {
  const { token } = useParams(); // JWT token from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyEmail() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/authentication/verify-email/${token}`
        );

        const result = await response.text(); // or response.json() if backend returns JSON

        if (result === "Email verified successfully!") {
          toast.success("Email Verification Successful!");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          toast.error("Verification Unsuccessful!");
        }
      } catch (err) {
        toast.error("Server Error. Try again!");
      } finally {
        setLoading(false); // Stop loader
      }
    }

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="otp-container">
      <ToastContainer autoClose={2000} theme="light" />
      {loading ?
        <div className="loader"></div>
        :
        // Show while verifying : 
        <div className="loader"></div>
      }
    </div>
  );
};

export default OTP;
