import React, { useState, useEffect } from 'react';
import Dates from '../common/Dates';
import moment from "moment";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, DayPickerRangeController } from 'react-dates';
import './picker.css'



const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const month = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

const ClaimPeriod = (props) => {
    console.log("-----------------", props)
    const [data, setData] = useState([]);
    const [checkData, setCheckData] = useState([]);
    const [valDate, setValDate] = useState(null);
    const [hideDate, setHideDate] = useState(false);
    const [secondDate, setSecondDate] = useState("")
    const [valstartDate, valsetStartDate] = useState("");
    const [valendDate, valsetEndDate] = useState("");
    const [firstClick, setFirstClick] = useState(false)
    const [dateRange, setdateRange] = useState({
        startDate: null,
        endDate: null
    });
    // const [startDate,setstartDate] = useState(null)
    // const [endDate,setendDate] = useState(null)
    const [datebool, setDateBool] = useState(false)
    const [focus, setFocus] = useState("startDate");
    const [focusedInput, setFocusedInput] = useState('startDate');

    const { startDate, endDate } = dateRange;

    const handleOnDateChange = (startDate, endDate) => {
        console.log("enddate", endDate)
        console.log("handledatachange", startDate, endDate)
        setdateRange(startDate, endDate);
        setDateBool(true)
    }



    const onFocusChange = (focus) => {
        console.log("focus", focus)
        setFocus(focus)
        if (focus) {
            setFocus(focus)
        } else {
            setFocus("startDate")
        }
    }
    useEffect(() => {
        setData(Dates)
    }, [])

    const handelCheckBox = (e) => {
        const mapdata = data.map((val, index) => {
            if (val.name === e.target.name && val.checked === false) {
                val.checked = true;
                valsetStartDate(val.startdate.getDate() + "/" + monthNames[val.startdate.getMonth()] + "/" + val.startdate.getFullYear())
                valsetEndDate(val.enddate.getDate() + "/" + monthNames[val.enddate.getMonth()] + "/" + val.enddate.getFullYear())
                return val;
            } else {
                val.checked = false;
                return val;
            }
        })
        setCheckData(mapdata);
    }

    //   let dateboolean = false;
    //   data.map((ele,i)=>{
    //       if(ele.checked === true) {
    //         dateboolean=ele.checked;
    //       }
    //   })



    const handleClick = () => {
        console.log("clicked")
        setFirstClick(true)
    }

    const firstDateChange = (e) => {
        console.log("sreedev--------", e.target.value)
        if (e.target.value.length >= 1) {
            setHideDate(true);
            setValDate(e.target.value)
        } if (e.target.value.length === 2) {
            setHideDate(true);
            console.log("hai")
            setValDate(e.target.value + '/')
        } if (e.target.value.length === 5) {
            setValDate(e.target.value + '/')
        }
    }


    const secondDateChange = (e) => {
        if (e.target.value.length >= 1) {
            setSecondDate(e.target.value)
        } if (e.target.value.length === 2) {
            console.log("hai")
            setSecondDate(e.target.value + '/')
        } if (e.target.value.length === 5) {
            setSecondDate(e.target.value + '/')
        }
    }

    const dateKey = (e) => {
        console.log("dev---------", e.charCode)
        if (e.charCode < 48 || e.charCode > 57) {
            e.preventDefault();
            return false
        }
    }


console.log("startdat",startDate!==null ? moment(startDate._d).format("DD/MM/YYYY") : null)

    return (
        <div className={firstClick === false ? "row custom-m-top-40 click" : "row custom-m-top-40"} onClick={handleClick} >
            <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
                <div className="tell-us-about-your-company-left-section">
                    <hr className="tell-us-about-your-company-line" />
                    <h3>  Your R&D Claim Period</h3>
                </div>
            </div>
            <div className="col-md-6 col-xl-6 col-lg-6 col-sm-6 col-12">
                <div className="tell-us-about-your-company-center-section">
                    <div className="tell-us-about-your-company-card-section">
                        <p>Please select the claim period you would like to
                            estimate your R&D claim for?
                        </p>
                        {
                            Dates.length >= 1 ? Dates.map((ele, index) => {
                                return (
                                    <div className="custom-checbox-1 tell-us-about-your-company-card-section-label">
                                        <span>Period {ele.id}:{
                                            ele.startdate.getDate() + " " + monthNames[ele.startdate.getMonth()] + " " + ele.startdate.getFullYear() + " to " + "" +
                                            ele.enddate.getDate() + " " + monthNames[ele.enddate.getMonth()] + " " + ele.enddate.getFullYear()}</span>
                                        <div className="cust-checkbox">
                                            <div className="custom-checkbox">
                                                <input name={ele.name}
                                                    className="checkbox-custom"
                                                    id={ele.id}
                                                    type="checkbox"
                                                    checked={ele.checked}
                                                    onChange={handelCheckBox}
                                                //  disabled={datebool === true ? !ele.checked : ele.checked}
                                                />
                                                <label className="checkbox-custom-label" for={ele.id}></label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : null
                        }
                        <div className="calendar-label-input-section ">
                            <div className="calendar-label-input form-group">
                                <label>Claim Period Start Date:</label>
                                <div className="calendar-input-section">
                                    <input type="text" id="datepicker1"
                                        // value={datebool === true && startDate !== null ?
                                        //     moment(startDate._d).format("DD/MM/YYYY") : "dd/mm/yyyy"} 
                                        onKeyPress={dateKey}
                                        placeholder={"DD/MM/YYYY"}
                                        value={datebool === true ? startDate!==null && moment(startDate._d).format("DD/MM/YYYY") : valDate}
                                        onChange={firstDateChange}
                                        maxlength={10}
                                    />
                                    <span className="left-line">|</span>
                                </div>
                            </div>
                            <div className="calendar-label-input form-group">
                                <label>Claim Period End Date:</label>
                                <div className="calendar-input-section">
                                    <input type="text" id="datepicker1"
                                        // value={datebool === true && startDate !== null && endDate !== null ?
                                        //     moment(endDate._d).format("DD/MM/YYYY") : "dd/mm/yyyy"}

                                        onKeyPress={dateKey}
                                        placeholder={"DD/MM/YYYY"}
                                        value={

                                            datebool === true && endDate !== null ? moment(endDate._d).format("DD/MM/YYYY") : secondDate}
                                        onChange={secondDateChange}
                                        maxlength={10}
                                    // onChange={DateChange}
                                    />
                                    <span className="left-line">|</span>
                                </div>
                            </div>
                        </div>
                        {/* <DateRangePicker
                            startDatePlaceholderText="Start"
                            startDate={startDate}
                            required={false}
                            onDatesChange={handleOnDateChange}
                            endDatePlaceholderText="End"
                            endDate={endDate}
                            reopenPickerOnClearDate={true}
                            // keepOpenOnDateSelect={true}
                            readOnly={false}
                            // displayFormat={"DD/MMMM/YYYY"}
                            //   numberOfMonths={1}
                            showClearDates={true}
                            focusedInput={focus}
                            onFocusChange={onFocusChange}
                            startDateId="startDateMookh"
                            endDateId="endDateMookh"
                            minimumNights={0}
                        /> */}
                        <div id="exTab1" >
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#claim-start" role="tab" data-toggle="tab">Claim Period Start Date</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#claim-end" role="tab" data-toggle="tab">Claim Period End Date</a>
                                </li>
                            </ul>
                            {/* <DateRangePicker
                                startDatePlaceholderText="Start"
                                startDate={
                                    valDate !== null && valDate.length === 10 ?  moment(valDate, 'DD/MM/YYYY'):
                                        startDate}
                                // required={false}
                                onDatesChange={handleOnDateChange}
                                endDatePlaceholderText="End"
                                 endDate={secondDate !== null && secondDate.length === 10 ? moment(secondDate, 'DD/MM/YYYY') : endDate}
                                reopenPickerOnClearDate={true}
                                displayFormat={"DD/MM/YYYY"}
                                //isDayHighlighted={()=>secondDate !== null && secondDate.length === 10 ? moment(secondDate, 'DD/MM/YYYY') : endDate}
                                readOnly={false}
                                showClearDates={true}
                                focusedInput={focus}
                                onFocusChange={onFocusChange}
                                startDateId="startDateMookh"
                                endDateId="endDateMookh"
                                minimumNights={0}
                                isOutsideRange={() => false}
                              
                            /> */}


<DayPickerRangeController
                                    focused
                                    key={Math.random()}
                                    daySize={40}
                                    className="Datezp8"
                                    horizontalMonthPadding={1}
                                    // autoFocusEndDate={true}
                                    numberOfMonths={2}
                                    startDate={
                                        valDate !== null && valDate.length === 10 ?  moment(valDate, 'DD/MM/YYYY'):
                                            startDate}
                                            endDate={secondDate !== null && secondDate.length === 10 ? moment(secondDate, 'DD/MM/YYYY') : endDate}
                                    onDatesChange={handleOnDateChange}
                                    focusedInput={focusedInput}
                                    onFocusChange={e => setFocusedInput(e)}
                                    isOutsideRange={() => false}
                                    
                                   
                                    
                                   
                                    
                             
                                /> 

                            <div className="tab-content">
                                <div role="tabpanel" className="tab-pane fade in active show" id="claim-start">
                                    <div id="datepicker" className="calendar">

                                    </div>
                                    <div id="datepicker4" className="calendar"></div>
                                </div>
                                <div role="tabpanel" className="tab-pane fade" id="claim-end">
                                    <div id="datepicker2" className="calendar">hai</div>
                                    <div id="datepicker3" className="calendar"></div>
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
                        <img src="assets/images/bulb-icon.png" alt="bulb-icon" />
                    </div>
                    <p>We use Companies House publicly available data to retrieve information about your company. By using Companies House data, we can tell you exactly how many R&D claims you can make for your company. If we cannot find your company details not to worry, you can continue to use the company name you entered above.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ClaimPeriod;