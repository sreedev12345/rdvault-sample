import React,{useState,useEffect} from 'react';
import Data from '../common/Data'

const Details = ()=>{
  const [search,setSearch] = useState("");
  const [renderData,setRenderData] = useState([])
  const handleChange = (e)=>{
    setSearch(e.target.value);
  }


  useEffect(()=>{
    const mapData = Data.filter(value=>
      value.company.toString().toLowerCase().includes(search) ||
      value.company.toString().toUpperCase().includes(search)
    )
    setRenderData(mapData)
  },[search])
  
   console.log("mapdata",renderData)
    return(
        <section className="tell-us-about-your-company">
          <div className="container-fluid">
            <div className="tell-us-about-your-company-section">
              <div className="row">
                <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
                  <div className="tell-us-about-your-company-left-section">
                    <hr className="tell-us-about-your-company-line"/>
                    <h3> Company
                      Name</h3>
                </div>
              </div>
              <div className="col-md-6 col-xl-6 col-lg-6 col-sm-6 col-12">
                <div className="tell-us-about-your-company-center-section">
                  <div className="tell-us-about-your-company-card-section">
                    <div className="form-group">
                      <input type="text" 
                        value={search.length>=1 ? search : null} 
                        placeholder="...enter company name" 
                        id="enter_company_name" 
                        onChange={handleChange} 
                      /> 
                    </div>
                    <p>Please enter your company name above so we can have a
                      look if we can find it!</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
                <div className="tell-us-about-your-company-right-section">
                  <hr className="tell-us-about-your-company-line1"/>
                  <div className="tell-us-about-your-company-right-section-img">
                    <img src={ process.env.PUBLIC_URL +"assets/images/bulb-icon.png"}alt="icon"/>
                  </div>
                <p>
                  We use Companies House publicly 
                  available data to retrieve information 
                  about your company. By using Companies 
                  House data, we can tell you exactly 
                  how many R&D claims you can make for your 
                  company. If we cannot find your company 
                  details not to worry, you can continue to use
                   the company name you entered above. 
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
              <div className="tell-us-about-your-company-left-section">
                <hr className="tell-us-about-your-company-line"/>
                <h3> CompanyName</h3>
                <div className="completed-text"><span>COMPLETED</span></div>
             </div>
            </div>
            <div className="col-md-6 col-xl-6 col-lg-6 col-sm-6 col-12">
              <div className="tell-us-about-your-company-center-section">
                <div className="tell-us-about-your-company-card-section">
                  <div className="tell-us-about-your-company-card-section-label">
                    <span>XYZ LIMITED</span>
                    <div className="cust-checkbox">
                      <div className="custom-checkbox">
                        <input name="noti_6" class="checkbox-custom" id="noti_1" value="1" type="checkbox" checked/>
                          <label className="checkbox-custom-label" for="noti_1">I’d like to use this name</label>
                      </div>
                    </div>
                  </div>
                  <p className="custom-m-top-20">We have found <span>0</span> companies with this name, please try
                    again or use the name entered in the box above.</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
              <div className="tell-us-about-your-company-right-section">
                <hr className="tell-us-about-your-company-line1"/>
                <div className="tell-us-about-your-company-right-section-img">
                  <img src={process.env.PUBLIC_URL +"assets/images/bulb-icon.png"} alt="bulb-icon"/>
                </div>
              <p>We use Companies House publicly available data to retrieve information about your company. By using Companies House data, we can tell you exactly how many R&D claims you can make for your company. If we cannot find your company details not to worry, you can continue to use the company name you entered above. 
              </p>
            </div> 
          </div>
        </div>
       {
         search.length>=1 ? 

         <div className="row custom-m-top-40">
         
              
         <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
       <div className="tell-us-about-your-company-left-section">
         <hr className="tell-us-about-your-company-line"/>
         <h3>  Company
           Name
         </h3>
       </div>
     </div>
    
     <div className="col-md-6 col-xl-6 col-lg-6 col-sm-6 col-12">
       <div className="tell-us-about-your-company-center-section">
         <div className="tell-us-about-your-company-card-section">
           <div className="tell-us-about-your-company-card-section-label">
             <span>XYZ LIMITED</span>
             <div className="cust-checkbox">
               <div className="custom-checkbox">
                 <input name="noti_6" class="checkbox-custom" id="noti_2" value="2" type="checkbox" checked/>
                 <label className="checkbox-custom-label" for="noti_2">I’d like to use this name</label>
               </div>
             </div>
           </div>
         <p className="custom-m-top-20">We have found <span>7</span> companies with this name, please try
           again or use the name entered in the box above.
         </p>
        
        {
          renderData.length>=1 ? renderData.map((val,i)=>{
             return(
               <div className="tell-us-about-your-company-card2" key={i}>
               <div className="tell-us-about-your-company-maincard2 column-card-1 custom-m-top-20">
                 <div className="tell-us-about-your-company-card2-width">
                   <div className="tell-us-about-your-company-card2-label tell-us-about-your-company-card-section-label">
                     <div className="tell-us-about-your-company-card2-top">
             <span>{val.company}</span>
                       <div className="cust-checkbox">
                         <div className="custom-checkbox">
                           <input name="noti_6" className="checkbox-custom" id="noti_3" value="3" type="checkbox" checked/>
                           <label className="checkbox-custom-label" for="noti_3"></label>
                         </div>
                       </div>
                     </div>
                     <div className="tell-us-about-your-company-card2-bottom">
                   <p>{val.address}</p>
                    </div>
                 </div>
               </div>
             </div>
             </div>  
             )
          }):null
        }
          
     </div>
   </div>
 </div>
 <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
   <div className="tell-us-about-your-company-right-section">
     <hr className="tell-us-about-your-company-line1"/>
     <div className="tell-us-about-your-company-right-section-img">
       <img src={ process.env.PUBLIC_URL +"assets/images/bulb-icon.png"}alt="bulb-icon"/>
     </div>
     <p>We use Companies House publicly available data to retrieve information about your company. By using Companies House data, we can tell you exactly how many R&D claims you can make for your company. If we cannot find your company details not to worry, you can continue to use the company name you entered above. 
   </p>
 </div> 
 </div>
      
 </div>:null
       }
      <div className="row custom-m-top-40">
        <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
          <div className="tell-us-about-your-company-left-section">
            <hr className="tell-us-about-your-company-line"/>
      <h3>  Your R&D Claim Period</h3>
      </div>
      </div>
      <div className="col-md-6 col-xl-6 col-lg-6 col-sm-6 col-12">
      <div className="tell-us-about-your-company-center-section">
        <div className="tell-us-about-your-company-card-section">
          
          <p>Please select the claim period you would like to 
            estimate your R&D claim for?
            </p>
            <div className="custom-checbox-1 tell-us-about-your-company-card-section-label">
              <span>Period 1: 1 April 2018 To 31 March 2019</span>
              <div class="cust-checkbox">
                <div class="custom-checkbox">
                  <input name="noti_6" class="checkbox-custom" id="noti_6" value="2" type="checkbox" checked/>
                  <label className="checkbox-custom-label" for="noti_6"></label>
                </div>
              </div>
            </div>
            <div className="custom-checbox-1 tell-us-about-your-company-card-section-label">
              <span>Period 2: 1 April 2018 To 31 March 2019</span>
              <div classname="cust-checkbox">
                <div className="custom-checkbox">
                  <input name="noti_6" class="checkbox-custom" id="noti_6" value="2" type="checkbox" checked/>
                  <label className="checkbox-custom-label" for="noti_6"></label>
                </div>
              </div>
            </div>
            <div className="custom-checbox-1 tell-us-about-your-company-card-section-label">
              <span>Period 3: 1 April 2018 To 31 March 2019</span>
              <div className="cust-checkbox">
                <div className="custom-checkbox">
                  <input name="noti_6" class="checkbox-custom" id="noti_6" value="2" type="checkbox" checked/>
                  <label className="checkbox-custom-label" for="noti_6"></label>
                </div>
              </div>
            </div>
            <div className="calendar-label-input-section">
              <div className="calendar-label-input form-group">
                <label>Claim Period Start Date:</label>
                <div className="calendar-input-section">          
                  <input type="text" id="datepicker1" value="dd/mm/yyyy"/>
                  <span className="left-line">|</span>
                </div>
                  </div>
                <div className="calendar-label-input form-group">
                  <label>Claim Period End Date:</label>
                  <div className="calendar-input-section">   
                  <input type="text" id="datepicker1" value="dd/mm/yyyy"/>
                  <span className="left-line">|</span>
                  </div>
                  </div>
            </div>
      
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
                <div role="tabpanel" class="tab-pane fade in active show" id="claim-start">
                  <div id="datepicker" class="calendar"></div>
                  <div id="datepicker4" class="calendar"></div>
                </div>
                <div role="tabpanel" class="tab-pane fade" id="claim-end">
                  <div id="datepicker2" class="calendar"></div>
                  <div id="datepicker3" class="calendar"></div>
                </div>
              </div>
                </div>
          </div>
       
      </div>
      </div>
      <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
       <div className="tell-us-about-your-company-right-section">
      <hr className="tell-us-about-your-company-line1"/>
      <div className="tell-us-about-your-company-right-section-img">
        <img src={ process.env.PUBLIC_URL +"assets/images/bulb-icon.png"} alt="bulb-icon"/>
        </div>
         <p>We use Companies House publicly available data to retrieve information about your company. By using Companies House data, we can tell you exactly how many R&D claims you can make for your company. If we cannot find your company details not to worry, you can continue to use the company name you entered above. 
        </p>
      
      </div> 
      </div>
      </div>
      <div className="grands_subsidies_section row custom-m-top-40">
        <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
          <div className="tell-us-about-your-company-left-section">
            <hr className="tell-us-about-your-company-line"/>
      <h3>  Grants & 
        Subsidies</h3>
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
                      <input name="noti_6" class="checkbox-custom" id="noti_8" value="3" type="checkbox" checked/>
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
                      <input name="noti_6" class="checkbox-custom" id="noti_9" value="3" type="checkbox" checked/>
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
      <hr className="tell-us-about-your-company-line1"/>
      <div className="tell-us-about-your-company-right-section-img">
        <img src={ process.env.PUBLIC_URL +"assets/images/bulb-icon.png"}alt="bulb-icon"/>
        </div>
         <p>We use Companies House publicly available data to retrieve information about your company. By using Companies House data, we can tell you exactly how many R&D claims you can make for your company. If we cannot find your company details not to worry, you can continue to use the company name you entered above. 
        </p>
      
      </div> 
      </div>
      </div>
      <div className="rdexpenses_section row custom-m-top-40">
            <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
              <div className="tell-us-about-your-company-left-section">
                <hr className="tell-us-about-your-company-line"/>
          <h3> R&D 
            Expenses</h3>
         
        </div>
        </div>
        <div className="col-md-6 col-xl-6 col-lg-6 col-sm-6 col-12">
          <div className="rdexpenses_card_section">
            <div className="rdexpenses_card1_section">
              <h4>Recommended</h4>
              <div className="empty-space">
      
              </div>
              <p>Connect to your Xero account to view your data instantly and estimate your R&D claim more accurately. </p>
              <button class="btn btn-primary">Connect To Xero</button>
              </div>
              <div className="rdexpenses_card2_section">
                {/* <h4 className="title-empty-space"></h4> */}
                <div className="rdexpenses_card2_img">
                  <img src={ process.env.PUBLIC_URL+"assets/images/rdexpensesicon.png"} alt="rdexpensesicon"/>
                </div>
                <p>Insert your expense information manually to estimate your R&D claim. </p>
                <button className="btn btn-primary">Manually Input Data</button>
                </div>
      
      </div>
      </div>
      <div className="col-md-3 col-xl-3 col-lg-3 col-sm-3 col-12">
        <div className="tell-us-about-your-company-right-section">
          <hr className="tell-us-about-your-company-line1"/>
          <div className="tell-us-about-your-company-right-section-img">
            <img src={ process.env.PUBLIC_URL +"assets/images/bulb-icon.png"}alt="bulb-icon"/>
            </div>
             <p>We use Companies House publicly available data to retrieve information about your company. By using Companies House data, we can tell you exactly how many R&D claims you can make for your company. If we cannot find your company details not to worry, you can continue to use the company name you entered above. 
       
            </p>
      
      </div>
      </div>
        </div>
        </div>
        </div>
      </section>
    )
}

export default Details