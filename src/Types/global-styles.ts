import { createGlobalStyle } from "../Styles/typed-components";

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        ::-webkit-scrollbar {
            width: 5px;
          }
        /* Track */
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 20px;
        }   
        
        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: #7c9ac5;
            border-radius: 20px;
            transition: .3s;
            cursor: pointer;
            &:hover {
                background: #57b2e8;
            }
        }
        
        /* Handle on hover */
        ::-webkit-scrollbar-thumb:active {
            background: ${props => props.theme.blueColor};
            cursor: pointer;
        }
    }
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    html {
        background-color: ${props => props.theme.bgColor};
        overflow-y: scroll;
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
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
    .app-modal {
        z-index: 9;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.54);
        
    }
    @media(max-width: 910px) {
        .row {
            width: 90%;
        }
    }
    @media(max-width: 510px) {
        .row {
            width: 95%;
        }
    }
`;