const express = require('express');
const path = require('path');
//const { buildSchema } = require('graphql'); //no longer needed
const { graphqlHTTP } = require('express-graphql');

const { loadFilesSync, loadFiles } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync(path.join(__dirname,'**/*.graphql')); //will look into any sub dirs for files with extension .graphql
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log('Running GraphQL server...');
});