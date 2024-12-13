import { FC } from 'react';

interface Props {
    label: string
    isActived: boolean
    onClick?: () => void
}
const FilterTab: FC<Props> = ({ label, isActived, onClick }) => {
    return (
        <button onClick={onClick} className={`py-1.5 px-3 h-max w-max rounded-lg text-xs font-semibold ${isActived ? "bg-sky-100 text-primary-500" : "bg-ternary text-slate-500"}`}>
            {label}
        </button>
    );
};

export default FilterTab;