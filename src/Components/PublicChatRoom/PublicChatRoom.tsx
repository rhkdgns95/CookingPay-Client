import React from "react";
import styled from "../../Styles/typed-components";
import { ItemUser, subscriptionPublicMessage } from "../../Types/api";
import ChatMessage from "../ChatMessage";
import { useSubscription } from "react-apollo";
import { SUBSCRIPTION_PUBLIC_MESSAGE } from "./PublicChatRoomQueries";

const useFetch = () => {
    const { data } = useSubscription<subscriptionPublicMessage, any>(SUBSCRIPTION_PUBLIC_MESSAGE, {
        onSubscriptionData: data => {
            if(data.subscriptionData.data) {
                const { SubscriptionPublicMessage } = data.subscriptionData.data;
                console.log("SubscriptionPublicMessage: ", SubscriptionPublicMessage?.id);
                console.log("SubscriptionPublicMessage: ", SubscriptionPublicMessage?.text);
            }
        }
    });

    console.log("RESULT: ", data);

    return {

    };
};

interface IProps {
    user: ItemUser | null;
};

const PublicChatRoom: React.FC<IProps> = ({
    user
}) => {
    const {} = useFetch();
    return (
        <Container>
            <Wrapper>
                <Room>
                    <RoomHeader>
                        <Title>Public Chat</Title>
                    </RoomHeader>
                    <RoomContent>
                        <ContentUsers>Profile...</ContentUsers>
                        <ContentMessage>
                            <ChatScreen>
                                <ChatMessage date={"2019-03-22"} isMine={false}  text={"hello world"}/>
                                <ChatMessage date={"2019-03-22"} isMine={false}  text={"hello world"}/>
                                <ChatMessage date={"2019-03-22"} isMine={true}  text={"hello world"}/>
                                <ChatMessage date={"2019-03-22"} isMine={true}  text={"hello world"}/>
                                <ChatMessage date={"2019-03-22"} isMine={false}  text={"hello world"}/>
                                <ChatMessage date={"2019-03-22"} isMine={false}  text={"hello worldhello worldhello worldhello worldhello worldhello worldhello world hello worldhello world"}/>
                                <ChatMessage date={"2019-03-22"} isMine={true}  text={"hello world"}/>
                                <ChatMessage date={"2019-03-22"} isMine={true}  text={"hello world"}/>
                                <ChatMessage date={"2019-03-22"} isMine={true}  text={"hello world"}/>
                                <ChatMessage date={"2019-03-22"} isMine={true}  text={"hello world"}/>
                                <ChatMessage date={"2019-03-22"} isMine={false}  text={"hello world"}/>
                                <ChatMessage date={"2019-03-22"} isMine={false}  text={"hello world"}/>
                                <ChatMessage date={"2019-03-22"} isMine={true}  text={"hello world"}/>
                            </ChatScreen>
                         
                            <ChatInputForm>
                                <InputChat />
                                <InputChatSubmit type={"submit"} value={"Submit"}/>
                            </ChatInputForm>
                        </ContentMessage>
                        <ContentMyProfile>Profile...</ContentMyProfile>
                    </RoomContent>
                </Room>
                Public Chat Room.
                {user?.name}
            </Wrapper>
        </Container>
    );
};

const Container = styled.div`

`;

const Wrapper = styled.div`

`;
const Room = styled.div`    
    border: 1px solid red;
`;
const RoomHeader = styled.div`
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid red;
`;
const Title = styled.span`
    text-align: center;
    padding: 30px 0;
`;
const RoomContent = styled.div`
    width: 100%;
    display: flex;
    min-height: 400px;
    max-height: 401px;
    @media(max-width: 910px) {
        flex-flow: column-reverse;
        & > div {
            width: 100%;
        }
    }
`;
const ContentUsers = styled.div`
    min-width: 20%;
    @media(max-width: 910px) {
    }
`;
const ContentMessage = styled.div`
    min-width: 60%;
    background-color: white;
    border-left: 1px solid black;
    border-right: 1px solid black;
    @media(max-width: 910px) {
        border: 0;
        border-top: 1px solid black;
        border-bottom: 1px solid black;

    }
`;
const ContentMyProfile = styled.div`
    min-width: 20%;
    background: linear-gradient(150deg, rgba(46,115,193,1) 0%, rgba(93,157,255,1) 100%);
    @media(max-width: 910px) {

    }
`;
const ChatScreen = styled.div`
    height: 90%;
    overflow-y: scroll;
`;
const ChatInputForm = styled.form`
    height: 10%;
    width: 100%;
    display: flex;
`;
const InputChat = styled.textarea`
    font-size: 12px;
    width: 100%;
    resize: none;
    padding: 5px 7.5px;
    line-height: 15px;
    letter-spacing: .6px;
    &:focus,
    &:active {
        outline: none;
    }
`;
const InputChatSubmit = styled.input`
    &:foucs,
    &:active {
        outline: none;
    }
`;
const RoomFooter = styled.div`
    
`;

export default PublicChatRoom;