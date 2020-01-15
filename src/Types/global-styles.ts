import { createGlobalStyle } from "../Styles/typed-components";

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    html {
        border: 1px solid ${props => props.theme.blueColor};
    }
    body {
        border: 1px solid ${props => props.theme.redColor};
    }
    #root {
        height: 100%;
    }
    ul, li, a, p {
        padding: 0;
        margin: 0;
        list-style: none;
        color: inherit;
        text-decoration: inherit;
    }
`;