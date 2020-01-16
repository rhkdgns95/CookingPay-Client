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
        background-color: ${props => props.theme.bgColor};
    }
    body {
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