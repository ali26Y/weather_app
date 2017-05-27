import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
// import DevTools from './containers/DevTools';
import { Router, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll';
import createRoutes from './routes';

export default class Root extends Component {
    render() {
        const { store, history } = this.props;
        const routes = createRoutes(store);
        return (
            <Provider store={store}>
                <div>
                  <Router
                    history={history}
                    routes={routes}
                    render={applyRouterMiddleware(
                      useScroll( (prevProps, props) => {
                        if (!prevProps || !props) {
                        return true;
                        }
                        if (prevProps.location.pathname !== props.location.pathname) {
                          window.analytics.page(props.location.pathname);
                          return [0, 0];
                        }
                        return true;
                      }))}
                  />
                </div>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
