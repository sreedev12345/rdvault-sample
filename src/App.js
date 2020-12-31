import { Provider } from "react-redux";
import Main from '../src/components/pages/Main'
import Context from '../src/components/common/Context';
import Store from '../src/components/redux/store/Store';

function App() {
  return (

    <div className="App">
      <Provider store={Store}>
        <Main />
      </Provider>
    </div>
  );
}

export default App
