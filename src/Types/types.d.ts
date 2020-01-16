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