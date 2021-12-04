import React from 'react';
import {useQuery,gql} from '@apollo/client'
import{ useRouter} from 'next/router'


const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario{
            id
            nombre
            apellido
        }
    }
`;

const Header = () => {

    const router = useRouter();
    // query de pollo 
    const { data, loading, error} = useQuery(OBTENER_USUARIO);
    //proteger que no accedamos a data antes  de tener resultado
    if(loading) return null;


    // si no hay informacion
    if(!data){
        // return router.push('/');
        return window.location.href = "/";
    }

    const{ nombre, apellido } = data.obtenerUsuario;

    const cerrarSesion= ()=>{
        localStorage.removeItem('token');
        router.push('/') ;
    }


    return (
      <div className="flex justify-between mb-6">
        <p className="text-base text-white mr-2">
          Hola: {nombre} {apellido}!
        </p>

        <button
          onClick={() => cerrarSesion()}
          type="button "
          className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
        >
          Cerrar sesión
        </button>
      </div>
    );
}

export default Header;