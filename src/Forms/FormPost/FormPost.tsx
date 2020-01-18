import React, { useState } from "react";
import styled from "../../Styles/typed-components";
import InputText from "../../Components/InputText";
import { useAppContext } from "../../Components/App/AppProvider";
import { usePostContext } from "../../Routes/Post/PostProvider";

const useInput = (progress: boolean): IUseInputText => {
    const [value, setValue] = useState<string>("");
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
}

const useFetch = () => {
    const { progress, handleProgress, handleMessages } = useAppContext();
    const { handleCreatePost } = usePostContext();
    const formTitle = useInput(progress);
    const formDescription = useInput(progress);
    // const photo = 
    
    return {
        formTitle,
        formDescription,
        progress,
        handleCreatePost,
        handleProgress,
        handleMessages
    };
}
const FormPost = () => {
    const { formTitle, formDescription, handleCreatePost, progress, handleProgress, handleMessages} = useFetch();
    return (
        <Container>
            <Wrapper>
                <Form onSubmit={e => {
                    e.preventDefault();
                    if(!progress) {
                        const { value: title } = formTitle;
                        const { value: description } = formDescription;
                        if(title.length > 0 && description.length > 0) {
                            handleProgress(true);
                            handleCreatePost(title, description);
                        } else {
                            handleMessages({ ok: false, text: "Input Title or Description" });
                        }
                    }
                }}>
                    <InputText label={"제목"} id={"title"} {...formTitle } type={"text"} />
                    <InputText label={"내용"} id={"description"} { ...formDescription } type={"textarea"} />
                    <SubmitButton type={"submit"} value={"Submit"} />
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

`;
const SubmitButton = styled.input`
    background-color: #13ab9d;
    padding: 10px 30px;
    border: 0;
    display: block;
    margin-left: auto;
    color: white;
    transition: .2s;
    cursor: pointer;
    &:hover {
        background-color: #24a7a1;
    }
`;
export default FormPost;