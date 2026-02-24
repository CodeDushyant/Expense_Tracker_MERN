import { useState, useEffect } from "react";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
// component importing
import axios from "axios";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import LandingPage from "./component/LandingPage";
import NavBar from "./component/NavBar";
import Dashboard from "./component/Dashboard";
import ProtectedRoute from "./component/ProtectedRoute";
import Otp from "./component/Otp";
import ExpenseTracking from "../src/component/Product/ExpenseTracking"
import BudgetPlanning from "../src/component/Product/BudgetPlanning"
import EmailAlerts from "../src/component/Product/EmailAlerts"
import VisualReports from "../src/component/Product/VisualReports"
import AboutUs from "../src/component/Company/AboutUs"
import PrivacyPolicy from "../src/component/Company/PrivacyPolicy"
import TermsOfService from "../src/component/Company/TermsOfService"
import ContactSupport from "../src/component/Company/ContactSupport"
import HelpCenter from "../src/component/Resources/HelpCenter"
import ApiDocumentation from "../src/component/Resources/ApiDocumentation"
import Status from "../src/component/Footer/Status"
import Cookies from "../src/component/Footer/Cookies"
import ForgotPassword from "../src/component/ForgotPassword"
import ForgotOtpVerify from "../src/component/ForgotOtpVerify"
import "./App.css"
function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme === "dark-mode";
});
const [isLoggedin, setLogedin] = useState(() => {
  return !!localStorage.getItem("token");
});

useEffect(() => {
  axios.get(`${import.meta.env.VITE_API_BASE_URL}`);
}, []);

const [user, setUser] = useState(() => {
  const name = localStorage.getItem("userName");
  return name ? { name } : null;
});

  const [isModalOpen, setIsModalOpen] = useState(true);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
useEffect(() => {
  const theme = isDarkMode ? "dark-mode" : "light-mode";

  document.body.className = theme;
  localStorage.setItem("theme", theme);

}, [isDarkMode]);



  const handleClose = () => {
    setIsModalOpen(false);
  };

  // routes creation
  // ... baki imports
const router = createBrowserRouter([

  {
    path: "/",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <LandingPage isDarkMode={isDarkMode} />
      </>
    ),
  },
  {
    path: "/expense-tracking",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <ExpenseTracking/>
      </>
    ),
  },
  {
    path: "/budget-planning",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <BudgetPlanning/>
      </>
    ),
  },
  {
    path: "/email-alerts",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <EmailAlerts/>
      </>
    ),
  },
  {
    path: "/visual-reports",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <VisualReports/>
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <AboutUs/>
      </>
    ),
  },
  {
    path: "/privacy-policy",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <PrivacyPolicy/>
      </>
    ),
  },
  {
    path: "/term-service",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <TermsOfService/>
      </>
    ),
  },
  {
    path: "/contact-support",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <ContactSupport/>
      </>
    ),
  },
  {
    path: "/help-center",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <HelpCenter/>
      </>
    ),
  },
  {
    path: "/api-documentation",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <ApiDocumentation/>
      </>
    ),
  },
  {
    path: "/status",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <Status/>
      </>
    ),
  },
  {
    path: "/cookies",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <Cookies/>
      </>
    ),
  },

  {
    path: "/login",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <Login isOpen={true}  setLogedin={setLogedin} setUser={setUser}/>
      </>
    ),
  },

  {
    path: "/signup",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <SignUp isOpen={true}/>
      </>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <ForgotPassword/>
      </>
    ),
  },
  {
    path: "/forgot-password-otp-verify",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <ForgotOtpVerify/>
      </>
    ),
  },
  // 🔒 Protected routes group
  {
    element: <ProtectedRoute />,
    children: [

      {
        path: "/dashboard",
        element: (
          <>
            <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
            <Dashboard />
          </>
        ),
      },


    ]
  },
  {
    path: "/otp",
    element: (
      <>
        <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} setLogedin={setLogedin} isLoggedin={isLoggedin} user={user} />
        <Otp setLogedin={setLogedin} />
      </>
    ),
  },

]);

  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;