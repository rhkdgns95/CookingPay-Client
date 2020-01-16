import React from "react";
import styled, { keyframes } from "../../Styles/typed-components";
import LoadingProgress from "../LoadingProgress";
import { useAppContext } from "../App/AppProvider";

interface IProps {
    text?: string;
}

const AppProgress: React.FC<IProps> = ({
    text
}) => {
    const { progress } = useAppContext();
    return (
        <Container className={progress ? "active" : ""}>
            <Wrapper>
                <LoadingBox>
                    <LargeProgress className={"large-progress"}/>
                    <MiddleProgress className={"middle-progress"}/>
                    <SmallProgress className={"small-progress"}/>
                    <Text>{ text }</Text>
                </LoadingBox>
            </Wrapper>
        </Container>
    );
};

interface IProgress {
    className?: string;
}
const Progress: React.FC<IProgress> = ({
    className
}) => (
    <LoadingProgress className={className}/>
)

const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: none;
    justify-content: center;
    align-items: center;    
    z-index: 10;
    background-color: rgba(0,0,0,.15);
    &.active {
        display: flex;
    }
`;

const Wrapper = styled.div`
    width: 200px;
    height: 200px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    box-shadow: 0 2px 4px 6px rgba(150,150,150,.14);
`;
const LoadingBox= styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
`;

const LargeProgress = styled(Progress)`
    position: absolute;
    background: linear-gradient(180deg, rgba(255,204,153,1) 0%, rgba(227,127,127,1) 100%);
    animation: ${keyframes => RotateZ} linear 3s infinite;
`;
const MiddleProgress = styled(Progress)`
    position: absolute;
    padding: 25px;
    background: linear-gradient(90deg, rgba(208,142,55,1) 0%, rgba(167,200,7,1) 100%);
    animation: ${keyframes => RotateZ} linear 3s infinite;
    
`;
const SmallProgress = styled(Progress)`
    position: absolute;
    padding: 15px;
    background: linear-gradient(180deg, rgba(255,204,153,1) 0%, rgba(227,127,127,1) 100%);
    animation: ${keyframes => RotateZ} linear 3s infinite;
`;

const Text = styled.span`
    position: absolute;
    font-size: 11px;
    bottom: 6px;
    color: #dda0a0;
    letter-spacing: 1.5px;    
`;
/** Rotate Animation X, Y */
// const RotateY = keyframes`
//     from {
//         transform: rotateY(0deg);
//     }
//     from {
//         transform: rotateY(360deg);
//     }
// `;
// const RotateX = keyframes`
//     from {
//         transform: rotateX(0deg);
//     }
//     from {
//         transform: rotateX(360deg);
//     }
// `;
const RotateZ = keyframes`
    0% {
        opacity: 1;
        transform: rotateZ(0deg);
    } 
    50% {
        opacity: .5;
    }
    100% {
        opacity: 1;
        transform: rotateZ(360deg);
    }
`;
export default AppProgress;