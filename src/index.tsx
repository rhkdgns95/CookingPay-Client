import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { ThemeProvider } from './Styles/typed-components';
import { theme } from './Styles/theme';
import { GlobalStyles } from './Types/global-styles';

ReactDOM.render(
    <>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <App />
        </ThemeProvider>
    </>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
