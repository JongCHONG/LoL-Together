import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Users from "./pages/Users/Users";
import Dashboard from "./pages/Dashboard/Dashboard";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
export default App;
