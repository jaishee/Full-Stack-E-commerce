import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ForgetPassword = () => {

    const onFinish = async values => {
        let data = await axios.post(`http://localhost:8000/api/v1/authentication/forgetpassword`,{
            email:values.email
        })

        console.log(data)

        if(data.data.success === "Check your email!"){
            toast.warn("Please check your email!")
        }else{
            toast.error("Credential Invalid!")
        }
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

  return (
    <div>
        <ToastContainer autoClose={2000} theme="light" />
    <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please enter your email' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item label={null}>
        <Button type="primary" className='ml-50' htmlType="submit">
            Send
        </Button>
        </Form.Item>
    </Form>
    </div>
  )
}

export default ForgetPassword