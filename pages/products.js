import Head from 'next/head';
import Header from "@/components/Header";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Footer from "@/components/Footer";

export default function ProductsPage({products}) {
    return (
        <>
            <Head>
                <title>Products - TechMart</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Center>
                <Title>All products</Title>
                <ProductsGrid products={products}/>
            </Center>
            <Footer />
        </>
    );
}

export async function getServerSideProps(ctx) {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort: {_id: -1}});
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        },
    };
}