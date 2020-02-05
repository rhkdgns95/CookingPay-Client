interface ITheme {
    blueColor: string;
    redColor: string;
    bgColor: string;
    success: string;
    failed: string;
};

interface IAppMessage {
    ok: boolean;
    text: string | null;
    createdAt?: string;
}

interface IUseInputText {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> = () => any;
}
interface IUseTextArea {
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement> = () => any;
    onInit: () => void;
}

/**
 *  IChatMenu: Mobile환경에서의 Public CHat의 메뉴들
 *  - PROFILE: 나의 프로필
 *  - USERS: 유저들 리스트
 *  - CHAT: PUBLIC 채팅방
 */
type IChatMenu = "PROFILE"| "USERS" | "CHAT";