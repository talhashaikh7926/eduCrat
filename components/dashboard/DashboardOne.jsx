"use client";
import React, { useState, useEffect } from "react";
import { resentCourses } from "@/data/courses";
import { states } from "@/data/dashboard";
import { teamMembers } from "@/data/instractors";
import { notifications } from "@/data/notifications";
import FooterNine from "../layout/footers/FooterNine";
import Charts from "./Charts";
import PieChartComponent from "./PieCharts";
import Image from "next/image";
import Link from "next/link";
import { fetchadminDashboard } from "@/app/redux/slices/adminDashSlice";
import { useDispatch, useSelector } from "react-redux";

export default function DashboardOne() {
  const dispatch = useDispatch();
  const { fetching, admdashboard, error } = useSelector((state) => state.admindashboard);
  useEffect(() => {

    dispatch(fetchadminDashboard());
  }, [dispatch]);
  console.log(admdashboard, "----");

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Dashboard</h1>
            <div className="mt-10">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
          </div>
        </div>

        <div className="row y-gap-30">
         
            <div className="col-xl-3 col-md-6">
              <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                <div>
                  <div className="lh-1 fw-500">Total Sales</div>
                  <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                    ${admdashboard.totalSales}
                  </div>
                  <div className="lh-1 mt-25">
                    <span className="text-purple-1"></span>
                  </div>
                </div>

                <i className={`text-40 icon-coupon text-purple-1`}></i>
              </div>
            </div>


            <div className="col-xl-3 col-md-6">
              <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                <div>
                  <div className="lh-1 fw-500">Total Courses</div>
                  <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                  {admdashboard.totalCourses}
                  </div>
                  <div className="lh-1 mt-25">
                    <span className="text-purple-1"></span>
                  </div>
                </div>

                <i className={`text-40 icon-play-button text-purple-1`}></i>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                <div>
                  <div className="lh-1 fw-500">Total Students</div>
                  <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                    {admdashboard.totalStudents}
                  </div>
                  <div className="lh-1 mt-25">
                    <span className="text-purple-1"></span> 
                  </div>
                </div>

                <i className={`text-40 icon-graduate-cap text-purple-1`}></i>
              </div>
            </div>


            <div className="col-xl-3 col-md-6">
              <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                <div>
                  <div className="lh-1 fw-500">Total Instructors</div>
                  <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                     {admdashboard?.totalTeachers}
                  </div>
                  <div className="lh-1 mt-25">
                    <span className="text-purple-1"></span>
                  </div>
                </div>

                <i className={`text-40 icon-online-learning text-purple-1`}></i>
              </div>
            </div>
         
        </div>

        <div className="row y-gap-30 pt-30">
          <div className="col-xl-8 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Earning Statistics</h2>
                <div className="">
                  <div
                    id="ddtwobutton"
                    onClick={() => {
                      document
                        .getElementById("ddtwobutton")
                        .classList.toggle("-is-dd-active");
                      document
                        .getElementById("ddtwocontent")
                        .classList.toggle("-is-el-visible");
                    }}
                    className="dropdown js-dropdown js-category-active"
                  >
                    <div
                      className="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-1 border-light rounded-8 px-20 py-10 text-14 lh-12"
                      data-el-toggle=".js-category-toggle"
                      data-el-toggle-active=".js-category-active"
                    >
                      <span className="js-dropdown-title">This Week</span>
                      <i className="icon text-9 ml-40 icon-chevron-down"></i>
                    </div>

                    <div
                      id="ddtwocontent"
                      className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                    >
                      <div className="text-14 y-gap-15 js-dropdown-list">
                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Animation
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Design
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Illustration
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Business
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-40 px-30">
                <Charts />
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Traffic</h2>
                <div className="">
                  <div
                    id="dd3button"
                    onClick={() => {
                      document
                        .getElementById("dd3button")
                        .classList.toggle("-is-dd-active");
                      document
                        .getElementById("dd3content")
                        .classList.toggle("-is-el-visible");
                    }}
                    className="dropdown js-dropdown js-category-active"
                  >
                    <div
                      className="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-1 border-light rounded-8 px-20 py-10 text-14 lh-12"
                      data-el-toggle=".js-category-toggle"
                      data-el-toggle-active=".js-category-active"
                    >
                      <span className="js-dropdown-title">This Week</span>
                      <i className="icon text-9 ml-40 icon-chevron-down"></i>
                    </div>

                    <div
                      id="dd3content"
                      className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                    >
                      <div className="text-14 y-gap-15 js-dropdown-list">
                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Animation
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Design
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Illustration
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Business
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-40 px-30">
                <PieChartComponent />
              </div>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-30">
          <div className="col-xl-4 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 fw-500">Popular Instructor</h2>
                <Link
                  href="/instructors-list-2"
                  className="text-14 text-purple-1 underline"
                >
                  {/* View All */}
                </Link>
              </div>
              <div className="py-30 px-30">
                <div className="y-gap-40">
                  {admdashboard.popularTeachers?.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex ${i != 0 ? "border-top-light" : ""} `}
                    >
                      <Image
                        width={40}
                        height={40}
                        className="size-40"
                        src={elm.profilePictureUrl}
                        alt="avatar"
                      />
                      <div className="ml-10 w-1/1">
                        <h4 className="text-15 lh-1 fw-500">
                          <Link
                            className="linkCustom"
                            href={`/instructors/${elm.id}`}
                          >
                            {elm.firstName+" "+ elm.lastName}
                          </Link>
                        </h4>
                        <div className="d-flex items-center x-gap-20 y-gap-10 flex-wrap pt-10">
                          <div className="d-flex items-center">
                            <i className="icon-message text-15 mr-10"></i>
                            <div className="text-13 lh-1">
                              {elm.reviews} Reviews
                            </div>
                          </div>
                          <div className="d-flex items-center">
                            <i className="icon-online-learning text-15 mr-10"></i>
                            <div className="text-13 lh-1">
                              {elm.totalEnrolledStudents} Students
                            </div>
                          </div>
                          <div className="d-flex items-center">
                            <i className="icon-play text-15 mr-10"></i>
                            <div className="text-13 lh-1">
                              {elm.totalCourses} Course
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Recent Courses</h2>
                <a href="#" className="text-14 text-purple-1 underline">
                  {/* View All */}
                </a>
              </div>
              <div className="py-30 px-30">
                <div className="y-gap-40">
                  {admdashboard.recentCourses?.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex ${i != 0 ? "border-top-light" : ""} `}
                    >
                      <div className="shrink-0">
                        <Image
                          width={90}
                          height={80}
                          src={elm.courseThumbnailUrl}
                          alt="image"
                        />
                      </div>
                      <div className="ml-15">
                        <h4 className="text-15 lh-16 fw-500">{elm.title}</h4>
                        <div className="d-flex items-center x-gap-20 y-gap-10 flex-wrap pt-10">
                          <div className="d-flex items-center">
                            <Image
                              width={16}
                              height={16}
                              className="size-16 object-cover mr-8"
                              src={"data:image/jpeg;base64,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"}
                              alt="icon"
                            />
                            <div className="text-14 lh-1">{elm.title}</div>
                          </div>
                          <div className="d-flex items-center">
                            <i className="icon-document text-16 mr-8"></i>
                            <div className="text-14 lh-1">
                              {elm.curriculum?.length} lesson
                            </div>
                          </div>
                        
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Notifications</h2>
              </div>
              <div className="py-30 px-30">
                <div className="y-gap-40">
                  {notifications.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex items-center ${i != 0 ? "border-top-light" : ""
                        } `}
                    >
                      <div className="shrink-0">
                        <Image
                          width={40}
                          height={40}
                          src={elm.imageSrc}
                          alt="image"
                        />
                      </div>
                      <div className="ml-12">
                        <h4 className="text-15 lh-1 fw-500">{elm.heading}</h4>
                        <div className="text-13 lh-1 mt-10">
                          {elm.time} Hours Ago
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterNine />
    </div>
  );
}
