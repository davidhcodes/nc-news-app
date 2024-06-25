import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { Link } from "react-router-dom";
import homeSymbol from "./assets/homeSymbol.png";
import loginSymbol from "./assets/login.png";

function Header() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <div className=" bg-violet-950 pb-10 ">
        <h1 className="text-white shadow-lg font-TimesNew"> HG News</h1>
      </div>
      <div className="bg-violet-950 mt-5">
        <div className="text-white bg-violet-950  absolute top-0 right-0 mt-14  w-full  flex items-center ">
          {/* <div className=" "> */}
          <Link className="link" to="/articles">
            <button className=" w-full  rounded-lg shadow-lg p-2 font-sans bg-transparent cursor-pointer mr-5 border-solid border-1   text-white text-xxs">
              <p className="text-sm font-TimesNew font-extrabold">
                {" "}
                All Articles
              </p>
            </button>
          </Link>
          <button className=" w-full  rounded-lg shadow-lg p-2 font-sans bg-transparent cursor-pointer mr-5 border-solid border-1   text-white text-xxs">
            <p className="text-sm font-TimesNew font-extrabold"> Topics</p>
          </button>
          {/* </div> */}
          <Link className="link" to="/">
            <img className=" w-20 " src={homeSymbol} />
          </Link>
          <Link className="link" to="/users">
            <img className=" w-7 " src={loginSymbol} />
          </Link>
          <div>
            <Link className="link" to="/users">
              {/* <h3 className="float-right text-white text-4xl">Login</h3> */}
            </Link>
          </div>
        </div>
        {/* <div className="float-left text-white mb-7"> */}
        <p>
          {/* {"Current User:"}
          {user.username}{" "}
          <img className="HeaderPageUserLogo" src={user.avatar_url} /> */}
        </p>
        {/* </div> */}
      </div>
    </>
  );
}

export default Header;
