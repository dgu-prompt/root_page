import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import RootLayout from "./components/layout/RootLayout";
import AuthLayout from "./components/layout/AuthLayout";
import Dashboard from "./pages/Dashboard";
import Rules from "./pages/RuleManagement";
import Controls from "./pages/ControlManagement";
import Settings from "./pages/AccountSettings";
import BackendCommunicationTest from "./pages/BackendCommunicationTest";
import Login from "./pages/auth/Login";
import ErrorPage from "./components/layout/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      {/* 인증이 필요한 페이지 */}
      <Route element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="rules" element={<Rules />} />
        <Route path="controls" element={<Controls />} />
        <Route path="settings" element={<Settings />} />
        <Route path="backend-test" element={<BackendCommunicationTest />} />
      </Route>

      {/* 인증이 필요 없는 페이지 */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Route>
  )
);

export default router;
