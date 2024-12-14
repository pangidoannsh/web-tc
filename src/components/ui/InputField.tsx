import { forwardRef, ReactNode } from "react";

interface Props {
    prefix?: ReactNode;
    suffix?: ReactNode;
    placeholder?: string;
    className?: string;
    type?: "text" | "password" | "email";
    label?: string | ReactNode;
    name?: string;
    defaultValue?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    containerClassName?: string;
    as?: "input" | "textarea";
    height?: number;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputField = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
    (
        {
            className,
            placeholder,
            prefix,
            suffix,
            type = "text",
            label,
            name,
            defaultValue,
            value,
            onChange,
            containerClassName,
            as = "input",
            height,
            onKeyDown,
        },
        ref
    ) => {
        return (
            <div className={`flex flex-col gap-1 w-full ${containerClassName}`}>
                {label && label}
                <div className={`bg-ternary px-3 py-2 flex items-center gap-3 ${className}`}>
                    {prefix}
                    {as === "textarea" ? (
                        <textarea
                            ref={ref as React.Ref<HTMLTextAreaElement>}
                            name={name}
                            defaultValue={defaultValue}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            className="focus:outline-none bg-transparent flex-1 text-slate-500 resize-none"
                            onKeyDown={onKeyDown}
                            style={{ resize: 'none', height: height ? `${height}px` : 'auto' }}
                        />
                    ) : (
                        <input
                            ref={ref as React.Ref<HTMLInputElement>}
                            name={name}
                            defaultValue={defaultValue}
                            placeholder={placeholder}
                            type={type}
                            value={value}
                            onChange={onChange}
                            className="focus:outline-none bg-transparent flex-1 text-slate-500"
                            onKeyDown={onKeyDown}
                        />
                    )}
                    {suffix}
                </div>
            </div>
        );
    }
);

export default InputField;