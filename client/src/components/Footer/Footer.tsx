import React from 'react';

import './Footer.scss';
import { styled } from 'styled-components';

const FooterContainer = styled.footer`
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
`;

const FooterContent = styled.p`
    margin: 0;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterContent>
                &copy; {new Date().getFullYear()} My App. All rights reserved.
            </FooterContent>
        </FooterContainer>
    );
};

export default Footer;
