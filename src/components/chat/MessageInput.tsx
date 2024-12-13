import { forwardRef, useEffect, useState } from 'react';
import InputField from '../ui/InputField';
import { Icon } from '@iconify/react/dist/iconify.js';

interface Props {
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    onSubmit?: () => void
    suffix?: React.ReactNode
}

const DEFAULT_ROW = 1

const MessageInput = forwardRef<HTMLTextAreaElement, Props>(({ value, setValue, onSubmit, suffix }, ref) => {
    const [rows, setRows] = useState(DEFAULT_ROW)
    function handleChangeInput(ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setValue(ev.target.value);
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
        setRows(DEFAULT_ROW + (value.split("\n").length - 1))
    }, [value])
    return (
        <InputField as='textarea' className='flex-1 rounded-lg text-sm' rows={rows} ref={ref}
            onKeyDown={handleKeyDown} onChange={handleChangeInput} value={value}
            suffix={
                <div className='flex gap-2 items-center text-slate-500'>
                    <button><Icon icon="simple-line-icons:emotsmile" className='text-xl' /></button>
                    {suffix}
                </div>
            } />
    );
})

export default MessageInput;