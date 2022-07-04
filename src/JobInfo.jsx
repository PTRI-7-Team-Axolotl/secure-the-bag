
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'

function JobInfo(props) {
    const [jobIndex, setJobIndex] = useState(null)
    const [isShown, setIsShown] = useState(false)
    const [job, setJob] = useState(props.job)
    const [isLoaded, setIsLoaded] = useState(props.isLoaded)
    
    const onSubmit = data => {
        setIsLoaded(true);
        setJob([job[jobIndex], data]);
        console.log('data', data);
        setIsShown(current => !current);
    }
   
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    let onClick = (e) => {
        e.preventDefault()
        setIsShown(current => !current)
        setJobIndex(Number(e.target.id))
    }
    
   

   const listItems = props.job.map((job, index) => 
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
            <div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <label for="employer">Company: </label>
                    <input type="text" {...register("employer")} defaultValue={job[jobIndex].employer} />
                    <label for="title">Job Title: </label>
                     <input type="text" {...register("title")} defaultValue={job[jobIndex].title} />
                     <label for="expiration">Application Closes: </label>
                     <input type="text" {...register("expiration")} defaultValue={job[jobIndex].expiration} />
                     <label for="application">Application Link: </label>
                     <input type="text" {...register("application")} defaultValue={job[jobIndex].application} />
                     <label for="salary">Max Salary: </label>
                     <input type="text" {...register("salary")} defaultValue={job[jobIndex].salary} />
                     <label for="city">City: </label>
                     <input type="text" {...register("city")} defaultValue={job[jobIndex].city} />
                     <label for="description">Job Description: </label>
                     <input type="text" {...register("description")} defaultValue={job[jobIndex].description} />
                    <input type="submit"/>
                </form>
            </div>
        )
    }
   }



export default JobInfo;