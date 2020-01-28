import React, { useEffect, useState, useRef } from "react";
import styled from "../../Styles/typed-components";
import { ItemUser, subscriptionPublicMessage, getPublicMessage, getPublicMessage_GetPublicMessage_publicMessages, sendPublicMessage, sendPublicMessageVariables, getUserList, getUserList_GetUserList_users,  } from "../../Types/api";
import ChatMessage from "../ChatMessage";
import { useSubscription, useQuery, useMutation } from "react-apollo";
import { SUBSCRIPTION_PUBLIC_MESSAGE, GET_PUBLIC_MESSAGE, SEND_PUBLIC_MESSAGE, GET_USER_LIST } from "./PublicChatRoomQueries";
import { getTime } from "../../Utils/getTime";
import { SubscribeToMoreOptions } from "apollo-boost";
import { useAppContext } from "../App/AppProvider";
import ChatProfile from "../ChatProfile";
import UserProfile from "../UserProfile";

const useInput = (): IUseTextArea => {
    const [value, setValue] = useState<string>("");

    const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
        // 추가사항 :
        // 0. 글자길이 1~100개
        //  - 만약, 긴 글을 복사해서 넣으면 100개의 문자까지만 보이도록 자르기.
        const { target: { value }} = event;
        setValue(value);
    };
    const onInit = () => {
        setValue("");
    };

    return {
        value,
        onChange,
        onInit
    };
};

const useFetch = (user: ItemUser | null) => {
    const { handleMessages, handleProgress, progress, progressTimeOut } = useAppContext();
    const formText = useInput();
    const chatScreenRef = useRef<any>({}); // 채팅 스크린의 높이 파악
    const chatScrollRef = useRef<any>({}); // 채팅 스크린의 스크롤 이동여부 파악 (timeout에 적용하기)
    const [chatScrolled, setChatScrolled] = useState<boolean>(false); // 스타일 적용할 스크롤 이벤트 

    const { data: dataUserList } = useQuery<getUserList, any>(GET_USER_LIST, {
        onCompleted: data => {
            // console.log("GetUserList onCompleted: ", data);
        },
        onError: data => {
            console.log("GetUserList onError: ", data);
        }
    });

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
                // console.log("Top: ", top);
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
                        formText.onInit();
                    } else {
                        handleMessages({
                            ok: false,
                            text: error
                        });   
                    }
                    
                }, progressTimeOut);
            }
            // console.log("SendPublicMessage onCompleted: ", data);
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
                // const { SubscriptionPublicMessage } = data.subscriptionData.data;
                // console.log("SubscriptionPublicMessage: ", SubscriptionPublicMessage?.id);
                // console.log("SubscriptionPublicMessage: ", SubscriptionPublicMessage?.text);
            }
        },
    });
    /**
     *  handleChatScroll:
     *   - 채팅 스크린 스크롤 (검은 그림자 효과)
     */
    const handleChatScroll: React.UIEventHandler<HTMLDivElement> = e => {
        if(chatScreenRef.current) {
            const { currentTarget: { scrollTop }} = e;
            const top: number = chatScreenRef.current.scrollHeight - chatScreenRef.current.offsetHeight;
            /* top이 0보다 커야 스크롤바가 존재함. */ 
            if(top > 0) {
                /* handleChatScroll이 이미 실행한 경우: 쓰레드 제거 */
                if(chatScrollRef.current) {
                    clearTimeout(chatScrollRef.current);
                }
                /* scrollTop이 더 작다는 것: 위로 스크롤바가 이동한경우, */
                /* Math.round()로 반올림 */
                /* -5하는 이유는 정확한 값으로 했을경우 스타일에 조금 어색하므로 5px정도에 가까워 졌을경우로 설정 */
                const isScrolled: boolean = Math.round(top) - 5 > Math.round(scrollTop);
                chatScrollRef.current = setTimeout(() => {
                    setChatScrolled(isScrolled);
                }, [100]);
            }
        }   
    }
        
        

    const userList: Array<getUserList_GetUserList_users | null> | null = dataUserList?.GetUserList.users || null;
    const publicMessages: Array<getPublicMessage_GetPublicMessage_publicMessages | null> | null = dataPublicMessage?.GetPublicMessage.publicMessages || null;

    return {
        chatScreenRef,
        publicMessages,
        handleSendPublicMessage,
        formText,
        userList,
        handleChatScroll,
        chatScrolled,
    };
};

