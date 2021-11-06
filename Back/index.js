const { ApolloServer, gql } = require("apollo-server");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolver");
const conectarDB = require('./config/db');

conectarDB();

// Servidor
const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: () => {
    const miContext = "Hola";
    return{
      miContext
    }
  }
});

// Arrancar el servidor
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
