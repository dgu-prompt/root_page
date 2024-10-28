import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import "./App.css";

import Root from "./components/layout/Root";
import Error from "./components/layout/Error";

import Dashboard from "./pages/Dashboard";
import Rules from "./pages/RuleManagement";
import Controls from "./pages/ControlManagement";
import Settings from "./pages/AccountSettings";
import Login from "./pages/auth/Login";
import NewRule from "./pages/NewRule";
import EditRule from "./pages/EditRule";
import DeleteRuleConfirm from "./pages/DeleteRuleConfirm";
import BackendCommunicationTest from "./pages/BackendCommunicationTest";

import { AuthProvider } from "./contexts/AuthContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} errorElement={<Error />}>
        <Route index element={<Dashboard />} />
        <Route path="rules" element={<Rules />} />
        <Route path="controls" element={<Controls />} />
        <Route path="settings" element={<Settings />} />
        <Route path="backend-test" element={<BackendCommunicationTest />} />
      </Route>
      <Route path="/login" element={<Login />} errorElement={<Error />} />
    </>
  )
);

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
