import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "@/app/redux/slices/changePasswordSlice";
import { useRouter } from 'next/navigation'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Password({ activeTab }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
     
      toast.error("Passwords do not match")
      return;
    }
    dispatch(changePassword(formData));
    toast.success("Passwords changed Successful")
    router.push("/home-10");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div
      className={`tabs__pane -tab-item-2 ${activeTab == 2 ? "is-active" : ""} `}
    >
      <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            Current password
          </label>

          <input
            required
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Current password"
          />
        </div>

        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            New password
          </label>

          <input
            required
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New password"
          />
        </div>

        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            Confirm New Password
          </label>

          <input
            required
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm New Password"
          />
        </div>

        <div className="col-12">
          <button className="button -md -purple-1 text-white">
            Save Password
          </button>
        </div>
      </form>
    </div>
  );
}
