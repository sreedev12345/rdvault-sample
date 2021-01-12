import React from 'react';
import { useSelector} from 'react-redux';


import { useHistory } from "react-router-dom";


function Expenses() {
    let history = useHistory();
    const companyresponse = useSelector(state => state);
    const claimPage = ()=>{
        history.push('/secondpage')
    }

    return (
        <div id="expense" 
            className={ companyresponse.grantPeriod.data ===true  || companyresponse.grantPeriod.yes  === true && 
                companyresponse.companyReducer.data === true && 
                companyresponse.claimReducer.claimdata === true ? "rdexpenses_section row custom-m-top-40" : 
            "rdexpenses_section row custom-m-top-40 click"}>
            <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
                <div className="tell-us-about-your-company-left-section">
                    <hr className="tell-us-about-your-company-line" />
                    <h3> R&D
                        Expenses
                    </h3>
                </div>
            </div>
            <div className="col-md-6 col-xl-6 col-lg-6 col-sm-6 col-12">
                <div className="rdexpenses_card_section">
                    <div className="rdexpenses_card1_section">
                        <h4>Recommended</h4>
                        <div className="empty-space">
                        </div>
                        <p>Connect to your Xero account to view your data instantly and estimate your R&D claim more accurately. </p>
                        <button className="btn btn-primary">Connect To Xero</button>
                    </div>
                    <div className="rdexpenses_card2_section">
                        {/* 
                        <h4 className="title-empty-space"></h4>
                        */}
                        <div className="rdexpenses_card2_img">
                            <img src="assets/images/rdexpensesicon.png" alt="redexpensesicon" />
                        </div>
                        <p>Insert your expense information manually to estimate your R&D claim. </p>
                        <button className="btn btn-primary" onClick={claimPage}>Manually Input Data</button>
                    </div>
                </div>
            </div>
            <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
                <div className="tell-us-about-your-company-right-section">
                    <hr className="tell-us-about-your-company-line1" />
                    <div className="tell-us-about-your-company-right-section-img">
                        <img src="assets/images/bulb-icon.png" alt="bulb-icon" />
                    </div>
                    <p>We use Companies House publicly available data to retrieve information about your company. By using Companies House data, we can tell you exactly how many R&D claims you can make for your company. If we cannot find your company details not to worry, you can continue to use the company name you entered above.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Expenses
