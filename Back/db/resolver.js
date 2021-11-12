const Usuario = require("../models/Usuarios");
const Producto = require("../models/Producto");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config({ path: "variables.env" });

const crearToken = (usuario,secret,expiresIn) => {
  console.log(usuario)
  const { id, email, nombre, apellido } = usuario;
  return jwt.sign({ id,email,nombre,apellido }, secret, { expiresIn });
}

// Resolver
const resolvers = {
  Query: {
    obtenerUsuarios: async (_,{token}) => {
      const usuarioId = await jwt.verify(token, process.env.SECRET)
      return usuarioId
    }
  },
  Mutation: {
    nuevoUsuario: async (_, { input } ) => {
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
      const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
      if (!passwordCorrecto) {
        throw new Error("La password es incorrecta");
      }
      // Crear y firmar el JWT
      return {
        token: crearToken(existeUsuario, process.env.SECRET, '24h'),
      }
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
    }
  }
}

module.exports = resolvers;
