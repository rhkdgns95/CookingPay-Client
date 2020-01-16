import React from "react";
import styled from "../../Styles/typed-components";

interface IProps {
    className?: string;
}
const LoadingProgress: React.FC<IProps> = ({
    className
}) => (
    <Container>
        <Wrapper>
            <Progress className={className}>
                <Circle/>
            </Progress>
        </Wrapper>        
    </Container>
);

const Container = styled.div`
    
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;
const Progress = styled.div`
    position: relative;
    background-color: rgba(250,0,0, .5);
    padding: 35px;
    border-radius: 50%;

    &::before,
    &::after {
        content: "";
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        left: 0;
        background-color: white;
        border-radius: 50%;
        // padding: 5%;
        padding: 38%;
    }
    &::after {
        left: 100%;
    }
`;
const Circle = styled.div`
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 95%;
    height: 95%;
    border-radius: 50%;
`;
export default LoadingProgress;