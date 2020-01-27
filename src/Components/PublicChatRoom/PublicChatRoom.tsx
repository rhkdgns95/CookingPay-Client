import React, { useEffect, useState, useRef } from "react";
import styled from "../../Styles/typed-components";
import { ItemUser, subscriptionPublicMessage, getPublicMessage, getPublicMessage_GetPublicMessage_publicMessages, sendPublicMessage, sendPublicMessageVariables,  } from "../../Types/api";
import ChatMessage from "../ChatMessage";
import { useSubscription, useQuery, useMutation } from "react-apollo";
import { SUBSCRIPTION_PUBLIC_MESSAGE, GET_PUBLIC_MESSAGE, SEND_PUBLIC_MESSAGE } from "./PublicChatRoomQueries";
import { getTime } from "../../Utils/getTime";
import { SubscribeToMoreOptions } from "apollo-boost";
import { useAppContext } from "../App/AppProvider";

const useInput = (): IUseTextArea => {
    const [value, setValue] = useState<string>("");

    const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
        // 추가사항 :
        // 0. 글자길이 1~100개
        //  - 만약, 긴 글을 복사해서 넣으면 100개의 문자까지만 보이도록 자르기.
        const { target: { value }} = event;
        setValue(value);
    };

    return {
        value,
        onChange
    };
};

