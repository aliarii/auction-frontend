import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import BtnMdCancel from "../components/Button/BtnMdCancel";
import BtnMdDelete from "../components/Button/BtnMdDelete";
import BtnMdSave from "../components/Button/BtnMdSave";
import { registerUser } from "../store/slices/authSlice";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../store/slices/userSlice";

const UserSettingsPage = () => {
  const views = [
    {
      id: 1,
      element: (props) => (
        <UserDetailsView {...props} handleCancelClick={handleCancelClick} />
      ),
    },
    {
      id: 2,
      element: (props) => (
        <AddNewUserView {...props} handleCancelClick={handleCancelClick} />
      ),
    },
  ];
  const [selectedView, setSelectedView] = useState(null);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleCancelClick = () => {
    setSelectedView(null);
  };

  const handleViewSelect = (index, props) => {
    setSelectedView(views[index].element(props));
  };
  return (
    <div className="flex flex-col md:flex-row w-full h-full gap-2 overflow-auto">
      <div className="flex flex-col w-full h-full p-2 gap-2 overflow-auto">
        <h2>Users</h2>

        <hr className="w-full border-green-200 border" />

        <button
          className={`rounded-md text-white bg-green-500 py-1 whitespace-nowrap overflow-hidden text-ellipsis`}
          onClick={() => handleViewSelect(1)}
        >
          + New User
        </button>
        <div className="flex flex-col w-full h-fit gap-2 overflow-auto">
          <UsersTable users={users} handleEditClick={handleViewSelect} />
        </div>
      </div>
      {selectedView}
    </div>
  );
};

export default UserSettingsPage;

