import { Provider } from "react-redux";
import YourCompanyDetails from '../src/components/YourCompanyDetails/YourCompanyDetails'
import Stores from '../src/components/redux/Stores';

import YourRDClaimAndEstimate from '../src/components/YourRDClaimAndEstimate/YourRDClaimAndEstimate';


import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";






function App() {
  return (
    <Router>
      <div className="App">
        <Provider store={Stores}>
          <Route exact path="/" component={YourCompanyDetails} />
          <Route path="/secondpage" component={YourRDClaimAndEstimate}/>
        </Provider>
      </div>
    </Router>
  );
}

export default App
