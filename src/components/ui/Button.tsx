import { ButtonProps } from 'antd';
import { FC } from 'react';

interface Props extends Omit<ButtonProps, "type"> {
    type?: "button" | "submit" | "reset";
    fill?: "link" | "text" | "default" | "primary" | "secondary";
}

const Button: FC<Props> = (props) => {
    const { type, className, fill } = props
    return (
        <button type={type} className={`rounded-md p-2 font-semibold duration-200 ${className} 
        ${fill === "text" || fill === "link" ? "text-primary-500 hover:text-primary-600" :
                fill === "secondary" ? "text-primary-500 bg-sky-100 shadow-sm hover:text-white hover:bg-primary-500" :
                    "bg-primary-500 hover:bg-primary-600 text-white"}`}>
            {props.children}
        </button>
    );
};

export default Button;