import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  courses: [],
  events: [],
  cartVisible: false,
  cartCourses: [],
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const newItem = { ...action.payload, quantity: 1 };
      state.products.push(newItem);
    },
    addCourseToCart(state, action) {
        const newItem = { ...action.payload, quantity: 1 };
        state.cartCourses.push(newItem); 
      },
    addEventToCart(state, action) {
      const newItem = { ...action.payload, quantity: 1 };
      state.events.push(newItem);
    },
    removeCourseFromCart(state, action) {
      const index = state.cartCourses.findIndex(course => course.id === action.payload.id);
      if (index !== -1) {
        state.cartCourses.splice(index, 1);
      }
    },
    toggleCartVisibility(state) {
      state.cartVisible = !state.cartVisible;
    },
  },
});

export const {
  addProductToCart,
  addCourseToCart,
  addEventToCart,
  removeCourseFromCart,
  toggleCartVisibility, 
} = cartSlice.actions;

export default cartSlice.reducer;
