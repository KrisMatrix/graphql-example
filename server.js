const express = require('express');
const path = require('path');
//const { buildSchema } = require('graphql'); //no longer needed


//const { graphqlHTTP } = require('express-graphql');//replaced with apollo graphql
const {ApolloServer} = require('apollo-server-express');

const { loadFilesSync, loadFiles } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync(path.join(__dirname,'**/*.graphql')); //will look into any sub dirs for files with extension .graphql
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

async function startApolloServer() {
  const app = express();
  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });

  const server = new ApolloServer({
    schema
  });

  await server.start();
  server.applyMiddleware({ app , path: '/graphql'})

  app.listen(3000, () => {
    console.log('Running GraphQL server...');
  });
}


/*app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);*/ /* only applicable to original express-graphql*/

startApolloServer();