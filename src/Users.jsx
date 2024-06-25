import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { getUsers } from "../utils/api";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./Users.css"; // Import the CSS file
import homeSymbol from "./assets/homeSymbol.png";

function Users({ setIsLoggedIn }) {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    getUsers()
      .then((allUsers) => {
        setUserList(allUsers);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err);
        setIsLoading(false);
      });
  }, []);

  const profilePhotos = () => {
    {
      userList.map((user) => {
        return (
          <li key={user.username}>
            <div className="flex mb-5 items-center">
              <img className="h-10 ml-5" src={user.avatar_url} />
              {/* <button onClick={updateUsername}>{user.username}</button> */}
            </div>
          </li>
        );
      });
    }
  };

  function updateUsername(event) {
    const selectedUsername = event.target.innerHTML;
    let selectedUserObject = {};
    userList.map((user) => {
      if (user.username === selectedUsername) {
        return (selectedUserObject = { ...user });
      }
    });
    setUser(selectedUserObject);
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen bg-violet-950">
      <div className="absolute top-0 right-0 mt-6">
        <div className="text-white flex">
          <div>
            <Link className="link" to="/">
              <img className=" w-24 " src={homeSymbol} />
            </Link>
          </div>
        </div>
      </div>
      <h1 className="text-white  text-7xl text-center absolute top-0 mt-40">
        Select user
      </h1>
      <ul className="grid grid-cols-2  ">
        {userList.map((user) => {
          return (
            <li key={user.username} className=" flex flex-col items-center">
              <div className="flex flex-col items-center mt-10">
                <img
                  className="w-12 h-12 rounded-full  bg-white r"
                  src={user.avatar_url}
                  alt={user.username}
                />
                {/* </div> */}
                {/* <div className="bg-purple-900 "> */}
                <button
                  className="bg-purple-950 text-white px-4 py-2 mt-2 ml-12 active:bg-black active:text-white "
                  onClick={updateUsername}
                >
                  {user.username}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Users;
