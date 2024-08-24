import { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthWrapper, AuthorizedRoute, SkeletonFallback } from "@/components";
import { routes } from "./routes";
import { RouteConfig } from "@/types/route";

function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <Suspense fallback={<SkeletonFallback />}>
          <Routes>
            {routes.map((route: RouteConfig) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <AuthorizedRoute
                    Element={route.element}
                    allowedRoles={route.roles}
                    fallbackPath={route.isPublic ? "/login" : "/"}
                    isPublic={route.isPublic}
                  />
                }
              />
            ))}
          </Routes>
        </Suspense>
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;