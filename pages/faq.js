import Head from 'next/head';
import Accordion from '@/components/Accordion';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';

function FAQPage() {
  return (
    <main>
        <Head>
            <title>FAQ - TechMart</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header />
        <Accordion />
        <Footer />
    </main>
  );
}

export default FAQPage; 