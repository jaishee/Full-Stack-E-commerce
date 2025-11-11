import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/v1/authentication/forgetpassword',
        { email: values.email }
      );

      if (data.success === "Check your email!") {
        toast.warn("Please check your email!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error("Credential Invalid!");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900 font-poppins px-4">
      <ToastContainer autoClose={2000} theme="light" />
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-semibold text-blue-900 mb-6">
          Forget Password
        </h2>
        <Form
          name="forget-password"
          layout="vertical"
          onFinish={onFinish}
          className="space-y-5"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input className="rounded-lg focus:ring-2 focus:ring-blue-900" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-full bg-blue-900 hover:bg-white hover:text-blue-900 hover:border hover:border-blue-900 transition"
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
