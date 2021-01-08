import React from 'react';

const ScheduleConsultation = ({ closescheduleConsult }) => {
  return (
    <div className="modal modalYellowContent d-block show in">
      <div className="modal-dialog">
        <div className="modal-content purple_border">
          {/* <div className="modal-header">
              <h4 className="modal-title"></h4>
              
            </div> */}
          <div className="modal-body">
            <button type="button" className="close purple" onClick={closescheduleConsult}>
              &times;
            </button>
            <h2 className="purple_text">Thank You!</h2>
            <label>
              An RDvault team member will contact as soon as possible. Alternately, Set a date
              yourself!
            </label>
            <h2 className="purple_text">Schedule Consultation</h2>

            <button className="btn-yellow purple">BOOK NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScheduleConsultation;
