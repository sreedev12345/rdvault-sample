import React, { useState,useEffect } from 'react';
import _ from 'lodash'
// import { toast } from 'react-toastify';
// import { freeConsultation } from '../../../Services/company-house';
// import { LocalStorage } from '../../utils';
const GetFreeAConsultation = ({ closeConsultation, onSendPdfComplete}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const success = false;
  const [loading, setLoading] = useState(false);
  const [popupThanks,setPopupThanks]=useState(false);
  useEffect(() => {
    if(!_.isEmpty(onSendPdfComplete)){
        const data= onSendPdfComplete && onSendPdfComplete.customer_data;
        setFormData(data);
        setPopupThanks(true);
    }
},[onSendPdfComplete]);
  const onSubmit = () => {
    // const {
    //   companyCreatedData: { id },
    // } = LocalStorage.get('core');
    // if (!formData.phone && !formData.name) {
    //   toast.error('Please enter value in all fields.');
    //   return;
    // }
    // if (!validateEmail(formData.email)) {
    //   toast.error('Please enter valid email.');
    //   return;
    // }
    
    // const params = {
    //   company_id: id,
    //   ...formData,
    // };
    setLoading(true);
    // freeConsultation(params)
    //   .then((resp) => {
    //     setLoading(false);
    //     if (resp.data.success) {
    //       setPopupThanks(false);
    //       setSuccess(true);
    //     } else {
    //       toast.error('Error on form submission');
    //     }
    //     // toast.success('Submitted sucessfully!');

    //     // closeConsultation();
    //   })
    //   .catch((e) => {
    //     setLoading(false);
    //     toast.error('Error on form submission');
    //   });
  };

  const formDataChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="modal modalYellowContent d-block show in">
      <div className="modal-dialog">
        <div className="modal-content purple_border">
          {/* <div className="modal-header">
              <h4 className="modal-title"></h4>
              
            </div> */}
          <div className="modal-body">
            <button type="button" className="close purple" onClick={closeConsultation}>
              &times;
            </button>
            {popupThanks && (
               <>
               <h2 className="purple_text">Thank You!</h2>
               <label>You have been sent the report</label>
               
             </>
            )}
            {success && (
              <>
                <h2 className="purple_text">Thank You!</h2>
                <label>An RDVault team member will contact as soon as possible.</label>
                {/* <h2 className="purple_text">Schedule Consultation</h2>
                <button className="btn-yellow purple">BOOK NOW</button> */}
              </>
            )}
            {!success && (
              <>
                {' '}
                <h2 className="purple_text">Get a Free Consultation</h2>
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
                <button disabled={loading} className="btn-yellow purple" onClick={onSubmit}>
                  {loading ? 'Loading...' : 'Submit'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default GetFreeAConsultation;
