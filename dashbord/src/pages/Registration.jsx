import React from 'react'
import { Button, Form, Input, Flex, Checkbox } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css"; 
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
    let navigate = useNavigate()
    const onFinish = async (values) => {
    try {
      let data = await axios.post(
        "http://localhost:8000/api/v1/authentication/registration",
        {
          username: values.username,
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            Authorization: "hgfhgfdhgfdhvjgfgh",
          },
        }
      );

      if (data.data.error) {
        toast.error("Email Already Exist!!!");
      } else {
        toast.warn("Please verify your email");
        // setTimeout(()=>{
        //     navigate(`/otp/${values.email}`)
        // },3000)
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="container">
      <ToastContainer autoClose={2000} theme="light" />

      <div className="card">
        <h2 className="form-title">Create an Account</h2>

        <Form name="basic" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            
            <Input size="large" className="input-field" placeholder="Enter your username" />

          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input size="large" className="input-field" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input type='password' size="large" className="input-field" placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block className="registration-btn">
              Register
            </Button>
          </Form.Item>
          <Link to={'/forgetpassword'}><p className='cursor-pointer ml-25'>Forget Password?</p></Link>
        </Form>
      </div>
    </div>
  )
}

export default Registration