import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer, Loading } from "components/index";
import { authContext } from "context/AuthContext";
import { useContext, useEffect, lazy, Suspense } from "react";
import { PublicRoute, PrivateRoute } from "helpers/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "global.css";

import Login from "pages/Login/Login";
import Register from "pages/Register/Register";

const Chat = lazy(() => import("pages/Chat/Chat"));
const Home = lazy(() => import("pages/Home/Home"));
const Welcome = lazy(() => import("pages/Welcome/Welcome"));

const Settings = lazy(() => import("pages/Settings/Settings"));
const User = lazy(() => import("pages/User/User"));
const Info = lazy(() => import("pages/Info/Info"));
const Friends = lazy(() => import("pages/Friends/Friends"));
const NotFounds = lazy(() => import("pages/NotFound/NotFounds"));
const OAuthVerificationPage = lazy(() =>
  import("pages/oAuthVerification/OAuthVerificationPage")
);

function App() {
  const { isLoggedIn, socket } = useContext(authContext);

  useEffect(() => {
    socket && isLoggedIn && socket.connect();
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("friendsRequest", data => {
        toast(` ${data} has send you a friend request!`, {
          className: "a",
        });
      });

      return () => socket.removeAllListeners();
    }
  });

  const showToast = () => {
    toast("Someone has send you a message!", {
      className: "a",
    });
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="App">
        <ToastContainer
          hideProgressBar={true}
          autoClose={2000}
          position="top-right"
          theme="#803939"
        />
        <BrowserRouter>
          {isLoggedIn && <Header />}
          <Routes>
            <Route
              path="/veryfied/:token/:id/:name/:profileImage"
              element={<PublicRoute element={<OAuthVerificationPage />} />}
            />
            <Route path="/" element={<PublicRoute element={<Welcome />} />} />
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            <Route path="/login" element={<PublicRoute element={<Login />} />} />
            <Route path="/register" element={<PublicRoute element={<Register />} />} />
            <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
            <Route path="/users/:id" element={<PrivateRoute element={<User />} />}>
              <Route
                path="/users/:id/friends"
                element={<PrivateRoute element={<Friends />} />}
              />
              <Route
                path="/users/:id/info"
                element={<PrivateRoute element={<Info />} />}
              />
            </Route>
            <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
            <Route path="*" element={<PrivateRoute element={<NotFounds />} />} />
          </Routes>
          {isLoggedIn && <Footer />}
        </BrowserRouter>
      </div>
    </Suspense>
  );
}

export default App;
