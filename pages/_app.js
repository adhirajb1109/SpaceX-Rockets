import '../styles/globals.css'
import Navbar from '../components/Navbar';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SpaceX Rockets</title>
        <meta name="description" content="Spacex Rockets is an app which tells us about all the missions of Spacex ." />
        <link rel="shortcut icon" href="https://i.ibb.co/R22TXpf/download-6-removebg-preview.png" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet"></link>
        <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"></script>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
