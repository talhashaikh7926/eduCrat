import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCartVisibility } from "@/app/redux/slices/cartSlice";
import { menuList } from "@/data/menu";
import { usePathname } from "next/navigation";
import CourseCart from "./CourseCart";
import ShopCart from "./ShopCart";
import EventCart from "./EventCart";

const CartToggle = ({ allClasses, parentClassess }) => {
  const dispatch = useDispatch();
  const { cartProducts, cartCourses, cartEvents, } = useSelector((state) => state.cart);
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");
  const [activeCart, setActiveCart] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    menuList.forEach((elm) => {
      elm?.links?.forEach((elm2) => {
        if (elm2.href?.split("/")[1] == pathname?.split("/")[1]) {
          setMenuItem(elm.title);
        } else {
          elm2?.links?.map((elm3) => {
            if (elm3.href?.split("/")[1] == pathname?.split("/")[1]) {
              setMenuItem(elm.title);
              setSubmenu(elm2.title);
            }
          });
        }
      });
    });
  }, []);

  const handleToggleCart = () => {
    dispatch(toggleCartVisibility());
    setActiveCart((prev) => !prev);
  };

  return (
    <>
      <div className={parentClassess ? parentClassess : ""}>
        <button
          style={{ position: "relative" }}
          onClick={handleToggleCart}
          className={`${allClasses ? allClasses : ""}`}
          data-el-toggle=".js-cart-toggle"
        >
          <i className="text-20 icon icon-basket"></i>
          <div className="cartProductCount">
            {submenu === "Shop" && (
              <>{cartProducts.length > 9 ? "9+" : cartProducts.length} </>
            )}
            {menuItem === "Events" && (
              <>{cartEvents.length > 9 ? "9+" : cartEvents.length} </>
            )}
            {!(submenu === "Shop" || menuItem === "Events") && (
              <>{cartCourses?.length > 9 ? "9+" : cartCourses?.length} </>
            )}
          </div>
        </button>

        <div
          className={`toggle-element js-cart-toggle ${
            activeCart ? "-is-el-visible" : ""
          }`}
        >
          {submenu === "Shop" && <ShopCart />}
          {menuItem === "Events" && <EventCart />}
          {!(submenu === "Shop" || menuItem === "Events") && <CourseCart />}
        </div>
      </div>
    </>
  );
};

export default CartToggle;
