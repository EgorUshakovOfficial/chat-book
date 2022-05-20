import { Provider, connect } from 'react-redux'; 
import mapDispatchToProps from './state/mapdispatchtoprops';
import mapStateToProps from './state/mapstatetoprops'; 
import store from './state/store';

import Presentational from './components/presentational'; 
import Home from './pages/home';
import './styles/app.css';

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational); 


const App = () => {
    return (
      <div className="app">
          <Provider store={store}>
              <Container />
            </Provider>
      </div>
  );
}

export default App;
