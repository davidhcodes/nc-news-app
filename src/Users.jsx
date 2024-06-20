import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { getUsers } from "../utils/api";
import Header from "./Header";

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
      <Header />
      <h1> Click a user to login as </h1>
      <p>Select User:</p>
      <ul className="userList">
        {userList.map((user) => {
          return (
            <li key={user.username}>
              <button onClick={updateUsername}>{user.username}</button>
            </li>
          );
        })}
      </ul>
      {/* </body> */}
    </>
  );
}

export default Users;
