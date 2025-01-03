import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BtnMdCancel from "../components/Button/BtnMdCancel";
import BtnMdDelete from "../components/Button/BtnMdDelete";
import BtnMdSave from "../components/Button/BtnMdSave";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../store/slices/userSlice";
import HorizontalLine from "../components/HorizontalLine";
import { registerUser } from "../store/slices/authSlice";

const UserSettingsPage = () => {
  const views = [
    {
      id: "1",
      element: (props) => (
        <UserDetailsView {...props} handleCancelClick={handleCancelClick} />
      ),
    },
    {
      id: "2",
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
      <div className="flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-light-4  overflow-auto">
        <div className="hidden md:flex justify-between items-end w-full min-h-6">
          <h2>Users</h2>
        </div>

        <HorizontalLine />

        <div className="flex flex-col w-full h-full gap-2 overflow-auto">
          <h2
            className={`text-center rounded-md cursor-pointer text-light-1 bg-success`}
            onClick={() => handleViewSelect(1)}
          >
            + Add New User
          </h2>
          <UsersTable users={users} handleEditClick={handleViewSelect} />
        </div>
      </div>
      {selectedView}
    </div>
  );
};

export default UserSettingsPage;

const UsersTable = ({ users, handleEditClick }) => {
  // console.log(users);

  return (
    <div className="flex flex-col h-full w-full rounded-md text-xs  text-left overflow-auto">
      <div className="flex items-center min-h-10 w-full px-1 bg-light-5  sticky top-0 z-10">
        <h2 className="w-20 text-center ">#</h2>
        <h2 className="w-full ">Full Name</h2>
        <h2 className="w-full ">Username</h2>
        <h2 className="w-full ">Role</h2>
        <h2 className="w-20 ">Edit</h2>
      </div>

      <div className="flex flex-col h-full w-full bg-light-7  overflow-auto">
        {users?.map((user, idx) => (
          <div
            key={user._id}
            className="flex items-center min-h-8 w-full px-1 border-b dark:border-dark-7"
          >
            <h2 className="w-20 py-2 text-center">{idx + 1}</h2>
            <h2 className="w-full py-2">
              {user.name} {user.surname}
            </h2>
            <h2 className="w-full py-2">{user.username}</h2>
            <h2 className="w-full py-2">{user.role}</h2>
            <h2 className="w-20 py-2 text-center">
              <EditIcon
                className="cursor-pointer"
                fontSize="small"
                onClick={() => handleEditClick(0, user)}
              />
            </h2>
          </div>
        ))}
      </div>
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
    <div className="flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-light-4 overflow-auto">
      <div className="flex justify-between items-end w-full min-h-6">
        <h2>User Details</h2>
        {user && <BtnMdCancel clickEvent={handleCancelClick} />}
      </div>
      <HorizontalLine />

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
                placeholder="BidLimit"
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
    <div className="flex flex-col w-full h-full p-2 gap-2 rounded-lg bg-light-4 overflow-auto">
      <div className="flex justify-between items-end w-full min-h-6">
        <h2>Add New User</h2>
        <BtnMdCancel clickEvent={handleCancelClick} />
      </div>

      <HorizontalLine />

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
            placeholder="BidLimit"
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
