import React, { useState } from 'react';
import styled from '../../Styles/typed-components';
import InputText from '../../Components/InputText';

interface IProps {

}
const useInput = () => {
    const [value, setValue] = useState<string>("");
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target: { value }} = event;
        setValue(value);
    };

    return {
        value,
        onChange
    };
};

const useFetch = () => {    
    const formEmail = useInput();
    const formName = useInput();

    return {
        formEmail,
        formName
    };
};

const FormFindPassword: React.FC<IProps> = () => {
    const { formName, formEmail } = useFetch();
    return (
        <Container>
            <Wrapper>
                <Form onSubmit={e => e.preventDefault()}>
                    <InputText id={"name"} label={"Name"} type={"text"} { ...formName } />
                    <InputText id={"email"} label={"Email"} type={"text"} { ...formEmail } />
                    <InputButton type={"submit"} value={"Find Email"}/>
                </Form>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`

`;

const Wrapper = styled.div`

`;

const Form = styled.form`
    width: 100%;
    display: block;
`;


const InputButton = styled.input`
    margin-top: 10px;
    width: 100%;
    padding: 8.5px;
    color: white;
    border: 0;
    border-radius: 3px;
    background-color: #7bbc14;
    transition: .2s;
    font-size: 12px;
    letter-spacing: .5px;
    cursor: pointer;
    &:hover {
        box-shadow: 0 1px 3px rgba(0,0,0,.24);
        background-color: #6cac07;
    }
    &:focus,
    &:active {
        outline: none;
    }
`;

export default FormFindPassword;