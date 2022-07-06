import React, { useState } from 'react';
import JobInfo from './JobInfo.jsx';


function User (props) {

  //Variable to determine whether the user component or JobInfo component is rendered
  const [isShown, setIsShown] = useState(false);
  //Variable to hold which job was clicked
  const [jobIndex, setJobIndex] = useState(null);
  //Variable to hold mockstate.  Once we use live data, we will need to set this to an empty array
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
      }, 
      {
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

  //onClick Function that activates when a job is clicked
  const onClick = (e) => {
    e.preventDefault()
    setIsShown(current => !current)
    setJobIndex(Number(e.target.id))
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
  const listItems = jobs.map((job, index) => 
    <div key={index} onClick={onClick} name={index} id={index}>{job.employer}</div>
  );

  const renderColumns = (i) => {
    if (i === 0 ) {
      return (
        <div key={i} style={{ width: '25%', height: '100vh', margin: "0", padding: "0", outlineStyle: "solid" }}> To Apply {listItems}</div>
      )
    } 
    if (i === 1 ) {
      return (
        <div key = {i} style = {{width: '25%', height: '100vh', margin: "0", padding: "0", outlineStyle: "solid"}}> Applied </div>
      )
    } 
    if ( i === 2 ) {
      return (
        <div key = {i} style = {{width: '25%', height: '100vh', margin: "0", padding: "0", outlineStyle: "solid"}}> Interview </div>
      )
    } 
    if ( i === 3 ) {
      return (
        <div key = {i} style = {{width: '25%', height: '100vh', margin: "0", padding: "0", outlineStyle: "solid"}}> Resolved </div>
      )
    }
  }

  //Our rendering logic
  if (!isShown) {
    const columns = [];
    for (let i = 0; i < 4; i++) {
      columns.push(renderColumns(i))
    }
    return (
      <div 
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        {columns}
      </div>
    )
  } else {
      return (
        <JobInfo jobs={jobs} onClick={onClick} jobIndex={jobIndex} onSubmit={onSubmit} onClose={onClose}/>
      )
    }
}
    
export default User;
