import React from "react";
import Swal from "sweetalert2";
import { gql, useMutation } from "@apollo/client";
import Router from "next/router";

const ELIMINAR_PRODUCTO = gql`
    mutation eliminarProducto($id: ID!){
        eliminarProducto(id: $id) 
    }
`;

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      precio
      existencia
    }
  }
`;

const Producto = ({ producto }) => {
  const { nombre, precio, existencia, id } = producto;

  // Mutation para eliminar productos
  const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO, {
    update(cache) {
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS,
      });
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: obtenerProductos.filter(
            (productoActual) => productoActual.id !== id
          ),
        },
      });
    },
  });

  const confirmarEliminarProducto = () => {
    Swal.fire({
      title: "Deseas eliminar a este producto?",
      text: "Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "No, cancelar",
    }).then(async (result) => {
      if (result.value) {
        try {
          //Eliminar producto de la DB
          const { data } = await eliminarProducto({
            variables: {
              id
            },
          });
          console.log(data);
          //Mostrar una alerta
          Swal.fire("¡Eliminado!", data.eliminarProducto, "success");
          console.log("eliminando...", id);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const editarProducto = () => {
Router.push({
    pathname: "/editarproducto/[id]",
    query: { id }
})
  }
  return (
    <tr>
      <td className="border px-4 py-2">{nombre}</td>
      <td className="border px-4 py-2">{existencia} Unidades</td>
      <td className="border px-4 py-2">$ {precio}</td>
      <td className="border px-4 py-2 flex justify-center">
        <button
          type="buttom"
          className="flex justify-center justify-items-center bg-red-800 py-3 mr-1 w-10 text-white rounded text-l font-bold"
          onClick={() => confirmarEliminarProducto()}
        >
          <i class="fas fa-trash-alt"></i>
        </button>
        <button
          type="buttom"
          className="flex justify-center justify-items-center bg-green-600 py-3 ml-1 w-10 text-white rounded text-l font-bold"
          onClick={() => editarProducto()}
        >
         <i class="fas fa-edit"></i>
        </button>
      </td>
    </tr>
  );
};

export default Producto;
