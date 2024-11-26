import { FC } from 'react';

interface Props {
    className?: string
}
const CurveShape: FC<Props> = ({ className }) => {
    return (
        <div className={`menu-curve-shape ${className}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M24.811 24.9327V0.932739C24.811 14.1876 14.0659 24.9327 0.811035 24.9327H24.811Z" fill="white" />
            </svg>
        </div>
    );
};

export default CurveShape;