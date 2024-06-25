import React from "react";
import { Route, Routes } from "react-router-dom";
import CommonPage from "./Pages/CommonPage";
import FoodItemsPage from "./Pages/FoodItemsPage";
import OrdersPage from "./Pages/OrdersPage";
import ServicesPage from "./Pages/ServicesPage";
import BlogsPage from "./Pages/BlogsPage";
import PageNotFound from "./Pages/PageNotFound";
import SubscribersPage from "./Pages/SubscribersPage";
import DashboardPage from "./Pages/DashboardPage";
import BlogDetailsPage from "./Pages/BlogDetailsPage";
import UsersPage from "./Pages/UsersPage";
import Login from "./Pages/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<CommonPage />}>
        <Route index element={<DashboardPage />} />
        <Route path="/all-recepies" element={<FoodItemsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<BlogDetailsPage />} />
        <Route path="/subscribers" element={<SubscribersPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
