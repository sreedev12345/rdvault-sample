import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { LocalStorage } from '../../utils';
// import { deleteData } from '../../../Services/company-house';
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
const DeleteDataForEver = ({ closeDeletePopup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const onSumit = () => {
    // const {
    //   companyCreatedData: { id },
    // } = LocalStorage.get('core');
    // const params = {
    //   company_id: id,
    //   ...formData,
    };
    // if (!formData.phone && !formData.email) {
    //   toast.error('Please enter value in all fields.')
    //   return;
    // }
    // if (!validateEmail(formData.email)) {
    //   toast.error('Please enter valid email.')
    //   return;
    // }
//     deleteData(params)
//       .then((data) => {
//         // toast.success('Deleted sucessfully!');
//         if (data.data.success) {
//           localStorage.clear();
//           window.location.href = 'https://rdvault.co.uk/estimator/';
//         } else {
//           toast.error('Error on delete');
//         }
//       })
//       .catch((e) => {
//         // window.location.href="https://rdvault.co.uk/estimator/";
//         toast.error('Error on delete');
//       });
//   };
  const formDataChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="modal modalYellowContent d-block show in">
      <div className="modal-dialog">
        <div className="modal-content lightRed_border">
          {/* <div className="modal-header">
              <h4 className="modal-title"></h4>
              
            </div> */}
          <div className="modal-body">
            <h2 className="lightRed_text">Delete Data Forever</h2>
            <label>ARE YOU SURE?</label>
            {/* <div className="form-group">
            
             
              <input type="text" name="name" value={formData.name} className="form-control" onChange={formDataChange} placeholder="Name*" />
            </div> */}
            {/* <div className="form-group">
              <input type="email" name="email" value={formData.email} className="form-control" onChange={formDataChange} placeholder="Email*" />
            </div> */}
            <button type="button" className="close lightRed" onClick={closeDeletePopup}>
              &times;
            </button>

            <button disabled={loading} onClick={onSumit} className="btn-yellow lightRed">
              {loading ? 'Loading..' : 'YES, SUBMIT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteDataForEver;
