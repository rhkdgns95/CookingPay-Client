import React from 'react';
import styled from '../../Styles/typed-components';

interface IProps {
    active?: boolean;
    text: string;
    value: number;
    onChangeTab: (newData: number) => void;
}
const TabItem: React.FC<IProps> = ({
    active,
    text,
    value,
    onChangeTab
}) => (
    <Container>
        <Item className={active? "active" : ""} onClick={e => onChangeTab(value)}>{text}</Item>
    </Container>
)

const Container = styled.div`

`;

const Item = styled.button`
    position: relative;
    cursor: pointer;
    background-color: white;
    padding: 8px 20px;
    color: black;
    border: 0;
    box-shadow: 0;
    letter-spacing: 1px;
    &:first-child {
        margin-right: 10px;
    }
    &::after,
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #363152;
        transition: .2s;
        transition-timing-function: ease-in-out;
    }
    &::after {
        left: auto;
        right: 0;
        background-color: #ff3838;
    }
    &.active {
        &::after,
        &::before {
            width: 50%;
        }
    }
`;

export default TabItem;