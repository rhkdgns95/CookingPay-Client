import React, { createContext, useContext } from "react";

interface IContext {
};

const InitContext: IContext = {
};

const HomeContext: React.Context<IContext> = createContext(InitContext);

const useHomeContext = () => useContext(HomeContext);

const useFetch = (): { value: IContext } => {
    
    return {
        value: {
        }
    };
};

const HomeProvider: React.FC<any> = ({
    children
}) => (
    <HomeContext.Provider { ...useFetch() }>
        {
            children
        }
    </HomeContext.Provider>
)

export {useHomeContext };
export default HomeProvider;