import { FC, ReactNode } from 'react';
import { Select as AntSelect } from 'antd';
import { Icon } from '@iconify/react/dist/iconify.js';
import { DefaultOptionType } from 'antd/es/select';
// import type { SelectProps } from 'antd';

// type TagRender = SelectProps['tagRender'];

interface Props {
    options: DefaultOptionType[]
    placeolder?: string
    label?: string | ReactNode
    mode?: 'multiple' | 'tags'
    onChange?: (value: string | string[]) => void
    value?: string | string[] | null
    className?: string
    disabled?: boolean
}

const Select: FC<Props> = ({ options, placeolder, label, mode, onChange, value, className, disabled }) => {

    const onSearch = (value: string) => {
        console.log('search:', value);
    };
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label}
            <AntSelect
                disabled={disabled}
                mode={mode}
                className='text-slate-500'
                suffixIcon={<Icon icon="ic:baseline-arrow-drop-down" className='text-2xl' />}
                showSearch
                // tagRender={tagRender}
                placeholder={placeolder}
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                options={options}
                value={value}
            />
        </div>
    );
};

export default Select;