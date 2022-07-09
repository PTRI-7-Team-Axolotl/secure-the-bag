import React from 'react';
import Modal from "react-modal";
import { useForm } from 'react-hook-form';

Modal.setAppElement("#root");

const JobInfo = ({ show, onClose, item }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            className={"modal"}
            overlayClassName={"overlay"}
        >
            <div className={"close-btn-ctn"}>
                <h1 style={{ flex: "1 90%" }}>{item.job_title}</h1>
                <button className="close-btn" onClick={onClose}>X</button>
            </div>
            <div>
            <div className="job-details">
                <form className = "job-details-wrapper" >
                    <div className="job-details-job"></div>
                    <label for="employer">Company: </label>
                    <input type="text" {...register("employer")} defaultValue={item.employer_name} />
                    <label for="title">Job Title: </label>
                     <input type="text" {...register("title")} defaultValue={item.job_title} />
                     <label for="expiration">Application Closes: </label>
                     <input type="text" {...register("expiration")} defaultValue={item.job_offer_expiration_timestamp} />
                     <div className="job-details-job"></div>
                     <label for="application">Application Link: </label>
                     <input type="text" {...register("application")} defaultValue={item.job_apply_link} />
                     <label for="salary">Max Salary: </label>
                     <input type="text" {...register("salary")} defaultValue={item.job_max_salary} />
                     <label for="city">City: </label>
                     <input type="text" {...register("city")} defaultValue={item.jobb_city} />
                     <div className="job-details-job"></div>
                     <label for="description">Job Description: </label>
                     <input type="text" {...register("description")} defaultValue={item.description} />
                </form>
            </div>
            </div>
        </Modal>
    );
};

export default JobInfo;

