import React from "react";
import styled from "../../Styles/typed-components";

interface IProps {
    name: string;
    email: string;
    photo: string | null;
}

const TmpPhoto = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/></svg>;

const UserProfile: React.FC<IProps> = ({
    name,
    email,
    photo
}) => (
    <Container>
        <Wrapper>
            <Photo url={photo}>
                { !photo && <TmpPhoto/> }
            </Photo>
            <Info>
                <Name>{ name }</Name>
                <Email>{ email }</Email>
            </Info>
        </Wrapper>
    </Container>
);

const Container = styled.div`
    position: relative;
    padding: 8px 0;
    &:not(:first-child) {
        &::after {
            content: "";
            position: absolute;
            display: block;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 95%;
            margin: 0 auto;
            height: 2px;
            border-radius: 50%;
            background-color: #f1f1f1;
        }
    }
`;
const Wrapper = styled.div`
    display: flex;
`;

interface IPhoto {
    url: string | null;
}

const Photo = styled.div<IPhoto>`
    border-radius: 50%;
    border: 1px solid #585858;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    & svg {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        padding: 1px;
    }
    background-size: cover;
    background-position: center;
    ${props => props.url ? `background-image: url("${props.url}");` : ``}
`;
const Info = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
`;
const Text = styled.span`
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 120px;
    font-size: 12.5px;
    letter-spacing: .5px;
`;
const Name = styled(Text)`
    font-size: 14px;
    font-weight: bold;
`;
const Email = styled(Text)`
    margin-top: 2px;
`;


export default UserProfile;