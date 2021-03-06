import React, { createContext, useState, useContext, useEffect } from "react";

interface IContext {
    progress: boolean;
    addedMessage: boolean;
    progressTimeOut: number;
    messages: Array<IAppMessage>;
    handleProgress: (data: boolean) => void;
    handleMessages: (data: IAppMessage) => void;
};

const InitContext: IContext = {
    progress: false,
    addedMessage: false,
    progressTimeOut: 500,
    messages: [],
    handleMessages: () => {},
    handleProgress: () => {},
};

const AppContext: React.Context<IContext> = createContext(InitContext);

const useAppContext = () => useContext(AppContext);

const useFetch = (): { value: IContext } => {
    const messageTimeOut: number = 5000;
    const progressTimeOut: number = 500;
    const [progress, setProgress] = useState<boolean>(false);
    const [messages, setMessages] = useState<Array<IAppMessage>>([]);
    const [addedMessage, setAddedMessage] = useState<boolean>(false);

    const handleProgress = (data: boolean) => {
        // setProgress((prevProgress) => {
        //     if(prevProgress !== data) {
        //         return data;
        //     }
        //     return prevProgress;
        // })
        setProgress(data);
    };

    const handleMessages = (data: IAppMessage) => {
        const { ok, text } = data;
        const length = messages.length;
        const createdAt: string = `id_${Date.now()}`;

        const newMessage: IAppMessage = {
            ok,
            text,
            createdAt
        };
        setAddedMessage(true);
        
        setMessages([ 
            ...messages,
            newMessage
        ]);

        setTimeout(() => {
            setAddedMessage(false);
            setMessages(prevMessages => {
                const deletedMessages = prevMessages.filter(item => item.createdAt !== createdAt);
                // const newMessages = prevMessages.filter((item) => item !== newMessage);
                return deletedMessages
            });
        }, messageTimeOut);
    };
    

    return {
        value: {
            progress,
            addedMessage,
            progressTimeOut,
            messages,
            handleProgress,
            handleMessages,
        }
    };
};

const AppProvider: React.FC<any> = ({
    children
}) => (
    <AppContext.Provider { ...useFetch() }>
        {
            children
        }
    </AppContext.Provider>
)

export { useAppContext };
export default AppProvider;