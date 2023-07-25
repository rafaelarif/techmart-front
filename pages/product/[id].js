import Head from 'next/head';
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import Footer from "@/components/Footer";
import {useState, useEffect} from 'react';

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage({product}) {
    const {addProduct} = useContext(CartContext);
    const [isFeaturedProduct, setIsFeaturedProduct] = useState(false);
    const featuredProductId = '64bf3310696f76160c76fa0c';

    useEffect(() => {
        if (product._id === featuredProductId) {
            setIsFeaturedProduct(true);
        }
    }, [product]);

    return (
        <>
            <Head>
                <title>{product.title} - TechMart</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <ProductImages images={product.images} />
                    </WhiteBox>
                    <div>
                        <Title>{product.title}</Title>
                        <p>{product.description}</p>
                        <PriceRow>
                            <div>
                                <Price>${product.price}</Price>
                            </div>
                            <div>
                                <Button onClick={() => addProduct(product._id)}>
                                    Add to Cart
                                </Button>
                            </div>
                        </PriceRow>
                        {isFeaturedProduct &&
                            <div style={{marginTop: '20px'}}>
                                <iframe
                                    width="560"
                                    height="315"
                                    src="https://www.youtube.com/embed/0okuAwqTHs0"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen>
                                </iframe>
                            </div>
                        }
                    </div>
                </ColWrapper>
            </Center>
            <Footer />
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}