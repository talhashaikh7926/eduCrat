import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useRouter } from 'next/navigation'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createSocial } from "@/app/redux/slices/socialSlice"; // Adjust the path as per your project structure
import { fetchProfile } from '@/app/redux/slices/getProfileSlice';

export default function SocialProfiles({ activeTab }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.userProfile);
  const router = useRouter();
  const [formData, setFormData] = useState({
    twitter: "",
    facebook: "",
    instagram: "",
    linkedin: ""
  });


  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  useEffect(() => {
    if (profile && profile.profile) {
      console.log(profile);
      const userData = profile.profile.socialLinks;
      setFormData({ 
        twitter: userData?.twitter ||"",
        facebook: userData?.facebook ||"",
        instagram: userData?.instagram ||"",
        linkedin: userData?.linkedin ||""
        
      });
    }
  }, [profile]);


  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(createSocial(formData));
    toast.success("Social Handles update Successfully")
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
      className={`tabs__pane -tab-item-3 ${activeTab == 3 ? "is-active" : ""} `}
    >
      <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
        <div className="col-md-6">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            Twitter
          </label>

          <input
            required
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            placeholder="Twitter Profile"
          />
        </div>

        <div className="col-md-6">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            Facebook
          </label>

          <input
            required
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            placeholder="Facebook Profile"
          />
        </div>

        <div className="col-md-6">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            Instagram
          </label>

          <input
            required
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="Instagram Profile"
          />
        </div>

        <div className="col-md-6">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            LinkedIn Profile URL
          </label>

          <input
            required
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn Profile"
          />
        </div>

        <div className="col-12">
          <button className="button -md -purple-1 text-white">
            Save Social Profile
          </button>
        </div>
      </form>
    </div>
  );
}
