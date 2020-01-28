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