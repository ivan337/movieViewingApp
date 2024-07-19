import { InputHTMLAttributes } from 'react';

import classes from './News.module.scss';

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
        <div className={`${classes.news} ${props.className}`}>
            <ul>{listItems}</ul>
        </div>
    );
};

export default News;
