import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from './Styles/typed-components';
import { theme } from './Styles/theme';
import { GlobalStyles } from './Types/global-styles';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';
import App from './Components/App';

ReactDOM.render(
    <>
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <App />
            </ThemeProvider>
        </ApolloProvider>
    </>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
