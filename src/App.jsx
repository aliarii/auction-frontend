import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthProvider } from "./contexts/AuthContext";
import NavigationRoutes from "./routes/NavigationRoutes";
import { logoutUser, validateToken } from "./store/slices/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem("token");

    if (jwt) {
      dispatch(validateToken(jwt)).then((data) => {
        if (!data.payload.success) {
          dispatch(logoutUser());
        }
      });
    }
  }, [dispatch]);

  return (
    <div className="h-screen flex flex-col bg-dark-7">
      <AuthProvider>
        <NavigationRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
