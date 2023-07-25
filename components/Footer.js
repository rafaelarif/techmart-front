import React from 'react';
import {AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiOutlineTwitter} from 'react-icons/ai';
import styled from 'styled-components';
import {useLang} from './LangContext';
import {lighten} from 'polished';
import {black} from '@/lib/colors';

const StyledFooter = styled.footer`
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-weight: 700;

    .icons{
        font-size: 30px;
        display: flex;
        gap: 10px;
    }
`;

const NavLink = styled.a`
    display: block;
    color:black;
    text-decoration: none;
    padding: 10px 0;
        &:hover {
        color: ${lighten(0.2, black)};
    }
    @media screen and (min-width: 768px) {
        padding:0;
    }
`

const Footer = () => {
    const {lang, translations} = useLang();

    return (
        <StyledFooter>
            <p dangerouslySetInnerHTML={{__html: translations[lang].copyright}} />
            <div className="icons" aria-label="Social Media Links">
                <NavLink href="https://www.facebook.com" aria-label="Link to Facebook"><AiFillFacebook /></NavLink>
                <NavLink href="https://twitter.com" aria-label="Link to Twitter"><AiOutlineTwitter /></NavLink>
                <NavLink href="https://www.instagram.com" aria-label="Link to Instagram"><AiFillInstagram /></NavLink>
                <NavLink href="https://www.linkedin.com" aria-label="Link to LinkedIn"><AiFillLinkedin /></NavLink>
            </div>
        </StyledFooter>
    )
}

export default Footer;