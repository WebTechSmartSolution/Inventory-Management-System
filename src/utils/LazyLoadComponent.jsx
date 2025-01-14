import React, { lazy } from "react";
export const Navbar = lazy(() => import("../components/Navbar"));
export const Login = lazy(() => import("../pages/Login"));
export const Signup = lazy(() => import("../pages/Signup"));
export const Users = lazy(() => import("../pages/Users"));
export const Setting = lazy(() => import("../pages/Setting"));
export const Purchases = lazy(() => import("../pages/Purchases"));
export const NewPurchases = lazy(() => import("../pages/NewPurchase"));
export const Sales = lazy(()=> import("../pages/Sales"))
export const NewSales = lazy(()=> import("../pages/NewSales"))
export const Home = lazy(() => import("../pages/Home"));
export const Products = lazy(()=>import("../pages/Products"))
export const Categories = lazy(()=>import("../pages/Categories"))
export const ProtectedRoute = lazy(() => import("../context/ProtectedRoutes"));
export const Layout = lazy(() => import("../layout/Layout"));
