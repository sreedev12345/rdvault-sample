import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { companyAction } from '../../components/redux/CompanyDetails';
import { claimPeriod } from '../../components/redux/ClaimPeriod'
import { keyword } from '../../components/redux/KeyWord'
import Data from '../common/Data';


const CompanyDetails = (props) => {
    // const [value,setValue] = useState([])
    const dispatch = useDispatch();
    const indexone = useSelector(state=>state)
    const [search, setSearch] = useState(indexone.KeywordReducer ? indexone.KeywordReducer.data ? indexone.KeywordReducer.data : "" : null);
    const [renderData, setRenderData] = useState([]);
    const dataPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1)
    const [check, setCheck] = useState([]);
    let checkes = false


    console.log("index-one",indexone)

    // useEffect(()=>{
    //       window.scrollTo(0, 0);
    // },[])


    useEffect(()=>{
        if(indexone.prevPageReducer.data==='company') {
            window.scrollTo(0, 400);
        } 
    })

    useEffect(()=>{
        // window.scrollTo(0, 800);
        if(indexone.prevPageReducer.data === 'claimperiod') {
            console.log("inside-useeffect",indexone.prevPageReducer.data)
            console.log("indexone---------indexone",indexone)
            window.scrollTo(0, 1300);
        } 
       
    })

    useEffect(() => {
        const mapData = Data.filter(value =>
            value.company.toString().toLowerCase().includes(search) ||
            value.company.toString().toUpperCase().includes(search)
        )
        setRenderData(mapData)
    }, [search])

  


    const handleChange = (e) => { //search onchange 
        setSearch(e.target.value);
    }

    const nextPage = (e) => { //pagination button for nextpage
        e.preventDefault();
        setCurrentPage(currentPage + 1)
    }


    const prevPage = (e) => { //pagination button for prevpage
        e.preventDefault();
        setCurrentPage(currentPage - 1)
    }

    const pageNumber = [];

    var i = 1;
    var length = renderData.length;
    for (i = 1; i <= Math.ceil(length / dataPerPage); i++) { //total page number logic
        pageNumber.push(i)
    }

    const indexOfLast = currentPage * dataPerPage;
    const indexOfFirst = indexOfLast - dataPerPage;
    const paginateData = renderData.slice(indexOfFirst, indexOfLast);


    const handleClick = (e) => {   //onchange for checkbox


        const filterdata = renderData.map((check, index) => {
            if (check.company === e.target.name && check.checked === false) {
                check.checked = true;
                dispatch(companyAction(true,check.company));
                dispatch(keyword(search))
                var elmnt = document.getElementById("claim-period");
                elmnt.scrollIntoView({ behavior: "smooth" });
                return check
            } else if (check.company === e.target.name && check.checked === true) {
                dispatch(companyAction(false,check.company));
                dispatch(claimPeriod(false,"",""));
                check.checked = false;
                return check
            }
            else {
                check.checked = false;
                return check
            }

        })
        setCheck(filterdata);
    }



    check && check.map(data => data.checked === true ? checkes = true : false)

    return (
        <>

            <div id="company-id" className="row custom-m-top-40">
                <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
                    <div className="tell-us-about-your-company-left-section">
                        <hr className="tell-us-about-your-company-line" />
                        <h3>  Company
                            Name
                    </h3>
                        {
                            checkes === true ?
                                <div className="completed-text"><span>COMPLETED</span></div>
                                : null
                        }
                    </div>
                </div>
                <div className="col-md-6 col-xl-6 col-lg-6 col-sm-6 col-12">
                    <div className="tell-us-about-your-company-center-section">
                        <div className="tell-us-about-your-company-card-section">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="companyName"
                                    value={search}
                                    id="enter_company_name"
                                    onChange={handleChange}
                                />
                            </div>
                            {
                                search.length >= 1 ?
                                    <p className="custom-m-top-20">We have found <span>{
                                        renderData.length >= 1 ? renderData.length : 0}</span>
                                        companies with this name, please try
                                        again or use the name entered in the box above.
                        </p>
                                    :
                                    <p>Please enter your company name above so we can have a
                                        look if we can find it!
                        </p>
                            }
                            <div className="tell-us-about-your-company-card2 row">
                                {
                                    search.length >= 1 ? paginateData.length >= 1 ? paginateData.map((val, i) => {
                                        return (
                                            <div className="tell-us-about-your-company-maincard2 column-card-1 custom-m-top-20 col-md-6 col-xl-6 col-lg-6 col-sm-6 col-12" key={i}>
                                                <div className="tell-us-about-your-company-card2-width">
                                                    <div className= {val.checked === true ? "label-active tell-us-about-your-company-card2-label tell-us-about-your-company-card-section-label" : "tell-us-about-your-company-card2-label tell-us-about-your-company-card-section-label"}>
                                                        <div className="tell-us-about-your-company-card2-top">
                                                            <span>{val.company}</span>
                                                            <div className="cust-checkbox">
                                                                <div className="custom-checkbox">
                                                                    <input name={val.company} 
                                                                        className="checkbox-custom" id={val._id} type="checkbox"
                                                                        onChange={handleClick}
                                                                        checked={val.checked ? true : false}

                                                                    />
                                                                    <label className="checkbox-custom-label" for={val._id}></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tell-us-about-your-company-card2-bottom">
                                                            <p>{val.address}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : null : null
                                }
                                {
                                    search.length >= 1 && renderData.length > 5 ?
                                        <div className="col-md-6 col-xl-6 col-lg-6 col-sm-6 col-12">
                                            <div className="column-card-2-bottom-section">
                                                <div className="pagination-section">
                                                    <span><label>{currentPage}</label>/<label>{pageNumber.length}</label></span>
                                                </div>
                                                <div className="next-back-section">
                                                    {
                                                        currentPage === 1 ?
                                                            <label className={currentPage === 1 ? "disabled-btn-bg" : ""}>
                                                                <img className="left-arrow" src="assets/images/left-arrow.png" alt="left-arrow" />
                                                                <span>BACK</span></label> :
                                                            <label className={currentPage === 1 ? "disabled-btn-bg" : ""} onClick={prevPage}>
                                                                <img className="left-arrow" src="assets/images/left-arrow.png" alt="left-arrow" />
                                                                <span>BACK</span></label>
                                                    }
                                                    <b>|</b>
                                                    {
                                                        currentPage === pageNumber.length ?
                                                            <label className={currentPage === pageNumber.length ? "disabled-btn-bg" : ""}><span >NEXT</span>
                                                                <img className="right-arrow" src="assets/images/right-arrow.png" alt="right-arrow.png" />
                                                            </label> :
                                                            <label className={currentPage === pageNumber.length ? "disabled-btn-bg" : ""} onClick={nextPage}><span >NEXT</span>
                                                                <img className="right-arrow" src="assets/images/right-arrow.png" alt="right-arrow.png" />
                                                            </label>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        : null
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
                        <p>We use Companies House publicly
                            available data to retrieve information
                            about your company. By using Companies House data,
                            we can tell you exactly how many R&D claims you can
                            make for your company. If we cannot find your company details
                            not to worry, you can continue to use the company name you entered above.
                    </p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default CompanyDetails;