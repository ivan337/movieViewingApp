import styled from 'styled-components';

const NavList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
`;

const NavListItem = styled.li`
    margin-left: 1rem;
`;

const NavListItemAnchor = styled.a`
    color: white;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Nav = ({
    items,
}: {
    items: { href: string; label: string; key: string }[];
}) => {
    return (
        <NavList>
            {items.map((item) => {
                return (
                    <NavListItem key={item.key}>
                        <NavListItemAnchor href={item.href}>
                            {item.label}
                        </NavListItemAnchor>
                    </NavListItem>
                );
            })}
        </NavList>
    );
};

export default Nav;
