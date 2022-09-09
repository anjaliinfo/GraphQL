const cors = require('cors');
const express = require('express');
const path = require('path');
const { graphqlHTTP }  = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema'); 
const app = express()
const port = 4000

const data = {
  students: [
    { id: '010', name: 'Rohit' },
    { id: '112', name: 'Ravi' },
  ],
}

const typeDefs = `
type Student {
  id: ID!
  name: String!
}

type Query {
  students: [Student]
}
`

const resolvers = {
  Query: {
    students: (obj, args, context, info) => context.students,
  },
}

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname+'/index.html')); 
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema: executableSchema,
    context: data,
    graphiql: true,
  })
)

app.listen(port, () => {
  console.log(`Running a server at http://localhost:${port}`)
})