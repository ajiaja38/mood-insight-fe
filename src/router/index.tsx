import { createHashRouter } from "react-router-dom"
import LoginPage from "../pages/common/LoginPage"
import LandingPage from "../pages/common"
import RegisterPage from "../pages/common/RegisterPage"
import AuthenticationLayout from "../layout/AuthenticationLayout"
import RouterGuard from "./guard/RouterGuard"
import DashboardHome from "../pages/private"
import DashboardLayout from "../layout/DashboardLayout"
import Disorder from "../pages/private/Disorder"
import Users from "../pages/private/Users"
import Symptom from "../pages/private/Symptom"
import Consultation from "../pages/private/Consultation"
import DiagnosisResult from "../pages/private/DiagnosisResult"
import Solution from "../pages/private/Solution"
import KnowledgeBase from "../pages/private/KnowledgeBase"
import Profile from "../pages/private/Profile"
import Dashboard404 from "../pages/private/error"
import DetailDiagnosisResult from "../pages/private/DetailDiagnosisResult"
import UserLayout from "../layout/UserLayout"
import ConsultationUser from "../pages/common/ConsultationUser"
import DetailConsultationUser from "../pages/common/DetailConsultationUser"
import HistoryConsultation from "../pages/common/HistoryConsultation"
import ProfilUser from "../pages/common/ProfilUser"
import RoleGuard from "./guard/RoleGuard"
import { ERole } from "../types/enum/ERole.enum"

export const router: ReturnType<typeof createHashRouter> = createHashRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "", element: <LandingPage /> },
      {
        path: "",
        element: <RouterGuard redirectPath='/' />,
        children: [
          { path: "konsultasi-pengguna", element: <ConsultationUser /> },
          {
            path: "detail-konsultasi/:id",
            element: <DetailConsultationUser />,
          },
          { path: "riwayat", element: <HistoryConsultation /> },
          { path: "profile-pengguna", element: <ProfilUser /> },
        ],
      },
      { path: "*", element: <Dashboard404 /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthenticationLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "*", element: <Dashboard404 /> },
    ],
  },
  {
    path: "/dashboard",
    element: <RouterGuard redirectPath='/auth/login' />,
    children: [
      {
        path: "",
        element: <RoleGuard role={ERole.ADMIN} redirectPath='/' />,
        children: [
          {
            path: "",
            element: <DashboardLayout />,
            children: [
              { path: "", element: <DashboardHome /> },
              { path: "penyakit", element: <Disorder /> },
              { path: "gejala", element: <Symptom /> },
              { path: "konsultasi", element: <Consultation /> },
              { path: "hasil-diagnosa", element: <DiagnosisResult /> },
              {
                path: "hasil-diagnosa/:id",
                element: <DetailDiagnosisResult />,
              },
              { path: "solusi", element: <Solution /> },
              { path: "knowledge-base", element: <KnowledgeBase /> },
              { path: "users", element: <Users /> },
              { path: "profile", element: <Profile /> },
              { path: "*", element: <Dashboard404 /> },
            ],
          },
        ],
      },
    ],
  },
])
