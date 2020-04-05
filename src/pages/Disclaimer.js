import React, { useState, useEffect } from "react";

function Disclaimer(props) {
    return (
        <div>
            <h4 className="my-3">Disclaimer</h4>
            <h5>
                The information contained in this website is for general
                information purposes only. The information is provided by Ryan
                Chuah, To Eun Kim, and Xinyao Zhao who are working as part of a 
                Systems Engineering project at University College London and while we
                endeavour to keep the information up to date and correct, we
                make no representations or warranties of any kind, express or
                implied, about the completeness, accuracy, reliability,
                suitability or availability with respect to the website or the
                information, products, services, or related graphics contained
                on the website for any purpose. Any reliance you place on such
                information is therefore strictly at your own risk.
                <br/>
                <br/>
                In no event will we be liable for any loss or damage including
                without limitation, indirect or consequential loss or damage, or
                any loss or damage whatsoever arising from loss of data or
                profits arising out of, or in connection with, the use of this
                website.
                <br/>
                <br/>
                Through this website you are able to link to other websites
                which are not under the control of Ryan Chuah, To Eun Kim, and
                Xinyao Zhao who are working as part of a Systems Engineering project at University College London. We have no control over the nature, content
                and availability of those sites. The inclusion of any links does
                not necessarily imply a recommendation or endorse the views
                expressed within them. Every effort is made to keep the website
                up and running smoothly. However, Ryan Chuah, To Eun Kim, and
                Xinyao Zhao who are working as part of a Systems Engineering project at University College London takes no responsibility for, and will not be
                liable for, the website being temporarily unavailable due to
                technical issues beyond our control.
            </h5>
        </div>
    );
}

export default Disclaimer;
