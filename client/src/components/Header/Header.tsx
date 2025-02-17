import React from 'react';

import './Header.scss';
import styled from 'styled-components';

import Nav from '@/components/ui/Nav';

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #333;
    color: white;
`;
const HeaderLogo = styled.div`
    h1 {
        margin: 0;
    }
`;

const Header: React.FC = () => {
    const navList = [
        { key: 'default', href: '/', label: 'Home' },
        { key: 'login', href: '/login', label: 'Login' },
        { key: 'logout', href: '/logout', label: 'Logout' },
    ];

    return (
        <HeaderContainer>
            <HeaderLogo>
                <h1>My App</h1>
            </HeaderLogo>
            <Nav items={navList} />
        </HeaderContainer>
    );
};

export default Header;
