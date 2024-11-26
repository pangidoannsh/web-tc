import { FC } from 'react';

interface Props {
    label: string
    isActived: boolean
}
const FilterTab: FC<Props> = ({ label, isActived }) => {
    return (
        <div className={`py-1.5 px-3 rounded-lg text-xs font-semibold ${isActived ? "bg-sky-100 text-primary-500" : "bg-ternary text-slate-500"}`}>
            {label}
        </div>
    );
};

export default FilterTab;