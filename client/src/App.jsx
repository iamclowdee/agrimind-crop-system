import { Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Soil from "./pages/SoilHealth";
import History from "./pages/History";
import Signup from "./pages/Signup";
import Result from "./pages/Result";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ChatBot from "./chatbot/components/Chatbot";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user } = useAuth();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>}/>

      <Route
          path="/history"
          element={
              <ProtectedRoute>
                  <History />
              </ProtectedRoute>}/>

      <Route
          path="/result"
          element={
              <ProtectedRoute>
                  <Result />
              </ProtectedRoute>}/>

      <Route
          path="/soil"
          element={
              <ProtectedRoute>
                  <Soil />
              </ProtectedRoute>}/>

      <Route
          path="/profile"
          element={
              <ProtectedRoute>
                  <Profile />
              </ProtectedRoute>}/>

      <Route
          path="/settings"
          element={
              <ProtectedRoute>
                  <Settings />
              </ProtectedRoute>}/>
      </Routes>
      {user && <ChatBot />}
    </div>
  );
}

export default App;