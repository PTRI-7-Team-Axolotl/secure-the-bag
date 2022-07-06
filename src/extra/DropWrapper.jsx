import React from 'react';
import { useDrop } from "react-dnd";
import ITEM_TYPE from "../../data/types.js"
import { statuses } from '../../data/mock.js'

const DropWrapper = ({ onDrop, children, status }) => {
    const [{ isOver }, drop ] = useDrop({
        accept:ITEM_TYPE,
        canDrop: (item, monitor) => {
            const itemIndex = statuses.findIndex(si => si.status === item.status)
            const statusIndex = status.findIndex(si => si.status === status)
            return [itemIndex+1, itemIndex-1, itemIndex].includes(statusIndex)
        },
        drop: (item, monitor) => {
            onDrop(item, monitor, status);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={drop} className={"drop-wrapper"}>
            {React.cloneElement(children, { isOver })}
        </div>
    )
}

export default DropWrapper;



