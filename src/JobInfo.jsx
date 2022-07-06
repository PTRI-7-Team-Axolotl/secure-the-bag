import React, { useState, useEffect} from 'react';

function JobInfo(props) {
    const [jobIndex, setJobIndex] = useState(null)
    const [isShown, setIsShown] = useState(false)
    
    let onClick = (e) => {
        e.preventDefault()
        //let displayJob = e.target.__reactProps$fvcg9ohi4q9.id
        setIsShown(current => !current)
        setJobIndex(Number(e.target.id))
    }
    
   const listItems = props.job.map((job, index) => 
    <div key={index} onClick={onClick} name={index} id={index}>
    {job.company}
  </div>
   );


   
    if (!isShown) {
        return (
            <div>
                {listItems}
            </div>
        )
     }
     else {
        return (
            <div>
                {props.job[jobIndex].title}
            </div>
        )
    }
   }



export default JobInfo;