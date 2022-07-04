import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import JobInfo from './JobInfo.jsx'

function User (props) {
    const [isShown, setIsShown] = useState(false);
    const [jobIndex, setJobIndex] = useState(null);



    const[jobs, setJobs] = useState(
      [{
        employer: "Google",
        logo:     "placeholder",
        title:  'software engineer', 
        expiration: "June 23, 2022",  
        application: 'wwww.apply here',
        salary: '$150,000',
        city:     "Denver",
        remote:    'yes',
        description: "put some words in here",
        }, {
          employer: "Google2",
          logo:     "placeholder2",
          title:  'software engineer2', 
          expiration: "June 23, 20222",  
          application: 'wwww.apply here2',
          salary: '$150,0002',
          city:     "Denver2",
          remote:    'yes2',
          description: "put some words in here2",
        }]
    )


    const onClick = (e) => {
      e.preventDefault()
      setIsShown(current => !current)
      setJobIndex(Number(e.target.id))
  }

 
 

  const listItems = jobs.map((job, index) => 
  <div key={index} onClick={onClick} name={index} id={index}>{job.employer}</div>
 );


 
  if (!isShown) {
      return (
          <div>
              {listItems}
          </div>
      )
   } else {
      return (
    <JobInfo jobs={jobs} onClick={onClick} jobIndex={jobIndex}/>
  )
    
} 
    
}
    export default User;
