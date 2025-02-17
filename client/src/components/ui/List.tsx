import * as React from 'react';

import { styled } from 'styled-components';

interface StyledUlProps {
    horizontal?: boolean;
}

const StyledUl = styled.ul<StyledUlProps>`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
`;

const StyledLi = styled.li`
    background-color: rgba(249, 249, 249, 0.16);
    padding: 12px 16px;
    font-size: 14px;
    color: #333;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #eaeaea;
    }
`;

interface ListProps {
    items: React.ReactNode[];
    horizontal?: boolean;
    spacing?: string;
}

const List = ({ items, horizontal }: ListProps) => {
    return (
        <StyledUl horizontal={horizontal}>
            {items.map((item, index) => (
                <StyledLi key={index}>{item}</StyledLi>
            ))}
        </StyledUl>
    );
};

export default List;
