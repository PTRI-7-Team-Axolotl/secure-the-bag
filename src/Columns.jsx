import React from 'react'
import { useDrop } from 'react-dnd'



const Columns = ({isOver, children}) => {
    const className = isOver ? 'highlight region' : "";
       
    return (
      <div className={`col${className}`}>
      {children}
    </div>
    )

}

export default Columns;