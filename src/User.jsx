import React, { useState } from 'react';
import JobInfo from './JobInfo.jsx';
import { useDrag, useDrop } from 'react-dnd'
import JobCard from './JobCard.jsx'
import Colunms from './Columns.jsx'
import { data, statuses } from '../data/mock.js'
import Header from './Header.jsx';
import DropWrapper from './DropWrapper.jsx'


function User (props) {

  //Variable to determine whether the user component or JobInfo component is rendered
  const [isShown, setIsShown] = useState(false);
  //Variable to hold which job was clicked
  const [jobIndex, setJobIndex] = useState(null);
  //Variable to hold mockstate.  Once we use live data, we will need to set this to an empty array
  const[jobs, setJobs] = useState(data)
  const onDrop = (item, monitor, status) => {
    const mapping = statuses.find(si => si.status === status);

    setJobs(prevState => {
        const newItems = prevState
            .filter(i => i.id !== item.id)
            .concat({...item, status, icon: mapping.icon})
            return [...newItems];
        });
    };

  //onClick Function that activates when a job is clicked
  const onClick = (e) => {
    console.log(e)
    //e.preventDefault()
    // setIsShown(current => !current)
    // setJobIndex(Number(e.target.id))
  }

  //onSubmit Function that activates when the form is submitted
  const onSubmit = data => {
    setIsShown(current => !current)
    setJobs([jobs[jobIndex], data])
  }
 
  //onClose function that renders the user's job unpon closing the job-details
  const onClose = e => {
    setIsShown(current => !current)
  }
     //Mapping out our jobs to be displayed on the page
//      const listItems = jobs.map((job, index) => 
//      <div className='job-cards' onClick={onClick} 
//  > {< JobCard  key={index} name={index} id={index} jobs={jobs} />}
//  </div>
 
    //);
    const moveItem = ( dragIndex, hoverIndex) => {
      const item = jobs[dragIndex];
      setJobs(prevState => {
          const newItems = prevState.filter((i, idx) => idx !== dragIndex)
          newItems.splice(hoverIndex, 0, item);
          return [...newItems];
      });
 };



  //Our rendering logic
  if (!isShown) {
      // const columns = [];
      // for (let i = 0; i < 4; i++) {
      //   columns.push(<Colunms jobs={jobs}/>)
      // }
      return (
        // <div 
        //   style={{
        //     width: '100%',
        //     height: '100%',
        //     display: 'flex',
        //     flexWrap: 'wrap'
        //   }}>
        <div className={"row"}>
            {statuses.map(s => {
                 return (
                  <div key={s.status} className={"col-wrapper"}>
                        <h2 className={'col-header'}>{s.status.toUpperCase()}</h2>
                        <DropWrapper onDrop={onDrop} status={s.status}>
                        <Colunms>
                        { jobs 
                            .filter(i => i.status === s.status)
                            .map((i, idx ) => <JobCard onClick={onClick} key={i.id} item={i} index={idx}  moveItem={moveItem} status={s}/>)}
                        </Colunms>
                        </DropWrapper>
                    </div>
                )
            })}
           
            {/* <h3> {listItems}</h3>
           
            <div></div>
            {columns} */}
          </div>
      )
   } else {
      return (
    <JobInfo jobs={jobs} jobIndex={jobIndex} onSubmit={onSubmit} onClose={onClose}/>
  )
    
} 
    
}

//moveItem={moveItem}
    
export default User;
