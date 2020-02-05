import React, { createContext, useContext, useState } from 'react';
import { useLazyQuery } from 'react-apollo';
import { FIND_EMAIL } from './FindAccountQueries';
import { findEmail, findEmailVariables } from '../../Types/api';
import { useAppContext } from '../../Components/App/AppProvider';

interface IContext {
    isPassword: boolean;
    message: { ok: boolean, text: string, onInit: any, handleChangeMessage: ({ text, ok }: { text: string, ok: boolean }) => void}
    toggleIsPassword: () => any;
    handleFindEmail: (text: string) => any;
};

const InitContext: IContext = {
    isPassword: false,
    toggleIsPassword: () => {},
    message: {
        ok: false,
        text: "",
        onInit: () => {},
        handleChangeMessage: () => {}
    },
    handleFindEmail: () => {}
};

const FindAccountContext: React.Context<IContext> = createContext<IContext>(InitContext);

const useFindAccountContext = () => useContext(FindAccountContext);

const useMessage = () => {
    const [ok, setOk] = useState<boolean>(false);
    const [text, setText] = useState<string>("");

    const onInit = () => {
        setOk(false);
        setText("");
    }
    
    const handleChangeMessage = ({ok ,text}: { ok : boolean, text: string }) => {
        setOk(ok);
        setText(text);
    }

    return {
        ok,
        text,
        onInit,
        handleChangeMessage
    };
};

const useFetch = (): { value: IContext } => {
    const { handleMessages, handleProgress, progress, progressTimeOut } = useAppContext();
    const [isPassword, setIsPassword] = useState<boolean>(false);
    const message = useMessage();
    const [ queryFindEmail ] = useLazyQuery<findEmail, findEmailVariables>(FIND_EMAIL, {
        fetchPolicy: "cache-and-network",
        onCompleted: data => {
            const { FindEmail: { ok, email, error="Failed" }} = data;
            // console.log("FindEmail onCompleted: ", data);
            setTimeout(() => {
                if(progress) {
                    if(ok && email) {
                        handleMessages({
                            ok,
                            text: "Success"
                        });
                        message.handleChangeMessage({
                            ok,
                            text: email
                        });
                    } else {
                        handleMessages({
                            ok,
                            text: error
                        });
                        message.handleChangeMessage({
                            ok,
                            text: error || "Failed"
                        });
                    }
                    handleProgress(false);
                }
            }, progressTimeOut);
        },
        onError: data => {
            setTimeout(() => {
                if(progress) {
                    handleMessages({
                        ok: false,
                        text: data.message
                    });
                    message.handleChangeMessage({
                        ok: false,
                        text: data.message || "Failed"
                    });
                    handleProgress(false);
                }
            }, progressTimeOut);
            console.log("FindEmail onError: ", data);
        }
    });

    const handleFindEmail = (name: string) => {
        queryFindEmail({
            variables: {
                name
            }
        });
    }

    const toggleIsPassword = () => {
        setIsPassword(!isPassword);
        message.onInit();
    };
    
    return {
        value: {
            isPassword,
            message,
            toggleIsPassword,
            handleFindEmail
        }
    };
};

const FindAccountProvider: React.FC<any> = ({
    children
}) => (
    <FindAccountContext.Provider { ...useFetch() }>
        {
            children
        }
    </FindAccountContext.Provider>

);

export { useFindAccountContext };
export default FindAccountProvider;