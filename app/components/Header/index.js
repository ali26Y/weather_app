import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
// import utils from '../utils/utils';
import style from './style.css';

class Header extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        <div className={`navbar ${style.navbar}`}>
          <div className={`${style.navbarInner}`}>
            <div className={`navbar-header ${style.brand}`}>
              <a className={`brand`} href='/'>
                <img src='https://www.seeklogo.net/wp-content/uploads/2013/06/flag-of-usa-flying-vector-logo-400x400.png' />
              </a>
            </div>
            <a className='btn btn-navbar' href='/'>
              <span className='icon-bar'>Home</span>
            </a>
            <a className='btn btn-navbar' href='/about'>
              <span className='icon-bar'>About</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

}

export default connect()(Header);
