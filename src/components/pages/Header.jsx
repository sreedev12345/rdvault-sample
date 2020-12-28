import React from 'react';

const Header = () => {
    return (
        <header className="subpage-header-section header-section">

            {/* <!--------------LOGO HEADER STARTS--------------> */}

            <div className="logo-header">
                <div className="container">
                    <div className="logo-header-section">
                        <div className="row">
                            <div className="col-md-6 col-xl-6 col-lg-6 col-sm-6 col-12">
                                <div className="logo-header-left-section">
                                    <div className="logo-header-img">
                                        <img className="" src={process.env.PUBLIC_URL + "assets/images/logo.png"} alt="logo" />
                                    </div>
                                    <span className="logo-header-text"> R&D Tax Claim - Estimator </span>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-6 col-lg-6 col-sm-6 col-12">
                                <div className="logo-header-right-section">
                                    <div className="need-help">
                                        <button className="btn btn-primary">NEED HELP?</button>
                                    </div>
                                    <div className="header-phone-email-section">
                                        <ul>
                                            <li><a href="telto:0161 504 0800">
                                                <img className="img-fluid"
                                                    src={process.env.PUBLIC_URL + "assets/images/telephone_icon.png"}
                                                    alt="telephone_icon" /><span>0161 504 0800</span></a></li>
                                            <li><a href="mailto:hello@rdvault"><img className="img-fluid" src={process.env.PUBLIC_URL + "assets/images/mail_icon.png"} alt="mail_icon" /><span>hello@rdvault</span></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!--------------LOGO HEADER ENDS-------------->
      
            <!--------------STEPPER HEADER STARTS--------------> */}

            <div className="steps-header">
                <div className="container">
                    <div className="logo-header-section">
                        <div className="row">
                            <div className="col-md-12 col-xl-12 col-lg-12 col-sm-12 col-12">
                                <div className="steps-header-center-section">
                                    <div className="steps-header-center-section-content">
                                        <ul>
                                            <li><a href="#gg"><label><img src={process.env.PUBLIC_URL + "assets/images/steppertick.png"} alt="steppertick" /></label><span>Start</span></a></li>
                                            <li className="active"><a href="#ff"><label>2</label><span>Your Company</span></a></li>
                                            <li><a href="#gg"><label>3</label><span>Your Estimated R&D Claim</span></a></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* <!--------------STEPPER HEADER ENDS-------------->
      
       <!--------------HEADER HEADING STARTS--------------> */}

            <div className="header-heading">
                <div className="container">
                    <div className="logo-header-section">
                        <div className="row">
                            <div className="col-md-12 col-xl-12 col-lg-12 col-sm-12 col-12">
                                <div classname="header-heading-section">
                                    <div className="header-heading-section-content">
                                        <h1>  Tell us About Your Company</h1>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {/* <!--------------HEADER HEADING ENDS--------------> */}



        </header>
    )
}

export default Header;