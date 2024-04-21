"use client";

import { sidebarItems } from "@/data/dashBoardSidebar";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Sidebar() {
  const storedPayloadString = localStorage.getItem("userPayload");
  const storedPayload = storedPayloadString ? JSON.parse(storedPayloadString) : null;
  const role = storedPayload?.role;
  const pathname = usePathname();
  const sidebarItemsStudents = [
    {
      id: 1,
      href: "/about-1",
      iconClass: "text-20 icon-play-button",
      text: "Explore",
    },
    {
      id: 2,
      href: "/dshb-courses",
      iconClass: "text-20 icon-play-button",
      text: "My Courses",
    },
    {
      id: 3,
      href: "/courses-list-1",
      iconClass: "text-20 icon-discovery",
      text: "Courses",
    },
    {
      id: 4,
      href: "/dshb-settings",
      iconClass: "text-20 icon-setting",
      text: "Settings",
    },
  ];

  const sidebarItemsTeachers = [
    {
      id: 1,
      href: "/about-1",
      iconClass: "text-20 icon-play-button",
      text: "Explore",
    },
    {
      id: 2,
      href: "/dshb-courses",
      iconClass: "text-20 icon-play-button",
      text: "My Courses",
    },

    {
      id: 3,
      href: "/dshb-listing",
      iconClass: "text-20 icon-list",
      text: "Create Course",
    },
    {
      id: 4,
      href: "/dshb-reviews",
      iconClass: "text-20 icon-comment",
      text: "Reviews",
    },
    {
      id: 5,
      href: "/dshb-settings",
      iconClass: "text-20 icon-setting",
      text: "Settings",
    },
  ];


  const sidebarItemsAdmin = [
    {
      id: 1,
      href: "/about-1",
      iconClass: "text-20 icon-discovery",
      text: "Dashboard",
    },
    {
      id: 2,
      href: "/dashboard",
      iconClass: "text-20 icon-discovery",
      text: "Dashboard",
    },
    {
      id: 3,
      href: "/instructors-list-1",
      iconClass: "text-20 icon-discovery",
      text: "Instructors",
    },
    {
      id: 4,
      href: "/courses-list-1",
      iconClass: "text-20 icon-discovery",
      text: "Courses",
    },
    {
      id: 5,
      href: "/dshb-settings",
      iconClass: "text-20 icon-setting",
      text: "Settings",
    },
  ];

  return (
    <div className="sidebar -dashboard">
      {role == "admin" && (
        <>
          {sidebarItemsAdmin.map((item,i) => (
            <div
              key={i}
              className={`sidebar__item ${item.id == 1 ? "-is-active -dark-bg-dark-2" : ""
                }`}
            >
              <a href={item.href} className="d-flex items-center text-17 lh-1 fw-500">
                <i className={item.iconClass}></i>
                {item.text}
              </a>
            </div>
          ))}
        </>
      )}
      {role == "teacher" && (
        <>
          {sidebarItemsTeachers.map((item,i) => (
            <div
              key={i}
              className={`sidebar__item ${item.id == 1 ? "-is-active -dark-bg-dark-2" : ""
                }`}
            >
              <a href={item.href} className="d-flex items-center text-17 lh-1 fw-500">
                <i className={item.iconClass}></i>
                {item.text}
              </a>
            </div>
          ))}
        </>
      )}
      {role === "student" && (
        <>
          {sidebarItemsStudents.map((item,i) => (
            <div
              key={i}
              className={`sidebar__item ${item.id == 1 ? "-is-active -dark-bg-dark-2" : ""
                }`}
            >
              <a href={item.href} className="d-flex items-center text-17 lh-1 fw-500">
                <i className={item.iconClass}></i>
                {item.text}
              </a>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
