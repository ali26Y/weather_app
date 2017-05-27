import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { footer, appSection } from './style.scss';
import Header from '../../components/Header';

const App = ({ children }) =>
  <div>
    <Header></Header>
    <div className={appSection}>
      <div className={'container'}>
        { children }
      </div>
    </div>
    <div className={'container'}>
      {
        /*
        <footer className={footer}>
          <Link to='/'>Search</Link>
          <Link to='/about'>About</Link>
        </footer>
        */
      }
    </div>
  </div>;

App.propTypes = {
  children: PropTypes.object
};

export default App;
