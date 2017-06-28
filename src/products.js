import _ from 'lodash'
import React from 'react'
import { gql, ApolloClient, createNetworkInterface, ApolloProvider, graphql } from 'react-apollo'

export default class ProductsApp {
  createClient() {
    return new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: '/graphql',
      }),
    })
  }

  render() {
    return (
      <ApolloProvider client={this.createClient()}>
        <ProductsWithData />
      </ApolloProvider>
    )
  }
}

const ProductsWithData = graphql(gql`{
  productsCount
  products(offset: 0, limit: 20) {
    id
    title
  }
}`, { options: { notifyOnNetworkStatusChange: true } })(Products)

function Products({ data }) {
  if (_.isUndefined(data.products)) return (<p>Loading...</p>);

  return (
    <div>
      <p>Showing {data.products.length} of {data.productsCount}</p>
      <ProductList productsCount={data.productsCount} products={data.products}></ProductList>
    </div>
  )
}

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
  }

  renderProducts() {
    return _.map(this.props.products, (product) => {
      return (
        <li key={product.id}>{product.title}</li>
      )
    })
  }

  render() {
    return (
      <ul>
        {this.renderProducts()}
      </ul>
    )
  }
}
