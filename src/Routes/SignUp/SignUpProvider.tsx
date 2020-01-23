import React, { createContext, useContext } from "react";

interface IContext {

}
const InitContext: IContext = {

}

const SignUpContext: React.Context<IContext> = createContext(InitContext);

const useSignUpContext = () => useContext(SignUpContext);

const useFetch = (): { value: IContext } => {

    return {
        value: {

        }
    }
};

const SignUpProvider: React.FC<any> = ({
    children
}) => (
    <SignUpContext.Provider { ...useFetch() }>
        {
            children
        }
    </SignUpContext.Provider>
);

export { useSignUpContext };
export default SignUpProvider;