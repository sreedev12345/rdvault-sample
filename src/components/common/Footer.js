import React from 'react'
import {
    Link ,
  } from "react-router-dom";

function Footer() {
    return (
        <div>

            <footer class="footer-section">
                <ul>
                    <li>
                        <Link>© 2020 RDvault. All rights reserved</Link>
                    </li>
                    <li>
                        <Link to="/mailto:hello@rdvault.co.uk">hello@rdvault.co.uk</Link>
                    </li>
                    <li>
                        <Link>Privacy Policy</Link>
                    </li>
                    <li>
                        <Link>Terms & Conditions</Link>
                    </li>
                </ul>
            </footer>
        </div>
    )
}

export default Footer