interface IProps {
    user: ItemUser | null;
};

const PHOTO = "https://taegon.kim/wp-content/uploads/2018/05/image-5.png";
const PublicChatRoom: React.FC<IProps> = ({
    user
}) => {
    const { progress } = useAppContext();
    const { userList, chatScreenRef, publicMessages, handleSendPublicMessage, formText, handleChatScroll, chatScrolled } = useFetch(user);

    return (
        <Container>
            <Wrapper>
                <Room>
                    <RoomHeader>
                        <Title>Public chat</Title>
                    </RoomHeader>
                    <RoomContent>
                        <ContentUsers>
                            <UserSearchBar>
                                <SearchInput type={"text"} placeholder={"Find User.."} />
                                <SearchButtonIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"/></svg>
                                </SearchButtonIcon>
                            </UserSearchBar>
                            <UserList>
                            {
                                userList ? userList?.map((user, key) => 
                                    <UserProfile key={key} email={user!.email} name={user!.name} photo={user!.photo || PHOTO}/>
                                ) :
                                <NoUsers>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.324-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z"/></svg>
                                    <NoUsersText>No Users.</NoUsersText>
                                </NoUsers>
                            }
                            </UserList>
                        </ContentUsers>
                        <ContentMessage>
                            <ChatScreen className={chatScrolled ? "active" : ""} ref={chatScreenRef} onScroll={handleChatScroll}>
                                {
                                    publicMessages?.map((publicMessage, key) => 
                                        <ChatMessage key={key} userName={publicMessage!.writer!.name} photo={publicMessage!.writer!.photo} date={getTime(publicMessage!.createdAt)} isMine={user ? user.id === publicMessage!.writer.id : false} text={publicMessage!.text}/>
                                    )
                                }
                            </ChatScreen>
                            <ChatInputForm onSubmit={handleSendPublicMessage}>
                                <InputChat  value={formText.value} onChange={formText.onChange} placeholder={user ? "메시지를 입력해주세요" : "로그인 유저만 이용 가능합니다."} disabled={!user || progress}/>
                                { user &&  <InputChatSubmit type={"submit"} value={"Send"} disabled={!user || progress}/> }
                            </ChatInputForm>
                        </ContentMessage>
                        <ContentMyProfile
                            photo={user?.photo || null}
                        >
                            <ChatProfile
                                photo={user?.photo || null}
                                name={user?.name || "Login Please"}
                            />
                        </ContentMyProfile>
                    </RoomContent>
                </Room>
                Public Chat Room.
                {user?.name}
            </Wrapper>
        </Container>
    );
};

const Container = styled.div`
    margin-top: 20px;
`;

