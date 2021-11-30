import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";

const Sidebar = () => {
  const router = useRouter();
  //console.log(router.pathname);

  return (
    <aside className="bg-white sm:w-1/3 xl:w-1/5 sm:min-h-screen py-5">
      <div>
        <p className="text-black text-2xl font-black px-5"> SAINT </p>
      </div>
      <nav className="mt-5 list-none">
        <li className={router.pathname === "/" ? "bg-green-500 p-2" : "p-2"}>
          <Link href="/">
            <a className="text-bold font-black mb-2 block px-5"> Clientes </a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/pedidos" ? "bg-green-500 p-2" : "p-2"
          }
        >
          <Link href="/pedidos">
            <a className="text-bold font-black mb-2 block px-5"> Pedidos </a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/productos" ? "bg-green-500 p-2" : "p-2"
          }
        >
          <Link href="/productos">
            <a className="text-bold font-black mb-2 block px-5"> Productos </a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
