import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const OTP = () => {
  const params = useParams();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await axios.post("http://localhost:3000/api/v1/authentication/otp", {
        email: params.email,
        otp: values.otp,
      });
      toast.success("OTP Verified Successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("Invalid OTP or server error!");
    }
  };

  return (
    <div className="otp-container">
      <ToastContainer autoClose={2000} theme="light" />
      <h2 className="otp-title">Enter OTP</h2>
      <Form
        name="otpForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        style={{ width: "300px" }}
      >
        <Form.Item
          label="OTP"
          name="otp"
          rules={[{ required: true, message: "Please enter OTP" }]}
        >
          <Input size="large" placeholder="Enter OTP here" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className="submit-btn">
            Verify
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OTP;
