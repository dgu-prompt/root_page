import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "@/components/ui/provider"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import './index.css'
import Navbar from './components/Navbar.jsx'
import ErrorPage from './components/ErrorPage.jsx'

import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx';
import ControlManagement from './pages/ControlManagement.jsx';
import RuleManagement from './pages/RuleManagement.jsx';
import AccountSettings from './pages/AccountSettings.jsx';
import Login from './pages/Login.jsx';
import NewRule from './pages/NewRule.jsx';
import EditRule from './pages/EditRule.jsx';
import DeleteRuleConfirm from './pages/DeleteRuleConfirm.jsx';
import BackendCommunicationTest from './pages/BackendCommunicationTest.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
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
        element: <NewRule />
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
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
