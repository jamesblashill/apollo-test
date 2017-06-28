const _ = require('lodash');
const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const products = require('./products')

const schema = buildSchema(`
  type Query {
    productsCount: Int
    products(limit: Int, offset: Int): [Product]
    product(id: Int): Product
  }

  type Product {
    id: ID!
    title: String!
    description: String!
    image: String!
    price: String!
  }
`)

class QueryRoot {
  constructor(products) {
    this.productsData = _.sortBy(products, 'title');
  }

  productsCount() {
    return this.productsData.length;
  }

  products({ limit = 1000, offset = 0 }) {
    console.log(`[GRAPHQL] products(offset: ${offset}, limit: ${limit})`)
    return this.productsData.slice(offset, offset + limit)
  }

  product({ id }) {
    return _.find(this.productsData, { id: id })
  }
}

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: new QueryRoot(products),
  graphiql: true,
}))
app.use(express.static('public'))
app.listen(4000, () => console.log('Deployed to localhost:4000/graphql'))
