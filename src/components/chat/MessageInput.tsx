import { FC, useEffect, useState } from 'react';
import InputField from '../ui/InputField';
import { Icon } from '@iconify/react/dist/iconify.js';

interface Props {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    onSubmit?: () => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    suffix?: React.ReactNode
    inputRef: React.RefObject<HTMLTextAreaElement>
}

const DEFAULT_HEIGHT = 20
const HEIGHT_PER_ROW = 20
const MAX_LINE = 8
const MessageInput: FC<Props> = ({ value, setValue, onSubmit, suffix, onChange, inputRef }) => {
    const [height, setHeight] = useState(DEFAULT_HEIGHT)

    function handleChangeInput(ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        onChange?.(ev)
        setValue(ev.target.value.trim());
    }

    const handleKeyDown = (ev: React.KeyboardEvent) => {
        if (ev.key === "Enter") {
            if (ev.shiftKey) {
                setValue(value + "\n");
            } else {
                onSubmit?.();
            }
            ev.preventDefault();
        }
    };

    useEffect(() => {
        const countLine = value.length > 0 ? (value.split("\n").length - 1) : 0
        setHeight(DEFAULT_HEIGHT + ((countLine > MAX_LINE ? MAX_LINE : countLine) * HEIGHT_PER_ROW))
    }, [value])
    return (
        <InputField as='textarea' className='flex-1 rounded-lg text-sm' height={height} ref={inputRef}
            onKeyDown={handleKeyDown} onChange={handleChangeInput} value={value}
            suffix={
                <div className='flex gap-2 items-center text-slate-500'>
                    <button><Icon icon="simple-line-icons:emotsmile" className='text-xl' /></button>
                    {suffix}
                </div>
            } />
    );
}

export default MessageInput;