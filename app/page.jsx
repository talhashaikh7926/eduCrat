// import HomeOne from "@/components/homes/home";
import Header from "../components/layout/headers/Header";
// import MobileMenu from "@/components/layout/component/MobileMenu";

import HomeHero from "../components/homes/heros/HeroNine";

import Brands from "../components/common/Brands";
import Categories from "../components/homes/categories/CategoriesNine";
import Courses from "../components/homes/courses/CoursesFive";
import TestimonialsOne from "../components/common/StepsOne";
import Instructor from "../components/common/Instructors";
import WhyCourse from "../components/homes/books/Books";
import Testimonials from "../components/common/Testimonials";
import Instructors from "../components/homes/instractors/InstractorsNine";
import GetApp from "../components/homes/getApp/GetApp";
import Blog from "../components/homes/blogs/Blog";
import Join from "../components/homes/join/JoinNine";
import FooterOne from "../components/layout/footers/FooterNine";
import Preloader from "@/components/common/Preloader";


export const metadata = {
  title: 'Home-1 || Educrat - Professional LMS Online Education Course NextJS Template',
  description:
    'Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.',

}

export default function HomePage() {
  return (

    <>
      <Preloader />
      <Header />


      <div className="content-wrapper  js-content-wrapper overflow-hidden">

        <HomeHero />

        <Categories />
        <Courses />
        <TestimonialsOne />
        <Instructor/>
        <WhyCourse />
        <Instructors />
        <Testimonials/>
        <Join />  
        <Brands />  
     


      </div>
    </>
  );
}
