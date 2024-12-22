import { FC, useRef, useState } from 'react';
import InputField from './InputField';

interface Props {
    text: string
    setText: (text: string) => void
    className?: string
}
const InlineEdit: FC<Props> = ({ text, className, setText }) => {
    const [edit, setEdit] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    function onClick() {
        setEdit(true)
        setTimeout(() => inputRef.current!.focus(), 100)
    }
    return (
        <>
            <div className={`py-1 px-2 text-xl ${edit ? "hidden" : ""} ${className}`} onClick={onClick}>
                {text}
            </div>
            <div className={`flex-1 ${!edit ? "hidden" : ""}`}>
                <InputField ref={inputRef} value={text} onChange={e => setText(e.target.value)} onBlur={() => setEdit(false)}
                    className={`rounded-md !py-1 !px-2 text-xl`} />
            </div>

        </>


    );
};

export default InlineEdit;