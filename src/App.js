import React, { useState, useEffect } from 'react';
import { Provider } from "react-redux";
import Main from '../src/components/pages/Main'
import Context from '../src/components/common/Context';
import Store from '../src/components/redux/store/Store';
import Form from './Form'
import YourRDClaimAndEstimate from '../src/components/secondpage/YourRDClaimAndEstimate';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [input, setInput] = useState("");

  // useEffect(()=>{
  //   console.log("initial",document.getElementById("date").value)
  // },[])

  // useEffect(()=>{
  //   console.log("initial-input",document.getElementById("date").value)
  // },[input]);


  const checkValue = (str, max) => {
    console.log(str, max)
  }

  const dateChange = (e) => {
    console.log("trigger")
    var element = e.target.value;
    if (/\D\/$/.test(element)) element = element.substr(0, element.length - 3);
    var values = element.split('/').map(function (v) {
      return v.replace(/\D/g, '')
    });
    console.log("value", values, e.target.value);
    // checkValue(values[0],31)
    var output = values.map(function (v, i) {
      return v.length == 2 && i < 2 ? v + ' / ' : v;
    });
    console.log("out-put", output.join('').substr(0, 14));
    setInput(e.target.value.replace(/^(\d\d)(\d)$/g, '$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, ''))
  }

  return (
    <Router>
      <div className="App">
        {/* {/* <input name=x size=10 maxlength=10  
      onkeyup="this.value=this.value.replace(/^(\d\d)(\d)$/g,'$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g,'$1/$2').replace(/[^\d\/]/g,'')"> */}
        {/* <input type="text" id="date" value={input} 
       onChange={dateChange} */}
        {/* //onkeyup={"this.value=this.value.replace(/^(\d\d)(\d)$/g,'$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g,'$1/$2').replace(/[^\d\/]/g,'')" } */}
        {/* /> */} 
        <Provider store={Store}>
          <Route exact path="/" component={Main} />
          <Route path="/secondpage" component={YourRDClaimAndEstimate}/>
        </Provider>
        {/* <YourRDClaimAndEstimate /> */}
      </div>
    </Router>
  );
}

export default App
