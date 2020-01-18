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
    h1, h2, h3, h4, h5 {
        margin: 0;
    }
    .row {
        max-width: 900px;
        width: 100%;
        margin: 0 auto;
    }
    button {
        &:focus, 
        &:active {
            outline: 0;
        }
    }
    @media(max-width: 910px) {
        .row {
            width: 90%;
        }
    }
    @media(max-width: 510px) {
    }
`;