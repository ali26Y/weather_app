const OAuth = require('oauth');
const axios = require('axios');

const client_ID = 'dj0yJmk9Wkh4RXFiUW1NV05TJmQ9WVdrOVR6SnhNMjlZTjJVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1mYg--';
const client_secret = '24ded42d58b244025c030f4aae7635ab53cb6f0d';

const helpers = {
  oauth: null,
  format: null,
  parameters: {},
  //yql-node used to output only xml, now the formatAsJSON chainloader should help.
  withOAuth: function () {
      this.oauth = new OAuth.OAuth(
        'https://api.login.yahoo.com/oauth2/request_auth',
        'https://api.login.yahoo.com/oauth2/get_token',
        client_ID, //consumer key
        client_secret, //consumer secret
        '1.0',
        null,
        'HMAC-SHA1'
        );
      this.oauth.setClientOptions({ requestTokenHttpMethod: 'POST' });

      return this;
  },
  formatAsJSON: function () {
      this.format = 'json';
      return this;
  },
  formatAsXML: function () {
      this.format = 'xml';
      return this;
  },
  setQueryParameter: function(parameters) {
      this.parameters = Object.assign(this.parameters, parameters);
      return this;
  },

  execute: function (query, callback) {
      if (this.oauth != null) {
          this.oauth.get('https://query.yahooapis.com/v1/yql',
            '',
            '',
            Object.assign({ q: query, format: this.format || 'json' }, this.parameters),
            callback);
      } else {
          axios
            .post('https://query.yahooapis.com/v1/yql',
              Object.assign({ q: query, format: this.format || 'json' }, this.parameters),
              { multipart: false },
            )
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
      }
  }
};

export default helpers;
