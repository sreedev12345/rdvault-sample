
import { Provider } from "react-redux";
import Main from '../src/components/pages/Main'
import Store from '../src/components/redux/store/Store';

import YourRDClaimAndEstimate from '../src/components/secondpage/YourRDClaimAndEstimate';


import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";






function App() {

  return (
    <Router>
      <div className="App">
        <Provider store={Store}>
          <Route exact path="/" component={Main} />
          <Route path="/secondpage" component={YourRDClaimAndEstimate}/>
        </Provider>
      </div>
    </Router>
  );
}

export default App
