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
    .row {
        max-width: 1000px;
        width: 100%;
        margin: 0 auto;
    }
    @media(max-width: 510px) {
        .row {
            width: 90%;
        }
    }
`;