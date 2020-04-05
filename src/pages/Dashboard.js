import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard(props) {
    return (
        <div className="text-center">
            <h4 className="my-5">Welcome, {props.user.userData.name}</h4>
            <h5 className="mt-5">
                The goal of this project is to build a smart digital assistant
                in the form of a chatbot, which assists users in navigating the
                large number of compliance-related documents that Medicines and
                Healthcare products Regulatory Agency (MHRA), the National
                Institute for Health and Care Excellence (NICE), and NHS Digital
                (NHSD) provide.
            </h5>
            <h5 className="mt-5">
                However, this project does not in any way guarantee that you
                will achieve compliance. More information can be viewed at our{" "}
                <Link to="/disclaimer">Disclaimer</Link>
            </h5>
        </div>
    );
}

export default Dashboard;