const Wrapper = styled.div`

`;
const Room = styled.div`    
    box-shadow: rgba(0, 50, 100, 0.2) 0px 0.5px 10px, rgba(0, 50, 100, 0.2) 0px -0.5px 10px;
`;
const RoomHeader = styled.div`
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #dadada;
`;
const Title = styled.span`
    text-align: center;
    padding: 10px 0;
`;
const RoomContent = styled.div`
    width: 100%;
    display: flex;
    min-height: 400px;
    max-height: 401px;
    background-color: white;
    @media(max-width: 910px) {
        flex-flow: column-reverse;
        max-height: none;
        & > div {
            width: 100%;
        }
    }
`;
const NoUsers = styled.div`
    display: flex;
    justify-content: center;
    flex-flow: column;
    margin: 50px 0;
    text-align: center;
    color: #dadada;
    font-style: italic;
    & svg {
        margin: 0 auto;
        width: 30px;
        height: 30px;
        fill: #dfdfdf;
    }
`;
const NoUsersText = styled.div`

`;
const ContentUsers = styled.div`
    position: relative;
    min-width: 20%;
    @media(max-width: 910px) {
    }
`;
const UserSearchBar = styled.form`
    position: relative;
    height: 10%;
`;
const SearchInput = styled.input`   
    height: 100%;
    width: 100%;
    border: 0;
    border-bottom: 1px solid #dfdfdf;
    padding: 5px 10px;
    padding-right: 30px;
    font-size: 12px;
    letter-spacing: 1px;
    color: #655e8a;
    &::placeholder {
        color: #dfdfdf;
        font-size: 11px;
    }
`;
const SearchButtonIcon = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    & svg {
        opacity: .3;
        width: 15px;
        height: 15px;
    }
`;
const UserList = styled.div`
    position: relative;
    overflow-y: auto;
    height: 90%;
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
`;

const ContentMessage = styled.div`
    position: relative;
    min-width: 60%;
    background-color: white;
    border-left: 1px solid #dadada;
    border-right: 1px solid #dadada;
    
    
    
    @media(max-width: 910px) {
        border: 0;
        border-top: 1px solid black;
        border-bottom: 1px solid black;

    }
`;
interface IContentMyProfile {
    photo: string | null;
}
const ContentMyProfile = styled.div<IContentMyProfile>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 20%;
    // background: linear-gradient(150deg, rgba(46,115,193,1) 0%, rgba(93,157,255,1) 100%);
    ${props => props.photo ? `background-image: url("${props.photo}");` : ""}
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    & svg {
        fill: #ffffff;
    }
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: .85;
        background: linear-gradient(150deg, rgba(86,79,195,1) 0%, rgba(104,94,255,1) 100%);
    }
    @media(max-width: 910px) {
        padding: 30px;
    }
`;
const ChatScreen = styled.div`
    position: relative;
    &::before {
        content: "";
        display: block;
        position: sticky;
        top: 100%;
        left: 0;
        right: 0;
        width: 100%;
        height: 0;
        background: #1a424b;
        -webkit-filter: blur(10px);
        filter: blur(10px);
        -webkit-filter: blur(10px);
        opacity: 1;
        // z-index: 9;
        transition: .3;
    }
    &.active {
        &::before {
            z-index: 2;
            height: 8px;
            transform: translateY(-50%);
            top: 100%;
        }    
    }
    height: 87%;
    overflow-y: auto;
    padding: 0 10px;
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
    @media(max-width: 910px) {
        max-height: 350px;
    }
`;
const ChatInputForm = styled.form`
    height: 13%;
    width: 100%;
    display: flex;
    border-top: 1px solid #dadada;
`;
const InputChat = styled.textarea`
    font-size: 12px;
    width: 100%;
    resize: none;
    padding: 5px 7.5px;
    line-height: 15px;
    letter-spacing: .6px;
    border: 0;
    &:disabled {
        background-color: #f3f3f3;
    }
    &:focus,
    &:active {
        outline: none;
    }
`;
const InputChatSubmit = styled.input`
    background-color: inherit;
    border: 0;
    margin: auto 0;
    padding: 0 12px;
    margin-right: 10px;
    font-size: 13px;
    height: 90%;
    letter-spacing: .5px;
    background-color: #eea52b;
    color: white;
    border-radius: 6px;
    font-size: 11px;
    height: 70%;
    cursor: pointer;
    transition: .2s;
    
    &:foucs,
    &:active {
        outline: none;
    }
    @media(min-width: 911px) {
        &:hover {
            background-color: #e18f04;
        }
    }
`;
const RoomFooter = styled.div`
    
`;


export default PublicChatRoom;