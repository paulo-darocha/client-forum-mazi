import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Erros from './Erros';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import configureStore from './reduxStore/store';

const client = new ApolloClient({
  uri: "http://18.118.8.227:5000/graphql",
  credentials: "include",
  cache: new InMemoryCache({
    resultCaching: false,
  })
});

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        {/* <App /> */}
        <Erros>{[<App />]}</Erros>
      </ApolloProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);