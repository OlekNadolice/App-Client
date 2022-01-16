import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import "./global.css";
import Home from "./pages/Home/Home";
import Welcome from "./pages/Welcome/Welcome";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/Settings/Settings";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import User from "./pages/User/User";
import Friends from "./pages/Friends/Friends";
import Posts from "./pages/Posts/Posts";
import Info from "./pages/Info/Info";
import NotFounds from "./pages/NotFound/NotFounds";
import { authContext } from "./context/AuthContext";
import Chat from "./pages/Chat/Chat";
import React from "react";
function App() {
  const { isLoggedIn } = useContext(authContext);

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn && <Header />}
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Welcome />} />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="login" />} />
          <Route
            path="/login"
            element={!isLoggedIn ? <Login /> : <Navigate to="/home" />}
          />
          <Route
            path="/register"
            element={!isLoggedIn ? <Register /> : <Navigate to="/home" />}
          />
          <Route
            path="/settings"
            element={isLoggedIn ? <Settings /> : <Navigate to="/login" />}
          />
          <Route
            path="/users/:id"
            element={isLoggedIn ? <User /> : <Navigate to="/login" />}
          >
            <Route path="/users/:id/friends" element={<Friends />} />
            <Route path="/users/:id/posts" element={<Posts />} />
            <Route path="/users/:id/info" element={<Info />} />
          </Route>
          <Route path="/chat" element={isLoggedIn ? <Chat /> : <Navigate to="login" />} />

          <Route
            path="*"
            element={isLoggedIn ? <NotFounds /> : <Navigate to="/login" />}
          />
        </Routes>
        {isLoggedIn && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
