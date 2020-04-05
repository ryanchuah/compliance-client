import React, { useState, useEffect } from "react";

function OpenSource(props) {
    return (
        <div>
            <h4 className="my-3">Libraries We Use</h4>
            <h6 className="my-3">
                The following sets forth attribution notices for third party software that may be 
                contained in portions of our chatbot product. We thank the open source community 
                for all of their contributions.
            </h6>
            <br/>
            
            <h5>
                <a href="https://github.com/facebook/react/blob/master/LICENSE">React</a>
            </h5>
            <br/>

            <h5>
                <a href="https://github.com/expressjs/express/blob/master/LICENSE">Express</a>
            </h5>
            <br/>

            <h5>
                <a href="https://github.com/googleapis/nodejs-dialogflow/blob/master/LICENSE">Node.js Dialogflow</a>
            </h5>
            <br/>

            <h5>
                <a href="https://www.mongodb.com/community/licensing">MongoDB</a>
            </h5>
            <br/>
        </div>
    );
}

export default OpenSource;
