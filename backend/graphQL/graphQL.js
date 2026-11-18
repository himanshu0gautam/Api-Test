import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";

// define schema
const schema = buildSchema(`
    type User {
    id: ID!
    name: String!
    email: String!
    }

    type Query {
    hello: String
    getUser(id:ID!): User
    getUsers: [User]
    }
    
    type Mutation{
    createUser(name: String!, email: String!): User
    }
    `);

// mock database
const users = [
    {id:'1', name:'umang',email:'umang@12.com'},
    {id:'2', name:'aman', email:'aman@124.com'}
]

// define resolvers
const root = {
    hello: () => 'heelo i am graphQL',
    getUser: ({id}) => users.find(user => user.id === id),
    getUsers: () => users,
    createUser: ({name, email}) => {
        const newUser = {id: String(users.length + 1), name, email }
        users.push(newUser)
        return newUser
    }
}

const router = express.Router()

router.all('/graphql', createHandler({
    schema: schema,
    rootValue: root
}))

export default router;