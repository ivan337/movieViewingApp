import { styled } from 'styled-components';

const StyledSpinner = styled.div`
    &:not([hidden]) {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &::after {
        content: '';
        width: 50px;
        height: 50px;
        border: 2px solid #f3f3f3;
        border-top: 3px solid #f25a41;
        border-radius: 100%;
        will-change: transform;
        animation: spin 1s infinite linear;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

const LoadingSpinner = ({ hidden }: { hidden?: boolean }) => {
    return <StyledSpinner hidden={hidden}>Loading...</StyledSpinner>;
};

export default LoadingSpinner;
