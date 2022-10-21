import React, { useState } from "react";

const Window = (props) => {
    return (
        <div className="col">
            <div
                className="window p-4"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                <h3>{props.day}</h3>
            </div>
        </div>
    );
};

export default Window;
