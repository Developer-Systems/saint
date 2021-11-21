const Usuario = require("../models/Usuarios");
const Producto = require("../models/Producto");
const Cliente = require("../models/Cliente");
const Pedido = require("../models/Pedido");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "variables.env" });

const crearToken = (usuario, secret, expiresIn) => {
  console.log(usuario);
  const { id, email, nombre, apellido } = usuario;
  return jwt.sign({ id, email, nombre, apellido }, secret, { expiresIn });
};
// Resolver
const resolvers = {
  Query: {
    obtenerUsuarios: async (_, { token }) => {
      const usuarioId = await jwt.verify(token, process.env.SECRET);
      return usuarioId;
    },
    obtenerProductos: async () => {
      try {
        const productos = await Producto.find({});
        return productos;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerProductos: async (_, { id }) => {
      const producto = await Producto.findById(id);
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      return producto;
    },
    obtenerClientes: async () => {
      try {
        const clientes = await Cliente.find({});
        return clientes;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerClientesVendedor: async (_, {}, ctx) => {
      try {
        const clientes = await Cliente.find({
          vendedor: ctx.usuario.id.toString(),
        });
        return clientes;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerCliente: async (_, { id }, ctx) => {
      // Verificar si el cliente existe
      const cliente = await Cliente.findById(id);
      if (!cliente) {
        throw new Error("Cliente no encontrado");
      }
      // Verificar si el cliente pertenece al usuario autenticado
      if (cliente.vendedor.toString() !== ctx.usuario.id) {
        throw new Error("No tienes permisos para este cliente");
      }
      return cliente;
    },
    obtenerPedidos: async () => {
      try {
        const pedidos = await Pedido.find({});
        return pedidos;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerPedidosVendedor: async (_, {}, ctx) => {
      try {
        const pedidos = await Pedido.find({vendedor: ctx.usuario.id});
        return pedidos;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerPedido: async (_, {id}, ctx) => {
      // Si el pedido existe o no
      const pedido = await Pedido.findById(id);
      if (!pedido) {
        throw new Error('Pedido no encontrado');
      }
      // Solo quien lo creo puede verlo
      if (pedido.vendedor.toString() !== ctx.usuario.id) {
        throw new Error('No tienes las credenciales');
      }
      // retornar el resultado
      return pedido;
    },
    obtenerPedidosEstado: async (_, { estado }, ctx) => {
      const pedidos =  await Pedido.find({vendedor: ctx.usuario.id, estado});

      return pedidos;
    }
  },
  Mutation: {
    nuevoUsuario: async (_, { input }) => {
      const { email, password } = input;
      // Revisar si el ususario esta registrado
      const existeUsuario = await Usuario.findOne({ email });
      if (existeUsuario) {
        throw new Error("El usuario ya esta registrado");
      }
      // Hashear la password
      const salt = await bcryptjs.genSalt(12);
      input.password = await bcryptjs.hash(password, salt);
      // Guardar en la base de datos
      try {
        // Guardarlo en la base de datos
        const usuario = new Usuario(input);
        usuario.save(); // guardarlo0p
        return usuario;
      } catch (error) {
        console.log(error);
      }
    },
    autenticarUsuario: async (_, { input }) => {
      const { email, password } = input;
      // Revisar si el usuario existe
      const existeUsuario = await Usuario.findOne({ email });
      if (!existeUsuario) {
        throw new Error("El usuario no existe");
      }
      // Revisar si la password es correcta
      const passwordCorrecto = await bcryptjs.compare(
        password,
        existeUsuario.password
      );
      if (!passwordCorrecto) {
        throw new Error("La password es incorrecta");
      }
      // Crear y firmar el JWT
      return {
        token: crearToken(existeUsuario, process.env.SECRET, "24h"),
      };
    },
    nuevoProducto: async (_, { input }) => {
      try {
        const producto = new Producto(input);
        //  almacenar en la db
        const resultado = await producto.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    actualizarProducto: async (_, { id, input }) => {
      //Verificar q el producto existe
      let producto = await Producto.findById(id);
      if (!producto) {
        throw new Error("El producto no ha sido encontrado");
      }
      //Existe --> Se guarda en la base de datos
      producto = await Producto.findAndUpdate({ _id: id }, input, {
        new: true,
      });
      return producto;
    },
    eliminarProducto: async (_, { id }) => {
      //Verificar q el producto existe
      let producto = await Producto.findById(id);
      if (!producto) {
        throw new Error("El producto no ha sido encontrado");
      }
      //Existe --> Se elimina de la base de datos
      await Producto.findAndDelete({ _id: id });
      return "Producto eliminado";
    },
    nuevoCliente: async (_, { input }, ctx) => {
      //verificar si el cliente existe
      const { email } = input;
      const cliente = await Cliente.findOne({ email });
      if (cliente) {
        throw new Error("El cliente ya se encuentra registrado");
      }
      //Asignar el vendedor
      const nuevoCliente = new Cliente(input);

      nuevoCliente.vendedor = ctx.usuario.id;

      //Guardarlo en la base de datos
      try {
        const result = await nuevoCliente.save();
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    actualizarCliente: async (_, { id, input }, ctx) => {
      //Verificar si el cliente existe
      let cliente = await Cliente.findById(id);
      if (!cliente) {
        throw new Error("El cliente no existe");
      }
      //verificar si el vendeor es el correcto

      if (cliente.vendedor.toString() !== ctx.usuario.id) {
        throw new Error("No tienes permisos para actualizar este cliente");
      }
      //guardarlo en la base de datos
      cliente = await Cliente.findOneAndUpdate({ _id: id }, input, {new: true});
      return cliente;
    },
    eliminarCliente: async (_, { id }, ctx) => {
      //Verificar si el cliente existe
      let cliente = await Cliente.findById(id);
      if (!cliente) {
        throw new Error("El cliente no existe");
      }
      //verificar si el vendeor es el correcto

      if (cliente.vendedor.toString() !== ctx.usuario.id) {
        throw new Error("No tienes permisos para actualizar este cliente");
      }
      //eliminarlo de la base de datos
      clientes = await Cliente.findOneAndDelete({ _id: id });
      return "Cliente eliminado";
    },

    nuevoPedido: async(_, {input}, ctx) => {
      const {cliente } = input

      //Verificar que el cliente exista
      let clienteExiste = await Cliente.findById(id);
      if (!clienteExiste){
        throw new Error('El cliente no existe');
      }

      //Verificar que el cliente es del vendedor
      if (cliente.vendedor.toString() !== ctx.usuario.id) {
        throw new Error('No tienes las credenciales');
      }

      //Revisar q el stock esté disponible
      for await( const articulo of input.pedido){
        const {id } = articulo;
        const producto = await Producto.findById(id);
        if (articulo.cantidad > producto.existencia) {
          throw new Error(`El articulo: ${producto.nombre} excede la cantidad disponible`);
        }else{
          //Restar la cantidad pedida a la disponible --> importante
          producto.existencia = producto.existencia-articulo.cantidad;
          //Guardar en la base de datos la info actualizada
          await producto.save();
        }
      }

      //Instanciar un nuevo pedido
      const nuevoPedido = new Pedido(input);

      //Asignarle un vendedor
      nuevoPedido.vendedor = ctx.usuario.id;

      //Guardarlo en la base de datos
      const resultado = await nuevoPedido.save();
      return resultado;
    },
    actualizarPedido: async(_, {id, input}, ctx) => {

      const { cliente } = input;

      // Si el pedido existe
      const existePedido = await Pedido.findById(id);
      if (!existePedido) {
        throw new Error('El pedido no existe');
      }

      // Si el cliente existe
      const existeCliente = await Cliente.findById(cliente);
      if (!existeCliente) {
        throw new Error('El cliente no existe');
      }

      // Si el cliente y pedido pertenecen al vendedor
      if (existeCliente.vendedor.toString() !== ctx.usuario.id) {
        throw new Error("No tienes credenciales");
      }

      // Revisar el stock
      if (input.pedido) {
        for await( const articulo of input.pedido){
          const { id } = articulo;
          const producto = await Producto.findById(id);
          if (articulo.cantidad > producto.existencia) {
            throw new Error(`El articulo: ${producto.nombre} excede la cantidad disponible`);
          }else{
            //Restar la cantidad pedida a la disponible --> importante
            producto.existencia = producto.existencia-articulo.cantidad;
            //Guardar en la base de datos la info actualizada
            await producto.save();
          }
        }
      }

      // Guardar el pedido
      const resultado = await Pedido.findOneAndUpdate({_id: id}, input, { new: true });
      return resultado;
    },
    eliminarPedido: async (_, {id}, ctx) => {
      // Verificar si el pedido existe o no
      const pedido =  await Pedido.findById(id);
      if (!pedido) {
        throw new Error('El pedido no existe');
      }

      // Verificar si el vendedor es quien lo borra
      if (pedido.vendedor.toString() !== ctx.usuario.id) {
        throw new Error('No tienes las credenciales');
      }

      // Eliminar de la base de datos
      await Pedido.findOneAndDelete({_id: id})
      return "Pedido eliminado"
    }
  },
};

module.exports = resolvers;
