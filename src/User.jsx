import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JobCard from './userComponents/JobCard.jsx';
import Colunms from './userComponents/Columns.jsx';
import { statuses } from '../data/mock.js';
import DropWrapper from './userComponents/DropWrapper.jsx';
import axios from 'axios';
import JobSwipe from './JobSwipe.jsx';
import { useAuth } from './Auth.jsx';
import HomePage from './HomePage.jsx';


function User (props) {
  //Data holds mockstate.  Once we use live data, we will need to set this to an empty array
  const[jobs, setJobs] = useState([])
  let auth = useAuth();
  let navigate = useNavigate();

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

  const onLogout = () => {
    auth.signout(() => {
      navigate('/', { replace: true });
    });
  };


  //onDrop function. Update job item with new status
  const onDrop = (item, monitor, status) => {
    setJobs(prevState => {
      const newItems = prevState
        .filter(i => i.job_id !== item.job_id)
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

  if (jobs.length) {
    return (
      <>
        <nav>
          <Link to='/job-swipe' element={JobSwipe} style={{textAlign: 'center', margin: '0 auto'}}>Job Swipe</Link> {" | "}
          <Link to='/' element={HomePage} style={{textAlign: 'center', margin: '0 auto'}} onLogout={onLogout}>Logout</Link>
        </nav>
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
