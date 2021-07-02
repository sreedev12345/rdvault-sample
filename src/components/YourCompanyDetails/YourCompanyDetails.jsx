import Header from '../common/Header';
import CompanyDetails from './CompanyDetails';
import ClaimPeriod from './ClaimPeriod';
import Grant from './Grant';
import Expenses from './Expenses';
import Footer from '../common/Footer';

const YourCompanyDetails = () => {
    return (
        <div>
            <Header />
            <section className="tell-us-about-your-company">
                <div className="container-fluid">
                    <div className="tell-us-about-your-company-section">
                        <CompanyDetails />
                        <ClaimPeriod />
                        <Grant />
                        <Expenses />
                    </div>
                </div>
            </section>
          <Footer/>
        </div>
    )
}

export default YourCompanyDetails;