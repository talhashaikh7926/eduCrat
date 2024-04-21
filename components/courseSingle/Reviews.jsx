import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { respondReviews, submitReview } from "@/app/redux/slices/reviewSubmitSlice";
import { fetchReviews } from "@/app/redux/slices/reviewSlice";
import Star from "../common/Star";
import ReactStars from "react-stars";
import { toast } from 'react-toastify';


export default function Reviews({ courseId }) {
  const dispatch = useDispatch();
  const { fetching, reviews, error } = useSelector((state) => state.allReviews);
  const [review, setReview] = useState({ title: "", comment: "", courseIds: "", rating: 1 });
  const storedPayloadString = localStorage.getItem("userPayload");

  const storedPayload = JSON.parse(storedPayloadString);
  const user = storedPayload?.role;
  const userId = storedPayload?.id;

  useEffect(() => {
    if (courseId) {
      dispatch(fetchReviews(courseId));
      setReview({ ...review, courseIds: courseId })
    }
  }, [dispatch, courseId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(submitReview(review))
      .unwrap()
      .then(() => {
        toast.success("Registration successful")
        dispatch(fetchReviews(courseId));
        setReview({ title: "", comment: "", course: "" });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleStarHover = (selectedStar) => {
    setReview({ ...review, rating: selectedStar });
  };

  const calculateCourseRating = () => {
    if (reviews?.length === 0) return 0;
    const totalRating = reviews?.reduce((acc, curr) => acc + curr.rating, 0);
    return totalRating / reviews?.length;
  };
  return (
    <div id="reviews" className="pt-60 lg:pt-40">
      <div className="blogPost -comments">
        <div className="blogPost__content">
          <h2 className="text-20 fw-500">Student feedback</h2>
          <div className="row x-gap-10 y-gap-10 pt-30">
            <div className="col-md-4">
              <div className="d-flex items-center justify-center flex-column py-50 text-center bg-light-6 rounded-8">
                <div className="text-60 lh-11 text-dark-1 fw-500">{calculateCourseRating().toFixed(1)}</div>
                <div className="d-flex x-gap-5 mt-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={calculateCourseRating()}
                    edit={false}
                    color2={'#ffd700'}  // Optional: Customize star color
                  />
                </div>
                <div className="mt-10">Course Rating</div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="py-20 px-30 bg-light-6 rounded-8">
                <div className="row y-gap-15">
                  {reviews?.map((review, index) => (
                    <div key={index} className="col-12">
                      <div className="d-flex items-center">
                        <div className="progress-bar w-1/2 mr-15">
                          <div className="progress-bar__bg bg-light-12"></div>
                          <div className="progress-bar__bar bg-purple-1" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                        </div>
                        <div className="d-flex x-gap-5 pr-15" style={{ flex: "none" }}>
                          <ReactStars
                            count={5}
                            size={20}
                            value={review?.rating}
                            edit={false}
                            color2={'#ffd700'}  // Optional: Customize star color
                          />
                        </div>
                        <div className="text-dark-1">{((review?.rating / 5) * 100).toFixed(0)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>








          <div className="comments__list mt-30">
            {fetching ? (
              <p>Loading reviews...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : reviews.length === 0 ? (
              <p>No reviews available</p>
            ) : (
              reviews.map((review, index) => (
                <li key={index} className="comments__item">
                  <div className="comments__item-inner md:direction-column">
                    <div
                      className="bg-image rounded-full js-lazy"
                      style={{
                        backgroundImage: `url(${review?.profilePictureUrl})`,
                        width: "100px",
                        height: "100px",
                        backgroundSize: "cover",
                      }}
                    ></div>

                    <div className="comments__body md:mt-15">
                      <div className="comments__header">
                        <h4 className="text-17 fw-500 lh-15">
                          {review?.studentFirstName + " " + review?.studentLastName}
                          <span className="text-13 text-light-1 fw-400">
                            {"  "}{review?.reviewDate && new Date(review.reviewDate).toLocaleString()}
                          </span>
                        </h4>

                        {/* Assuming you have a 'rating' field */}
                        {<div className="stars">
                          <ReactStars
                            count={5}
                            size={24}
                            value={review?.rating}
                            color2={'#ffd700'}  // Optional: Customize star color
                          />
                        </div>}
                      </div>

                      <h5 className="text-15 fw-500 mt-15">{review?.title}</h5>
                      <div className="comments__text mt-10">
                        <p>{review?.reviewText}</p>
                      </div>


                    </div>
                  </div>
                </li>
              ))
            )}

            <li className="comments__item">
              <div className="d-flex justify-center">
                <button className="text-purple-1 lh-12 underline fw-500">
                  View All Reviews
                </button>
              </div>
            </li>
          </div>

          <div className="respondForm pt-60">
            <h3 className="text-20 fw-500">Write a Review</h3>

            <div className="mt-30">
              <h4 className="text-16 fw-500">What is it like to Course?</h4>
              <div className="d-flex x-gap-10 pt-10">
                {/* Pass handleStarClick function to Star component */}
                <ReactStars
                  count={5}
                  size={24}
                  value={review?.rating}
                  color2={'#ffd700'}

                // Optional: Customize star color
                />
                {/* <Star star={review.rating} textSize={"text-14"} onStarHover={handleStarHover} /> */}
              </div>
            </div>

            <form
              className="contact-form respondForm__form row y-gap-30 pt-30"
              onSubmit={handleSubmit}
            >
              <div className="col-12">
                <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                  Review Title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  placeholder="Great Courses"
                  value={review.title}
                  onChange={(e) => setReview({ ...review, title: e.target.value })}
                />
              </div>
              <div className="col-12">
                <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                  Review Content
                </label>
                <textarea
                  required
                  name="comment"
                  placeholder="Message"
                  rows="8"
                  value={review.comment}
                  onChange={(e) => setReview({ ...review, comment: e.target.value })}
                ></textarea>
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  name="submit"
                  id="submit"
                  className="button -md -purple-1 text-white"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >

  );
}
