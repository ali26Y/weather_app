import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import style from './style.css';
// import USA_STATES from '../../utils/mapping';
import axios from 'axios';
// import { merge, pick } from 'lodash';


class FilterableTable extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      locationState: '',
      error: '',
      forecast: {},
      loading: false,
      state: ''
    };
  }

  grabWeather (e) {
    if (e) e.preventDefault();
    this.setState({
      loading: true
    });
    setTimeout(
      () => {
        if (!this.state.locationState) {
          this.setState({error: 'Please enter a State or City', loading: false});
          return;
        } else {
          this.setState({error: ''});
          axios.get(`https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${this.state.locationState}')&format=json`)
          .then((res) => {
            this.setState({forecast: res.data.query.results.channel.item.forecast, state: res.data.query.results.channel.location.city});
          })
          .catch ((err) => {
            this.setState({
              error: 'Please try again or wait a few minutes - Yahoo API down.'
            });
          });
          this.setState({loading: false});
        }
      },
      1000
    );
  }

  grabForecast () {
    let forecast = [];
    if (this.state.forecast) {
      for (let i = 0; i < this.state.forecast.length; i++) {
        forecast.push(
          <tr key={i}>
            <td>{this.state.forecast[i].date}</td>
            <td>{this.state.forecast[i].low}</td>
            <td>{this.state.forecast[i].high}</td>
            <td>{this.state.forecast[i].text}</td>
          </tr>
        );
      }
      return forecast;
    }
  }

  render () {
    return (
      <div>
        <h1 className='text-center'>Weather Forecast</h1>
        <h2 className='text-center'>USA</h2>
        <br />
        <br />
        <div className='row text-center'>
          <div className='col-sm-9'>
            <input type='text'
              className='form-control'
              placeholder='Enter State Code, eg: CA'
              onChange={(evt) => {
                evt.preventDefault();
                this.setState({locationState: evt.target.value});
              }}
              onkeypress={(e) => {
                if (e.keyCode === 13) this.grabWeather(e);
              }}
            />
            {
              this.state.error &&
              <div className={`container ${style.error}`}>
                <div className='row'>
                  <p><span className={`material-icons ${style.errorIcon}`}>error_outline</span>{this.state.error}</p>
                </div>
              </div>
            }
          </div>
          <div className='col-sm-3'>
            <button className='btn btn-default btn-block' onClick={(e) => { this.grabWeather(e); }}>Search</button>
          </div>
        </div>
        {
          !this.state.loading
          ?
            <div>
              <hr />
              <br />
              <h4 className='text-center'>{this.state.state}</h4>
              <br />
              <br />
              <table className='table'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Low</th>
                    <th>High</th>
                    <th>Text</th>
                  </tr>
                </thead>
                <tbody>
                  { this.grabForecast() }
                </tbody>
              </table>
            </div>
          :
            <div className='text-center'>
              <img className={`align-center ${style.loading}`} src={require(`../../images/Loading_icon.gif`)} />
            </div>
        }
      </div>
    );
  }

}

FilterableTable.propTypes = {
  filter: PropTypes.string,
  onFilter: PropTypes.func
};

export default connect()(FilterableTable);
