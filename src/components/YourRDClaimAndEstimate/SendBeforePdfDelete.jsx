import React from 'react';

const SendBeforePdfDelete = ({ closePdf }) => {
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
            <h2>Send me my PDF Reports before Deleting my Data</h2>
            {/* <label>Please enter your details below</label> */}
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Name*" />
            </div>
            <div className="form-group">
              <input type="email" className="form-control" placeholder="Email*" />
            </div>
            <button className="btn-yellow  mb-2">SEND PDF REPORT</button>
            <button className="btn-yellow lightRed">
              NO, PROCEED TO END SESSION AND DELETE DATA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SendBeforePdfDelete;