const useFetch = (user: ItemUser | null) => {
    const { handleMessages, handleProgress, progress, progressTimeOut } = useAppContext();
    const formText = useInput();
    const chatScreenRef = useRef<any>({});

    const { subscribeToMore, data: dataPublicMessage } = useQuery<getPublicMessage, void>(GET_PUBLIC_MESSAGE, {
        fetchPolicy: "cache-and-network",
        onCompleted: data => {
            // console.log("GetPublicMessage onCompleted: ", data);
        },
        onError: data => {
            console.log("GetPublicMessage onError: ", data);
        }
    });
    // console.log("dataPublicMessage: ", dataPublicMessage);

    /**
     *  [1] ComponentDidMounted: useEffect(func, []);
     *  
     *  - chatScreenRef 확인
     *  - subscriptionToMoreOptions: SubscribeToMoreOptions
     *   : 구독하는 채팅 메시지 업데이트
     */
    useEffect(() => {
        // chatScreenRef 확인
        // if(chatScreenRef) {
        //     console.log("chatScreenRef: ", chatScreenRef);
        // }

        // subscription할 때, 새로운 메시지 추가 시키기.
        // ComponentDidMount() 안에 넣는이유는?
        // : 로딩될때마다 Subscription데이터가 계속해서 subscribeToMore하게 되어버린다. 
        // : console.log() 해보면, Prev가 3번이나 찍히는 이유를 알 수 있다.
        const subscribeToMoreOptions: SubscribeToMoreOptions = {
            document: SUBSCRIPTION_PUBLIC_MESSAGE,
            updateQuery: (prev, { subscriptionData }) => {
                if(!subscriptionData.data) {
                    return prev;
                }
                const updatedPublicMessages = Object.assign({}, {
                    GetPublicMessage: {
                        ...prev.GetPublicMessage,
                        publicMessages: [
                            ...prev.GetPublicMessage.publicMessages,
                            subscriptionData.data.SubscriptionPublicMessage
                        ]
                    }
                });
                // console.log("updatedPublicMessages: ", updatedPublicMessages);
                // console.log("subscribeToMoreOptions - UpdateQuery Start");
                // console.log("PREV: ", prev);
                // console.log("subscriptionData: ", subscriptionData);
                // console.log("subscribeToMoreOptions - UpdateQuery End");
                return updatedPublicMessages;
            }
        }
        subscribeToMore(subscribeToMoreOptions);
    }, []);

    /**
     *  [2] useEffect(fun, [dataPublicMessage])
     * 
     *  1. 새로운 채팅 메시지를 가져오면, 스크롤 맨아래로 하도록 한다.
     *  2. 실행
     *   - 초기의 메시지를 불러올 때
     *   - 구독중에 작성한 것을 불러올 때(본인 혹은 다른사람이 메시지를 전송할 때)
     */
    useEffect(() => {
        if(chatScreenRef.current) {
            chatScreenRef.current.scrollTo(0, 50);
            /**
             *  Screen의 Scroll Top 구하기 
             *  : Screen Scroll height - Screen height(스크롤 높이 - 스크린 높이) === TOP
             * 
             *  [1] Screen Scroll Height (스크린의 스크롤 높이)
             *   : chatScreenRef.current.scrollHeight
             *  [2] Screen Height (스크린 높이)
             *   : chatScreenRef.current.height 
             */
            const top: number = chatScreenRef.current.scrollHeight - chatScreenRef.current.offsetHeight;
            if(top > 0) {
                chatScreenRef.current.scrollTo(0, top);
                console.log("Top: ", top);
            }
        }
    }, [dataPublicMessage]);

    const [ sendPublicMessage ] = useMutation<sendPublicMessage, sendPublicMessageVariables>(SEND_PUBLIC_MESSAGE, {
        onCompleted: data => {
            if(progress) {
                const { SendPublicMessage: { ok, error = "Failed" }} = data;
                setTimeout(() => {
                    handleProgress(false);
                    if(ok) {
                        handleMessages({
                            ok: true,
                            text: "전송완료!"
                        });
                    } else {
                        handleMessages({
                            ok: false,
                            text: error
                        });   
                    }
                    
                }, progressTimeOut);
            }
            console.log("SendPublicMessage onCompleted: ", data);
        },
        onError: data => {
            if(progress) {
                setTimeout(() => {
                    handleProgress(false);
                    handleMessages({
                        ok: false,
                        text: data.message 
                    });
                }, progressTimeOut);
            }
            console.log("SendPublicMessage onError: ", data);
        }
    });

    const handleSendPublicMessage: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if(user && !progress) {
            // Login User만 작서할 수 있다.
            // 실행중인 경우 중복 실행 방지.
            const { value: text } = formText;
            console.log("TEXT: ", text);
            if(text.length > 0 && text.length <= 100) {
                // text의 길이는 1 ~ 100
                handleProgress(true);
                sendPublicMessage({
                    variables: {
                        text
                    }
                });
            } else {
                const text: string = "메시지는 1 ~ 100자 이어야 합니다.";
                handleMessages({ ok: false, text });
            }
        }
    };

    const { data } = useSubscription<subscriptionPublicMessage, void>(SUBSCRIPTION_PUBLIC_MESSAGE, {
        // shouldResubscribe: true,
        onSubscriptionData: data => {
            if(data.subscriptionData.data) {
                data.client.reFetchObservableQueries(true);
                const { SubscriptionPublicMessage } = data.subscriptionData.data;
                console.log("SubscriptionPublicMessage: ", SubscriptionPublicMessage?.id);
                console.log("SubscriptionPublicMessage: ", SubscriptionPublicMessage?.text);
            }
        },
    });

    const publicMessages: Array<getPublicMessage_GetPublicMessage_publicMessages | null> | null = dataPublicMessage?.GetPublicMessage.publicMessages || null;

    return {
        chatScreenRef,
        publicMessages,
        handleSendPublicMessage,
        formText,
    };
};

interface IProps {
    user: ItemUser | null;
};

const PublicChatRoom: React.FC<IProps> = ({
    user
}) => {
    
    const { progress } = useAppContext();
    const { chatScreenRef, publicMessages, handleSendPublicMessage, formText } = useFetch(user);

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
                            <ChatScreen ref={chatScreenRef}>
                                {
                                    publicMessages?.map((publicMessage, key) => 
                                        <ChatMessage key={key} date={getTime(publicMessage!.createdAt)} isMine={user ? user.id === publicMessage!.writer.id : false} text={publicMessage!.text}/>
                                    )
                                }
                                {/* <ChatMessage date={"2019-03-22"} isMine={false}  text={"hello world"}/>
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
                                <ChatMessage date={"2019-03-22"} isMine={true}  text={"hello world"}/> */}
                            </ChatScreen>
                         
                            <ChatInputForm onSubmit={handleSendPublicMessage}>
                                <InputChat  { ...formText } placeholder={user ? "메시지를 입력해주세요" : "로그인 유저만 이용가능합니다."} disabled={!user || progress}/>
                                <InputChatSubmit type={"submit"} value={"Submit"} disabled={!user || progress}/>
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
        max-height: none;
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