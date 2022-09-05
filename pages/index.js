import Head from 'next/head';
import Image from 'next/image';
import { Footer } from '../components/Footer';
import { Main } from '../components/Home';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Voting app</title>
        <meta name="description" content="An app to vote in blockchain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
      <Footer />
    </div>
  );
}
