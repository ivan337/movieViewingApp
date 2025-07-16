import React, { ChangeEvent } from 'react';

import styled from 'styled-components';

const InputGroup = styled.div`
    display: flex;
    margin: 4px;
`;

const StyledInput = styled.input`
    cursor: pointer;
`;

const StyledLabel = styled.label``;

interface InputProps {
    label?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Checkbox: React.FC<InputProps> = ({ label, onChange, className }) => {
    return (
        <InputGroup>
            <StyledInput
                className={className}
                type={'checkbox'}
                onChange={onChange}
            />
            <StyledLabel htmlFor="signinInputCheckbox">{label}</StyledLabel>
        </InputGroup>
    );
};

export default Checkbox;
