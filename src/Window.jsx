import React from 'react';
import Modal from 'react-modal';
import { Module } from 'webpack';


Modal.setAppElement('#app');

const Window = ( { show, onClose, item }) => {
    return (
        <Module
         isOpen={show}
         onRequestClose={onClose}
         className={"modal"}
         overlayClassName={"overlay"}
        >
            <div className={"close-btn-ctn"}>
            <h1 style={{ flex: "1 90%"}}>{item.title}</h1>
            <button className={"close-btn"} onClick={onClose}>Close</button>
            <h2>Description</h2>
            <p>{item.content}</p>
            <h2>Status</h2>
            <p>{item.icon} {`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}</p>
            </div>
        </Module>

    )
}


export default Window;