import React, { useContext } from "react";
import { useMutation } from "react-apollo";
import { updateMyProfile, updateMyProfileVariables } from "../../Types/api";
import { UPDATE_MY_PROFILE } from "./MyPageQueries";
import { useAppContext } from "../../Components/App/AppProvider";
import { GET_MY_PROFILE } from "../../Components/User/UserQueries";

interface IContext {
    updateMyProfile: (data: updateMyProfileVariables) => void;
}
const InitContext: IContext = {
    updateMyProfile: () => {}
};

const MyPageContext = React.createContext<IContext>(InitContext);

const useMyPageContext = () => useContext(MyPageContext);

const useFetch = (): { value: IContext } => {
    const { handleMessages, handleProgress, progress, progressTimeOut } = useAppContext();

    const [ mutationUpdateMyProfile ]  = useMutation<updateMyProfile, updateMyProfileVariables>(UPDATE_MY_PROFILE, {
        refetchQueries: [{query: GET_MY_PROFILE}],
        onCompleted: data => {
            console.log("UpdateMyProfile onCompleted: ", data);
            setTimeout(() => {
                if(progress) {
                    const { UpdateMyProfile: { ok, error="Failed" }} = data;
                    if(ok) {
                        handleMessages({ ok, text: "Updated." });
                    } else {
                        handleMessages({ ok, text: error });
                    }
                    handleProgress(false);
                }
            }, progressTimeOut);
            
        },
        onError: data => {
            console.log("UpdateMyProfile onError: ", data);
            setTimeout(() => {
                if(progress) {
                    handleProgress(false);
                }
                handleMessages({ ok: false, text: data.message });
            }, progressTimeOut);
        }
    });
    
    const updateMyProfile = (data: updateMyProfileVariables) => {
        mutationUpdateMyProfile({
            variables: data
        });
    }
    return {
        value: {
            updateMyProfile
        }
    }
}
const MyPageProvider: React.FC<any> = ({
    children
}) => (
    <MyPageContext.Provider { ...useFetch() }>
        {
            children
        }
    </MyPageContext.Provider>

);

export { useMyPageContext };
export default MyPageProvider;