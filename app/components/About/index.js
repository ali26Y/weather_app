

/**
 * lendi about us component
 * @param {category, readTime title, date, author, preview, photoUrl}
 * @note reponsive
 */

import React from 'react';
import { connect } from 'react-redux';

class About extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        Hey! Thanks for using my weather application. If you like it, consider starring,cloning or whatever you wanna do with the repo :))
        <div>
        </div>
      </div>
    );
  }
}

export default connect()(About);
