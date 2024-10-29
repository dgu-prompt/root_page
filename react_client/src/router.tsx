import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import RootLayout from "./components/layout/RootLayout";
import AuthLayout from "./components/layout/AuthLayout";
import Dashboard from "./features/dashboard/Dashboard";
import Rules from "./features/rules/pages/Rules";
import Controls from "./features/controls/pages/Controls";
import Settings from "./features/settings/AccountSettings";
import BackendTest from "./features/settings/BackendTest";
import Login from "./features/auth/Login";
import ErrorPage from "./components/layout/Error";
import RuleEditPage from "./features/rules/pages/RuleEditPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      {/* 인증이 필요한 페이지 */}
      <Route element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="rules" element={<Rules />} />
        <Route path="rules/:ruleId" element={<RuleEditPage />} />
        <Route path="controls" element={<Controls />} />
        <Route path="settings" element={<Settings />} />
        <Route path="backend-test" element={<BackendTest />} />
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
