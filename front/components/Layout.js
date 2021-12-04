import React from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";
import Header from "../components/Header";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>SAINT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
<<<<<<< HEAD
      {router.pathname === "/" || router.pathname === "/nuevacuenta" ? (
        <div className="bg-image min-h-screen flex flex-col justify-center ">
          <div>{children}</div>
        </div>
      ) : (
        <div className="bg-pedidos bg-gray-500 min-h-screen">
=======
      {router.pathname === "/login" || router.pathname === "/nuevacuenta" ? (
        <div className="bg-black min-h-screen flex flex-col justify-center ">
          <div>{children}</div>
        </div>
      ) : (
        <div className="bg-black min-h-screen">
>>>>>>> parent of 33c329e (mejoras en el front-end)
          <div className="flex min-h-screen">
            <Sidebar />

            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              <Header />
              {children}
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
