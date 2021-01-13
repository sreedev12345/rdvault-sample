import React, { useState, useEffect } from 'react';
import Dates from '../common/Dates';
import { useSelector, useDispatch } from 'react-redux';
import { dateClick } from '../../components/redux/action/DateClick'
import moment from "moment";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DayPickerRangeController } from 'react-dates';
import './picker.css'
import { claimPeriod } from '../../components/redux/action/ClaimPeriod';
import { companyAction } from '../../components/redux/action/CompanyAction'



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
    const [complete, setComplete] = useState(false)
    const [inputDateError, setInputDateError] = useState(false)
    const [dateErrorEnd, setDateErrorEnd] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [dateRange, setdateRange] = useState({
        startDate: null,
        endDate: null,
        focusedInput: START_DATE,
    });
    const [formState, setFormState] = useState({
        startDate: '',
        endDate: '',
    });

    const [dataclick, setDataClick] = useState(false)

    const [afterbackdate, setAfterbackDate] = useState({
        startdate: '',
        enddate: ''
    })

    const [dateoutrange, setdateOutrange] = useState(0)



    const { startDate, endDate } = dateRange;

    useEffect(()=>{
        setCheckData(Dates)
    },[])


    useEffect(() => {
        if (dataclick === false && afterback.claimReducer.startdate && afterback.claimReducer.enddate) {
            formState.startDate = afterback.claimReducer.startdate ? moment(afterback.claimReducer.startdate).format("DD/MM/YYYY") : '';
            formState.endDate = afterback.claimReducer.enddate ? moment(afterback.claimReducer.enddate).format("DD/MM/YYYY") : '';
            setFormState(formState);
            setdateRange((prevState) => ({ ...prevState, startDate: moment(afterback.claimReducer.startdate, 'DD/MM/YYYY'), endDate: moment(afterback.claimReducer.enddate, 'DD/MM/YYYY') }));
            //setrenderdate((prevState)=>({...prevState,startDate:moment(to).format("DD/MM/YYYY"),endDate:moment(from).format("DD/MM/YYYY")}))
        }

    }, [afterback])

    const isDateIsValid = (dateString) => moment(dateString, 'DD/MM/YYYY', true).isValid();


    useEffect(() => {
        const startfirst = dateRange && dateRange.startDate && dateRange.startDate._d;
        const lastdate = dateRange && dateRange.endDate && dateRange.endDate._d;
        if (lastdate !== null && startfirst !== null && formState.startDate.length === 10 && formState.endDate.length === 10) {
            var Difference_In_Time = lastdate.getTime() - startfirst.getTime();
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            setdateOutrange(Difference_In_Days)
            if (Difference_In_Days >= 0) {
                var elmnt = document.getElementById("expensess");
                elmnt.scrollIntoView(
                    { behavior: 'smooth' }
                );
                dispatch(claimPeriod(true, dateRange.startDate._d, dateRange.endDate._d))
            }
        } else if (formState.startDate.length < 10 || formState.endDate.length < 10) {
            dispatch(claimPeriod(false, "", ""))
        }
    }, [formState])


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




    useEffect(() => {
        const startfirst = dateRange && dateRange.startDate && dateRange.startDate._d;
        const lastdate = dateRange && dateRange.endDate && dateRange.endDate._d;
        if (isDateIsValid(startfirst) && isDateIsValid(lastdate)) {
            var elmnt = document.getElementById("expensess");
            elmnt.scrollIntoView(
                { behavior: 'smooth' }
            );
        }
        if (formState.startDate && startfirst) {
            if (isDateIsValid(formState.startDate) || isDateIsValid(startfirst)) {
                setDateError(false);
            } else {
                setDateError(true);
            }
        } if (formState.endDate && lastdate) {
            if (isDateIsValid(formState.endDate) || isDateIsValid(lastdate)) {
                setDateErrorEnd(false);

            } else {
                setDateErrorEnd(true);
            }
        }
    }, [formState, dateRange])
    

    let chek = false;
    const SubCond = endDate !== null ? endDate._isValid : false;
    const checkss = dateState && dateState.map((vals, id) => {
        if (vals.check === true || SubCond === true) {
            chek = vals.check
            var elmnt = document.getElementById("expensess");
            elmnt.scrollIntoView(
                { behavior: 'smooth' }
            );
            dispatch(claimPeriod(true))
        }
        else if (vals.check === false && chek === false) {
            chek = vals.check
        }
    })



    const handleStartDate = (e) => {
        const { name, value } = e.target;
        if (name === START_DATE) {
            if (formState.startDate && isDateIsValid(value)) {
                setDateError(false)
                setdateRange((prevState) => ({ ...prevState, startDate: moment(value, 'DD/MM/YYYY') }));
            } else if (name === START_DATE && !isDateIsValid(value)) {
                setDateError(true)
                setdateRange((prevState) => ({ ...prevState, startDate: '' }));
            }
        } if (name === END_DATE) {
            if (formState.endDate && isDateIsValid(value)) {
                setDateErrorEnd(false)
                setdateRange((prevState) => ({ ...prevState, endDate: moment(value, 'DD/MM/YYYY') }));
            } else if (name === END_DATE && !isDateIsValid(value)) {
                setDateErrorEnd(true)
                setdateRange((prevState) => ({ ...prevState, endDate: '' }));
            }
        }

        setFormState((prevState) => ({ ...prevState, [name]: value.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, '') }));
    }

   

    const handleOnDateChange = ({ startDate, endDate }) => {
        formState.startDate = startDate ? moment(startDate._d).format("DD/MM/YYYY") : '';
        formState.endDate = endDate ? moment(endDate._d).format("DD/MM/YYYY") : '';
        setFormState(formState);
        if (endDate) {
            setComplete(true)
        } if (endDate && startDate) {
            dispatch(claimPeriod(true, startDate._d, endDate._d))
        }
        setdateRange((prevState) => ({ ...prevState, startDate, endDate }));
        if (moment(endDate, 'DD/MM/YYYY').diff(moment(startDate, 'DD/MM/YYYY')) >= 0) {
            setDateError(false);
        } else {
            setDateError(true);
        }

    }



    const handelCheckBox = (e) => {
        dispatch(companyAction(true, companyresponse.data1))
        const mapdata = Dates.map((val, index) => {
            if (val.name === e.target.name && val.checked === false) {
                val.checked = true;
                const startdate = val.startdate;
                const enddate = val.enddate
                setAfterbackDate((prevState) => ({ ...prevState, startdate, enddate }));
                setDataClick(true)
                dispatch(dateClick(true))
                dispatch(claimPeriod(true, val.startdate, val.enddate))
                dispatch(companyAction(true, companyresponse.data1))
                setcomple(true)
                const elmnt = document.getElementById("expensess");
                elmnt.scrollIntoView({ behavior: "smooth" });
                return val;
            }
            else if (val.name === e.target.name && val.checked === true) {
                dispatch(claimPeriod(false));
                setDataClick(false)
                dispatch(dateClick(false))
                setcomple(false)
                val.checked = false;
                return val;
            }
            else {
                val.checked = false;
                return val;
            }
        })
        setCheckData(mapdata);
    }

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

                            <div className={formState.startDate.length >= 1 || formState.endDate.length >= 1 ? "click" : ""}>
                                {
                                    checkData.length >= 1 ? checkData.map((ele, index) => {
                                        return (
                                            <div
                                                className={companyresponse.data === true && ele.checked === true ?
                                                    "custom-checbox-1 tell-us-about-your-company-card-section-label label-active" :
                                                    "custom-checbox-1 tell-us-about-your-company-card-section-label"
                                                }>
                                                <span>Period {ele.id}:{
                                                    ele.startdate.getDate() + " " + months[ele.startdate.getMonth()] + " " + ele.startdate.getFullYear() + " to " + "" +
                                                    ele.enddate.getDate() + " " + months[ele.enddate.getMonth()] + " " + ele.enddate.getFullYear()}</span>
                                                <div className={"cust-checkbox"}>
                                                    <div className="custom-checkbox">
                                                        <input name={ele.name}
                                                            className="checkbox-custom"
                                                            id={ele.id}
                                                            type="checkbox"
                                                            checked={companyresponse.data === true && ele.checked === true ? true : false}
                                                            onChange={handelCheckBox}
                                                        />
                                                        <label className="checkbox-custom-label" for={ele.id}></label>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : null
                                }
                            </div>

                            <div className={afterback ? afterback.dateClickReducer ? afterback.dateClickReducer.data ?
                                afterback.dateClickReducer.data === true ? "click" : " " : null : null : null}>
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

                                            <span className="text-danger">{dateError === true ? "Start Date is not valid" : ""}</span>

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
                                        endDate={endDate}
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
                                    dateoutrange >=0 ?  null : <div className="text-danger">Start date and end date is outside range</div>
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