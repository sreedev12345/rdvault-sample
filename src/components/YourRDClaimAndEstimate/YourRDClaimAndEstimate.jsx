import React, { useState, useEffect, useRef } from 'react';
import {
  Link,
} from "react-router-dom";
import { claimPeriod } from '../../components/redux/ClaimPeriod';
import { useSelector, useDispatch } from 'react-redux';
import { prevPage } from '../../components/redux/PrevPage'
import { useHistory } from "react-router-dom";
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'
import Select from 'react-select';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import SendPdfReport from './SendPdfReport';
import GetFreeAConsultation from './GetFreeAConsultation';
import ScheduleConsultation from './ScheduleConsultation';
import SendBeforePdfDelete from './SendBeforePdfDelete';
import ThanksWithSocial from './ThanksWithSocial';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];


var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const YourRDClaimAndEstimate = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  const textInput = useRef();
  const accountvalue = useRef();
  const companyresponse = useSelector(state => state);
  const [sendPopup, setSendPopup] = useState(false);
  const [freeConsult, setfreeConsult] = useState(false);
  const [schedulePopup, setSchedulePopup] = useState(false);
  const [profitbtn, setProfitbtn] = useState(false);
  const [lossbtn, setLossBtn] = useState(false);
  let [text, setText] = useState("");
  const [volume, setVolume] = useState(0);
  const [volume1, setVolume1] = useState(0);
  const [selectedOption, setselectedOption] = useState(null);
  const [data, setdata] = useState({
    accountname: "",
    amountvalue: "",
  })
  const [renderdata, setRenderData] = useState([]);
  let total = 0;


  useEffect(() => {
    window.scrollTo(0, 0);
  },[])

  useEffect(() => {
	if(!companyresponse) {
		history.push('/')
	  }
	   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[!companyresponse]);



  const editCompany = () => {
	history.push('/')
	dispatch(prevPage("company"))
    dispatch(claimPeriod(true, companyresponse.claimReducer.startdate, companyresponse.claimReducer.enddate))
  }

  const handleEdit = () => {
    dispatch(prevPage("claimperiod"))
    dispatch(claimPeriod(true, companyresponse.claimReducer.startdate, companyresponse.claimReducer.enddate));
    history.push('/')
  }

  const focusTextInput = (e) => {
    e.preventDefault()
    textInput.current.focus();
    const elemnt = document.getElementById("btn-text");
    elemnt.scrollIntoView(
      { behavior: 'smooth' }
    );
  }

  const handleText = (e) => {
    e.preventDefault();
    setText(e.target.value)
  }

  const loss = () => {
    setLossBtn(!lossbtn)
    setProfitbtn(false)
  }

  const profit = () => {
    setProfitbtn(!profitbtn)
    setLossBtn(false)
  }

  const modalOpen = () => {
    setSendPopup(true);
  };
  const closePopupPdf = () => {
    setSendPopup(false);
  };

  const modalOpenConsult = () => {
    setfreeConsult(true);
  };
  const closePopupConsult = () => {
    setfreeConsult(false);
  };

  const modalScheduleConsult = () => {
    setSchedulePopup(true);
  };
  const closeScheduleConsult = () => {
    setSchedulePopup(false);
  };

  const keyPress = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault();
    }
  }

  const accountButton = (e) => {
    e.preventDefault();
    accountvalue.current.focus();
  }

  const handleSlider = (volume) => {
    setVolume(volume)
  }

  const handleSlider1 = (volume1) => {
    setVolume1(volume1)
  }

  const focusText = (e) => {
    setText("")
    e.preventDefault();
  }

  const optionChange = (selectedOption) => {
    setselectedOption(selectedOption)
  }

  const handleComplete = () => {
    const obj = {
      volume: volume,
      volume1: volume1,
      accountname: data.accountname,
      amountvalue: data.amountvalue,
      selectedOption: selectedOption ? selectedOption : null
    }
    setRenderData((datas) => {
      return [...datas, obj]
    })
    setdata({ accountname: "", amountvalue: "" });
    setselectedOption(null)
    setVolume(0)
    setVolume1(0)
  }

  const handleDelete = (e, val, i) => {
    e.preventDefault();
    renderdata.splice(i, 1);
    return setRenderData(renderdata.filter(data => data))
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata(datas => ({ ...data, [name]: value }))
  }


  for (var i = 0; i < renderdata.length; i++) {
    total += parseInt(renderdata[i].amountvalue)
  }

  return (
    <>
      <Header />
      {sendPopup && <SendPdfReport closePdf={closePopupPdf} />}
      {freeConsult && <GetFreeAConsultation closeConsultation={closePopupConsult} />}
      {schedulePopup && <ScheduleConsultation closescheduleConsult={closeScheduleConsult} />}
      {schedulePopup && <SendBeforePdfDelete />}
      {schedulePopup && <ThanksWithSocial />}
      <section className="tell-us-about-your-company">
        <div className="container-fluid">
          <div className="tell-us-about-your-company-section">
            <div className="row">
              <div className="col-md-12 col-xl-3 col-lg-12 col-sm-12 col-12">
                <div className="tell-us-about-your-company-left-section">
                  <hr className="tell-us-about-your-company-line" />
                  <h3> Company Information</h3>
                </div>
              </div>
              <div className="col-md-6 col-xl-6 col-lg-9 col-sm-6 col-12">
                <div className="tell-us-about-your-company-center-section">
                  <div className="tell-us-about-your-company-card-section">
                    <div className="rdclaim_estimatecard1">
                      <div className="rdclaim_estimatecard1_leftcontent">
                        <p>
                          <b>Company Name:</b> {companyresponse.companyReducer.data1 ? companyresponse.companyReducer.data1 : "no name found"}
                        </p>
                        <Link className="edit_name_btn" onClick={editCompany}> EDIT NAME</Link>
                      </div>
                      <div className="rdclaim_estimatecard1_leftcontent">
                        <p>
                          <b>R&D Claim Period:</b> {
                            companyresponse.claimReducer.startdate && companyresponse.claimReducer.enddate ?
                              companyresponse.claimReducer.startdate.getDate() + " " + months[companyresponse.claimReducer.startdate.getMonth()] + " " +
                              companyresponse.claimReducer.startdate.getFullYear() + " to " +
                              companyresponse.claimReducer.enddate.getDate() + " " + months[companyresponse.claimReducer.enddate.getMonth()] + " " +
                              companyresponse.claimReducer.enddate.getFullYear() : "no dates found"
                          }
                        </p>
                        <Link className="edit_name_btn" onClick={handleEdit}>EDIT PERIOD</Link>
                      </div>
                      <div className="rdclaim_estimatecard1_leftcontent">
                        <p>
                          <b>
                            Has your company been in receipt of one or more Grants, Subsidies,
                            CBILS, BBLs & Innovation Loans?{' '}
                          </b>{' '}
                        </p>
                        <div>
                          <label className="toggleSwitch">
                            <input type="checkbox" />
                            <span>
                              <span>NO</span>
                              <span>YES</span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-xl-3 col-lg-3 col-sm-12 col-12">
                <div className="tell-us-about-your-company-right-section">
                  <hr className="tell-us-about-your-company-line1" />
                  <div className="tell-us-about-your-company-right-section-img">
                    <img src="assets/images/bulb-icon.png" alt="bulb-icon" />
                  </div>
                  <p>
                    Colin needs to write four lined tip to go in this space here but it isnt written
                    yet. To be provided before going to developers.
                  </p>
                </div>
              </div>
            </div>
            <div className="grands_subsidies_section row custom-m-top-40">
              <div className="col-md-12 col-xl-3 col-lg-12 col-sm-12 col-12">
                <div className="tell-us-about-your-company-left-section">
                  <hr className="tell-us-about-your-company-line" />
                  <h3> Profit & Loss</h3>
                </div>
              </div>
              <div className="col-md-6 col-xl-6 col-lg-9 col-sm-6 col-12">
                <div className="tell-us-about-your-company-center-section">
                  <div className="tell-us-about-your-company-card-section">
                    <h6 className="rdclaim_estimatecard2_title">
                      Are you a Profit or Loss making company?
                    </h6>

                    <div className="tell-us-about-your-company-card2">
                      <div className="tell-us-about-your-company-maincard2 column-card-1 custom-m-top-20">
                        <div className="tell-us-about-your-company-card2-width">
                          <div
                            className={profitbtn === true ? "tell-us-about-your-company-card2-label tell-us-about-your-company-card-section-label label-active" : "tell-us-about-your-company-card2-label tell-us-about-your-company-card-section-label"}>
                            <div className="tell-us-about-your-company-card2-top">
                              <span>Profit</span>
                              <div className="cust-checkbox">
                                <div className="custom-checkbox">
                                  <input
                                    name="noti_6"
                                    className="checkbox-custom"
                                    id="noti_8"
                                    value="3"
                                    type="checkbox"
                                    checked={profitbtn === true}
                                    onClick={profit}
                                  />
                                  <label className="checkbox-custom-label" htmlFor="noti_8"></label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tell-us-about-your-company-card2-width">
                          <div
                            className={lossbtn === true ? "tell-us-about-your-company-card2-label tell-us-about-your-company-card-section-label label-active"
                              : "tell-us-about-your-company-card2-label tell-us-about-your-company-card-section-label"}>
                            <div className="tell-us-about-your-company-card2-top">
                              <span>Loss</span>
                              <div className="cust-checkbox">
                                <div className="custom-checkbox">
                                  <input
                                    name="noti_6"
                                    className="checkbox-custom"
                                    id="noti_9"
                                    value="3"
                                    type="checkbox"
                                    checked={lossbtn === true}
                                    onClick={loss}
                                  />
                                  <label className="checkbox-custom-label" htmlFor="noti_9"></label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h6 className="rdclaim_estimatecard2_title" >
                      Increase Estimate Accuracy: <img src="images/up-arrow.png" alt="arrow" />
                    </h6>
                    <div className="increase-accuracy-btn">
                      <Link>
                        <img src="assets/images/refresh-icon.png" alt="refresh-icon" onClick={focusText} />
                        <span className="input-text-second">
                          <input
                            className="label-active inputs"
                            onKeyPress={keyPress}
                            style={{ Color: "white",border: "none"  }}
                            type="text"
                            ref={textInput}
                            value={text}
                            onChange={handleText}
                            onClick={e => e.preventDefault()}
                          />
                        </span>
                        <img src="assets/images/edit-pencil-icon.png"
                          alt="pencil-icon"
                          onClick={focusTextInput} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-xl-3 col-lg-3 col-sm-12 col-12" id="btn-text">
                <div className="tell-us-about-your-company-right-section">
                  <hr className="tell-us-about-your-company-line1" />
                  <div className="tell-us-about-your-company-right-section-img">
                    <img src="assets/images/bulb-icon.png" alt="bulb-icon" />
                  </div>
                  <p>
                    Colin needs to write four lined tip to go in this space here but it isnt written
                    yet. To be provided before going to developers.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rd_expenses_information">
            <div className="rd_expenses_information_heading">
              <h2>R&D Expenses Information</h2>
              <hr className="tell-us-about-your-company-line2" />
              <div className="rd_expenses_information_img_text">
                <img src="assets/images/bulb-icon.png" alt="bulb-icon" />
                <span>
                  Note you can only make a claim within two years of the last day of your accounting
                  period, please can you check the dates and try again. If you get stuck, click on
                  the chatbox for more help
                </span>
              </div>
            </div>
            <div className={profitbtn || lossbtn === true ? "rd_expenses_information_table" : "rd_expenses_information_table click"} id="rd-expense-information">
              <table>
                <thead className="thead-bg">
                  <tr>
                    <th style={{ width: '5%' }}>
                      <Link data-toggle="modal" data-target="#myModal1" className="all-refresh-icon">
                        <img src="assets/images/refresh-icon.png" alt="refresh-icon" />
                        <p>ALL</p>
                      </Link>
                    </th>
                    {/* <th>
                      <a data-toggle="modal" data-target="#myModal3">
                        Code
                        <img src="assets/images/info.png" />
                      </a>
                    </th> */}
                    <th>
                      <Link data-toggle="modal" data-target="#myModal2" className="all-refresh-icon">
                        Account Name <img src="assets/images/info.png" alt="info" />
                      </Link>
                    </th>
                    <th>
                      <Link data-toggle="modal" data-target="#myModal4" className="all-refresh-icon">
                        Amount <img src="assets/images/info.png" alt="info" />
                      </Link>
                    </th>
                    <th>
                      <Link data-toggle="modal" data-target="#myModal7" className="all-refresh-icon">
                        Type of R&D Expense <img src="assets/images/info.png" alt="info" />
                      </Link>
                    </th>
                    <th style={{ width: '21%' }} className="extra-width">
                      <Link data-toggle="modal" data-target="#myModal5" className="all-refresh-icon">
                        R&D Project(s) <img src="assets/images/info.png" alt="info" />
                      </Link>
                    </th>
                    <th style={{ width: '21%' }}>
                      <Link data-toggle="modal" data-target="#myModal6" className="all-refresh-icon">
                        Grant/CBILS Funded R&D Project(s) <img src="assets/images/info.png" alt="info" />
                      </Link>
                    </th>
                  </tr>
                </thead>

                <tbody className="tbody-bg">
                  {/* <tr>
                    <td colSpan="7">
                      <h4 className="table-title">PROFIT & LOSS</h4>
                    </td>
                  </tr> */}
                  {/* <tr>
                    <td colSpan="7">
                      <h6 className="table-subtitle">Turnover</h6>
                    </td>
                  </tr> */}
                  {/* <tr>
                    <td colSpan="7">
                      <p className="horizontal-line"></p>
                    </td>
                  </tr> */}
                  <tr>
                    {/* <td style={{ width: '5%' }}></td>
                    <td>
                      <p>AC04</p>
                    </td> */}
                    {/* <td>
                      <a className="close-icon" href="#">
                        <img src="images/close-btn.png" />
                        <span>Cleaning</span>
                      </a>
                    </td> */}
                    {/* <td> */}
                    {/* <div className="rupee-editable-btn">
                        <input type="text" value="£20,000" />
                        <a className="" href="#">
                          <img src="images/edit-pencil-icon.png" />
                        </a>
                      </div> */}
                    {/* <a className="rupee-edit-btn" href="#">
                        <span>£20,000</span>
                        <img src="images/edit-pencil-icon.png" />
                      </a> */}
                    {/* </td> */}
                    {/* <td style={{ width: '22%' }}>
                      <Select className="custom-select-box" options={options} />{' '}
                    </td> */}
                    {/* <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider className="custom-range-slider" orientation="horizontal" />{' '}
                      <span className="custom-range-slider-percentage-text">33%</span>
                    </td> */}
                    {/* <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider className="custom-range-slider" orientation="horizontal" />{' '}
                      <span className="custom-range-slider-percentage-text">33%</span>
                    </td> */}
                  </tr>
                  <tr>
                    {/* <td style={{ width: '5%' }}></td>
                    <td>
                      <p>AC04</p>
                    </td> */}
                    {/* <td>
                      <a className="close-icon" href="#">
                        <img src="images/close-btn.png" />
                        <span>Cleaning</span>
                      </a>
                    </td> */}
                    {/* <td> */}
                    {/* <div className="rupee-editable-btn">
                        <input type="text" value="£20,000" />
                        <a className="" href="#">
                          <img src="images/edit-pencil-icon.png" />
                        </a>
                      </div> */}
                    {/* <a className="rupee-edit-btn" href="#">
                        <span>£20,000</span>
                        <img src="images/edit-pencil-icon.png" />
                      </a> */}
                    {/* </td> */}
                    {/* <td style={{ width: '22%' }}>
                      <Select className="custom-select-box" options={options} />{' '}
                    </td> */}
                    {/* <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider className="custom-range-slider" orientation="horizontal" />{' '}
                      <span className="custom-range-slider-percentage-text">33%</span>
                    </td> */}
                    {/* <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider className="custom-range-slider" orientation="horizontal" />{' '}
                      <span className="custom-range-slider-percentage-text">33%</span>
                    </td> */}
                  </tr>
                  <tr>
                    {/* <td style={{ width: '5%' }}></td>
                    <td>
                      <p>AC04</p>
                    </td> */}
                    {/* <td>
                      <a className="close-icon" href="#">
                        <img src="images/close-btn.png" />
                        <span>Cleaning</span>
                      </a>
                    </td> */}
                    {/* <td> */}
                    {/* <div className="rupee-editable-btn">
                        <input type="text" value="£20,000" />
                        <a className="" href="#">
                          <img src="images/edit-pencil-icon.png" />
                        </a>
                      </div> */}
                    {/* <a className="rupee-edit-btn" href="#">
                        <span>£20,000</span>
                        <img src="images/edit-pencil-icon.png" />
                      </a> */}
                    {/* </td> */}
                    {/* <td style={{ width: '22%' }}>
                      <Select className="custom-select-box" options={options} />{' '}
                    </td> */}
                    {/* <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider className="custom-range-slider" orientation="horizontal" />{' '}
                      <span className="custom-range-slider-percentage-text">33%</span>
                    </td> */}
                    {/* <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider className="custom-range-slider" orientation="horizontal" />{' '}
                      <span className="custom-range-slider-percentage-text">33%</span>
                    </td> */}
                  </tr>
                  <tr>
                    {/* <td style={{ width: '5%' }}></td>
                    <td>
                      <p>AC04</p>
                    </td> */}
                    {/* <td>
                      <a className="close-icon" href="#">
                        <img src="images/add-icon.png" />
                        <img className="img-display" src="images/close-btn.png" />
                        <span>Cleaning</span>
                      </a>
                    </td> */}
                    {/* <td> */}
                    {/* <div className="rupee-editable-btn">
                        <input type="text" value="£20,000" />
                        <a className="" href="#">
                          <img src="images/edit-pencil-icon.png" />
                        </a>
                      </div> */}
                    {/* <a className="rupee-edit-btn" href="#">
                        <span>£20,000</span>
                        <img src="images/edit-pencil-icon.png" />
                      </a> */}
                    {/* </td> */}
                    {/* <td style={{ width: '22%' }}>
                      <Select className="custom-select-box" options={options} />{' '}
                    </td> */}
                    {/* <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider className="custom-range-slider" orientation="horizontal" />{' '}
                      <span className="custom-range-slider-percentage-text">33%</span>
                    </td> */}
                    {/* <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider className="custom-range-slider" orientation="horizontal" />{' '}
                      <span className="custom-range-slider-percentage-text">33%</span>
                    </td> */}
                  </tr>
                  <tr>
                    {/* <td colSpan="7">
                      <h4 className="table-title">Cost Of Sales</h4>
                    </td> */}
                  </tr>
                  <tr>
                    {/* <td colSpan="7">
                      <h6 className="table-subtitle">Turnover</h6>
                    </td> */}
                  </tr>
                  <tr>
                    {/* <td colSpan="7">
                      <p className="horizontal-line"></p>
                    </td> */}
                  </tr>
                  <tr className="row-active">
                    {/* <td style={{ width: '5%', textAlign: 'center' }}>
                      <a href="#">
                        <img src="images/refresh-icon1.png" />
                      </a>
                    </td> */}
                    {/* <td>
                      <p>AC04</p>
                    </td> */}
                    {/* <td>
                      <a className="close-icon" href="#">
                        <img src="images/close-btn.png" />
                        <span>Cleaning</span>
                      </a>
                    </td> */}
                    {/* <td> */}
                    {/* <div className="rupee-editable-btn">
                        <input type="text" value="£20,000" />
                        <a className="" href="#">
                          <img src="images/edit-pencil-icon.png" />
                        </a>
                      </div> */}
                    {/* <a className="rupee-edit-btn" href="#">
                        <span>£20,000</span>
                        <img src="images/edit-pencil-icon.png" />
                      </a> */}
                    {/* </td> */}
                    {/* <td style={{ width: '22%' }}>
                      <Select className="custom-select-box" options={options} />{' '}
                    </td> */}
                    {/* <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider className="custom-range-slider" orientation="horizontal" />{' '}
                      <span className="custom-range-slider-percentage-text">33%</span>
                    </td> */}
                    {/* <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider className="custom-range-slider" orientation="horizontal" />{' '}
                      <span className="custom-range-slider-percentage-text">33%</span>
                    </td> */}
                  </tr>
                  <tr className="row-active">
                    {/* <td style={{ width: '5%' }}></td>
                    <td>
                      <p>AC04</p>
                    </td> */}
                    {/* <td>
                      <a className="close-icon" href="#">
                        <img src="images/close-btn.png" />
                        <span>Cleaning</span>
                      </a>
                    </td> */}
                    {/* <td> */}
                    {/* <div className="rupee-editable-btn">
                        <input type="text" value="£20,000" />
                        <a className="" href="#">
                          <img src="images/edit-pencil-icon.png" />
                        </a>
                      </div> */}
                    {/* <a className="rupee-edit-btn" href="#">
                        <span>£20,000</span>
                        <img src="images/edit-pencil-icon.png" />
                      </a> */}
                    {/* </td> */}
                    {/* <td style={{ width: '22%' }}>
                      <Select className="custom-select-box" options={options} />{' '}
                    </td> */}
                    {/* <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider className="custom-range-slider" orientation="horizontal" />{' '}
                      <span className="custom-range-slider-percentage-text">33%</span>
                    </td> */}
                    {/* <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider className="custom-range-slider" orientation="horizontal" />{' '}
                      <span className="custom-range-slider-percentage-text">33%</span>
                    </td> */}
                  </tr>
                  {/* <tr className="row-fade"> */}
                  {/* <td style={{ width: '5%' }}></td> */}
                  {/* <td>
                      <p>AC04</p>
                    </td> */}
                  {/* <td>
                      <a className="close-icon" href="#">
                        <img src="assets/images/close-btn.png" alt="close" />
                        <span>Cleaning</span>
                      </a>
                    </td> */}
                  {/* <td>
                      <div className="rupee-editable-btn">
                        <input type="text" value="£20,000" />
                        <a className="" href="#">
                          <img src="assets/images/edit-pencil-icon.png" alt="pencil-icon" />
                        </a>
                      </div> */}
                  {/* <a className="rupee-edit-btn" href="#">
                        <span>£20,000</span>
                        <img src="images/edit-pencil-icon.png" />
                      </a> */}
                  {/* </td> */}
                  {/* <td style={{ width: '22%' }}>
                      <Select className="custom-select-box" options={options} />{' '}
                    </td> */}
                  {/* <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider className="custom-range-slider" orientation="horizontal" />{' '}
                      <span className="custom-range-slider-percentage-text">33%</span>
                    </td> */}
                  {/* <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider className="custom-range-slider" orientation="horizontal" />{' '}
                      <span className="custom-range-slider-percentage-text">33%</span>
                    </td>
                  </tr> */}
                  {/* <tr>
                    <td style={{ width: '5%' }}></td> */}
                  {/* <td>
                      <p>AC04</p>
                    </td> */}
                  {/* <td>
                      <a className="close-icon" href="#">
                        <img src="assets/images/close-btn.png" />
                        <span>Cleaning</span>
                      </a>
                    </td> */}
                  {/* <td>
                      <div className="rupee-editable-btn">
                        <input type="text" value="£20,000" />
                        <a className="" href="#">
                          <img src="assets/images/edit-pencil-icon.png" />
                        </a>
                      </div> */}
                  {/* <a className="rupee-edit-btn" href="#">
                        <span>£20,000</span>
                        <img src="images/edit-pencil-icon.png" />
                      </a> */}
                  {/* </td> */}
                  {/* <td style={{ width: '22%' }}>
                      <Select className="custom-select-box" options={options} />{' '}
                    </td> */}
                  {/* <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider className="custom-range-slider" orientation="horizontal" />{' '}
                      <span className="custom-range-slider-percentage-text">33%</span>
                    </td> */}
                  {/* <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider className="custom-range-slider" orientation="horizontal" />{' '}
                      <span className="custom-range-slider-percentage-text">33%</span>
                    </td>
                  </tr> */}

                  {
                    renderdata.length >= 1 ? renderdata.map((val, i) => {
                      return (
                        <tr className="row-active" value={i}>
                          <td style={{ width: '5%' }}></td>
                          <td>
                            <Link className="close-icon">
                              <img src="assets/images/close-btn.png" alt="close-btn" onClick={(e) => handleDelete(e, val, i)} />
                              <span>{val ? val.accountname : null}</span>
                            </Link>
                          </td>
                          <td>
                            <div className="rupee-editable-btn">
                              <input type="text" value={val ? val.amountvalue : null} />
                              <Link>
                                <img src="assets/images/edit-pencil-icon.png" alt="pencil-icon" />
                              </Link>
                            </div>
                            {/* <a className="rupee-edit-btn" href="#">
                        <span>£20,000</span>
                        <img src="images/edit-pencil-icon.png" />
                      </a> */}
                          </td>
                          <td style={{ width: '22%' }}>
                            <Select className="custom-select-box"
                              value={val ? val.selectedOption : null}

                            />{' '}
                          </td>
                          <td>
                            <label className="custom-range-slider-price">£{val ? val.amountvalue : 0}</label>
                            <Slider className="custom-range-slider" value={val ? val.volume : null} orientation="horizontal" />{' '}
                            <span className="custom-range-slider-percentage-text">{val.volume}%</span>
                          </td>
                          <td>
                            <label className="custom-range-slider-price">£{val ? val.amountvalue : 0}</label>
                            <Slider className="custom-range-slider" value={val ? val.volume1 : null} orientation="horizontal" />{' '}
                            <span className="custom-range-slider-percentage-text">{val.volume1}%</span>
                          </td>
                        </tr>
                      )
                    }) : null
                  }
                  {/* </tr> */}
                  <tr>
                    <td style={{ width: '5%' }}></td>
                    <td>
                      <Link className="close-icon">
                        <img src="assets/images/add-icon.png" alt="close" onClick={accountButton} />
                        <span><input type="text" name="accountname"
                          ref={accountvalue} onClick={e => e.preventDefault()} value={data.accountname} onChange={handleChange} /></span>
                      </Link>
                    </td>
                    <td>
                      <div className="rupee-editable-btn">
                        <input type="text" name="amountvalue" onClick={e => e.preventDefault()}
                          onKeyPress={keyPress} value={data.amountvalue} onChange={handleChange} />
                        <Link >
                          <img src="assets/images/edit-pencil-icon.png" alt="edit-pencil" />
                        </Link>
                      </div>
                      {/* <a className="rupee-edit-btn" href="#">
                        <span>£20,000</span>
                        <img src="images/edit-pencil-icon.png" />
                      </a> */}
                    </td>
                    <td style={{ width: '22%' }}>
                      <Select
                        className="custom-select-box"
                        name="selector"
                        options={options}
                        onChange={optionChange}
                      // value={selectedOption.optionChange ? selectedOption.optionChange : ""}
                      />{' '}
                    </td>
                    <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider
                        className="custom-range-slider"
                        name="slider1"
                        value={volume}
                        orientation="horizontal"
                        onChange={handleSlider} />{' '}
                      <span className="custom-range-slider-percentage-text">{volume}%</span>
                    </td>
                    <td>
                      <label className="custom-range-slider-price">£59,400</label>
                      <Slider
                        className="custom-range-slider"
                        name="slider2"
                        value={volume1}
                        onChange={handleSlider1}
                        onChangeComplete={handleComplete}
                        orientation="horizontal" />{' '}
                      <span className="custom-range-slider-percentage-text">{volume1}%</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '5%' }}></td>
                    <td></td>
                    <td>
                      <Link className="close-icon">
                        <span>Total Cost of Sales</span>
                      </Link>
                    </td>
                    <td>
                      <Link className="total-cost-sales rupee-edit-btn">
                        <span>£{total}</span>
                      </Link>
                    </td>
                    <td style={{ width: '22%' }}></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colSpan="7">
                      <p className="horizontal-line1"></p>
                    </td>
                  </tr>
                  {/* <tr className="subtotal-spacing">
                    <td colSpan="3">
                      <p className="total-label">Operating Profit</p>
                    </td>
                    <td>
                      <p className="total-label1">£19,587</p>
                    </td>
                    <td colSpan="2"></td>
                  </tr> */}
                  {/* <tr className="subtotal-spacing">
                    <td colSpan="7">
                      <p className="horizontal-line1"></p>
                    </td>
                  </tr> */}
                  {/* <tr className="subtotal-spacing">
                    <td colSpan="3">
                      <p className="total-label">Operating Profit</p>
                    </td>
                    <td>
                      <p className="total-label1">£19,587</p>
                    </td>
                    <td colSpan="2"></td>
                  </tr> */}
                  {/* <tr className="subtotal-spacing">
                    <td colSpan="7">
                      <p className="horizontal-line1"></p>
                    </td>
                  </tr> */}
                  {/* <tr className="subtotal-spacing">
                    <td colSpan="3">
                      <p className="total-label">Operating Profit</p>
                    </td>
                    <td>
                      <p className="total-label1">£19,587</p>
                    </td>
                    <td colSpan="2"></td>
                  </tr> */}
                  {/* <tr>
                    <td colSpan="7">
                      <p className="horizontal-line1"></p>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="rd_expenses_accordion">
          <div className="rd_expenses_accordion_heading">
            <img src="assets/images/xero-logo.png" alt="xero-logo"/>
            <span>You have another 66 accounts unidentified as R&D expenses</span>
            <button className="show-view-btn btn btn-primary">
              <span>SHOW FULL VIEW</span> <img src="assets/images/collapse-icon.png" alt="collapse-icon"/>
            </button>
          </div>
        </div>
        <div className="container-fluid">
          <div className="your-rd-tax-claim-section grands_subsidies_section row custom-m-top-40">
            <div className="col-md-12 col-xl-3 col-lg-3 col-sm-12 col-12">
              <div className="tell-us-about-your-company-left-section">
                <hr className="tell-us-about-your-company-line" />
                <h3> Your R&D Tax Claim Estimate</h3>
                <img className="color-logo" src="assets/images/logo1.png" alt="logo1"/>
              </div>
            </div>
            <div className="col-md-6 col-xl-6 col-lg-6 col-sm-6 col-12">
              <div className="tell-us-about-your-company-center-section">
                <div className="">
                  <div className="your-rd-claim-section6">
                    <div className="your-rd-claim-section6-left">
                      <p>Total R&D Tax Credits and Cash Saved</p>
                      <div className="your-rd-claim-section6-left-content">
                        <img src="assets/images/down-arrow1.png" alt="down-arrow1"/>
                        <span>£166,100</span>
                      </div>
                    </div>
                    <div className="your-rd-claim-section6-right">
                      <div className="your-rd-claim-section6-right-content">
                        <label>Total Qualifying R&D Expenses</label>
                        <span>£84,234,400</span>
                      </div>
                      <div className="your-rd-claim-section6-right-content">
                        <label>Price to make this R&D Claim</label>
                        <span>£1,995</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-xl-3 col-lg-3 col-sm-12 col-12">
              <div className="your-rd-claim-section-btn">
                <button className="send-pdf-btn" onClick={modalOpen}>
                  SEND PDF REPORT
                </button>
                <button className="consultation-btn" onClick={modalOpenConsult}>
                  GET A FREE CONSULTATION
                </button>
                <button className="end-session-btn" onClick={modalScheduleConsult}>
                  END SESSION & DELETE DATA
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RESET COUNT POPUP  */}

        <div className="reset-count-popup modal hold-on-popup" id="myModal1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  Are you sure you want to reset all accounts to the original?
                </h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="reset-btn">
                  <button className="btn btn-primary">
                    <img src="assets/images/refresh-icon.png" alt="refresh-icon"/>
                    <span>RESET ACCOUNTS</span>
                  </button>
                </div>
              </div>
              {/* <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>  */}
            </div>
          </div>
        </div>

        {/* ACCOUNT NAME POPUP  */}
        <div className="modal account-name-popup" id="myModal2">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                {/* <h4 className="modal-title"></h4> */}
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <h6>Account Name</h6>

                <p>
                  The Account Name usually identifies the type of expenses recorded in this account
                  and synced from your Xero. The name usually gives an estimated indication of
                  whether the costs could qualify for R&D tax credits..
                </p>
              </div>
              {/* <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>  */}
            </div>
          </div>
        </div>

        {/* XERO ACCOUNT CODE POPUP  */}
        <div className="modal account-name-popup" id="myModal3">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                {/* <h4 className="modal-title"></h4> */}
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <h6>Xero Account Code</h6>

                <p>
                  The code is used to group similar or frequently used accounts together in your
                  chart of accounts. You can use any code for any account as long as its unique.
                </p>
              </div>
              {/* <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>  */}
            </div>
          </div>
        </div>

        {/* AMOUNT POPUP  */}
        <div className="modal account-name-popup" id="myModal4">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                {/* <h4 className="modal-title"></h4> */}
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <h6>Amount</h6>

                <p>
                  This is the amount of cost incurred in this accounting period for each type of
                  account. A positive number means its an expense, and a negative number means its
                  income.
                </p>
              </div>
              {/* <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>  */}
            </div>
          </div>
        </div>

        {/* NON GRANT PROJECT POPUP  */}
        <div className="modal account-name-popup" id="myModal5">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                {/* <h4 className="modal-title"></h4> */}
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <h6>R&D Project(s)</h6>

                <p>
                  R&D Tax Credits are part of a Government scheme that allows SMEs to reclaim up to
                  33% of the amount spent on Research and Development – even if you make a loss.
                </p>
              </div>
              {/* <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>  */}
            </div>
          </div>
        </div>

        {/* GRANT FUNDED POPUP  */}
        <div className="modal account-name-popup" id="myModal6">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                {/* <h4 className="modal-title"></h4> */}
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <h6>Grant/CBILS Funded R&D Project(s)</h6>

                <p>
                  So if a project is already funded by a grant that counts as state-aid, the company
                  will only be able to claim R&D spend under the RDEC scheme, which is not
                  considered state-aid, in order not to create a conflict.
                </p>
              </div>
              {/* <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>  */}
            </div>
          </div>
        </div>

        {/* TYPE R&D POPUP  */}
        <div className="modal account-name-popup" id="myModal7">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                {/* <h4 className="modal-title"></h4> */}
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <h6>
                  <img className="euro-icon" src="images/euro-icon.png" alt="euro-icon"/>
                  Subcontractors/Freelancers
                </h6>

                <p>
                  Subcontractors and freelancers are often involved with R&D. You can claim back
                  part of their expense. Software license, chemicals, building materials, heat,
                  light and power that are used by the R&D process.
                </p>
              </div>
              <div className="modal-footer">
                <div className="pagination-section">
                  <span>
                    <label>1</label>/<label>7</label>
                  </span>
                </div>
                <div className="next-back-section">
                  <label className="">
                    <img className="left-arrow" src="images/left-arrow-icon1.png" alt="arrow-icon1"/>
                    <span>BACK</span>
                  </label>
                  <b></b>
                  <label className="">
                    <span>NEXT</span>
                    <img className="right-arrow" src="images/right-arrow-icon1.png" alt="arrow-icon1"/>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default YourRDClaimAndEstimate;
