import React, { useState } from 'react';
// import { postPdfData, createClaimPeriod } from '../../../Services/company-house';
// import { LocalStorage } from '../../utils';
// import { toast } from 'react-toastify';
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const checkNan = (numberPayload)=>{
  if(!numberPayload){
    return 0;
  }
  return !isNaN(numberPayload) ? numberPayload : 0;
}

const SendPdfReport = ({
  closePdf,
  zeroProfitAndLoss,
  balanceSheet,
  isGrantAndSubsidies,
  valueToDisplayFooter,
  estimatedAccuracy,
  onSuccessPopupPdf
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const formDataChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = () => {
    // const {
    //   companyCreatedData: { id, name },
    //   claimPeriod: { start, end },
    //   claimDetailFromAuth: { id: claimId },
    // } = LocalStorage.get('core');
    const createClaimPeriodPayload = {
    //   company_id: id,
    //   name,
    //   date_from: start,
    //   date_to: end,
    };
    if (!formData.name) {
    //   toast.error('Please enter name.');
    //   return;
    }
    if (!validateEmail(formData.email)) {
    //   toast.error('Please enter valid email.');
    //   return;
    }
    const params = {
    //   company_id: id,
    //   grants_and_subsidies: String(isGrantAndSubsidies),
    //   customer_data: formData,
      'Profit&LossDetail': {
        // claim_id: claimId,
        is_profit_making: !String(estimatedAccuracy).includes('-'),
        estimate_accuracy: estimatedAccuracy,
      },
      rd_claim_estimate: {
        total_qualifing_expencese: checkNan(valueToDisplayFooter.totalQualifyingRD),
        total_tax_credit_cash_saved: checkNan(valueToDisplayFooter.taxCredit),
        claim_fee_amount: checkNan(valueToDisplayFooter.priceToMakeClaim),
      },
      BalanceSheet: balanceSheet,
      'Profit&Loss': zeroProfitAndLoss,
    };
    setLoading(true);
    // postPdfData(params)
    //   .then((resp) => {
    //     // toast.success('Submitted sucessfully!')
    //     onSuccessPopupPdf(params);
    //     // setLoading(false);
    //     if (resp.data.success) {
    //       setSuccess(true);
    //     } else {
    //       toast.error('Error on form submission');
    //     }
    //     // closeConsultation();
    //   })
    //   .catch((e) => {
    //     setLoading(false);
    //     toast.error('Error on form submission');
    //   });
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
                <button disabled={loading} onClick={onSubmit} className="btn-yellow">
                  {loading ? 'Generating PDF...' : 'SEND PDF REPORT'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SendPdfReport;
