import App from 'next/app';
import {CartContextProvider} from '../components/CartContext';
import {LangProvider} from '../components/LangContext';
import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
  }
`;

function MyApp({Component, pageProps, initialCartProducts}) {
  return (
    <LangProvider initialLang="EN">
      <CartContextProvider initialCartProducts={initialCartProducts}>
        <GlobalStyles />
        <Component {...pageProps} />
      </CartContextProvider>
    </LangProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const initialCartProducts = appContext.ctx.req ? [] : JSON.parse(window.localStorage.getItem('cart') || '[]');
  return {...appProps, initialCartProducts};
}

export default MyApp;