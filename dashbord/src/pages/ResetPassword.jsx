import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios'
import {useParams,useNavigate} from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';

const ResetPassword = () => {

    let params = useParams()
    const navigate = useNavigate()

    const onFinish = async values => {
        let data = await axios.post(`http://localhost:8000/api/v1/authentication/resetpassword`,{
            email:params.email,
            newpassword:values.password
        })

        console.log(data)

        if(data.data.success === "Reset Password"){
            toast.success("Password reset successfull!")
            setTimeout(() => navigate("/login"), 2000);
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
        label="New Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your new password!' }]}
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

export default ResetPassword