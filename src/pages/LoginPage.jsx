import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../store/slices/authSlice";
import { useUser } from "../contexts/UserContext";

const LoginPage = () => {
  const { login } = useAuth();
  const { setRole } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const routeToRegister = () => {
    navigate(`/register`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      if (email === "" && password === "") {
        setUserNameError("Enter Username");
        setPasswordError("Enter Password");
      } else if (email === "") setUserNameError("Enter Username Or Email");
      else setPasswordError("Enter Password");
    } else {
      try {
        const result = await dispatch(loginUser({ email, password }));
        if (!result.payload.success) return;

        await login({
          user: result.payload.data.user,
          token: result.payload.data.token,
        });
        await setRole(result.payload.data.user.role);
        // console.log(localStorage.getItem("token"));
        navigate("/");
        // navigate("/");
        // .then((data) => {
        //   return login({
        //     user: data?.payload?.data?.user,
        //     token: data?.payload?.data?.token,
        //   });
        // })
        // .then(() => {
        //   return navigate("/");
        // });
      } catch (error) {
        console.error(error);
        setErrorMessage(error.response.data.error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrorMessage("");
    setUserNameError("");
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorMessage("");
    setPasswordError("");
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-white dark:bg-dark-7">
      <div className="flex flex-col w-80 md:w-96 m-auto p-4 rounded-xl bg-light-2 dark:bg-dark-5 gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-dark-7 dark:text-light-8 text-4xl font-semibold ">
            {"Login"}
          </h1>
        </div>
        {errorMessage && (
          <div className="text-red-500">{errorMessage || "Error"}</div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            autoCapitalize="off"
            autoComplete="on"
            className="w-full py-3 px-3 border border-light-10 outline-none bg-white rounded-lg"
            placeholder={"Username or email address"}
            value={email}
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
              placeholder={"Password"}
              value={password}
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
            className="w-full rounded-lg py-2 px-3 cursor-pointer bg-light-8 font-semibold text-xl"
            type="submit"
          >
            <h2>{"Login"}</h2>
          </button>

          <a
            className="text-center cursor-pointer text-blue-700 dark:text-blue-500 font-bold no-underline text-sm"
            href="https://www.google.com"
          >
            {"Forgot password?"}
          </a>
          <span className="text-dark-7 dark:text-light-8 text-center font-medium">
            {"Or"}
          </span>

          <button
            className="w-full rounded-lg py-2 px-3 cursor-pointer bg-light-8 font-semibold text-xl"
            type="button"
            onClick={routeToRegister}
          >
            {"Create an account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
