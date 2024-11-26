import { FC } from 'react';

interface Props {
    imageUrl?: string
    name: string
    size?: number
    borderRadius?: number
}
const Avatar: FC<Props> = ({ imageUrl, name, size = 48, borderRadius = 16 }) => {
    function getInitials(name: string) {
        try {
            const words = name.split(" ");
            return words.length > 1 ? `${words[0][0]}${words[1][0]}` : name[0]
        } catch (e) {
            return "-";
        }
    }
    return (
        <div className='overflow-hidden bg-primary-600 flex items-center' style={{ width: `${size}px`, height: `${size}px`, borderRadius: `${borderRadius}px` }} >
            {imageUrl ? <img src={imageUrl} className='w-full' /> :
                <div className='w-full text-center text-white font-bold uppercase' style={{ fontSize: `${size / 3}px` }}>
                    {getInitials(name)}
                </div>
            }
        </div>
    );
};

export default Avatar;