import React from "react";
import FindAccountProvider, { useFindAccountContext } from "./FindAccountProvider";
import styled from "../../Styles/typed-components";
import FormFindEmail from "../../Forms/FormFindEmail";
import FormFindPassword from "../../Forms/FormFindPassword";
import { Link } from "react-router-dom";

const FindAccount = () => (
    <FindAccountProvider>
        <FindAccountPresenter />
    </FindAccountProvider>
);

const FoundText = ({ text } :{ text: string }) => (
    <Text>{ text }</Text>
)
const Text = styled.span`
    color: black;
`;

const FindAccountPresenter = () => {
    const { isPassword, toggleIsPassword, message } = useFindAccountContext();
    const subTitle: string = isPassword ? "Password" : "Email";
    const findText: string = isPassword ? "" : "Email: ";
    return (
        <Container>
            <Box>
                <Wrapper>
                    <Header>
                        <Title>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"/></svg>
                            Find { subTitle }
                            {/* <SubTitle>{ subTitle }</SubTitle> */}
                        </Title>
                        <Menu>
                            <MenuItem onClick={toggleIsPassword}>
                                { !isPassword ? "Password" : "Email" }
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
                            </MenuItem>
                        </Menu>    
                    </Header>
                    <Message ok={message.ok}>
                        { message.ok && <FoundText text={findText} /> }
                        { message.text }
                    </Message>
                    { isPassword ? <FormFindPassword /> : <FormFindEmail /> }
                </Wrapper>
                <Wrapper>
                    계정이 존재하지 않습니까?
                    <GoHome to="/">돌아가기</GoHome>
                </Wrapper>
            </Box>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Box = styled.div`
    display: flex;
    flex-flow: column;
    width: 90%;
    max-width: 500px;
`;

const Wrapper = styled.div`
    position: relative;
    padding: 20px 12.5px;
    background-color: white;
    box-shadow: 0 1px 2px 1px rgba(50,50,50,.22);
    border-radius: 6px;
    &:last-child {
        margin-top: 30px;
        padding: 12.5px;
        text-align: center;
        font-size: 14px;
    }
`;
const GoHome = styled(Link)`
    color: #f08500;
    transition: .2s;
    margin-left: 10px;
    &:hover {
        color: #b36300;
    }
`;
const Header = styled.div`
    display: flex;
    margin-bottom: 80px;
`;
interface IMessage {
    ok: boolean;
}

const Message = styled.p<IMessage>`
    position: absolute;
    top: 80px;
    left: 20px;
    font-size: 13px;
    color: ${props => props.ok ? "blue" : "red"};
`;

const Title = styled.p`
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    & > svg {
        margin-right: 10px;
        border:1px solid #14bc67;
        padding: 5px;
        border-radius: 50%;
        fill: #14bc67;
    }
`;
const SubTitle = styled.span`
    margin-left: 10px;
    color: #7bbc14;
    font-size: 14px;
    padding-top: 3px;
`;

const Menu = styled.div`
    margin-left: auto;
`;
const MenuItem = styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7.5px 10px;
    padding-right: 25px;
    font-size: 12px;
    border: 0;
    cursor: pointer;
    border-radius: 3px;
    background-color: white;
    color: #14bc67;
    transition: .2s;
    &::after {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        left: 10%;
        // transform: translateX(-50%);
        background-color: #14bc67;
        width: 0;
        height: 1px;
        transition: .2s;
    }
    & svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        transition: .2s;
        fill: #14bc67;
    }

    &:hover {
        &::after {
            width: 80%;
        }
        & svg {
            right: 5px;
        }
    }
`;




export default FindAccount;