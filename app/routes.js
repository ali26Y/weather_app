import App from './containers/App';
import FilterableTable from './components/FilterableTable';
import About from './components/About';
// import Error from './containers/Error';

export default function createRoutes () {
  // Create reusable async injectors using getHooks factory
  return {
    component: App,
    childRoutes: [
      { path: '/', component: FilterableTable },
      { path: '/about', component: About }
      // { path: '*', component: Error }
    ]
  };
}
