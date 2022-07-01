import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import JobInfo from './JobInfo.jsx'

function User (props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
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
        }]
    )

  return (
    <JobInfo job={jobs}/>
  )
    
} 
    
    
    
    
    export default User;
