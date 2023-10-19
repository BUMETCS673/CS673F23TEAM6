/*  router/index.tsx  */

import React, { useEffect } from "react";
import {
  useRoutes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Spin } from "antd";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../utils/local";
import { logOut } from "../store/modules/user";

const routes = [
  {
    name: "HOME",
    path: "/",
    component: React.lazy(() => import("/@/layouts/Base")),
    children: [],
  },
  {
    path: "/login",
    component: React.lazy(() => import("/@/pages/Login/index")),
  },
  {
    path: "*",
    component: React.lazy(() => import("/@/pages/NotFound")),
  },
];

const ManageRoutes = [
  {
    path: "/",
    redirect: "/manage/display",
  },
  {
    name: "CREATEROOM",
    path: "/manage/addRoom",
    component: React.lazy(() => import("/@/pages/ManageSide/HandleRooms")),
  },
  {
    name: "DISPLAY",
    path: "/manage/display",
    component: React.lazy(() => import("/@/pages/ManageSide/Display")),
  },
  {
    name: "DETAILS",
    path: "/manage/details",
    component: React.lazy(() => import("/@/pages/ManageSide/Details")),
  },
  {
    name: "ROOMS",
    path: "/manage/rooms",
    component: React.lazy(() => import("/@/pages/ManageSide/Rooms")),
  },
  {
    name: "EDITROOM",
    path: "/manage/editRooms/:id",
    component: React.lazy(() => import("/@/pages/ManageSide/HandleRooms")),
  },
];

const UserRoutes = [
  {
    path: "/",
    redirect: "/user/service",
  },
  {
    name: "SERVICE",
    path: "/user/service",
    component: React.lazy(() => import("/@/pages/UserSide/Service/index")),
  },
  {
    name: "HISTORY",
    path: "/user/history",
    component: React.lazy(() => import("/@/pages/UserSide/History")),
  },
  {
    name: "ROOMS",
    path: "/user/rooms",
    component: React.lazy(() => import("/@/pages/UserSide/Rooms")),
  },
  {
    name: "PREFERBOOKING",
    path: "/user/preferBooking",
    component: React.lazy(() => import("../pages/UserSide/PreferBooking")),
  },
  {
    name: "USEROOM",
    path: "/user/useRoom/:id",
    component: React.lazy(() => import("/@/pages/UserSide/Service/useRoom")),
  },
];

export default function Routes() {
  const user = useSelector((state: any) => state?.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const info = JSON.parse(localStorage.getItem("info") || "{}");
      if (
        (!getToken() || (!info?.rule && !user?.rule)) &&
        !location.pathname.includes("login")
      ) {
        dispatch(logOut());
        navigate("/login", { replace: true });
      }
    } catch (error) {}
  }, [location]);

  routes[0].children = (
    user?.rule == "admin" ? ManageRoutes : UserRoutes
  ) as any;

  const element = useRoutes(renderRoutes(routes));
  return element;
}
function renderRoutes(routeArr: any) {
  return _.map(routeArr, (item) => {
    let routeItem = { ...item };
    if (!item?.path) return;

    // component
    if (item?.component) {
      const Component = item.component;
      routeItem.element = (
        <React.Suspense
          fallback={
            <Spin
              size="large"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          }
        >
          <BeforeEach route={item}>
            <Component />
          </BeforeEach>
        </React.Suspense>
      );
    }

    // children
    if (item?.children) {
      routeItem.children = renderRoutes(item.children as any);
    }

    // 重定向
    if (item?.redirect) {
      routeItem.element = <Navigate to={item.redirect} replace />;
    }

    return routeItem;
  });
}

function BeforeEach(props: { route: any; children: any }) {
  document.title = `${import.meta.env?.VITE_GLOB_APP_TITLE}`;
  window.scrollTo(0, 0);
  return <>{props.children}</>;
}
