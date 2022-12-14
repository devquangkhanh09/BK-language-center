import { Navigate, useRoutes } from "react-router-dom";

import { AppLayout, StudentAppLayout } from "./layouts";

import StartPage from "./pages/start-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import OverviewAdminPage from "./pages/overview-admin";
import CourseAdminPage from "./pages/course-admin";
import CourseCreatePage from "./pages/course-create";
import CourseEditPage from "./pages/course-edit";
import ClassAdminPage from "./pages/class-admin";
import TeacherAdminPage from "./pages/teacher-admin";
import StudentAdminPage from "./pages/student-admin";
import HandleClassRegisterPage from "./pages/handle-register";
import Curriculum from "./pages/curriculum";
import CourseStudentPage from "./pages/course-student";
import ClassStudentPage from "./pages/class-student";
import CourseDetailPage from "./pages/course-detail";

import ClassTeacherPage from "./pages/class-teacher";

const ProtectedRoute = ({ role, children }) => {
  
  if (!localStorage.getItem("isAuthenticated") || localStorage.getItem("role") !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/admin",
      element: (
        <ProtectedRoute role="admin">
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        { element: <Navigate to="/courses" />, index: true },
        {
          path: "overview",
          element: <OverviewAdminPage/>,
        },
        {
          path: "courses",
          element: <CourseAdminPage />,
        },
        {
          path: "course-create",
          element: <CourseCreatePage />,
        },
        {
          path: "course-edit/:id",
          element: <CourseEditPage />,
        },
        {
          path: "course-curriculum/:id",
          element: <Curriculum />,
        },
        {
          path: "classes/:id",
          element: <ClassAdminPage />,
        },
        { path: "teachers", element: <TeacherAdminPage /> },
        { path: "students", element: <StudentAdminPage /> },
        { path: "handle-register", element: <HandleClassRegisterPage /> },
      ],
    },
    {
      // TO-DO: fix layout of student
      path: "/student",
      element: (
        <ProtectedRoute role="student">
          <StudentAppLayout />
        </ProtectedRoute>
      ),
      children: [
        { element: <Navigate to="/courses" />, index: true },
        {
          path: "courses",
          element: <CourseStudentPage />,
        },
        {
          path: "classes/:id",
          element: <ClassStudentPage />,
        },
        {
          path: "course-detail/:id",
          element: <CourseDetailPage />,
        },
      ],
    },
    {
      path: "/teacher",
      element: (
        <ProtectedRoute role="teacher">
          <StudentAppLayout />
        </ProtectedRoute>
      ),
      children: [
        { element: <Navigate to="/classes" />, index: true },
        {
          path: "classes",
          element: <ClassTeacherPage />,
        },
      ],
    },
    {
      path: "/",
      element: <StartPage />,
    },
    {
      path: "/login-admin",
      element: <LoginPage role="admin" />,
    },
    {
      path: "/login-teacher",
      element: <LoginPage role="teacher" />,
    },
    {
      path: "/login-student",
      element: <LoginPage role="student" />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);
  return routes;
}
