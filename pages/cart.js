import Head from 'next/head';
import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import Footer from "@/components/Footer";

const StyledTable = styled(Table)`
  table-layout: fixed;
  width: 100%;

  th:nth-child(1) {
    width: 60%;
  }

  th:nth-child(2) {
    width: 25%;
  }

  th:nth-child(3) {
    width: 15%;
  }
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px; // Adjust this value to fit your design
`;

const RemoveButton = styled(Button)`
  margin-top: 3px;
`;

const PaymentButton = styled(Button)`
  margin-top: 20px;
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

export default function CartPage() {
    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', {ids: cartProducts})
                .then(response => {
                    setProducts(response.data);
                })
        } else {
            setProducts([]);
        }
    }, [cartProducts]);
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window?.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();
        }
    }, []);
    function moreOfThisProduct(id) {
        addProduct(id);
    }
    function lessOfThisProduct(id) {
        removeProduct(id);
    }
    async function goToPayment() {
        if (!name || !email || !streetAddress || !city || !postalCode || !country) {
            setErrorMessage("All fields must be filled out before proceeding to payment.");
            return;
        }
        const response = await axios.post('/api/checkout', {
            name, email, streetAddress, city, postalCode,  country,
            cartProducts,
        });
        if (response.data.url) {
            window.location = response.data.url;
        }
    }
    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    if (isSuccess) {
        return (
            <>
                <Head>
                    <title>Cart - TechMart</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <Header />
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h1>Thanks for your order!</h1>
                            <p>We will email you when your order will be sent.</p>
                        </Box>
                    </ColumnsWrapper>
                </Center>
                <Footer />
            </>
        );
    }
    return (
        <>
            <Head>
                <title>Cart - TechMart</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h2>Cart</h2>
                        {!cartProducts?.length && (
                            <div>Your cart is empty.</div>
                        )}
                        {products?.length > 0 && (
                            <StyledTable>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src={product.images[0]} alt="" />
                                                </ProductImageBox>
                                                <span>{product.title}</span>
                                            </ProductInfoCell>
                                            <td>
                                                <QuantityControl>
                                                    <Button
                                                        onClick={() => lessOfThisProduct(product._id)}>-</Button>
                                                    <QuantityLabel>
                                                        {cartProducts.filter(id => id === product._id).length}
                                                    </QuantityLabel>
                                                    <Button
                                                        onClick={() => moreOfThisProduct(product._id)}>+</Button>
                                                </QuantityControl>
                                            </td>
                                            <td>
                                                ${(cartProducts.filter(id => id === product._id).length * product.price).toFixed(2)}
                                                <RemoveButton
                                                    onClick={() => {
                                                        const productCount = cartProducts.filter(id => id === product._id).length;
                                                        for (let i = 0; i < productCount; i++) {
                                                            removeProduct(product._id);
                                                        }
                                                    }}>
                                                    Remove
                                                </RemoveButton>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr style={{height: "60px"}}>
                                        <td>
                                            {!!cartProducts?.length && (
                                                <Button onClick={clearCart}>Clear Cart</Button>
                                            )}
                                        </td>
                                        <td style={{textAlign: 'right'}}>
                                            <span style={{marginRight: '3px'}}>
                                                Subtotal ({cartProducts.length} {cartProducts.length === 1 ? 'item' : 'items'}):
                                            </span>
                                        </td>
                                        <td>${total.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </StyledTable>
                        )}
                    </Box>
                    {!!cartProducts?.length && (
                        <Box>
                            <h2>Order Information</h2>
                            {errorMessage && (
                                <div style={{color: 'red', display: 'flex', alignItems: 'center'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{width: '1.2rem', height: '1.2rem', marginRight: '5px'}}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                    </svg>
                                    {errorMessage}
                                </div>
                            )}
                            <Input type="text"
                                placeholder="Name"
                                value={name}
                                name="name"
                                onChange={ev => setName(ev.target.value)} />
                            <Input type="text"
                                placeholder="Email"
                                value={email}
                                name="email"
                                onChange={ev => setEmail(ev.target.value)} />
                            <Input type="text"
                                placeholder="Street Address"
                                value={streetAddress}
                                name="streetAddress"
                                onChange={ev => setStreetAddress(ev.target.value)} />
                            <CityHolder>
                                <Input type="text"
                                    placeholder="City"
                                    value={city}
                                    name="city"
                                    onChange={ev => setCity(ev.target.value)} />
                                <Input type="text"
                                    placeholder="Postal Code"
                                    value={postalCode}
                                    name="postalCode"
                                    onChange={ev => setPostalCode(ev.target.value)} />
                            </CityHolder>
                            <Input type="text"
                                placeholder="Country"
                                value={country}
                                name="country"
                                onChange={ev => setCountry(ev.target.value)} />
                            <PaymentButton block
                                onClick={goToPayment}>
                                Continue to Payment
                            </PaymentButton>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center>
            <Footer />
        </>
    );
}