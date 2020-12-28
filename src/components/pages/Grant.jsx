import React, { useState, useEffect } from 'react';


function Grant() {
    const [grantno, setGrantNo] = useState(false);
    const [grantyes, setGrantYes] = useState(false);

    const handleNo = () => {
        setGrantNo(!grantno);
        setGrantYes(false)
    }

    const handleYes = () => {
        setGrantNo(false);
        setGrantYes(!grantyes)
    }
    return (
        <div className="grands_subsidies_section row custom-m-top-40">
            <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
                <div className="tell-us-about-your-company-left-section">
                    <hr className="tell-us-about-your-company-line" />
                    <h3>  Grants &
                        Subsidies</h3>
                    {
                        grantno === true || grantyes === true ?
                            <div className="completed-text"><span>COMPLETED</span></div>
                            : null
                    }
                </div>
            </div>
            <div className="col-md-6 col-xl-6 col-lg-6 col-sm-6 col-12">
                <div className="tell-us-about-your-company-center-section">
                    <div className="tell-us-about-your-company-card-section">
                        <p className="custom-m-top-20">Has your company been in receipt of one or more Grants/Subsidies in this period?</p>
                        <div className="tell-us-about-your-company-card2">
                            <div className="tell-us-about-your-company-maincard2 column-card-1 custom-m-top-20">
                                <div className="tell-us-about-your-company-card2-width">
                                    <div className="tell-us-about-your-company-card2-label tell-us-about-your-company-card-section-label">
                                        <div className="tell-us-about-your-company-card2-top">
                                            <span>NO</span>
                                            <div className="cust-checkbox">
                                                <div className="custom-checkbox">
                                                    <input name="noti_6"
                                                        className="checkbox-custom"
                                                        id="noti_8" value="3"
                                                        type="checkbox"
                                                        checked={grantno}
                                                        onChange={handleNo
                                                        }
                                                    />
                                                    <label className="checkbox-custom-label" for="noti_8"></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tell-us-about-your-company-card2-width">
                                    <div className="tell-us-about-your-company-card2-label tell-us-about-your-company-card-section-label">
                                        <div className="tell-us-about-your-company-card2-top">
                                            <span>Yes</span>
                                            <div className="cust-checkbox">
                                                <div className="custom-checkbox">
                                                    <input
                                                        name="noti_6"
                                                        className="checkbox-custom"
                                                        id="noti_9" value="3"
                                                        type="checkbox"
                                                        checked={grantyes}
                                                        onChange={handleYes}
                                                    />
                                                    <label className="checkbox-custom-label" for="noti_9"></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
                <div className="tell-us-about-your-company-right-section">
                    <hr className="tell-us-about-your-company-line1" />
                    <div className="tell-us-about-your-company-right-section-img">
                        <img src="assets/images/bulb-icon.png"alt="bulb-icon" />
                    </div>
                    <p>We use Companies House publicly available data to retrieve information about your company. By using Companies House data, we can tell you exactly how many R&D claims you can make for your company. If we cannot find your company details not to worry, you can continue to use the company name you entered above.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Grant
