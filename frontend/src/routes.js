import { Navigate, useRoutes } from "react-router-dom";

import AppLayout from "./layouts";

import StartPage from "./pages/start-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import CourseAdminPage from "./pages/course-admin";
import CourseCreatePage from "./pages/course-create";
import CourseEditPage from "./pages/course-edit";
import ClassAdminPage from "./pages/class-admin";
import TeacherAdminPage from "./pages/teacher-admin";
import StudentAdminPage from "./pages/student-admin";
import HandleClassRegisterPage from "./pages/handle-register";

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
        <ProtectedRoute role="ADMIN">
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        { element: <Navigate to="/courses" />, index: true },
        {
          path: "courses",
          element: <CourseAdminPage />,
        },
        {
          path: "course-create",
          element: <CourseCreatePage />,
        },
        {
          path: "course-edit",
          element: <CourseEditPage />,
        },
        {
          path: "classes",
          element: <ClassAdminPage />,
        },
        { path: "teachers", element: <TeacherAdminPage /> },
        { path: "students", element: <StudentAdminPage /> },
        { path: "handle-register", element: <HandleClassRegisterPage /> },
      ],
    },
    {
      path: "/",
      element: <StartPage />,
    },
    {
      path: "/login-admin",
      element: <LoginPage />,
    },
    {
      path: "/login-teacher",
      element: <LoginPage />,
    },
    {
      path: "/login-student",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);
  return routes;
}
