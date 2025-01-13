import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../store/slices/authSlice";
import { useUser } from "../contexts/UserContext";
import { getUserById } from "../store/slices/userSlice";

const LoginPage = () => {
  const { login } = useAuth();
  const { setRole } = useUser();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.email === "" || userData.password === "") {
      if (userData.email === "" && userData.password === "") {
        setUserNameError("Enter Username");
        setPasswordError("Enter Password");
      } else if (userData.email === "") setUserNameError("Enter Email");
      else setPasswordError("Enter Password");
    } else {
      try {
        const result = await dispatch(loginUser(userData));
        if (!result.payload.success) return setError(result.payload.message);

        await login({
          user: result.payload.data.user,
          token: result.payload.data.token,
        });
        await setRole(result.payload.data.user.role);
        await dispatch(getUserById(result.payload.data.user._id));
        navigate("/");
      } catch (error) {
        console.error(error);
        setError(error.response.data.error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleEmailChange = (e) => {
    setUserData({ ...userData, email: e.target.value });
    setError("");
    setUserNameError("");
  };
  const handlePasswordChange = (e) => {
    setUserData({ ...userData, password: e.target.value });
    setError("");
    setPasswordError("");
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col w-80 md:w-96 m-auto p-4 gap-4 rounded-xl bg-white border shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-medium">Login</h1>
        </div>
        {error && <div className="text-red-500">{error || "Error"}</div>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            autoCapitalize="off"
            autoComplete="on"
            className="w-full py-3 px-3 border border-light-10 outline-none bg-white rounded-lg"
            placeholder="Email"
            value={userData.email}
            onChange={handleEmailChange}
          />
          {userNameError && (
            <h2 className="-mt-4 text-sm text-red-500">*{userNameError}</h2>
          )}
          <div className="flex w-full">
            <input
              type={showPassword ? "text" : "password"}
              autoCapitalize="off"
              name="password"
              className="w-full py-3 px-3 border-l border-y border-light-10 outline-none bg-white rounded-l-lg"
              placeholder="Password"
              value={userData.password}
              onChange={handlePasswordChange}
            />
            <div
              className="px-3 flex items-center rounded-r-lg border-r border-y border-light-10 outline-none bg-white cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>
          {passwordError && (
            <h2 className="-mt-4 text-sm text-red-500">*{passwordError}</h2>
          )}
          <button
            className="w-full rounded-lg py-2 px-3 bg-green-400 text-white font-medium text-xl"
            type="submit"
          >
            <h2>Login</h2>
          </button>

          <span className="text-center font-medium">Or</span>

          <Link
            className="text-center w-full rounded-lg py-2 px-3 bg-green-400 text-white font-medium text-xl"
            to={"/register"}
          >
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
