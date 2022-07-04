
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'

function JobInfo(props) {
    const [jobIndex, setJobIndex] = useState(null)
    const [isShown, setIsShown] = useState(false)
    const [job, setJob] = useState(props.job)
    const [isLoaded, setIsLoaded] = useState(props.isLoaded)
    
    const onSubmit = data => {
        setIsLoaded(true);
        setJob([job[jobIndex].title, data]);
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
                    <input type="text" {...register("employer")} defaultValue={job[jobIndex].employer} />
                     <input type="text" {...register("title")} defaultValue={job[jobIndex].title} />
                     <input type="text" {...register("expiration")} defaultValue={job[jobIndex].expiration} />
                     <input type="text" {...register("application")} defaultValue={job[jobIndex].application} />
                     <input type="text" {...register("salary")} defaultValue={job[jobIndex].salary} />
                     <input type="text" {...register("city")} defaultValue={job[jobIndex].city} />
                     <input type="text" {...register("description")} defaultValue={job[jobIndex].description} />
                    <input type="submit"/>
                </form>
            </div>
        )
    }
   }



export default JobInfo;