import { InputHTMLAttributes } from 'react';

import { styled } from 'styled-components';

const NewsContainer = styled.div`
    height: 380px;
    width: 500px;
    min-height: 400px;
    min-width: 700px;
    border-radius: 10px;
    margin-left: 20px;
    color: #fff;
    backdrop-filter: blur(14px);
    box-shadow: 0 1px 4px 0 rgba(255, 255, 255, 0.4);
`;

const News = (props: InputHTMLAttributes<HTMLDivElement>) => {
    const news = [
        { id: 0, text: '125125', date: '29.02.2024' },
        { id: 1, text: 'awd', date: '29.02.2024' },
    ];

    const listItems = news.map((item) => (
        <div key={item.id.toString()}>
            <div>{item.date}</div>
            <div>{item.text}</div>
        </div>
    ));

    return (
        <NewsContainer {...props} className={props.className}>
            {listItems}
        </NewsContainer>
    );
};

export default News;
