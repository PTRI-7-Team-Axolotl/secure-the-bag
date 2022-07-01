import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import JobInfo from './JobInfo.jsx'

function User (props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [jobIndex, setJobIndex] = useState(null)
    const [isShown, setIsShown] = useState(false)
    const[jobs, setJobs] = useState(
             [{
            company:    "testing company1",
            job:        "software engineer",
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
            job:        "software engineer",
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

    let onClick = (e) => {
        e.preventDefault()
        //let displayJob = e.target.__reactProps$fvcg9ohi4q9.id
        setIsShown(current => !current)
        setJobIndex(e.target.id)
    }
    
   const listItems = jobs.map((job, index) => 
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
    } else {
        return (
            <div>
            {isShown && <JobInfo/>}
            </div>
        )
    }
    
} 
    
    
    
    
    export default User;
