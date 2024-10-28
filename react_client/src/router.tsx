import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import RootLayout from "./components/layout/RootLayout";
import AuthLayout from "./components/layout/AuthLayout";
import Dashboard from "./features/dashboard/Dashboard";
import Rules from "./features/rules/RuleManagement";
import Controls from "./features/controls/ControlManagement";
import Settings from "./features/settings/AccountSettings";
import BackendCommunicationTest from "./features/settings/BackendCommunicationTest";
import Login from "./features/auth/Login";
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
