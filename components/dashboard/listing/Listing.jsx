"use client"
import React, { useState } from "react";
import ModalVideoComponent from "@/components/common/ModalVideo";
import FooterNine from "../../layout/footers/FooterNine";
import { useDispatch } from "react-redux";
import { mediaUpload } from "@/data/dashboard";
import Media from "./Media";
import Image from "next/image";
import Curriculum from "./Curriculum";
import { useRouter } from 'next/navigation';
import { createCourse } from "@/app/redux/slices/courseSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Listing() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState(mediaUpload[0].imgSrc);
  const [previewVideo, setPreviewVideo] = useState(mediaUpload[1].imgSrc);
  const [currentOpenItem, setCurrentOpenItem] = useState();
  const [videoUrls, setVideoUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [showAddArticleModal, setShowAddArticleModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const storedPayloadString = localStorage.getItem("userPayload");

  const storedPayload = JSON.parse(storedPayloadString);
  const user = storedPayload?.role;
  const userId = storedPayload?.id;
  const [articleData, setArticleData] = useState({
    description: "",
    videoUrl: "",
  });
  const [curriculum, setCurriculum] = useState([
    // {
    //   id: 1,
    //   title: "Introduction to JavaScript",
    //   items: [
    //     { id: 1, title: "Introduction" },
    //     { id: 2, title: "Installing Development Software" },
    //     { id: 3, title: "Hello World Project from GitHub" },
    //   ],
    // },
    // {
    //   id: 2,
    //   title: "Introduction to JavaScript",
    //   items: [
    //     { id: 1, title: "Introduction" },
    //     { id: 2, title: "Installing Development Software" },
    //     { id: 3, title: "Hello World Project from GitHub" },
    //   ],
    // },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    courseDescription: "",
    learn: "",
    requirements: "",
    level: "",
    audioLanguage: "",
    closeCaption: "",
    category: "",
    price: "",
    thumbnail: "",
    videoUrl: "",
    videoUrl2: "",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file)
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);

      // Update formData with selected file name
      setFormData({ ...formData });
    }
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile2(file)
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewVideo(reader.result);
      };

      reader.readAsDataURL(file);

      // Update formData with selected file name
      setFormData({ ...formData });
    }
  };

  const addArticle = () => {
    const updatedCurriculum = curriculum.length > 0 ? [...curriculum] : [];

    if (updatedCurriculum.length > 0) {
      updatedCurriculum.push({
        id: updatedCurriculum[0].items.length + 1,
        title: articleData.mainHeading,
        items: [
          {
            id: updatedCurriculum[0].items.length + 1,
            title: articleData.subHeading,
            description: articleData.description,
            video: articleData.videoUrl
          },
        ]
      });

    } else {
      updatedCurriculum.push({
        id: 1,
        title: articleData.mainHeading,
        items: [
          {
            id: 1,
            title: articleData.subHeading,
            description: articleData.description,
            video: articleData.videoUrl
          },
        ],
      });
    }

    setCurriculum(updatedCurriculum);
    setShowAddArticleModal(false);
    setArticleData({ mainHeading: "", subHeading: "", description: "", videoUrl: "" });

    // Filter out empty sections and items
    const filteredCurriculum = updatedCurriculum.filter(section => section.title !== "" && section.items.length > 0);

    // Update formData with new curriculum data
    const formattedCurriculum = filteredCurriculum.map(section => ({
      title: section.title,
      items: section.items.map(item => ({
        article: item.title,
        videoUrl: item.video
      }))
    }));

    setFormData({ ...formData, curriculum: JSON.stringify(formattedCurriculum) });

    return formattedCurriculum; // Return the formatted curriculum
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if file is selected
    if (!selectedFile) {
      toast.error('Please select a course thumbnail!');
      return;
    }

    // Get formatted curriculum
    const formattedCurriculum = addArticle();

    // Create FormData object
    const formDataToSend = new FormData();

    const price = parseFloat(formData.price);
    if (isNaN(price)) {
      toast.error('Invalid Price');
      return;
      
    }
    // Append course data to FormData object
    formDataToSend.append('title', formData.title);
    formDataToSend.append('shortDescription', formData.shortDescription);
    formDataToSend.append('courseDescription', formData.courseDescription);
    formDataToSend.append('whatWillStudentLearn', formData.learn);
    formDataToSend.append('requirements', formData.requirements);
    formDataToSend.append('level', formData.level);
    formDataToSend.append('audioLanguage', formData.audioLanguage);
    formDataToSend.append('closeCaption', formData.closeCaption);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('price', price);
    formDataToSend.append('teacher', userId);

    // Append curriculum data to FormData object
    formDataToSend.append('curriculum', JSON.stringify(formattedCurriculum));

    // Append course thumbnail file to FormData object
    formDataToSend.append('courseThumbnail', selectedFile);

    // Append video thumbnail data to FormData object
    formDataToSend.append('thumbnailUrl', selectedFile2);
    formDataToSend.append('videoUrl', formData.videoUrl2);

    // Dispatch action to create course
    dispatch(createCourse(formDataToSend))
      .then(() => {
        toast.success('Course created successfully!');
        router.push("/courses-list-1");
      })
      .catch((error) => {
        console.error('Error creating course:', error);
        toast.error('Failed to create course. Please try again.');
      });
  };

  const handleChange = (e) => {
    setArticleData({ ...articleData, [e.target.name]: e.target.value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };




  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Create New Course</h1>
            <div className="mt-10">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
          </div>
        </div>

        <div className="row y-gap-60">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Basic Information</h2>
              </div>

              <div className="py-30 px-30">
                <form
                  onSubmit={handleSubmit}
                  className="contact-form row y-gap-30"
                  action="#"
                >
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Course Title*
                    </label>

                    <input
                      required
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Learn Figma - UI/UX Design Essential Training"
                    />

                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Short Description*
                    </label>

                    <textarea
                      required
                      type="text"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleChange}
                      placeholder="Short Description"
                      rows="7"
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Course Description*
                    </label>

                    <textarea
                      required
                      type="text"
                      name="courseDescription"
                      value={formData.courseDescription}
                      onChange={handleChange}
                      placeholder="Course Description"
                      rows="7"
                    ></textarea>
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      What will students learn in your course?*
                    </label>

                    <textarea
                      required
                      type="text"
                      name="learn"
                      value={formData.learn}
                      onChange={handleChange}
                      placeholder="Description"
                      rows="7"
                    ></textarea>
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Requirements*
                    </label>

                    <textarea
                      required
                      type="text"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      placeholder="Requirements"
                      rows="7"
                    ></textarea>
                  </div>
                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Course Level*
                    </label>
                    <select
                      required
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                    >
                      <option value="">Select Level</option>
                      <option value="Basic">Basic</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Audio Language*
                    </label>
                    <select
                      required
                      name="audioLanguage"
                      value={formData.audioLanguage}
                      onChange={handleChange}
                    >
                      <option value="">Select Language</option>
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Close Caption*
                    </label>

                    <input
                      required
                      type="text"
                      name="closeCaption"
                      value={formData.closeCaption}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Course Category*
                    </label>
                    <select
                      required
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>
                      <option value="Art">Art</option>
                      <option value="Animation">Animation</option>
                      <option value="Design">Design</option>
                      <option value="Photography">Photography</option>
                      <option value="Programming">Programming</option>
                      <option value="Writing">Writing</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Price*
                    </label>
                    <input
                      required
                      type="text"
                      pattern="^\d+(\.\d{1,2})?$" 
                      title="Please enter a valid price (e.g., 9.99)"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                    />
                  </div>

                </form>

                <div className="row y-gap-20 justify-between pt-15">



                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Curriculum</h2>
              </div>


              <div className="py-30 px-30">
                {curriculum.map((section, i) => (
                  <div key={i} className={`row ${i !== 0 ? "pt-30" : ""}`}>
                    <div className="col-12">
                      <h4 className="text-16 lh-1 fw-500">{section.title}</h4>
                    </div>
                    <div className="col-12">
                      <div className="accordion -block-2 text-left js-accordion">
                        {section.items.map((item, index) => (
                          <div
                            key={index}
                            className={`accordion__item -dark-bg-dark-1 mt-10 ${currentOpenItem === `${i},${index}` ? "is-active" : ""
                              }`}
                          >
                            <div
                              className="accordion__button py-20 px-30 bg-light-4"
                              onClick={() =>
                                setCurrentOpenItem((prev) =>
                                  prev === `${i},${index}` ? "" : `${i},${index}`
                                )
                              }
                            >
                              <div className="d-flex items-center">
                                <div className="icon icon-drag mr-10"></div>
                                <span className="text-16 lh-14 fw-500 text-dark-1">
                                  {item.title}
                                </span>
                              </div>
                              <div className="d-flex x-gap-10 items-center">
                                {/* <a href="#" className="icon icon-edit mr-5"></a>
                                <a href="#" className="icon icon-bin"></a> */}
                                <div className="accordion__icon mr-0">
                                  <div className="d-flex items-center justify-center icon icon-chevron-down"></div>
                                  <div className="d-flex items-center justify-center icon icon-chevron-up"></div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="accordion__content"
                              style={{
                                maxHeight: currentOpenItem === `${i},${index}` ? "100px" : 0,
                                overflow: "hidden",
                                transition: "max-height 0.3s ease",
                              }}
                            >
                              <div className="accordion__content__inner px-30 py-30">
                                <div className="d-flex">
                                  <div className="d-flex justify-center items-center size-30 rounded-full bg-purple-3 mr-10">
                                    <div className="icon-play text-9"></div>
                                  </div>
                                  <div className="">
                                    <div><span>{item.description}  <div className="d-flex x-gap-20 items-center pt-5">
                                      <span
                                        onClick={() => preview(item.video)}
                                        className="text-14 lh-1 text-purple-1 underline cursor"
                                      >
                                        Preview
                                      </span>

                                    </div></span></div>

                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>


              <button
                className="button -md -purple-1 text-white"
                onClick={() => setShowAddArticleModal(true)}
              >
                Add Article
              </button>


            </div>
          </div>



          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Media</h2>
              </div>

              <div className="py-30 px-30">
                <div className="row y-gap-50">
                  <div className="col-12">
                    <form onSubmit={handleSubmit} className="contact-form d-flex lg:flex-column">
                      <div
                        className="relative shrink-0"
                        style={
                          previewImage
                            ? {}
                            : { backgroundColor: "#f2f3f4", width: 250, height: 200 }
                        }
                      >
                        {previewImage && (
                          <Image
                            width={735}
                            height={612}
                            className="w-1/1"
                            style={{
                              width: "250px",
                              height: "200px",
                              objectFit: "contain",
                            }}
                            src={previewImage}
                            alt="image"
                          />
                        )}

                        <div className="absolute-full-center d-flex justify-end py-20 px-20">
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              document.getElementById("imageUpload1").value = "";
                              setPreviewImage("");
                            }}
                            className="d-flex justify-center items-center bg-white size-40 rounded-8 shadow-1"
                          >
                            <i className="icon-bin text-16"></i>
                          </span>
                        </div>
                      </div>

                      <div className="w-1/1 ml-30 lg:ml-0 lg:mt-20">
                        <div className="form-upload col-12">
                          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Course thumbnail*</label>
                          <div className="form-upload__wrap">
                            <input
                              required
                              type="text"
                              value={selectedFile?.name} // Display selected file name
                              placeholder={"Cover-1.png"}
                              readOnly // Make the input field read-only
                            />
                            <button className="button -dark-3 text-white">
                              <label style={{ cursor: "pointer" }} htmlFor="imageUpload1">
                                Upload Files
                              </label>
                              <input required id="imageUpload1" type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                            </button>
                          </div>
                        </div>

                        <p className="mt-10">
                          Upload your course image here. It must meet our course image quality standards to be accepted. Important guidelines: 750x440 pixels; .jpg, .jpeg,. gif, or .png. no text on the image.
                        </p>
                      </div>
                    </form>
                  </div>
                  <div className="col-12">
                    <form onSubmit={handleSubmit} className="contact-form d-flex lg:flex-column">
                      <div
                        className="relative shrink-0"
                        style={
                          previewVideo
                            ? {}
                            : { backgroundColor: "#f2f3f4", width: 250, height: 200 }
                        }
                      >
                        {previewVideo && (
                          <Image
                            width={735}
                            height={612}
                            className="w-1/1"
                            style={{
                              width: "250px",
                              height: "200px",
                              objectFit: "contain",
                            }}
                            src={previewVideo}
                            alt="image"
                          />
                        )}

                        <div className="absolute-full-center d-flex justify-end py-20 px-20">
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              document.getElementById("imageUpload2").value = "";
                              setPreviewVideo("");
                            }}
                            className="d-flex justify-center items-center bg-white size-40 rounded-8 shadow-1"
                          >
                            <i className="icon-bin text-16"></i>
                          </span>
                        </div>
                      </div>
                      <div className="w-1/1 ml-30 lg:ml-0 lg:mt-20">
                        <div className="form-upload col-12">
                          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Video URL*</label>
                          <div className="form-upload__wrap">
                            <input required type="text" name="videoUrl2" value={formData.videoUrl2} onChange={handleChange} placeholder={"Video-1.mp3"} />
                            <button className="button -dark-3 text-white">
                              <label
                                style={{ cursor: "pointer" }}
                                htmlFor="imageUpload2"
                              >
                                Upload Files
                              </label>
                              <input
                                required
                                id="imageUpload2"
                                type="file"
                                accept="image/*"
                                onChange={handleVideoChange}
                                style={{ display: "none" }}
                              />
                            </button>

                          </div>
                        </div>

                        <p className="mt-10">
                          Enter a valid video URL. Students who watch a well-made promo video are 5X more likely to enroll in your course.
                        </p>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="row y-gap-20 justify-between pt-30">
                  <div className="col-auto">

                  </div>

                  <div className="col-auto">
                    <button className="button -md -purple-1 text-white" onClick={handleSubmit}>Create</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddArticleModal && (
        <div className="modal">
          <div className="modal__content">
            <span className="modal__close" onClick={() => setShowAddArticleModal(false)}>
              &times;
            </span>
            <h2>Add Article</h2>
            <form className="modal__form" onSubmit={addArticle}>
              <div>
                <label>Main Heading</label>
                <input
                  type="text"
                  name="mainHeading"
                  value={articleData.mainHeading}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Sub Heading</label>
                <input
                  type="text"
                  name="subHeading"
                  value={articleData.subHeading}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Description</label>
                <textarea
                  name="description"
                  value={articleData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div>
                <label>Video URL</label>
                <input
                  type="text"
                  name="videoUrl"
                  value={articleData.videoUrl}
                  onChange={handleChange}
                  placeholder="www."
                  required
                  pattern="https?://.+"
                />
              </div>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      )}

      <ModalVideoComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        videoId={videoUrls}
      />

      <FooterNine />

      {/* CSS Styles */}
      <style jsx>{`
  .modal {
    display: flex;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
  }

  .modal__content {
    background-color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    width: 90%; /* Increase modal width */
    max-width: 600px; /* Set maximum modal width */
    max-height: 90%; /* Set maximum modal height */
    overflow-y: auto; /* Enable vertical scrolling if content exceeds height */
    scrollbar-width: thin; /* Thin scrollbar on Firefox */
    scrollbar-color: rgba(0, 0, 0, 0.2) #f9f9f9; /* Scrollbar color */
  }

  .modal__content::-webkit-scrollbar {
    width: 10px; /* Width of Chrome, Safari, and Opera scrollbar */
  }

  .modal__content::-webkit-scrollbar-track {
    background: #f9f9f9; /* Color of scrollbar track */
  }

  .modal__content::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); /* Color of scrollbar thumb */
    border-radius: 5px; /* Roundness of scrollbar thumb */
    border: 2px solid #f9f9f9; /* Border around scrollbar thumb */
  }

  .modal__close {
    color: #aaa;
    float: right;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
  }

  .modal__close:hover,
  .modal__close:focus {
    color: #000;
    text-decoration: none;
  }

  .modal__form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .modal__form label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .modal__form input,
  .modal__form textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    width: 100%;
  }

  .modal__form textarea {
    height: 100px;
    resize: vertical;
  }

  .modal__form button {
    background-color: #6440FB;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
  }

  .modal__form button:hover {
    background-color: #6440FB;
  }
`}</style>




    </div>
  );
}
