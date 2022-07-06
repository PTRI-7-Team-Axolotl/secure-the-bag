import React from 'react';
import { useDrag } from 'react-dnd'

function JobCard( {id, jobs} ){
    const [collected, drag, dragPreview] = useDrag(() => ({
        type: 'jobs',
        item: { id }
      }))
      return collected.isDragging ? (
        <div ref={dragPreview} />
      ) : (
        <div ref={drag} {...collected} draggable style={{
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move',
            draggable:'true'
        }}>
        {jobs[id].employer}
        </div>
      )
}


export default JobCard;


