import { FC, useState } from 'react';
import Draggable, { PositionDraggable } from './components/ui/Draggable';

const DEFAULT_POS = { x: 0, y: 0 }

const TestPage: FC = () => {
    const [position, setPosition] = useState<PositionDraggable>(DEFAULT_POS)
    return (
        <div className='flex justify-center items-center h-screen'>
            <Draggable position={position} onDrag={setPosition} >
                Test
            </Draggable>
        </div>
    );
};

export default TestPage;