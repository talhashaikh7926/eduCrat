import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import registerReducer from './slices/registerSlice';
import getCourseReducer from './slices/getCourseSlice';
import CourseReducer from './slices/courseSlice';
import profileReducer from './slices/profileSlice';
import getProfileReducer from './slices/getProfileSlice';
import changePasswordReducer from './slices/changePasswordSlice';
import cartReducer from './slices/cartSlice';
import enrollSlice from './slices/enrollSlice';
import getEnrollReducer from './slices/enrollByIdSlice';
import getCourseIdReducer from './slices/courseIdSlice'
import teacherDashboardReducer from './slices/dashboardSlice'
import getReviewReducer from './slices/reviewSlice'
import getStudentReviewSlice from './slices/studentReviewsSlice'
import getTeacherReducer from './slices/teacherSlice'
import adminDashboardSlice from './slices/adminDashSlice';

export const RESET_STORE = 'RESET_STORE';
const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return combineReducers({
    auth: authReducer,
    register: registerReducer,
    allCourse: getCourseReducer,
    course: CourseReducer,
    profile: profileReducer,
    userProfile: getProfileReducer,
    password: changePasswordReducer,
    cart: cartReducer,
    enrollCourse: enrollSlice,
    enrollStudent: getEnrollReducer,
    courseById: getCourseIdReducer,
    teacherDashboard: teacherDashboardReducer,
    allReviews: getReviewReducer,
    StudentReviews: getStudentReviewSlice,
    allTeacher: getTeacherReducer,
    admindashboard:adminDashboardSlice
  })(state, action);
};

export default configureStore({
  reducer: rootReducer,
});
