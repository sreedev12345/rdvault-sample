import React from 'react';
import {
  Link
} from "react-router-dom";

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
                <Link>
                  <i className="fab fa-facebook-f"></i>
                </Link>
              </li>
              <li>
                <Link>
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
              <li>
                <Link>
                  <i className="fab fa-pinterest-p"></i>
                </Link>
              </li>
              <li>
                <Link>
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
              <li>
                <Link>
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </li>
              <li>
                <Link>
                  <i className="fab fa-google-plus-g"></i>
                </Link>
              </li>
              <li>
                <Link>
                  <i className="fas fa-envelope"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ThanksWithSocial;
