import React, { useState, useEffect } from 'react';
import { postPdfDataManual, createClaimPeriod } from '../../../Services/company-house';
import { LocalStorage } from '../../utils';
import { toast } from 'react-toastify';
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
  
const Pdf1 = ({
  closePdf,
  boxValue,
  profit,
  tableData,
  price,
  cs,
  qe,
  toggleValue,
  grantDetails,
  setGrantManualData,
  setNongrantManualData,
  onSuccessPopup
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [success, setSuccess] = useState(false);
  const formDataChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(()=>{
    if(toggleValue === false){
    tableData.forEach((item, index) => {
      item.off_non_grant_allocation = item.on_non_grant_allocation;
      item.off_non_grant_amount = item.on_non_grant_amount;
      item.on_non_grant_allocation = 0;
    item.on_non_grant_amount = 0;
    item.grant_funded_allocation = 0;
    item.grant_funded_amount = 0;
    });
  }
  setNongrantManualData(tableData);
  },[toggleValue,tableData])
  const onSubmit = () => {``
    const {
      companyCreatedData: { id, name },
      claimPeriod: { start, end },
    } = LocalStorage.get('core');
    if (!formData.phone && !formData.name) {
      toast.error('Please enter value in all fields.');
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error('Please enter valid email.');
      return;
    }
    const params = {
      company_id: id,
      grants_and_subsidies: toggleValue,
      is_profit_making: profit,
      estimate_accuracy: boxValue != null ? boxValue : 0,
      customer_data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      rd_claim_estimate: {
        total_qualifing_expencese: parseInt(qe),
        total_tax_credit_cash_saved: parseInt(cs),
        claim_fee_amount: price,
      },
      rd_expance: tableData,
    };

    postPdfDataManual(params)
      .then((resp) => {
        if (resp.data.success) {
          // setSuccess(true);
          onSuccessPopup(params);
      //     setNongrantManualData([]);
      // setGrantManualData([]);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        toast.error('Error on form submission');
      });
  };
  return (
    <div className="modal modalYellowContent d-block show in">
      <div className="modal-dialog">
        <div className="modal-content">
          {/* <div className="modal-header">
              <h4 className="modal-title"></h4>
              
            </div> */}
          <div className="modal-body">
            <button type="button" className="close" onClick={closePdf}>
              &times;
            </button>
            {success && (
              <>
                <h2>Thank You!</h2>
                <label>You have been sent the Report</label>
              </>
            )}
            {!success && (
              <>
                <h2>Send PDF Reports</h2>
                <label>Please enter your details below</label>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    className="form-control"
                    onChange={formDataChange}
                    placeholder="Name*"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="form-control"
                    onChange={formDataChange}
                    placeholder="Email*"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    className="form-control"
                    onChange={formDataChange}
                    placeholder="Phone Number"
                  />
                </div>
                <button onClick={onSubmit} className="btn-yellow">
                  SEND PDF REPORT
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pdf1;
