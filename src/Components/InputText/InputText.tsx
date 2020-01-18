import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    margin: 10px auto;
`;

const Wrapper = styled.div`
    display: flex;
    // justify-content: center;
    align-items: flex-start;
    flex-flow: column-reverse;
    width: 100%;
`;

const FormInput = styled.input`
    width: 100%;
    padding: 7.5px 10px;
    border-radius: 3px;
    border: 1px solid #dfdfdf;
    outline: none;
    &:focus,
    &:hover {
        outline: none;
        & ~ label {
            color: #7782ba;
            transition: .2s;
        }
    }
`;
const FormTextArea = styled.textarea`
    width: 100%;
    padding: 7.5px 10px;
    border-radius: 3px;
    border: 1px solid #dfdfdf;
    outline: none;
    height: 350px;
    &:focus,
    &:hover {
        outline: none;
        & ~ label {
            color: #7782ba;
            transition: .2s;
        }
    }
`;
const FormLabel = styled.label`
    width: 100%;
    color: #94a5bb;
    font-size: 13px;
    margin-bottom: 3px;
`;
interface IProps {
    id: string;
    label: string;
    value: string;
    type: "text" | "password" | "textarea";
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    disabled?: boolean;
}

const InputText: React.FC<IProps> = ({
    id,
    label,
    value,
    type,
    onChange,
    disabled=false
}) => (
    <Container>
        <Wrapper>
            {
                type === "textarea" ?
                <FormTextArea id={`login_form_${id}`} onChange={onChange} value={value} disabled={disabled} style={{resize: "none"}}/> :
                <FormInput id={`login_form_${id}`} type={type} onChange={onChange} value={value} disabled={disabled} autoComplete={"off"}/>
            }
            
            <FormLabel htmlFor={`login_form_${id}`}>{ label }</FormLabel>
        </Wrapper>
    </Container>
);

export default InputText;