const UsersTable = ({ users, handleEditClick }) => {
  return (
    <div className="flex flex-col h-full w-full rounded-md text-xs  text-left overflow-auto">
      <table className="table-auto w-full text-left text-sm">
        <thead>
          <tr>
            <th className="px-4">#</th>
            <th className="px-4">Full Name</th>
            <th className="px-4">User Name</th>
            <th className="px-4">Role</th>
            <th className="px-4">Edit</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{idx + 1}</td>
              <td className="px-4 py-2">
                {user.name} {user.surname}
              </td>
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="pl-5 pr-4 py-2">
                <FaUserEdit
                  className="cursor-pointer text-2xl text-green-500 "
                  onClick={() => handleEditClick(0, user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserDetailsView = ({ _id, handleCancelClick }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    id: _id,
    name: "",
    surname: "",
    username: "",
    email: "",
    bidLimit: 0,
    role: "user",
    password: "",
  });
  useEffect(() => {
    dispatch(getUserById(_id));
  }, [_id, dispatch]);
  useEffect(() => {
    if (user) {
      setUserData({ ...user, password: "" });
    }
  }, [user]);

  const handleUserUpdate = async () => {
    const reqData = { ...userData, orgPassword: user.password };
    dispatch(updateUser(reqData))
      .then(() => dispatch(getUsers()))
      .then(handleCancelClick);
  };

  const handleUserDelete = () => {
    dispatch(deleteUser(_id))
      .then(() => dispatch(getUsers()))
      .then(handleCancelClick);
  };

  return (
    <div className="flex flex-col w-full h-full p-2 gap-2 overflow-auto">
      <div className="relative flex justify-between items-end w-full min-h-6">
        <h2>User Details</h2>
        <div className="absolute bottom-0 right-0">
          {user && <BtnMdCancel clickEvent={handleCancelClick} />}
        </div>
      </div>
      <hr className="w-full border-green-200 border" />

      <div className="flex flex-col w-full h-full overflow-auto px-2 pb-2">
        {user ? (
          <div className="flex flex-col w-full h-full gap-2 overflow-auto">
            <div className="flex flex-col w-full h-full gap-2 overflow-auto">
              <h2>{userData.id}</h2>
              <h2>Name:</h2>
              <input
                type="text"
                autoCapitalize="off"
                className="w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8"
                placeholder="Name"
                name="name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />

              <h2>Surname:</h2>
              <input
                type="text"
                autoCapitalize="off"
                className="w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8"
                placeholder="Surname"
                name="surname"
                value={userData.surname}
                onChange={(e) =>
                  setUserData({ ...userData, surname: e.target.value })
                }
              />
              <h2>Username:</h2>
              <input
                type="text"
                autoCapitalize="off"
                className="w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8"
                placeholder="Username"
                name="username"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
              <h2>Email:</h2>
              <input
                type="email"
                autoCapitalize="off"
                className="w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
              <h2>Bid Limit:</h2>
              <input
                type="number"
                autoCapitalize="off"
                className="w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8"
                placeholder="Bid Limit"
                name="bidlimit"
                value={userData.bidLimit}
                onChange={(e) =>
                  setUserData({ ...userData, bidLimit: e.target.value })
                }
              />
              <h2>Role:</h2>
              <select
                name="role"
                value={userData.role}
                onChange={(e) =>
                  setUserData({ ...userData, role: e.target.value })
                }
                className="w-full py-1 px-2 border border-light-10 bg-white rounded-lg focus:outline-none "
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <h2>Password:</h2>
              <input
                className="w-full py-1 px-2 border border-light-10 outline-none bg-white rounded-lg dark:text-dark-8"
                type="password"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end w-full gap-2">
              <BtnMdDelete clickEvent={handleUserDelete} />
              <BtnMdSave clickEvent={handleUserUpdate} />
            </div>
          </div>
        ) : (
          <h2>Select a user.</h2>
        )}
      </div>
    </div>
  );
};

const AddNewUserView = ({ handleCancelClick }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    bidLimit: 0,
    role: "user",
    password: "",
  });

  const handleUserSave = async () => {
    dispatch(registerUser(userData))
      .then(() => dispatch(getUsers()))
      .then(handleCancelClick);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col w-full h-full p-2 gap-2 overflow-auto">
      <div className="relative flex justify-between items-end w-full min-h-6">
        <h2>New User</h2>
        <div className="absolute bottom-0 right-0">
          <BtnMdCancel clickEvent={handleCancelClick} />
        </div>
      </div>

      <hr className="w-full border-green-200 border" />

      <div className="flex flex-col w-full h-full overflow-auto px-2 pb-2">
        <div className="flex flex-col w-full h-full gap-2 overflow-auto">
          <h2>{userData.id}</h2>
          <h2>Name:</h2>
          <input
            type="text"
            autoCapitalize="off"
            className="w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8"
            placeholder="Name"
            name="name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <h2>Surname:</h2>
          <input
            type="text"
            autoCapitalize="off"
            className="w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8"
            placeholder="Surname"
            name="surname"
            value={userData.surname}
            onChange={(e) =>
              setUserData({ ...userData, surname: e.target.value })
            }
          />
          <h2>Username:</h2>
          <input
            type="text"
            autoCapitalize="off"
            className="w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8"
            placeholder="Username"
            name="username"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
          <h2>Email:</h2>
          <input
            type="email"
            autoCapitalize="off"
            className="w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <h2>Bid Limit:</h2>
          <input
            type="number"
            autoCapitalize="off"
            className="w-full py-1 px-2 border border-light-10 outline-none  bg-white rounded-lg dark:text-dark-8"
            placeholder="Bid Limit"
            name="bidlimit"
            value={userData.bidLimit}
            onChange={(e) =>
              setUserData({ ...userData, bidLimit: e.target.value })
            }
          />
          <h2>Role:</h2>
          <select
            name="role"
            value={userData.role}
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
            className="w-full py-1 px-2 border border-light-10 bg-white rounded-lg focus:outline-none "
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <h2>Password:</h2>
          <div className="flex w-full">
            <input
              type={showPassword ? "text" : "password"}
              autoCapitalize="off"
              className="w-full py-1 px-2 border-l border-y border-light-10 outline-none bg-white rounded-l-lg dark:text-dark-8"
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <div
              className="px-3 flex items-center rounded-r-lg border-r border-y border-light-10 outline-none bg-white cursor-pointer dark:text-dark-8"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>
          <div className="flex justify-end w-full gap-2">
            <BtnMdSave clickEvent={handleUserSave} />
          </div>
        </div>
      </div>
    </div>
  );
};
