import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as serviceWorker from './serviceWorker';
import ie from './helpers/ie';
import App from './components/App';
import client from './apollo';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './i18n';
import './index.scss';

(() => {
  const ieVer = ie.getVersion();
  if (ieVer !== -1 && ieVer < 11) {
    window.alert(
      'Internet Explorer 11 이하는 지원하지 않습니다. 브라우저를 업그레이드하고 사용하시거나 크롬 브라우저를 통해 사용하실 수 있습니다.'
    );
    window.location.href = 'https://www.google.com/intl/ko_ALL/chrome';
    return;
  }

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#000'
      }
    },
    overrides: {
      MuiOutlinedInput: {
        notchedOutline: {
          borderRadius: 0
        }
      },
      MuiButton: {
        root: {
          borderRadius: 0
        },
        contained: {
          boxShadow: 'none'
        }
      }
    },
    typography: {
      useNextVariants: true
    }
  });

  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </MuiThemeProvider>,
    document.getElementById('root') as HTMLElement
  );

  serviceWorker.unregister();
})();
