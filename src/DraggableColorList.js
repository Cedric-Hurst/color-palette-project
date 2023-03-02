import DraggableColorBox from './DraggableColorBox';
import { v4 as uuid } from 'uuid'
import { SortableContext, sortableKeyboardCoordinates, } from '@dnd-kit/sortable';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    TouchSensor,
    MouseSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
export default function DraggableColorList(props) {
    const {colors, deleteColorBox, handleDragEnd} = props;
    const colorNames = colors.map(color => color.name);

    const sensors = useSensors(
        useSensor(MouseSensor, {
        activationConstraint: {
            delay: 100,
            tolerance: 10
        },
        }),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
        activationConstraint: {
            delay: 100,
            tolerance: 10
        },
        }),
        useSensor(TouchSensor, {
        activationConstraint: {
            delay: 100,
            tolerance: 10
        },
        }),
    );
    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={colorNames}>
                        {colors.map(color =>
                            <DraggableColorBox
                                key={uuid()}
                                color={color.color}
                                name={color.name}
                                handleDelete={() => deleteColorBox(color.name)}
                            />
                        )}
                    </SortableContext>
                </DndContext>
    )
}