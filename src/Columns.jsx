import React from 'react'
import { useDrop } from 'react-dnd'



const Columns = (props) => {
    const [collectedProps, drop] = useDrop(() => ({
        accept: 'jobs',
        item: props.jobs.index
      }))
       
    return (
      <div ref={drop} style={{ width: '25%', height: '100vh', margin: "0", padding: "0", outlineStyle: "solid" }}>{props.jobs.index}</div>
    )

}

export default Columns;