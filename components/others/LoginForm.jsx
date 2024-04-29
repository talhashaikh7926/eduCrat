"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { loginUser } from "@/app/redux/slices/authSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const { usernameOrEmail, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
   
      const responseData = await dispatch(loginUser(formData));
     
      
      if(responseData?.payload.status){
        const payloadString = JSON.stringify(responseData?.payload);
         console.log(responseData,"asda");
        localStorage.setItem("userPayload", payloadString);
        toast.success("Login Successful")
        router.push("/home-10");
      }
     else{
      toast.error("Invalid Login")
      
     }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure
    }
  };

  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-6 col-lg-8">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13"style={{ color: "#333" }}>Login</h3>
              <p className="mt-10" >
                Don't have an account yet?
                <Link href="/signup" className="text-purple-1">
                  Sign up for free
                </Link>
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-12"  >
                  <label htmlFor="usernameOrEmail" className="text-16 lh-1 fw-500 -1 mb-10" style={{ color: "#333" }}>
                    Username Or Email
                  </label>
                  <input
                    required
                    type="text"
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                    placeholder="Username or Email"
                    value={usernameOrEmail}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="password" className="text-16 lh-1 fw-500 -1 mb-10" style={{ color: "#333" }}>
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    Login
                  </button>
                </div>
              </form>

              <div className="lh-12 text-dark-1 fw-500 text-center mt-20">
                Or sign in using
              </div>

              <div className="d-flex x-gap-20 items-center justify-between pt-20">
                <div>
                  <button className="button -sm px-24 py-20 -outline-blue-3 text-blue-3 text-14">
                    Log In via Facebook
                  </button>
                </div>
                <div>
                  <button className="button -sm px-24 py-20 -outline-red-3 text-red-3 text-14">
                    Log In via Google+
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
