import Image from 'next/image';
import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import {useContext, useEffect, useState} from 'react';
import {CartContext} from './CartContext';
import {useLang} from './LangContext';
import {darken} from 'polished';
import {primary} from '@/lib/colors';
import Button from './Button';

const StyledHeader = styled.header`
    background-color: #FFF;
`;

const Logo = styled(Link)`
    text-decoration: none;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
`

const StyledNav = styled.nav`
    display: flex;
    align-items: center;
    gap: 40px;
    font-size: 18px;
    font-weight: bold;
    @media screen and (min-width: 768px) {
        display: flex;
        position: static;
        padding: 0;
    }
`

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const NavLink = styled.a`
    display: block;
    color:#0072CE;
    text-decoration: none;
    padding: 10px 0;
        &:hover {
        color: ${darken(0.1, primary)};
    }
    @media screen and (min-width: 768px) {
        padding:0;
    }
`

const NavButton = styled.button`
    background-color: transparent;
    width: 30px;
    height: 30px;
    border:0;
    color: white;
    cursor: pointer;
    position: relative;
    z-index: 3;
    @media screen and (min-width: 768px) {
        display: none;
    }
`;

export default function Header() {
    const {cartProducts} = useContext(CartContext);
    const {lang, setLang, translations} = useLang();

    const toggleLang = () => {
        setLang(prevLang => prevLang === 'EN' ? 'FR' : 'EN');
    }

    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    return (
        <>
            {domLoaded && (
                <StyledHeader>
                    <Center>
                        <Wrapper>
                            <Logo href="/" aria-label="Home">
                                <Image
                                    src="/techmart.svg"
                                    alt="TechMart Logo"
                                    width={160}
                                    height={30}
                                />
                            </Logo>
                            <StyledNav>
                                <StyledLink passHref href={'/'}>
                                    <NavLink aria-label={translations[lang].home}>{translations[lang].home}</NavLink>
                                </StyledLink>
                                <StyledLink passHref href={'/products'}>
                                    <NavLink aria-label={translations[lang].products}>{translations[lang].products}</NavLink>
                                </StyledLink>
                                <StyledLink passHref href={'/categories'}>
                                    <NavLink aria-label={translations[lang].categories}>{translations[lang].categories}</NavLink>
                                </StyledLink>
                                <StyledLink passHref href={'/faq'}>
                                    <NavLink aria-label={translations[lang].faq}>{translations[lang].faq}</NavLink>
                                </StyledLink>
                                <StyledLink passHref href={'/cart'}>
                                    <NavLink aria-label={`${translations[lang].cart} (${cartProducts.length})`}>{translations[lang].cart} ({cartProducts.length})</NavLink>
                                </StyledLink>
                                <Button onClick={toggleLang} aria-label="Toggle language">
                                    {lang === 'EN' ? 'FR' : 'EN'}
                                </Button>
                            </StyledNav>
                        </Wrapper>
                    </Center>
                </StyledHeader>
            )}
        </>
    );
}