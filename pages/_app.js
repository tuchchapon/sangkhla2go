import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GoogleAnalytics from '../components/GoogleAnalytics';
<script src="/path/to/masonry.pkgd.min.js"></script>
function MyApp({ Component, pageProps }) {
  return <>
    <Component {...pageProps} />
    <GoogleAnalytics />
  </>
}

export default MyApp
