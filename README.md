# GraphQL
GraphQL implementation example using node 


Overview 

    GraphQL is a language for querying data.  GraphQL used to query data from any number of different sources.

    With GraphQL, a client (such as a web app) doesn't need to know which data store contains the information it needs. Instead, clients send queries to your GraphQL server (usually over HTTP), which then fetches data from the appropriate data stores.



Set Up a GraphQL API Server in Node.js 


    Setting Up an Express HTTP Server  

    The first step is to set up an Express server, 

    Install express and cors with the npm install command:

    npm install express cors



    Install Nodemon as a dev dependency:

    npm install -D nodemon

    Nodemon helps to detect the file changes automatically restarts the application. 




    Create index.js file

    Also create a script called "dev" that will run nodemon index.js. 



    Create a simple Express server, listen on port 4000 in index.js and send a request saying Hello, GraphQL!

    After creating the server you can run the command 
 
    npm run dev  to start the node server.
    


    If you visit http://localhost:4000 in a browser , It will return Hello, Graphql



    Setting Up GraphQL HTTP Server Middleware
   

    Install Graphql 

    npm install graphql@14 express-graphql @graphql-tools/schema  

    Import these packages like this: 

    const { graphqlHTTP }  = require('express-graphql');
    const { makeExecutableSchema } = require('@graphql-tools/schema'); 




   Next create a Graphql schema 

     Create a data object with the values your database 

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



GraphQL Schema 

    A GraphQL schema relies on a type system. There are some built-in types, and you can also create your own type. As here you will create a new type students with 4  fields id, name, age and subject

    The id has an ID type, name has a String type, age has a Int type and subject has string type. These are both built-in scalars, or primitive types. 

    The exclamation point (!) means the field is non-nullable, and a value will be required for any instance of this type.


    The schema you define here will be passed into the makeExecutableSchema function provided by graphql-tools as typeDefs. The two properties passed into an object on the makeExecutableSchema function will be as follows:

    typeDefs: a GraphQL schema language string.
    resolvers: functions that are called to execute a field and produce a value.




GraphQL Resolver Functions


    Resolvers are a collection of functions that generate a response for the GraphQL server. Each resolver function has four parameters:

    obj: The parent object, which is not necessary to use here since it is already the root, or top-level object.
    args: Any GraphQL arguments provided to the field.
    context: State shared between all resolvers, often a database connection.
    info: Additional information.



    Here the resolver is created for the root Query type and return a value for students.  


    const resolvers = {
      Query: {
        students: (obj, args, context, info) => context.students,
      },
    }



The makeExecutableSchema function creates a complete schema that you can pass into the GraphQL endpoint. 

    const executableSchema = makeExecutableSchema({
      typeDefs,
      resolvers,
    })


Now replace the default root endpoint that is currently returning Hello, GraphQL! with the following /graphql endpoint by adding these  lines:

    app.use(
      '/graphql',
      graphqlHTTP({
        schema: executableSchema,
        context: data,
        graphiql: true,
      })
    )



Save and close the file when you’re done.



Now you will be able to see http://localhost:4000/graphql and explore your schema using the GraphiQL IDE.




Make a query to 

    {
      students {
        id
        name
        age
        subject
      }
   }



And you will see the output 

    {
      "data": {
        "students": [
              {
                "id": "110",
                "name": "Rohit",
                "age": 18,
                "subject": "Maths"
              },
              {
                "id": "112",
                "name": "Ravi",
                "age": 26,
                "subject": "Chemistry"
              },
              {
                "id": "113",
                "name": "Reena",
                "age": 21,
                "subject": "Physics"
              },
              {
                "id": "115",
                "name": "Sima",
                "age": 23,
                "subject": "Literature"
              },
              {
                "id": "117",
                "name": "Sonia",
                "age": 18,
                "subject": "English"
              },
              {
                "id": "119",
                "name": "Rahul",
                "age": 26,
                "subject": "Arts"
              }
            ]
         }
      }




