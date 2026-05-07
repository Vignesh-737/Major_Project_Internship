import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectRoutes from "./components/ProtectRoutes";
import Medicines from "./pages/Medicines";
import Stock from "./pages/Stocks";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route path="/dashboard" element={ <ProtectRoutes><Dashboard /></ProtectRoutes>}/>
        <Route path="/medicines" element={ <ProtectRoutes> <Medicines /> </ProtectRoutes>}/>
        <Route path="/stock"element={<ProtectRoutes><Stock /></ProtectRoutes>}/>
        <Route path="/profile"element={<ProtectRoutes><Profile /></ProtectRoutes>}/>
        <Route path="/admin" element={<ProtectRoutes><Admin /></ProtectRoutes>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;