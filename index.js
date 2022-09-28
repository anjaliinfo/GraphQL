const cors = require('cors');
const express = require('express');
const path = require('path');
const { graphqlHTTP }  = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema'); 
const app = express()
const port = 4000

const data = {
  students: [
    { id: '110', name: 'Rohit', age: '18', subject: 'Maths' },
    { id: '112', name: 'Ravi', age: '26', subject: 'Chemistry' },
    { id: '113', name: 'Reena', age: '21', subject: 'Physics' },
    { id: '115', name: 'Sima', age: '23', subject: 'Literature' },
    { id: '117', name: 'Sonia', age: '18', subject: 'English' },
    { id: '119', name: 'Rahul', age: '26', subject: 'Arts' },
  ],
}

const typeDefs = `
type Student {
  id: ID!
  name: String!
  age: Int
  subject: String 
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
