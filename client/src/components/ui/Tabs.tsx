import { useState } from 'react';

import { DefaultTheme, styled } from 'styled-components';

const TabsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const TabList = styled.div`
    display: flex;
    border-bottom: 2px solid #ffffff;
`;

const TabButton = styled.button<DefaultTheme & { isactive: 1 | 0 }>`
    padding: 12px 24px;
    font-size: 14px;
    color: ${({ isactive }) => (isactive === 1 ? '#ed8f17fa' : '#ffffff')};
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;

    & + & {
        margin-left: 8px;
    }
`;

const TabContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 4px 10% 4px 10%;
`;

const Tab = ({
    id,
    label,
    activeTab,
    setActiveTab,
}: {
    id: string;
    label: string;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const isActive = id === activeTab ? 1 : 0;
    return (
        <TabButton isactive={isActive} onClick={() => setActiveTab(id)}>
            {label}
        </TabButton>
    );
};

const Tabs = ({
    tabs,
    initialTab,
}: {
    tabs: Array<{ id: string; label: string; content: React.ReactNode }>;
    initialTab: string;
}) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    return (
        <TabsContainer>
            <TabList>
                {tabs.map((tab) => (
                    <Tab
                        key={tab.id}
                        id={tab.id}
                        label={tab.label}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                ))}
            </TabList>

            <TabContent>
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </TabContent>
        </TabsContainer>
    );
};

export default Tabs;
