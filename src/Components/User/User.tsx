import React, { createContext, useContext } from "react";
import { useQuery } from "react-apollo";
import { GET_MY_PROFILE } from "./UserQueries";
import { getMyProfile, getMyProfile_GetMyProfile_user } from "../../Types/api";

interface IContext {
    user: getMyProfile_GetMyProfile_user | null;
}
const InitContext: IContext = {
    user: null
}
const UserContext: React.Context<IContext> = createContext<IContext>(InitContext);

const useUserContext = () => useContext(UserContext);

const useFetch = (): { value: IContext } => {
    const { data, loading } = useQuery<getMyProfile, void>(GET_MY_PROFILE, {
        fetchPolicy: "network-only",
        onCompleted: data => {
            // console.log("GetMyProfile onCompleted: ", data);
        },
        onError: data => {
            console.log("GetMyProfile onError: ", data);
            // <예정사항> Logout 추가할것.
        }
    });
    
    const user = data?.GetMyProfile.user || null; 

    return {
        value: {
            user
        }
    };
};

const UserProvider: React.FC<any> = ({
    children
}) => (
    <UserContext.Provider { ...useFetch() }>
        {
            children
        }
    </UserContext.Provider>
);

export { useUserContext };
export default UserProvider;