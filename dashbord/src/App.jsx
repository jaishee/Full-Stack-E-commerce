import React from 'react'
import {createRoutesFromElements,createBrowserRouter,Route,RouterProvider,} from "react-router-dom";
import Registration from './pages/Registration';
import OTP from './pages/OTP';
import Login from './pages/login';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Registration />}></Route>
    <Route path="/verify-email/:token" element={<OTP />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
    <Route path="/resetpassword/:email" element={<ResetPassword />}></Route>
    </>
  )
);


const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App