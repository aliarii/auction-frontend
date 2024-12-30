import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [errors, setErrors] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefaul();
    console.log("register");

    // dispatch(registerOwner({ userData: { email, password, companyName, fullName }, navigate, register }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };
  const handleCompanyChange = (event) => {
    setCompanyName(event.target.value);
  };
  // Function to check if an error contains a specific field's name
  const getFieldErrors = (fieldName) => {
    return errors.filter((error) =>
      error.toLowerCase().includes(fieldName.toLowerCase())
    );
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-white dark:bg-dark-7">
      <div className="flex flex-col w-80 md:w-96 m-auto p-4 rounded-xl bg-light-3 dark:bg-dark-5 gap-4">
        <h1 className="text-dark-7 dark:text-light-8 text-4xl font-semibold ">
          {"Register"}
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            autoCapitalize="off"
            className="w-full py-3 px-3 border border-light-10 outline-none bg-white rounded-lg"
            placeholder={"Company Name"}
            name="companyName"
            value={companyName}
            onChange={handleCompanyChange}
          />
          {getFieldErrors("Company Name").map((error, index) => (
            <h2 key={index} className="-mt-4 text-sm text-red-500">
              *{error}
            </h2>
          ))}
          <input
            type="text"
            autoCapitalize="off"
            className="w-full py-3 px-3 border border-light-10 outline-none bg-white rounded-lg"
            placeholder={"Full Name"}
            name="fullName"
            value={fullName}
            onChange={handleFullNameChange}
          />
          {getFieldErrors("Full Name").map((error, index) => (
            <h2 key={index} className="-mt-4 text-sm text-red-500">
              *{error}
            </h2>
          ))}
          <input
            type="text"
            autoCapitalize="off"
            className="w-full py-3 px-3 border border-light-10 outline-none bg-white rounded-lg"
            placeholder={"Email"}
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          {getFieldErrors("Email").map((error, index) => (
            <h2 key={index} className="-mt-4 text-sm text-red-500">
              *{error}
            </h2>
          ))}
          {errorMessage && (
            <h2 className="-mt-4 text-sm text-red-500">*{errorMessage}</h2>
          )}

          <div className="flex w-full">
            <input
              type={showPassword ? "text" : "password"}
              autoCapitalize="off"
              className="w-full py-3 px-3 border-l border-y border-light-10 outline-none bg-white rounded-l-lg"
              placeholder={"Password"}
              name="password"
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
          {getFieldErrors("Password").map((error, index) => (
            <h2 key={index} className="-mt-4 text-sm text-red-500">
              *{error}
            </h2>
          ))}

          <button
            className="w-full rounded-lg py-2 px-3 cursor-pointer bg-light-8 font-semibold text-xl"
            type="submit"
          >
            {"Register"}
          </button>
        </form>
        <a
          className=" text-center cursor-pointer text-blue-700 dark:text-blue-500 font-bold no-underline text-sm"
          href="/login"
        >
          {"Back to Login"}
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
