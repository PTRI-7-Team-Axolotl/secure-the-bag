
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'

function JobInfo(props) {
    const [jobIndex, setJobIndex] = useState(props.jobIndex)
    const [jobs, setJobs] = useState(props.jobs)
   
    

const onSubmit = data => {
 props.onSubmit(data)
   
}
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    

  return (
            <div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <label for="employer">Company: </label>
                    <input type="text" {...register("employer")} defaultValue={props.jobs[props.jobIndex].employer} />
                    <label for="title">Job Title: </label>
                     <input type="text" {...register("title")} defaultValue={props.jobs[props.jobIndex].title} />
                     <label for="expiration">Application Closes: </label>
                     <input type="text" {...register("expiration")} defaultValue={props.jobs[props.jobIndex].expiration} />
                     <label for="application">Application Link: </label>
                     <input type="text" {...register("application")} defaultValue={props.jobs[props.jobIndex].application} />
                     <label for="salary">Max Salary: </label>
                     <input type="text" {...register("salary")} defaultValue={props.jobs[props.jobIndex].salary} />
                     <label for="city">City: </label>
                     <input type="text" {...register("city")} defaultValue={props.jobs[props.jobIndex].city} />
                     <label for="description">Job Description: </label>
                     <input type="text" {...register("description")} defaultValue={props.jobs[props.jobIndex].description} />
                    <input type="submit"/>
                </form>
            </div>
        )
    }
   



export default JobInfo;