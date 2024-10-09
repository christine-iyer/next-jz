// pages/_app.tsx
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import '../styles/globals.css'; // Your global styles (if any)
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
