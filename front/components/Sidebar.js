import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";

const Sidebar = () => {
  const router = useRouter();
  //console.log(router.pathname);

  return (
    <aside className="bg-white sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-black text-2xl font-black"> SAINT </p>
      </div>
      <nav className="mt-5 list-none">
<<<<<<< HEAD
<<<<<<< HEAD
        <li className={router.pathname === "/clientes" ? "bg-blue-800	 p-2 text-white" : "p-2"}>
=======
        <li className={router.pathname === "/clientes" ? "bg-green-500 p-2" : "p-2"}>
>>>>>>> parent of 15e28e3 (Mejoras interfaz de usuario)
          <Link href="/clientes">
            <a className="text-bold font-black my-2 block px-5"> Clientes </a>
=======
        <li className={router.pathname === "/" ? "bg-green-500 p-2" : "p-2"}>
          <Link href="/">
            <a className="text-bold font-black mb-2 block"> Clientes </a>
>>>>>>> parent of 33c329e (mejoras en el front-end)
          </Link>
        </li>
        <li
          className={
            router.pathname === "/pedidos" ? "bg-green-500 p-2" : "p-2"
          }
        >
          <Link href="/pedidos">
<<<<<<< HEAD
            <a className="text-bold font-black my-2 block px-5"> Pedidos </a>
=======
            <a className="text-bold font-black mb-2 block"> Pedidos </a>
>>>>>>> parent of 33c329e (mejoras en el front-end)
          </Link>
        </li>
        <li
          className={
            router.pathname === "/productos" ? "bg-green-500 p-2" : "p-2"
          }
        >
          <Link href="/productos">
<<<<<<< HEAD
            <a className="text-bold font-black my-2 block px-5"> Productos </a>
=======
            <a className="text-bold font-black mb-2 block"> Productos </a>
>>>>>>> parent of 33c329e (mejoras en el front-end)
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
