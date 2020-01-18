import React from "react";
import styled from "../../Styles/typed-components";

interface IProps {
    title: string;
    tabs: any;
}
const TopTitle: React.FC<IProps> = ({
    title,
    tabs
}) => (
    <Container>
        <Wrapper className={"row"}>
            <Title>{ title }</Title>
            <TabGroup>
                { tabs }
            </TabGroup>
        </Wrapper>
    </Container>
);

const Container = styled.div`
    background-color: #d9dbe4;
`;
const Wrapper = styled.div`
    padding: 50px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Title = styled.h5`
    color: #1f3f67;
    font-size: 18px;
`;
const TabGroup = styled.div`
    display: flex;
    justify-content: center;
`;

export default TopTitle;