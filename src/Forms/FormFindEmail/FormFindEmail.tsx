import React, { useState } from "react";
import styled from "../../Styles/typed-components";
import InputText from "../../Components/InputText";
import { useFindAccountContext } from "../../Routes/FindAccount/FindAccountProvider";
import { useAppContext } from "../../Components/App/AppProvider";

interface IProps {

}
const useInput = (progress: boolean): IUseInputText => {
    const [ value, setValue ] = useState<string>("");
    
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if(!progress) {
            const { target: { value }} = event;
            setValue(value);
        }
    };

    return {
        value,
        onChange
    };
};

const useFetch = (progress: boolean) => {
    const formName = useInput(progress);

    return {
        formName
    };
};

const FormFindEmail: React.FC<IProps> = ({

}) => {
    const { progress, handleProgress, handleMessages } = useAppContext();
    const { handleFindEmail } = useFindAccountContext();
    const { formName } = useFetch(progress);
    
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if(!progress) {
            const {value: name} = formName;
            if(name.length > 0) {
                handleProgress(true);
                handleFindEmail(name);
            } else {
                handleMessages({ ok: false, text: "Please, input name" });
            }
        }
    };

    return (
        <Container>
            <Wrapper>
                <Form onSubmit={onSubmit}>
                    <InputText id={"name"} label={"Name"} type={"text"} { ...formName } />
                    <InputButton type={"submit"} value={"Find Email"} disabled={progress}/>
                </Form>
            </Wrapper>
    
        </Container>
    );

};

const Container = styled.div`

`;

const Wrapper = styled.div`

`;

const Form = styled.form`
    width: 100%;
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

export default FormFindEmail;