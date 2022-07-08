import React, { useState, useEffect } from 'react';
import JobCard from './userComponents/JobCard.jsx';
import Colunms from './userComponents/Columns.jsx';
import { data, statuses } from '../data/mock.js';
import DropWrapper from './userComponents/DropWrapper.jsx';
import axios from 'axios';


function User (props) {
  //Data holds mockstate.  Once we use live data, we will need to set this to an empty array
  const[jobs, setJobs] = useState([])

  useEffect(() => {
    axios.get('/getalljobs')
    .then(response => {
      setJobs([...jobs, response])
    })
  })

  //onDrop function. Update job item with new status
  const onDrop = (item, monitor, status) => {
    setJobs(prevState => {
        const newItems = prevState
            .filter(i => i.id !== item.id)
            .concat({...item, status})
            return [...newItems];
        })
    };

  //dragging function
    const moveItem = ( dragIndex, hoverIndex) => {
      const item = jobs[dragIndex];
      setJobs(prevState => {
          const newItems = prevState.filter((i, idx) => idx !== dragIndex)
          newItems.splice(hoverIndex, 0, item);
          return [...newItems];
      });
 };

//rendering logic
      return (
        <div className={"row"}>
            {statuses.map(s => {
                 return (
                  <div key={s.status} className={"col-wrapper"}>
                        <h2 className={'col-header'}>{s.status.toUpperCase()}</h2>
                        <DropWrapper onDrop={onDrop} status={s.status}>
                        <Colunms>
                        { jobs 
                            .filter(i => i.status === s.status)
                            .map((i, idx ) => <JobCard key={i.id} item={i} index={idx}  moveItem={moveItem} status={s}/>)}
                        </Colunms>
                        </DropWrapper>
                    </div>
                )
            })}
          </div>
      )
}
    
export default User;
