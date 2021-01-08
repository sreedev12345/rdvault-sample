import React from 'react';

const ThanksWithSocial = ({ closescheduleConsult }) => {
  return (
    <div className="modal modalYellowContent d-block show in">
      <div className="modal-dialog">
        <div className="modal-content lightRed_border">
          {/* <div className="modal-header">
              <h4 className="modal-title"></h4>
              
            </div> */}
          <div className="modal-body">
            <button type="button" className="close lightRed" onClick={closescheduleConsult}>
              &times;
            </button>
            <h2 className="lightRed_text">Thank you!</h2>
            <label>Your data has been deleted?</label>
            <h2 className="blue_text">Did you like the estimator?</h2>
            <label>Please share it with companies like yourself!</label>
            {/* <button className="btn-yellow lightRed">YES,SUBMIT</button> */}
            <ul className="socialIcon">
              <li>
                <a href="">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i className="fab fa-pinterest-p"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i className="fab fa-google-plus-g"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i className="fas fa-envelope"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ThanksWithSocial;
