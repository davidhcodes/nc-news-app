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
            <div className="flex mb-5 items-center md:flex md:mb-5 md:items-center">
              <img
                className="h-10 ml-5 md:h-24 md:w-16"
                src={user.avatar_url}
              />
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
    <>
      <header className=" text-center bg-violet-950 pb-10 md:text-center md:bg-violet-950 md:pb-10 md:w-full">
        <Header />
      </header>
      <body className="md:bg-violet-950">
        <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen bg-violet-950 md:container md:mx-auto md:p-4 md:flex md:flex-col md:items-center md:justify-center md:min-h-screen md:bg-violet-950">
          <h1 className="text-white  text-7xl text-center absolute top-0 mt-40 md:shadow-lg">
            Select user
          </h1>
          <ul className="grid grid-cols-2  md:grid md:grid-cols-2 md:mb-44">
            {userList.map((user) => {
              return (
                <li
                  key={user.username}
                  className=" flex flex-col items-center md:flex md:flex-col md:items-center "
                >
                  <div className="flex flex-col items-center mt-10 md:flex md:flex-col md:items-center ">
                    <img
                      className="w-12 h-12 rounded-full  bg-white md:w-36 md:h-36"
                      src={user.avatar_url}
                      alt={user.username}
                    />
                    {/* </div> */}
                    {/* <div className="bg-purple-900 "> */}
                    <button
                      className="bg-purple-950 text-white px-4 py-2 mt-2 ml-12 active:bg-black active:text-white md:bg-violet-950 md:text-white md:px-4 md:py-2 md:mt-2 md:mr-12 md:active:bg-black md:active:text-white md:text-3xl "
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
      </body>
    </>
  );
}

export default Users;
