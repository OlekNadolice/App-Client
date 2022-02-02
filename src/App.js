import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header, Footer } from "components/index";
import { authContext } from "context/AuthContext";
import { useContext, useEffect } from "react";
import "global.css";
import {
  Welcome,
  Login,
  Register,
  Settings,
  User,
  Chat,
  Home,
  Info,
  Friends,
  NotFounds,
  OAuthVerificationPage,
} from "pages/imports";

function App() {
  const { isLoggedIn, socket } = useContext(authContext);

  useEffect(() => {
    socket && isLoggedIn && socket.connect();
  }, [socket]);

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn && <Header />}
        <Routes>
          <Route
            path="/veryfied/:token/:id/:name/:profileImage"
            element={!isLoggedIn ? <OAuthVerificationPage /> : <Navigate to="/home" />}
          />
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
