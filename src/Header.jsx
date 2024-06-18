import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { Link } from "react-router-dom";

function Header() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <div className="topPageHeader">
        <div className="HeaderHomeButton">
          <Link className="link" to="/">
            <h3>🏡</h3>
          </Link>
        </div>
        <div className="HeaderPageText">
          <p>
            {"Current User:"}
            {user.username}{" "}
            <img className="HeaderPageUserLogo" src={user.avatar_url} />
          </p>
        </div>
      </div>
    </>
  );
}

export default Header;

{
  /* <button className="">🏡</button> */
}
