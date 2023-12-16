import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Categories from "./pages/Categories/Categories";

const routes = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    isProtected: true,
    subRoutes: [
      {
        path: "/dashboard",
        name: "Dashboard",
        element: <Dashboard />,
      },
      {
        path: "/categories",
        name: "Categories",
        element: <Categories />,
      },
    ],
  },
  {
    path: "/auth/login",
    name: "Login",
    element: <Login />,
    isPublic: true,
  },
  {
    path: "/auth/signup",
    name: "Sign Up",
    element: <SignUp />,
    isPublic: true,
  },
];

export const publicRoutes = routes.filter((i) => i.isPublic);
export const protectedRoutes = routes.filter((i) => i.isProtected);
