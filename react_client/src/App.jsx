import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import "./App.css";

import Navbar from "./components/layout/Navbar.jsx";
import ErrorPage from "./components/layout/ErrorPage.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import ControlManagement from "./pages/ControlManagement.jsx";
import RuleManagement from "./pages/RuleManagement.jsx";
import AccountSettings from "./pages/AccountSettings.jsx";
import Login from "./pages/auth/Login.jsx";
import NewRule from "./pages/NewRule.jsx";
import EditRule from "./pages/EditRule.jsx";
import DeleteRuleConfirm from "./pages/DeleteRuleConfirm.jsx";
import BackendCommunicationTest from "./pages/BackendCommunicationTest.jsx";

import { AuthProvider } from "./contexts/AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <div>App</div>,
      },
      {
        path: "/communication-test",
        element: <BackendCommunicationTest />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "control-management",
        element: <ControlManagement />,
      },
      {
        path: "rule-management",
        element: <RuleManagement />,
      },
      {
        path: "rule-management/new",
        element: <NewRule />,
      },
      {
        path: "rule-management/:ruleId",
        element: <EditRule />,
      },
      {
        path: "rule-management/:ruleId/delete",
        element: <DeleteRuleConfirm />,
      },
      {
        path: "account-settings",
        element: <AccountSettings />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
