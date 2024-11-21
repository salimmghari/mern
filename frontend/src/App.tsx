import React, {useEffect} from 'react';
import {
  HashRouter, 
  Routes, 
  Route
} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/app/store';
import Home from './screens/Home';
import Auth from './screens/Auth';
import './index.css';


interface AppProps {
  children?: any
}

declare const cordova: any;

const App = (props: AppProps): JSX.Element => {
  useEffect(() => {
    document.addEventListener('deviceready', () => {
      if (cordova.plugins && cordova.plugins.permissions) {
          const permissions = cordova.plugins.permissions;

          permissions.requestPermission(
              permissions.INTERNET,
              (status: {hasPermission: boolean}) => {
                  if (status.hasPermission) {
                      console.log('Internet permission granted');
                  } else {
                      console.log('Internet permission denied');
                  }
              },
              (error: any) => console.error('Failed to request Internet permission:', error)
          );

          permissions.requestPermission(
              permissions.ACCESS_NETWORK_STATE,
              (status: {hasPermission: boolean}) => {
                  if (status.hasPermission) {
                      console.log('Network state permission granted');
                  } else {
                      console.log('Network state permission denied');
                  }
              },
              (error: any) => console.error('Failed to request network state permission:', error)
          );
      }
    });
  }, [])
 
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
