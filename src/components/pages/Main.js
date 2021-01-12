
import Header from './Header';
import CompanyDetails from './CompanyDetails'
import Footer from './Footer'
import ClaimPeriod from './ClaimPeriod';
import Grant from './Grant';
import Expenses from './Expenses';




const Main = (props) => {
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
            <Footer />

        </div>

    )
}

export default Main;