import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { Link } from "react-router-dom";
import homeSymbol from "./assets/homeSymbol.png";
import loginSymbol from "./assets/login.png";

function Header() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <div className=" bg-violet-950 pb-10 md:bg-violet-950">
        <h1 className="text-white shadow-lg font-TimesNew mb-5 md:text-white md:shadow-lg md:font-TimesNew md:mb-5 md:text-7xl">
          {" "}
          HG News
        </h1>
      </div>
      <div className="bg-violet-950 mt-5 md:bg-violet-950 md:flex">
        <div className="text-white bg-violet-950  absolute top-0 right-0 mt-14    flex md:text-white md:bg-violet-950  md:absolute md:top-0 md:right-0 md:mt-14    md:flex  ">
          {/* <div className=" "> */}
          <Link className="link" to="/articles">
            <button className=" w-full  rounded-lg shadow-lg p-2 font-sans bg-transparent cursor-pointer mr-10 border-solid border-1   text-white text-xxs md:w-full  md:rounded-lg md:shadow-lg md:p-2 md:font-sans md:bg-transparent md:cursor-pointer md:mr-10 md:border-solid md:border-1   md:text-white md:text-2xl">
              <p className="text-sm font-TimesNew font-extrabold md:text-2xl  md:font-TimesNew  md:font-extrabold">
                {" "}
                All Articles
              </p>
            </button>
          </Link>
          <Link className="link" to="/topics">
            <button className=" w-full  rounded-lg shadow-lg p-2 font-sans bg-transparent cursor-pointer mr-20 border-solid border-1   text-white text-xxs md:w-full  md:rounded-lg md:shadow-lg md:p-2 md:font-sans md:bg-transparent md:cursor-pointer md:mr-10 md:border-solid md:border-1   md:text-white md:text-2xl">
              <p className="text-sm font-TimesNew font-extrabold md:text-2xl  md:font-TimesNew  md:font-extrabold">
                {" "}
                Topics
              </p>
            </button>
          </Link>

          {/* <div className=""> */}
          <Link className="link" to="/">
            <img className=" w-12 md:w-24" src={homeSymbol} />
          </Link>
          <Link className="link" to="/users">
            <img className=" w-7 md:w-12 md:mt-1" src={loginSymbol} />
          </Link>
          {user ? (
            <img
              className="w-10 h-7 mr-5 bg-white md:bg-white md:w-36 md:h-12 md:mr-10 md:-ml-10 "
              src={user.avatar_url}
            />
          ) : (
            <div className="bg-violet-950 md:bg-violet-950">
              <p> </p>
            </div>
          )}

          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Header;
