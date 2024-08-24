import { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AuthWrapper,
  AuthorizedRoute,
  SkeletonFallback,
  LayoutWrapper,
} from "@/components";
import { routes } from "./routes";
import { RouteConfig } from "@/types/route";

function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <LayoutWrapper>
          <Suspense fallback={<SkeletonFallback />}>
            <Routes>
              {routes.map((route: RouteConfig) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.isPublic ? (
                      <route.element />
                    ) : (
                      <AuthorizedRoute
                        Element={route.element}
                        allowedRoles={route.roles}
                        fallbackPath="/login"
                      />
                    )
                  }
                />
              ))}
            </Routes>
          </Suspense>
        </LayoutWrapper>
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;
