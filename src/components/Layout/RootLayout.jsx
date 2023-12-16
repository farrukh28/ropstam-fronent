import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NoPage from "../NoPage/NoPage";
import { publicRoutes, protectedRoutes } from "../../routes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PublicRoutes from "../HOC/PublicRoutes";
import ProtectedRoutes from "../HOC/ProtectedRoutes";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#eee]">
      <Header />
      <div className="flex flex-col flex-grow">
        <div className="flex flex-col flex-grow w-full mx-auto max-w-[1536px]">
          <Routes>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<PublicRoutes component={route.element} />}
              />
            ))}
            {protectedRoutes.map((route) =>
              route.subRoutes ? (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<ProtectedRoutes component={route.element} />}
                >
                  <Route
                    index
                    element={<Navigate to={route.subRoutes[0].path} />}
                  />
                  {route.subRoutes.map((subRoute, idx) => (
                    <Route
                      key={`${subRoute.path}-${route.path}`}
                      path={subRoute.path}
                      element={subRoute.element}
                    />
                  ))}
                </Route>
              ) : (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<ProtectedRoutes component={route.element} />}
                />
              )
            )}
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
