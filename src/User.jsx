import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JobCard from './userComponents/JobCard.jsx';
import Colunms from './userComponents/Columns.jsx';
import { statuses } from '../data/mock.js';
import DropWrapper from './userComponents/DropWrapper.jsx';
import axios from 'axios';
import JobSwipe from './JobSwipe.jsx';


function User (props) {
  
  const[jobs, setJobs] = useState([])

  //Grabbing our data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/users/getalljobs');
        console.log("axios response", response)
        setJobs(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);


  //onDrop function. Update job item with new status in database
  const onDrop = (item, monitor, status) => {
    axios.post('/users/updatestatus', {
              job_id: `${item.job_id}`,
              status: `${status}`
          }).then(response => console.log("axios post response", response))
            .then(setJobs(prevState => {
              const newItems = prevState
                .filter(i => i.job_id !== item.job_id)
                .concat({...item, status})
                return [...newItems];
            }))
            .catch(function (error) {
              console.log(error)});
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
  if (jobs.length) {
    return (
      <>
      {/* Link to the job-swipe page*/}
        <Link to='/job-swipe' element={JobSwipe} style={{textAlign: 'center', margin: '0 auto'}}>Job Swipe</Link>
        <div className={"row"}>
          {statuses.map(s => {
            return (
              <div key={s.status} className={"col-wrapper"}>
                <h2 className={'col-header'}>{s.status_name}</h2>
                  <DropWrapper onDrop={onDrop} status={s.status}>
                    <Colunms>
                      {jobs.filter(i => i.status === s.status)
                            .map((i, idx ) => <JobCard key={i.job_id} item={i} index={idx} moveItem={moveItem} status={s} />)}
                    </Colunms>
                  </DropWrapper>
              </div>
            )}
          )}
        </div>
      </>
    )
  } else return <div>Loading</div>
}
    
export default User;
