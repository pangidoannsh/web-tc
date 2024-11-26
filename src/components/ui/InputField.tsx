import { FC, ReactNode } from 'react';

interface Props {
    prefix?: ReactNode
    suffix?: ReactNode
    placeholder?: string
    className?: string
}
const InputField: FC<Props> = ({ className, placeholder, prefix, suffix }) => {
    return (
        <div className={`bg-ternary px-3 py-2 flex items-center gap-3  ${className}`}>
            {prefix}
            <input placeholder={placeholder} className='focus:outline-none bg-transparent flex-1 text-slate-500' />
            {suffix}
        </div>
    );
};

export default InputField;