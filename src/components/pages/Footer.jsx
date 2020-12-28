
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
const Footer = () => {
    return (
        <Router>
            <footer className="footer-section">
                <ul>
                    <li>
                        <Link to="/">© 2020 RDvault. All rights reserved</Link>
                    </li>
                    <li>
                        <Link to="/">hello@rdvault.co.uk</Link>
                    </li>
                    <li>
                        <Link to="/">Privacy Policy</Link>

                    </li>
                    <li>
                        <Link to="/">Terms & Conditions</Link>
                    </li>
                </ul>
            </footer>
        </Router>
    )
}

export default Footer;