import { useDispatch, useSelector  } from 'react-redux';
import { useState,useEffect } from 'react';
import { createProfile } from '@/app/redux/slices/profileSlice';
import { fetchProfile } from '@/app/redux/slices/getProfileSlice';
import { useRouter } from 'next/navigation'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function EditProfile({ activeTab }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const profile = useSelector(state => state.userProfile);
  const [previewImage, setPreviewImage] = useState("/assets/img/dashboard/edit/1.png");
  const [File, setFile] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    birthday: '',
    address1: '',
    address2: '',
    state: '',
    country: '',
    personalInfo: ''
  });
  
  useEffect(() => {
    dispatch(fetchProfile());
    
  }, []);

  useEffect(() => {
    if (profile && profile.profile) {
      console.log(profile.profile);
      const userData = profile.profile;
      setPreviewImage(userData?.profilePictureUrl)
      setFormData({ 
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phone: userData.phone || '',
        birthday: userData.birthday || '',
        address1: userData.address1 || '',
        address2: userData.address2 || '',
        state: userData.state || '',
        country: userData.country || '',
        personalInfo: userData.personalInfo || ''
      });
    }
  }, [profile]);


  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({
        ...formData,
      });
      setFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = new FormData();  
    dataToSend.append('file', File); // Include the file object
    // Append other form data fields to the FormData object
    for (let key in formData) {
      console.log(key, formData[key]);
      dataToSend.append(key, formData[key]);
    }
    // Dispatch action to update profile
    dispatch(createProfile(dataToSend));
    toast.success('Profile updated successfully!');
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
    <div className={`tabs__pane -tab-item-1 ${activeTab == 1 ? "is-active" : ""}`}>
      <div className="row y-gap-20 x-gap-20 items-center">
        <label className="col-auto" htmlFor="imageUpload" style={previewImage ? {} : { backgroundColor: "#f2f3f4", width: 100, height: 100 }}>
          {previewImage ? (
            <img width={100} height={100} className="size-100" src={previewImage} alt="image" />
          ):<img width={100} height={100} className="size-100" src={"/assets/img/dashboard/edit/1.png"} alt="image" />}
        </label>
        <div className="col-auto">
          <div className="text-16 fw-500 text-dark-1">Your avatar</div>
          <div className="text-14 lh-1 mt-10">PNG or JPG no bigger than 800px wide and tall.</div>
          <div className="d-flex x-gap-10 y-gap-10 flex-wrap pt-15">
            <div>
              <div className="d-flex justify-center items-center size-40 rounded-8 bg-light-3">
                <label style={{ cursor: "pointer" }} htmlFor="imageUpload1" className="icon-cloud text-16"></label>
                <input required id="imageUpload1" type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
              </div>
            </div>
            <div>
              <div style={{ cursor: "pointer" }} onClick={() => { document.getElementById("imageUpload1").value = ""; setPreviewImage(""); }} className="d-flex justify-center items-center size-40 rounded-8 bg-light-3">
                <div className="icon-bin text-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-top-light pt-30 mt-30">
        <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">First Name</label>
            <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
          </div>
          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Last Name</label>
            <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
          </div>
          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Phone</label>
            <input required type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
          </div>
          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Birthday</label>
            <input required type="text" name="birthday" value={formData.birthday} onChange={handleChange} placeholder="Birthday" />
          </div>
          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Address Line 1</label>
            <input required type="text" name="address1" value={formData.address1} onChange={handleChange} placeholder="Address Line 1" />
          </div>
          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Address Line 2</label>
            <input required type="text" name="address2" value={formData.address2} onChange={handleChange} placeholder="Address Line 2" />
          </div>
          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">State</label>
            <input required type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
          </div>
          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Country</label>
            <input required type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
          </div>
          <div className="col-12">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Personal info</label>
            <textarea required name="personalInfo" value={formData.personalInfo} onChange={handleChange} placeholder="Text..." rows="7"></textarea>
          </div>
          <div className="col-12">
            <button type="submit" className="button -md -purple-1 text-white">Update Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
}
