import React, { useState, useEffect } from 'react';

import Dates from '../common/Dates';
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DayPickerRangeController } from 'react-dates';
import './picker.css'
import { claimPeriod } from '../../components/redux/action/ClaimPeriod';
import { companyAction } from '../../components/redux/action/CompanyAction'
var DateDiff = require('date-diff');



var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;


function ClaimPeriod() {
    const START_DATE = 'startDate';
    const END_DATE = 'endDate';
    const dispatch = useDispatch()
    const [checkData, setCheckData] = useState([]);
    // const { values, subsidiValues, setSubsidiValues } = useContext(Context)
    const companyresponse = useSelector(state => state.companyReducer);
    const afterback = useSelector(state => state)
    const [dateState, setDateState] = useState(false)
    const [comple, setcomple] = useState(false)
    const [inputStart, setInputStart] = useState('')
    const [complete, setComplete] = useState(false)
    const [inputDateError, setInputDateError] = useState(false)
    const [dateErrorEnd, setDateErrorEnd] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [dateRange, setdateRange] = useState({
        startDate: null,
        endDate: null,
        focusedInput: START_DATE,
    });
    const [data, setData] = useState("")
    const [formState, setFormState] = useState({
        startDate: '',
        endDate: '',
    });

    const [afterbackdate,setAfterbackDate] = useState({
        startdate : '',
        enddate : ''
    })

    const [renderdate,setrenderdate] = useState({
        startDate: '',
        endDate: '',
    })

    const { startDate, endDate } = dateRange;

    const [focusedInput, setFocusedInput] = useState('startDate');
    const isDateIsValid = (dateString) => moment(dateString, 'DD/MM/YYYY', true).isValid();


    const getyear = formState.startDate.slice(formState.startDate.lastIndexOf('/') + 1)
    const getmonth = formState.startDate.slice(formState.startDate.indexOf('/') + 1, formState.startDate.lastIndexOf('/'));
    const getday = formState.startDate.slice(formState.startDate, formState.startDate.indexOf('/'))



    const getyear1 = formState.endDate.slice(formState.endDate.lastIndexOf('/') + 1)
    const getmonth1 = formState.endDate.slice(formState.endDate.indexOf('/') + 1, formState.endDate.lastIndexOf('/'));
    const getday1 = formState.endDate.slice(formState.endDate, formState.endDate.indexOf('/'))

    var diff = new DateDiff(new Date(getyear1, getmonth1, getday1), new Date(getyear, getmonth, getday));


    useEffect(() => {
        if (afterback.claimReducer.startdate && afterback.claimReducer.enddate) {
            console.log("afterback.claimReducer.enddate.length",afterback.claimReducer.enddate.length)
            const to = afterback.claimReducer.startdate.toString()
            const from = afterback.claimReducer.enddate.toString()
            formState.startDate = afterback.claimReducer.startdate ? moment(to).format("DD/MM/YYYY") : '';
            formState.endDate = afterback.claimReducer.enddate ? moment(from).format("DD/MM/YYYY") : '';
            setFormState(formState);
            setdateRange((prevState) => ({ ...prevState, startDate: moment(afterback.claimReducer.startdate, 'DD/MM/YYYY'),endDate : moment(afterback.claimReducer.enddate, 'DD/MM/YYYY') }));
            //setrenderdate((prevState)=>({...prevState,startDate:moment(to).format("DD/MM/YYYY"),endDate:moment(from).format("DD/MM/YYYY")}))
        }
        console.log("after---------",afterback.claimReducer.startdate)
      
    }, [afterback])


    console.log("renderdate-renderdate",typeof renderdate,renderdate)


    // useEffect(()=>{
    //     console.log("ssssssssssssssssssss")
    // },[!afterback])


    // useEffect(() => {
    //     console.log("length", companyresponse, formState.endDate.length)
    //     if (companyresponse.data === true && dateError === false && formState.endDate.length === 14) {
    //         console.log("length", companyresponse, formState.endDate.length)
    //         var elmnt = document.getElementById("expensess");
    //         elmnt.scrollIntoView(
    //             { behavior: 'smooth' }
    //         );
    //         dispatch(claimPeriod(true,afterbackdate.startdate,afterbackdate.enddate))
    //         dispatch(companyAction(true, companyresponse.data1))
    //     }
    //     // setSubsidiValues(true)
    // }, [formState.endDate])

    useEffect(() => {
        if (dateError || dateErrorEnd) {
            return (
                dateError, dateErrorEnd
            )
        }
    },[dateError,complete])



    useEffect(() => {
        if (formState.endDate.length === 10) {
            if (diff.years() > 0 || diff.days() > 0) {
                var elmnt = document.getElementById("expensess");
                elmnt.scrollIntoView(
                    { behavior: 'smooth' }
                );
                dispatch(claimPeriod(true, new Date(getyear, getmonth, getday), new Date(getyear1, getmonth1, getday1)))
            } else {
                dispatch(claimPeriod(false))
            }
        }
    }, [diff.years() > 0 || diff.days() > 0])



    // useEffect(() => {
    //     console.log("formtate", formState.startDate, formState.endDate)
    //     const startdate = new Date(getyear, getmonth, getday);
    //     const enddate = new Date(getyear1, getmonth1, getday1);
    //     dispatch(claimPeriod(true, startdate, enddate))
    // }, [formState.startDate && formState.endDate])

    // const handleChange = (e, val) => {
    //     setInputDateError(false);
    //     setDateError(false);
    //     setFormState({
    //         startDate: '',
    //         endDate: '',
    //     })
    //     setdateRange({
    //         startDate: null,
    //         endDate: null,
    //         focusedInput: START_DATE,
    //     })
    //     setComplete(false);
    //     const dateCheck = Dates.map((data, id) => {
    //         if (data.name === e.target.name && data.checked === false) {
    //             data.checked = true
    //             setDateValue(data)
    //             setComplete(true);
    //             var elmnt = document.getElementById("expensess");
    //             elmnt.scrollIntoView(
    //                 { behavior: 'smooth' }
    //             );
    //             dispatch(claimPeriod(true));
    //             return data
    //         } else if (data.name === e.target.name && data.checked === true) {
    //             dispatch(claimPeriod(false));
    //             data.checked = false;
    //             return val;
    //         }
    //         else {
    //             data.checked = false
    //             setComplete(false);
    //             return data;
    //         }
    //     })
    //     setDateState(dateCheck)
    // }

    let chek = false;
    const SubCond = endDate !== null ? endDate._isValid : false;
    const checkss = dateState && dateState.map((vals, id) => {
        if (vals.check === true || SubCond === true) {
            chek = vals.check
            // setSubsidiValues(true)
            var elmnt = document.getElementById("expensess");
            elmnt.scrollIntoView(
                { behavior: 'smooth' }
            );
            dispatch(claimPeriod(true))
        }
        else if (vals.check === false && chek === false) {
            chek = vals.check
            // setSubsidiValues(false)
        }
    })




    // const handleStartDate = (e) => {
    //     const { name, value } = e.target

    //     var element = value;
    //     if (/\D\/$/.test(element)) element = element.substr(0, element.length - 3);
    //     var values = element.split('/').map(function (v) {
    //         return v.replace(/\D/g, '')
    //     });
    //     console.log("value", values);
    //     // checkValue(values[0],31)
    //     var output = values.map(function (v, i) {
    //         return v.length === 2 && i < 2 ? v + ' / ' : v;
    //     });
    //     const valset = output.join('').substr(0, 14)
    //     // valset.split(" ").join('')
    //     console.log("==========llllllllllllll", valset)

    //     if (name === START_DATE && isDateIsValid(value)) {
    //         setInputDateError(false)
    //         setDateError(false);
    //         if (formState.startDate) {
    //             if (moment(formState.startDate, 'DD / MM / YYYY').diff(moment(value, 'DD / MM / YYYY')) >= 0) {
    //                 setDateError(false);
    //             } else {
    //                 setDateError(true);
    //             }
    //         }
    //         setdateRange((prevState) => ({ ...prevState, startDate: moment(value, 'DD / MM / YYYY') }));
    //         // setComplete(true);
    //     } else if (name === START_DATE && !isDateIsValid(value)) {
    //         setInputDateError(true)
    //         setDateError(false);
    //         setdateRange((prevState) => ({ ...prevState, startDate: '' }));
    //     }
    //     if (name === END_DATE && isDateIsValid(value)) {
    //         setInputDateError(false)
    //         if (formState.endDate) {
    //             if (moment(value, 'DD / MM / YYYY').diff(moment(formState.startDate, 'DD / MM / YYYY')) >= 0) {
    //                 setDateError(false);
    //             } else {
    //                 setDateError(true);
    //             }
    //         }
    //         setdateRange((prevState) => ({ ...prevState, endDate: moment(value, 'DD / MM / YYYY') }));
    //         setComplete(true);
    //     } else if (name === END_DATE && !isDateIsValid(value)) {
    //         setInputDateError(true)
    //         setDateError(false);
    //         setdateRange((prevState) => ({ ...prevState, endDate: '' }));
    //         // setSubsidiValues(true)
    //     }
    //     setFormState((prevState) => ({ ...prevState, [name]: valset }));
    // }

    const handleStartDate = (e) => {
        //console.log("start",e.target.name,e.target.value,formState)
        const { name, value } = e.target;
        var element = value;
        if (/\D\/$/.test(element)) element = element.substr(0, element.length - 3);
        var values = element.split('/').map(function (v) {
            return v.replace(/\D/g, '')
        });
        console.log("value", values);
        // checkValue(values[0],31)
        var output = values.map(function (v, i) {
            return v.length === 2 && i < 2 ? v + ' / ' : v;
        });
        const valset = output.join('').substr(0, 14)
        if (name === START_DATE) {
            if (formState.startDate && isDateIsValid(value)) {
                setInputDateError(false)
                if (moment(formState.startDate, 'DD/MM/YYYY').diff(moment(value, 'DD/MM/YYYY')) >= 0) {
                    setDateError(false);
                } else {
                    setDateError(true);
                }
                setdateRange((prevState) => ({ ...prevState, startDate: moment(value, 'DD/MM/YYYY') }));
            } else if (name === START_DATE && !isDateIsValid(value)) {
                setInputDateError(true)
                setdateRange((prevState) => ({ ...prevState, startDate: '' }));
            }
        } if (name === END_DATE) {
            if (formState.endDate && isDateIsValid(value)) {
                setDateErrorEnd(false)
                if (moment(formState.endDate, 'DD/MM/YYYY').diff(moment(value, 'DD/MM/YYYY')) >= 0) {
                    setDateError(false);
                } else {
                    setDateError(true);
                }
                setdateRange((prevState) => ({ ...prevState, endDate: moment(value, 'DD/MM/YYYY') }));
            } else if (name === END_DATE && !isDateIsValid(value)) {
                setDateErrorEnd(true)
                setdateRange((prevState) => ({ ...prevState, endDate: '' }));
            }
        }

        setFormState((prevState) => ({ ...prevState, [name]: value.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, '') }));
    }

    // const handleStartDate = (e) => {
    //     const { name, value } = e.target

    //     var element = value;
    //     if (/\D\/$/.test(element)) element = element.substr(0, element.length - 3);
    //     var values = element.split('/').map(function (v) {
    //         return v.replace(/\D/g, '')
    //     });

    //     var output = values.map(function (v, i) {
    //         return v.length === 2 && i < 2 ? v + ' / ' : v;
    //     });
    //     const valset = output.join('').substr(0, 14)


    //     if (name === START_DATE && isDateIsValid(value)) {
    //         setInputDateError(false)
    //         setDateError(false);
    //         if (formState.startDate) {
    //             if (moment(formState.startDate, 'DD / MM / YYYY').diff(moment(value, 'DD / MM / YYYY')) >= 0) {
    //                 setDateError(false);
    //             } else {
    //                 setDateError(true);
    //             }
    //         }
    //         setdateRange((prevState) => ({ ...prevState, startDate: moment(value, 'DD / MM / YYYY') }));
    //         // setSelectedFormDate((prevState) => ({ ...prevState, startDate: moment(value, 'DD / MM / YYYY') }))
    //     } else if (name === START_DATE && !isDateIsValid(value)) {
    //         setInputDateError(true)
    //         setDateError(false);
    //         setdateRange((prevState) => ({ ...prevState, startDate: '' }));
    //     }
    //     if (name === END_DATE && isDateIsValid(value)) {
    //         setInputDateError(false)
    //         if (formState.endDate) {
    //             if (moment(value, 'DD / MM / YYYY').diff(moment(formState.startDate, 'DD / MM / YYYY')) >= 0) {
    //                 setDateError(false);
    //             } else {
    //                 setDateError(true);
    //             }
    //         }
    //         setdateRange((prevState) => ({ ...prevState, endDate: moment(value, 'DD / MM / YYYY') }));
    //         setSelectedFormDate((prevState) => ({ ...prevState, endDate: moment(value, 'DD / MM / YYYY') }))
    //         setComplete(true);
    //     } else if (name === END_DATE && !isDateIsValid(value)) {
    //         setInputDateError(true)
    //         setDateError(false);
    //         setdateRange((prevState) => ({ ...prevState, endDate: '' }));
    //         setSubsidiValues(true)
    //     }
    //     setFormState((prevState) => ({ ...prevState, [name]: valset }));


    // }
    useEffect(() => {
        if (companyresponse.data === false) {
            setFormState({
                startDate: '',
                endDate: '',
            })
            setdateRange({
                startDate: null,
                endDate: null,
                focusedInput: START_DATE,
            })
        }
    }, [companyresponse.data === false])
    console.log("ggggggggggggggg", dateErrorEnd)

    const handleOnDateChange = ({ startDate, endDate }) => {
        console.log("sssssssssssssssssssssssssssss", endDate)
        formState.startDate = startDate ? moment(startDate._d).format("DD/MM/YYYY") : '';
        formState.endDate = endDate ? moment(endDate._d).format("DD/MM/YYYY") : '';
        setFormState(formState);
        if (endDate) {
            setComplete(true)
        }
        setdateRange((prevState) => ({ ...prevState, startDate, endDate }));
        if (moment(endDate, 'DD/MM/YYYY').diff(moment(startDate, 'DD/MM/YYYY')) >= 0) {
            setDateError(false);
        } else {
            setDateError(true);
        }

        console.log('-------------------------------------------', renderdate)
    }



    const handelCheckBox = (e) => {
        dispatch(companyAction(true, companyresponse.data1))
        const mapdata = Dates.map((val, index) => {
            if (val.name === e.target.name && val.checked === false) {
                console.log("startdate", val.startdate,val.enddate)
                val.checked = true;
                const startdate = val.startdate;
                const enddate = val.enddate
                setAfterbackDate((prevState) => ({ ...prevState, startdate, enddate }));
                // setAfterbackDate(val.startdate,val.enddate)
                dispatch(claimPeriod(true, val.startdate, val.enddate))
                console.log("---------------", typeof val.startdate)
                dispatch(companyAction(true, companyresponse.data1))
                setcomple(true)
                const elmnt = document.getElementById("expensess");
                elmnt.scrollIntoView({ behavior: "smooth" });
                // valsetStartDate(val.startdate.getDate() + "/" + monthNames[val.startdate.getMonth()] + "/" + val.startdate.getFullYear())
                // valsetEndDate(val.enddate.getDate() + "/" + monthNames[val.enddate.getMonth()] + "/" + val.enddate.getFullYear())
                return val;
            }
            else if (val.name === e.target.name && val.checked === true) {
                dispatch(claimPeriod(false));
                // dispatch(companyAction(true))
                setcomple(false)
                val.checked = false;
                return val;
            }
            else {
                val.checked = false;
                // dispatch(companyAction(true))
                return val;
            }
        })
        setCheckData(mapdata);
    }




    //dateDifference(new Date('7/1/2015'), new Date('7/1/2016'))





     
    // const to = afterback.claimReducer.enddate ? afterback.claimReducer.enddate.toString() : null

    console.log("diff---------------------------,afterbackdate",renderdate)

    return (
        <div
            id="claim-period" className={companyresponse.data === true ? "row custom-m-top-40" : "row custom-m-top-40 click"}
        >

            <div id="rdClaim" className=" row custom-m-top-40">
                <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
                    <div className="tell-us-about-your-company-left-section">
                        <hr className="tell-us-about-your-company-line" />
                        <h3> Your R&D Claim Period</h3>
                        {
                            comple === true ? <div className="completed-text"><span>COMPLETED</span></div> : null
                        }

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
                                        <div className={companyresponse.data === true && ele.checked === true ? "custom-checbox-1 tell-us-about-your-company-card-section-label label-active" : "custom-checbox-1 tell-us-about-your-company-card-section-label"}>
                                            <span>Period {ele.id}:{
                                                ele.startdate.getDate() + " " + months[ele.startdate.getMonth()] + " " + ele.startdate.getFullYear() + " to " + "" +
                                                ele.enddate.getDate() + " " + months[ele.enddate.getMonth()] + " " + ele.enddate.getFullYear()}</span>
                                            <div className="cust-checkbox">
                                                <div className="custom-checkbox">
                                                    <input name={ele.name}
                                                        className="checkbox-custom"
                                                        id={ele.id}
                                                        type="checkbox"
                                                        checked={companyresponse.data === true && ele.checked === true ? true : false}
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

                            <div className={comple === true ? "click" : " "}>
                                <p>Or manually enter claim period.</p>
                                <div className={`calendar-label-input-section`}>
                                    <div className="calendar-label-input form-group">
                                        <label>Claim Period Start Date:</label>
                                        <div className="calendar-input-section">
                                            <input type="text"
                                                // className="date-input"
                                                id="s_id"
                                                name="startDate"
                                                value={formState.startDate}
                                                placeholder="DD/MM/YY"
                                                onChange={handleStartDate}
                                            />

                                            <span className="text-danger">{inputDateError === true ? "Start Date is not valid" : ""}</span>

                                        </div>
                                    </div>
                                    <div className="calendar-label-input form-group">
                                        <label>Claim Period End Date:</label>
                                        <div className="calendar-input-section">
                                            <input type="text"
                                                // className="date-input"
                                                id="e_id"
                                                name="endDate"
                                                value={formState.endDate}
                                                placeholder="DD/MM/YY"
                                                onChange={handleStartDate}
                                            />
                                            <span className="text-danger">{dateErrorEnd === true ? "End Date is not Valid" : ""}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className=" text-center  text-danger"> {dateError === true ? "Given End Date Sooner than Start Date" : ""}</div> */}
                                <br />
                                <div id="exTab1" >
                                    <ul className="nav nav-tabs" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" href="#claim-start" role="tab" data-toggle="tab">Claim Period Start Date</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#claim-end" role="tab" data-toggle="tab">Claim Period End Date</a>
                                        </li>
                                    </ul>

                                    <div className="tab-content">
                                        <div role="tabpanel" className="tab-pane fade in active show" id="claim-start">
                                            <div id="datepicker" className="calendar"></div>
                                            <div id="datepicker4" className="calendar"></div>
                                        </div>
                                        <div role="tabpanel" className="tab-pane fade" id="claim-end">
                                            <div id="datepicker2" className="calendar"></div>
                                            <div id="datepicker3" className="calendar"></div>
                                        </div>
                                    </div>

                                    <DayPickerRangeController
                                        key={Math.random()}
                                        autoFocus
                                        daySize={40}
                                        className="Datezp8"
                                        horizontalMonthPadding={1}
                                        autoFocusEndDate={true}
                                        numberOfMonths={2}
                                        startDate={startDate}
                                        endDate={ endDate}
                                        onDatesChange={handleOnDateChange}
                                        focusedInput={dateRange.focusedInput}
                                        onFocusChange={(focusedInput) => {
                                            setdateRange((prevState) => ({
                                                ...prevState,
                                                focusedInput: !focusedInput ? START_DATE : focusedInput,
                                            }));
                                        }}

                                    />

                                </div>
                                {
                                    diff.years() < 0 || diff.days() < 0 ? <div className="text-danger">Start date and end date is outside range</div> : null
                                }
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
        </div>
    )
}

export default ClaimPeriod