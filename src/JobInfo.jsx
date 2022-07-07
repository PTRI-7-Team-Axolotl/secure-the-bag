import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDrag } from 'react-dnd'
import './styles.css'

function JobInfo(props) {
  

   //react-hook-form hooks
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    //Linking our form submission with State
    const onSubmit = data => {
        props.onSubmit(data)
    }

//Reloading the user page if closing the Job details
    const onClick = e => {
        props.onClose(e)
    }
    
//displaying our data
  return (
     <div className="job-details">
              <form className="job-details-wrapper" onSubmit={handleSubmit(onSubmit)}>
                  <div classNam="job-details-job"></div>
                  <label for="employer">Company: </label>
                  <input type="text" {...register("employer")} defaultValue={props.jobs[props.jobIndex].employer} />
                  <label for="title">Job Title: </label>
                  <input type="text" {...register("title")} defaultValue={props.jobs[props.jobIndex].title} />
                  <label for="expiration">Application Closes: </label>
                  <input type="text" {...register("expiration")} defaultValue={props.jobs[props.jobIndex].expiration} />
                  <div className="job-details-job"></div>
                  <label for="application">Application Link: </label>
                  <input type="text" {...register("application")} defaultValue={props.jobs[props.jobIndex].application} />
                  <label for="salary">Max Salary: </label>
                  <input type="text" {...register("salary")} defaultValue={props.jobs[props.jobIndex].salary} />
                  <label for="city">City: </label>
                  <input type="text" {...register("city")} defaultValue={props.jobs[props.jobIndex].city} />
                  <div className="job-details-job"></div>
                  <label for="description">Job Description: </label>
                  <input type="text" {...register("description")} defaultValue={props.jobs[props.jobIndex].description} />
                  <input type="submit" value="Save" />
                  <button onClick={onClick}>Close</button>
              </form>
          </div>
           
        )
    }
   



export default JobInfo;