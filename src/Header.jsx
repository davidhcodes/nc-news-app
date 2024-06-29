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
        <h1 className="text-white shadow-lg font-TimesNew mb-5"> HG News</h1>
      </div>
      <div className="bg-violet-950 mt-5">
        <div className="text-white bg-violet-950  absolute top-0 right-0 mt-14    flex  ">
          {/* <div className=" "> */}
          <Link className="link" to="/articles">
            <button className=" w-full  rounded-lg shadow-lg p-2 font-sans bg-transparent cursor-pointer mr-10 border-solid border-1   text-white text-xxs">
              <p className="text-sm font-TimesNew font-extrabold">
                {" "}
                All Articles
              </p>
            </button>
          </Link>
          <Link className="link" to="/topics">
            <button className=" w-full  rounded-lg shadow-lg p-2 font-sans bg-transparent cursor-pointer mr-20 border-solid border-1   text-white text-xxs">
              <p className="text-sm font-TimesNew font-extrabold"> Topics</p>
            </button>
          </Link>

          {/* <div className=""> */}
          <Link className="link" to="/">
            <img className=" w-12 " src={homeSymbol} />
          </Link>
          <Link className="link" to="/users">
            <img className=" w-7 " src={loginSymbol} />
          </Link>
          {user ? (
            <img className="w-10 h-7 mr-5 bg-white " src={user.avatar_url} />
          ) : (
            <>
              {" "}
              <p> Guest </p>
            </>
          )}

          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Header;
