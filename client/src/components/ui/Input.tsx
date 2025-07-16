import React, { ChangeEvent } from 'react';

import styled from 'styled-components';

const InputGroup = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    margin: 4px;
`;

const StyledInput = styled.input`
    flex: 1;
    padding-left: 8px;
    padding-right: 30px;
    height: 36px;

    outline: none;
`;

const InputIcon = styled.span`
    position: absolute;
    right: 14px;
    font-size: 14px;
    color: black;
`;

interface InputProps {
    type?: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode;
    className?: string;
}

const Input: React.FC<InputProps> = ({
    type = 'text',
    placeholder,
    required = false,
    onChange,
    icon,
    className,
}) => {
    return (
        <InputGroup>
            <StyledInput
                className={className}
                type={type}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
            />
            {icon && <InputIcon>{icon}</InputIcon>}
        </InputGroup>
    );
};

export default Input;
