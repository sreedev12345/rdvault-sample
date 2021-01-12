import React, { useState, useEffect } from 'react';
import { Provider } from "react-redux";
import Main from '../src/components/pages/Main'
import Context from '../src/components/common/Context';
import Store from '../src/components/redux/store/Store';
import Form from './Form'
import YourRDClaimAndEstimate from '../src/components/secondpage/YourRDClaimAndEstimate';


import Select from 'react-select';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";




const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];


function App() {
  const [input, setInput] = useState(null);
  const [fruits,setFruits] = useState("")

  const handleChange = selectedOption => {
    setInput( selectedOption );
    console.log(`Option selected:`, selectedOption);
    setFruits(selectedOption)
  };

  console.log("fruits-fruits",fruits)

  return (
    <Router>
      <div className="App">
        <Provider store={Store}>
          <Route exact path="/" component={Main} />
          <Route path="/secondpage" component={YourRDClaimAndEstimate}/>
        </Provider>
      </div>
    </Router>
    // <div>
    //    <Select
    //     value={fruits}
    //     onChange={handleChange}
    //     options={options}
    //   />
    // </div>
  );
}

export default App
