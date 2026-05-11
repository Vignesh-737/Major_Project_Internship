import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectRoutes from "./components/ProtectRoutes";
import Medicines from "./pages/Medicines";
import Stock from "./pages/Stocks";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ForgotPassword from "./pages/ForgotPassword";
import Billing from "./pages/Billing";
import RecentActivities from "./pages/RecentActivities";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route path="/dashboard" element={ <ProtectRoutes><Dashboard /></ProtectRoutes>}/>
        <Route path="/medicines" element={ <ProtectRoutes> <Medicines /> </ProtectRoutes>}/>
        <Route path="/stock"element={<ProtectRoutes><Stock /></ProtectRoutes>}/>
        <Route path="/billing" element={<ProtectRoutes><Billing /></ProtectRoutes>}/>
        <Route path="/profile"element={<ProtectRoutes><Profile /></ProtectRoutes>}/>
        <Route path="/activities" element={<ProtectRoutes><RecentActivities /></ProtectRoutes>}/>
        <Route path="/admin" element={<ProtectRoutes><Admin /></ProtectRoutes>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;