import { useEffect, useState, useParams } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import "./Users.css"; // Import the CSS file
function Topics({ topics }) {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  // const arrayOfTopics = topics.map((topic) => {
  //   {
  //     console.log(topic.slug);
  //   }
  //   return (
  //     <li className="userList" key={topic.slug}>
  //       <Link className="link" to={`/articles?topic=${topic.slug}`}>
  //         <button className="bg-purple-800 h-20 w-full p-10 text-white m-2">
  //           {topic.slug}
  //         </button>
  //       </Link>
  //     </li>
  //   );
  // });
  return (
    <>
      <header className=" text-center bg-violet-950 pb-10 md:text-center md:bg-violet-950 md:pb-10 md:w-full">
        <Header />
      </header>
      <body className="md:bg-violet-950">
        <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen bg-violet-950 md:container md:mx-auto md:p-4 md:flex md:flex-col md:items-center md:justify-center md:min-h-screen md:bg-violet-950 md:w-full">
          <div className="absolute top-0 right-0 mt-6 md:absolute md:top-0 md:right-0 md:mt-6">
            <div className="text-white flex md:text-white md:flex">
              <div>
                <Link className="link" to="/">
                  {/* <img className=" w-24 " src={homeSymbol} /> */}
                </Link>
              </div>
            </div>
          </div>
          <h1 className="text-white  text-7xl text-center absolute top-0 mt-40 md:text-white  md:text-7xl md:text-center md:absolute md:top-0 md:mt-40">
            Select Topics
          </h1>
          {/* <ul className="grid grid-cols-2  "> */}
          <div className="inline-block text-center space-y-5 mb-72 ">
            {isLoading ? (
              <p>Loading!</p>
            ) : (
              topics.map((topic) => {
                return (
                  <li className="userList" key={topic.slug}>
                    <Link className="link" to={`/articles?topic=${topic.slug}`}>
                      <button className="   text-white md:text-white">
                        {" "}
                        <p className="text-5xl capitalize md:text-5xl md:capitalize">
                          {topic.slug}
                        </p>
                      </button>
                    </Link>
                  </li>
                );
              })
            )}
            <button className="" onClick={""}>
              <p className="text-white text-5xl md:text-white md:text-5xl">
                All
              </p>
            </button>
          </div>

          {/* </body> */}
          {/* </div> */}
          {/* </ul> */}
        </div>
      </body>
    </>
  );
}

// <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen w-full bg-violet-950">
// <div>
// <header className="w-full  text-center  bg-white">
// <Header />
// </header>
// <body className="bg-violet-950 w-full min-h-screen">
{
  /* <h1 className="text-white  text-7xl text-center absolute top-0 mt-40">
          Select user
        </h1>
        <div className="">
          {isLoading ? (
            <p>Loading!</p>
          ) : (
            topics.map((topic) => {
              {
                console.log(topic.slug);
              }
              return (
                <li className="userList" key={topic.slug}>
                  <Link className="link" to={`/articles?topic=${topic.slug}`}>
                    <button className="bg-purple-800 h-20 w-full p-10 text-white m-2">
                      {topic.slug}
                    </button>
                  </Link>
                </li>
              );
            })
          )}
          <button className="text-white" onClick={""}>
            All
          </button>
        </div> */
}
// </body>
// </div>

export default Topics;
