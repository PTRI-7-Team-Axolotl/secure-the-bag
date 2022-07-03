import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import JobInfo from './JobInfo.jsx'

function User (props) {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
      console.log(isLoaded)
    })

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

  return (
    <JobInfo job={jobs} isLoaded={isLoaded}/>
  )
    
} 
    
    
    export default User;
