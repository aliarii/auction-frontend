import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../store/slices/authSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    nameError: "",
    surnameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    let isValid = true;
    let newErrors = { ...errors };

    if (!userData.name) {
      newErrors.nameError = "Enter Name";
      isValid = false;
    } else {
      newErrors.nameError = "";
    }

    if (!userData.surname) {
      newErrors.surnameError = "Enter Surname";
      isValid = false;
    } else {
      newErrors.surnameError = "";
    }

    if (!userData.username) {
      newErrors.usernameError = "Enter Username";
      isValid = false;
    } else {
      newErrors.usernameError = "";
    }

    if (!userData.email) {
      newErrors.emailError = "Enter Email";
      isValid = false;
    } else {
      newErrors.emailError = "";
    }

    if (!userData.password) {
      newErrors.passwordError = "Enter Password";
      isValid = false;
    } else {
      newErrors.passwordError = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!validateForm()) return;

    // Dispatch register action if no errors
    dispatch(registerUser(userData)).then((data) => {
      if (data.payload.success) {
        navigate("/login"); // You can redirect to login page after successful registration
      } else {
        setError(data.payload.message);
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="m-auto flex w-80 flex-col gap-4 rounded-xl border bg-white p-4 shadow-lg md:w-96">
        <h1 className="text-4xl font-medium">Register</h1>
        {error && <div className="text-red-500">{error || "Error"}</div>}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            autoCapitalize="off"
            className="w-full rounded-lg border border-light-10 bg-white px-3 py-3 outline-none"
            placeholder="Name"
            name="name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          {errors.nameError && (
            <h2 className="-mt-4 text-sm text-red-500">*{errors.nameError}</h2>
          )}
          <input
            type="text"
            autoCapitalize="off"
            className="w-full rounded-lg border border-light-10 bg-white px-3 py-3 outline-none"
            placeholder="Surname"
            name="surname"
            value={userData.surname}
            onChange={(e) =>
              setUserData({ ...userData, surname: e.target.value })
            }
          />
          {errors.surnameError && (
            <h2 className="-mt-4 text-sm text-red-500">
              *{errors.surnameError}
            </h2>
          )}
          <input
            type="text"
            autoCapitalize="off"
            className="w-full rounded-lg border border-light-10 bg-white px-3 py-3 outline-none"
            placeholder="Username"
            name="username"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
          {errors.usernameError && (
            <h2 className="-mt-4 text-sm text-red-500">
              *{errors.usernameError}
            </h2>
          )}
          <input
            type="email"
            autoCapitalize="off"
            className="w-full rounded-lg border border-light-10 bg-white px-3 py-3 outline-none"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          {errors.emailError && (
            <h2 className="-mt-4 text-sm text-red-500">*{errors.emailError}</h2>
          )}
          <div className="flex w-full">
            <input
              type={showPassword ? "text" : "password"}
              autoCapitalize="off"
              className="w-full rounded-l-lg border-y border-l border-light-10 bg-white px-3 py-3 outline-none"
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <div
              className="flex cursor-pointer items-center rounded-r-lg border-y border-r border-light-10 bg-white px-3 outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>
          {errors.passwordError && (
            <h2 className="-mt-4 text-sm text-red-500">
              *{errors.passwordError}
            </h2>
          )}

          <button
            className="w-full rounded-lg bg-green-400 px-3 py-2 text-xl font-medium text-white"
            type="submit"
          >
            Register
          </button>
        </form>
        <Link
          className="text-center text-sm font-bold text-blue-700 no-underline dark:text-blue-500"
          to={"/login"}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
