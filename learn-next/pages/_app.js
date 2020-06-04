/* 

This App component is the top-level component which will be common across all the different pages. 

You can use this App component to keep state when navigating between pages,
*/
import "./global.css";
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
