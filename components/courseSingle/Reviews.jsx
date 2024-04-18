import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { respondReviews, submitReview } from "@/app/redux/slices/reviewSubmitSlice";
import { fetchReviews } from "@/app/redux/slices/reviewSlice";
import Star from "../common/Star";

export default function Reviews({ courseId }) {
  console.log(courseId, "---ssssss-");
  const dispatch = useDispatch();
  const { fetching, reviews, error } = useSelector((state) => state.allReviews);
  const [review, setReview] = useState({ title: "", comment: "", courseIds: "" });
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
    console.log(review, "--sssaadad--");
    dispatch(submitReview(review))
      .unwrap()
      .then(() => {

        dispatch(fetchReviews(courseId));
        setReview({ title: "", comment: "", course: "" });
      })
      .catch((error) => {
        console.error("Failed to submit review:", error);
      });
  };

  return (
    <div id="reviews" className="pt-60 lg:pt-40">
      {/* Your JSX content */}
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
                <div className="comments__img mr-20">
                  <div
                    className="bg-image rounded-full js-lazy"
                    style={{ backgroundImage: `url(${review?.profilePictureUrl})` }}></div>
                </div>

                <div className="comments__body md:mt-15">
                  <div className="comments__header">
                    <h4 className="text-17 fw-500 lh-15">
                      {review.name}
                      <span className="text-13 text-light-1 fw-400">
                        {review?.reviewDate} {/* Assuming there's a 'date' field */}
                      </span>
                    </h4>

                    {/* Assuming you have a 'rating' field */}
                    {/* <div className="stars">
                      <Star star={review.rating} />
                    </div> */}
                  </div>

                  <h5 className="text-15 fw-500 mt-15">{review.title}</h5>
                  <div className="comments__text mt-10">
                    <p>{review.reviewText}</p>
                  </div>

                  <div className="comments__helpful mt-20">
                    <span className="text-13 text-purple-1">
                      Was this review helpful?
                    </span>
                    <button className="button text-13 -sm -purple-1 text-white">
                      Yes
                    </button>
                    <button className="button text-13 -sm -light-7 text-purple-1">
                      No
                    </button>
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
            <Star star={5} textSize={"text-14"} />
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
              onChange={(e) =>
                setReview({ ...review, title: e.target.value })
              }
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
              onChange={(e) =>
                setReview({ ...review, comment: e.target.value })
              }
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
  );
}
