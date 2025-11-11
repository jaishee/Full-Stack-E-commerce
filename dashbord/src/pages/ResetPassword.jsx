import React from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validatePassword } from '../../helpers/passwordValidation';

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const data = await axios.post(
        `http://localhost:8000/api/v1/authentication/resetpassword`,
        { token: params.token, newpassword: values.password }
      );

      if (data.data.success === "Reset Password") {
        toast.success("Password reset successful!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error("Invalid or expired link!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <ToastContainer autoClose={2000} theme="light" />
      <Form
        name="reset-password"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="New Password"
          name="password"
          rules={[
            { required: true, message: 'Please enter your new password!' },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                const error = validatePassword(value);
                if (error) return Promise.reject(error);
                return Promise.resolve();
              }
            }
          ]}
        >
          <Input type='password' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
