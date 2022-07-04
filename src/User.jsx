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
            company:    "testing company1",
            title:        "software engineer",
            deadline:   "June 17, 2023",
            postUrl:      "www.randomwebsite",
            salary:         "$150,000",
            location:       "remote",
            description:    "description of job here",
            dateApplied:    "put in the date here",
            interviewDate: "interview date",
            notes:          "notes",
            result:         "result"
        }, {
            company:    "testing company2",
            title:        "software engineer",
            deadline:   "June 17, 2023",
            postUrl:      "www.randomwebsite",
            salary:         "$150,000",
            location:       "remote",
            description:    "description of job here",
            dateApplied:    "put in the date here",
            interviewDate: "interview date",
            notes:          "notes",
            result:         "result"
        }, {
          company: "testing event",
          title: "testing event"
        }]
    )

  return (
    <JobInfo job={jobs} isLoaded={isLoaded}/>
  )
    
} 
    
    
    export default User;
