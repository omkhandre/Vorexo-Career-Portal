import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import JobPortal from "./components/JobPortal";
import EmployerDashboard from "./components/EmployerDashboard";
import EmployerLogin from "./components/EmployerLogin";
import ApplicationDetails from "./components/ApplicationDetails";

function App() {
  const [isEmployerLoggedIn, setIsEmployerLoggedIn] = useState(false);
  const [showEmployerLogin, setShowEmployerLogin] = useState(false);

  const handleEmployerLogin = () => {
    setIsEmployerLoggedIn(true);
    setShowEmployerLogin(false);
  };

  const handleEmployerLogout = () => {
    setIsEmployerLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route
          path="/"
          element={
            showEmployerLogin ? (
              <EmployerLogin
                onLogin={handleEmployerLogin}
                onBack={() => setShowEmployerLogin(false)}
              />
            ) : isEmployerLoggedIn ? (
              <EmployerDashboard onLogout={handleEmployerLogout} />
            ) : (
              <JobPortal onEmployerLogin={() => setShowEmployerLogin(true)} />
            )
          }
        />

        {/* 🔥 VIEW APPLICATION DETAILS */}
        <Route
          path="/applications/:id"
          element={<ApplicationDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
