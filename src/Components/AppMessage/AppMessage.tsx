import React, { useEffect, useState, useRef } from "react";
import styled from "../../Styles/typed-components";
import { useAppContext } from "../App/AppProvider";


const AppMessage = () => {
    const { messages, addedMessage } = useAppContext();
    let ref = useRef<any>();
    const [mounted, setMounted] = useState<boolean>(false);
    const [load, setLoad] = useState<boolean>(false);

    useEffect(() => {
        if(!mounted) {
            setMounted(true);
        } else {
            if(load) {
                clearTimeout(ref.current);
                setLoad(false);
                ref.current = setTimeout(() => {
                    setLoad(true);
                }, 100);
                
            } else {
                ref.current = setTimeout(() => {
                    setLoad(true);
                }, 100);
            }
        }
    }, [messages]);
    useEffect(() => {

    }, [])
    return (
        <Container onLoad={e => console.log("E2: ", e)}>
            <Wrapper>
                {
                    messages.map((message, key) => {
                        const { text } = message;
                        if(addedMessage) {
                            if(key === messages.length - 1) {
                                return message.ok ? 
                                <Success className={load ? "active" : ""} text={text ? text : "Success"} key={key} /> :
                                <Error className={load ? "active" : ""} text={text ? text : "Error"} key={key} />
                            } else {
                                return message.ok ? 
                                <Success className={"active"} text={text ? text : "Success"} key={key} /> :
                                <Error className={"active"} text={text ? text : "Error"} key={key} />
                            }
                        } else {
                            return message.ok ? 
                                <Success className={"active distroy"} text={text ? text : "Success"} key={key} /> :
                                <Error className={"active distroy"} text={text ? text : "Error"} key={key} />
                            ;
                            // if(key === 0) {
                            //     return message.ok ? 
                            //     <Success className={load ? "active distroy" : "distroy active"} text={text ? text : "Success"} key={key} /> :
                            //     <Error className={load ? "active distroy" : "distroy active"} text={text ? text : "Error"} key={key} />
                            // } else {
                            //     return message.ok ? 
                            //     <Success className={"active distroy"} text={text ? text : "Success"} key={key} /> :
                            //     <Error className={"active distroy"} text={text ? text : "Error"} key={key} />
                            // }
                        }
                    })
                }
                {/* <Success text={"This is a"}/>
                <Error text={"This is a message of Failed"}/> */}
            </Wrapper>
        </Container>
    )
};
const Success: React.FC<{className: string, text: string}> = ({ className, text }) => (
    <Message className={`${className} message-success`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
        <Text>{text}</Text>
    </Message>
);
const Error: React.FC<{className: string, text: string}> = ({ className, text }) => (
    <Message className={`${className} message-failed`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
        <Text>{ text }</Text>
    </Message>
)
const Text = styled.span`
    font-size: 12px;
`;
const Container = styled.div`
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;
    transition: .3s;
`;
const Wrapper = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    transition: .3s;
`;
const Message = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 9.5px 12px;
    color: #959595;
    border-radius: 4px;
    box-shadow: 0 2px 4px 1px rgba(0,0,0,0.14), 0 4px 6px 1px rgba(0,0,0,.04);
    margin: 0 auto;
    margin-bottom: 12px;
    margin-top: 20px;
    transition: margin-top .3s;
    & svg {
        border-radius: 50%;
        padding: 4px;
        background-color: orange;
        fill:white;
        margin-right: 9px;
    }
    
    &.distroy {
        opacity: 0;
        transition: .3s;
        &.active {
            opacity: 1;
            transition: .3s;
        }
    }
    
    
    // &.distroy {
    //     transform: translateY(-30px);
    //     transition: .1s;
    // }
    &.active {
        margin-top: 0;
        // transform: translateY(0);
    }

    &.message-success {
        & svg {
            background-color: ${props => props.theme.success};
        }
    }
    &.message-failed {
        & svg {
            background-color: ${props => props.theme.failed};
        }
    }
`;

export default AppMessage;