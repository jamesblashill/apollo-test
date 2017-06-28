import ReactDOM from 'react-dom';
import ProductsApp from './products'

const productsApp = new ProductsApp();
ReactDOM.render(productsApp.render(), document.querySelector('.products-app'));
