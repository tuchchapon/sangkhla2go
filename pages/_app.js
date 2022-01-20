import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GoogleAnalytics from '../components/GoogleAnalytics';
import ReactGa from 'react-ga'
function MyApp({ Component, pageProps }) {
  const gaTrackingId = "G-XZ8Z3ZJX89"
  ReactGa.initialize(gaTrackingId)
  ReactGa.pageview("/")
  return <>
    <Component {...pageProps} />
    <GoogleAnalytics />
  </>
}

export default MyApp
