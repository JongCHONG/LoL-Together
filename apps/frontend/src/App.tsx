import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Users from "./pages/Users/Users";
import Dashboard from "./pages/Dashboard/Dashboard";
import Teams from "./pages/Teams/Teams";

import { UserProvider } from "./contexts/UserContext";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import UserProfile from "./components/UserProfile/UserProfile";
import TeamProfile from "./components/TeamProfile/TeamProfile";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:id"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/team/:id"
            element={
              <PrivateRoute>
                <TeamProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};
export default App;
