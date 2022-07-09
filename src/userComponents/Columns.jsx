import React from 'react'


//declaring our columns
const Columns = ({isOver, children}) => {
    const className = isOver ? 'highlight region' : "";
       
    return (
      <div className={`col${className}`}>
      {children}
    </div>
    )

}

export default Columns;