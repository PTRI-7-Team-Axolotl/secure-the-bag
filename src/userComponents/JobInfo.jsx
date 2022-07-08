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
                <h1 style={{ flex: "1 90%" }}>{item.title}</h1>
                <button className="close-btn" onClick={onClose}>X</button>
            </div>
            <div>
            <div className="job-details">
                <form className = "job-details-wrapper" >
                    <div classNam="job-details-job"></div>
                    <label for="employer">Company: </label>
                    <input type="text" {...register("employer")} defaultValue={item.employer} />
                    <label for="title">Job Title: </label>
                     <input type="text" {...register("title")} defaultValue={item.title} />
                     <label for="expiration">Application Closes: </label>
                     <input type="text" {...register("expiration")} defaultValue={item.expiration} />
                     <div className="job-details-job"></div>
                     <label for="application">Application Link: </label>
                     <input type="text" {...register("application")} defaultValue={item.application} />
                     <label for="salary">Max Salary: </label>
                     <input type="text" {...register("salary")} defaultValue={item.salary} />
                     <label for="city">City: </label>
                     <input type="text" {...register("city")} defaultValue={item.city} />
                     <div className="job-details-job"></div>
                     <label for="description">Job Description: </label>
                     <input type="text" {...register("description")} defaultValue={item.description} />
                </form>
            </div>
                <h2>Status</h2>
                <p>{`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}</p>
            </div>
        </Modal>
    );
};

export default JobInfo;

