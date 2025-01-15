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
    <div className="flex h-full w-full flex-col gap-2 overflow-auto md:flex-row">
      <div className="flex h-full w-full flex-col gap-2 overflow-auto p-2">
        <h2>Users</h2>

        <hr className="w-full border border-green-200" />

        <button
          className={`overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-green-500 py-1 text-white`}
          onClick={() => handleViewSelect(1)}
        >
          + New User
        </button>
        <div className="flex h-fit w-full flex-col gap-2 overflow-auto">
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
    <div className="flex h-full w-full flex-col overflow-auto rounded-md text-left text-xs">
      <table className="w-full table-auto text-left text-sm">
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
              <td className="py-2 pl-5 pr-4">
                <FaUserEdit
                  className="cursor-pointer text-2xl text-green-500"
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
    <div className="flex h-full w-full flex-col gap-2 overflow-auto p-2">
      <div className="relative flex min-h-6 w-full items-end justify-between">
        <h2>User Details</h2>
        <div className="absolute bottom-0 right-0">
          {user && <BtnMdCancel clickEvent={handleCancelClick} />}
        </div>
      </div>
      <hr className="w-full border border-green-200" />

      <div className="flex h-full w-full flex-col overflow-auto px-2 pb-2">
        {user ? (
          <div className="flex h-full w-full flex-col gap-2 overflow-auto">
            <div className="flex h-full w-full flex-col gap-2 overflow-auto">
              <h2>{userData.id}</h2>
              <h2>Name:</h2>
              <input
                type="text"
                autoCapitalize="off"
                className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none dark:text-dark-8"
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
                className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none dark:text-dark-8"
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
                className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none dark:text-dark-8"
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
                className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none dark:text-dark-8"
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
                className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none dark:text-dark-8"
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
                className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 focus:outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <h2>Password:</h2>
              <input
                className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none dark:text-dark-8"
                type="password"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </div>
            <div className="flex w-full justify-end gap-2">
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
    <div className="flex h-full w-full flex-col gap-2 overflow-auto p-2">
      <div className="relative flex min-h-6 w-full items-end justify-between">
        <h2>New User</h2>
        <div className="absolute bottom-0 right-0">
          <BtnMdCancel clickEvent={handleCancelClick} />
        </div>
      </div>

      <hr className="w-full border border-green-200" />

      <div className="flex h-full w-full flex-col overflow-auto px-2 pb-2">
        <div className="flex h-full w-full flex-col gap-2 overflow-auto">
          <h2>{userData.id}</h2>
          <h2>Name:</h2>
          <input
            type="text"
            autoCapitalize="off"
            className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none dark:text-dark-8"
            placeholder="Name"
            name="name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <h2>Surname:</h2>
          <input
            type="text"
            autoCapitalize="off"
            className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none dark:text-dark-8"
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
            className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none dark:text-dark-8"
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
            className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none dark:text-dark-8"
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
            className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 outline-none dark:text-dark-8"
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
            className="w-full rounded-lg border border-light-10 bg-white px-2 py-1 focus:outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <h2>Password:</h2>
          <div className="flex w-full">
            <input
              type={showPassword ? "text" : "password"}
              autoCapitalize="off"
              className="w-full rounded-l-lg border-y border-l border-light-10 bg-white px-2 py-1 outline-none dark:text-dark-8"
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <div
              className="flex cursor-pointer items-center rounded-r-lg border-y border-r border-light-10 bg-white px-3 outline-none dark:text-dark-8"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
          </div>
          <div className="flex w-full justify-end gap-2">
            <BtnMdSave clickEvent={handleUserSave} />
          </div>
        </div>
      </div>
    </div>
  );
};
