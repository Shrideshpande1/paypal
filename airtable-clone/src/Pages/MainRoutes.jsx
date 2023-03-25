import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Login/Login";
import ProfileEdit from "./ProfileEditPage";
import SignUp from "./SignUp";
import { Stack } from "@chakra-ui/react";
import { LpSidebar } from "../Components/Todos/LpSidebar";
import { LpTodoHomePage } from "./LpTodoHomePage";
import { LpEditPage } from "./LpEditPage";
import ResoursePage from "./ResoursePage";
import FirstOpenablePage from "./FirstOpenablePage";
import SecondOpenablePageSection from "./SecondOpenablePageSection";
import ThirdOpenablePageSection from "./ThirdOpenablePageSection";
import FourthOpenablePageSection from "./FourthOpenablePageSection";
import PR_Singlefive from "./FifthOpenablePageSection";
import PR_Singlesix from "./SixthOpenablePageSection";
import { UserDashboard } from "./UserDashboard";

import { CombinedPage } from "./CombinedPage";
import AdminDashboard from "./AdminDashboard";
import DSingleBook from "../Components/Admin/DSingleBook";

import Overview from "./OverviewER";

import PrivateRoute from "../Routes/PriveteRoute";

const MainRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admindashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<LpTodoHomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/profileEdit"
        element={
          <PrivateRoute>
            <ProfileEdit />
          </PrivateRoute>
        }
      />
      <Route
        path="/users/:id"
        element={
          <PrivateRoute>
            <DSingleBook />
          </PrivateRoute>
        }
      />
      <Route path="/enterprises" element={<Overview />} />

      <Route path="/resourse" element={<ResoursePage />} />
      <Route path="/singleresourse" element={<FirstOpenablePage />} />
      <Route
        path="/singletworesourse"
        element={<SecondOpenablePageSection />}
      />
      <Route
        path="/singlethreeresourse"
        element={<ThirdOpenablePageSection />}
      />
      <Route
        path="/singlefourresourse"
        element={<FourthOpenablePageSection />}
      />
      <Route path="/singlefiveresourse" element={<PR_Singlefive />} />
      <Route path="/singlesixresourse" element={<PR_Singlesix />} />
      <Route path="/combinedpage" element={<CombinedPage />} />
      <Route
        path="/todohomepage"
        element={
          <PrivateRoute>
            <Stack
              backgroundColor="gray.200"
              direction={{
                base: "column",
                sm: "colum",
                md: "row",
                lg: "row",
                xl: "row",
              }}
            >
              <LpSidebar />
              <LpTodoHomePage />
            </Stack>
          </PrivateRoute>
        }
      />
      <Route
        path="/task/:id"
        element={
          <PrivateRoute>
            <Stack
              backgroundColor="gray.200"
              direction={{
                base: "column",
                sm: "column",
                md: "row",
                lg: "row",
                xl: "row",
              }}
            >
              <LpSidebar />
              <LpEditPage />
            </Stack>
          </PrivateRoute>
        }
      />

      <Route
        path="/userdashboard"
        element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
export { MainRoutes };
