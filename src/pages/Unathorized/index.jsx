import React from 'react';
import styles from './styles.css';

export default () => {
    return (
        <div className="unAuthorizedContent">
            <div className="fkingMiddle">
                <svg xmlns="http://www.w3.org/2000/svg" width="500px" height="500px" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000">
                    <g><g transform="matrix(1 0 0 -1 0 1952)"><path d="M500,1941.2c-270.6,0-490-219.4-490-490c0-270.6,219.4-488.4,490-488.4c270.6,0,490,217.8,490,488.4C990,1721.8,770.6,1941.2,500,1941.2z M90.6,1375.3c-5.5,26.9-8.4,95.9-8.4,95.9s5.6,58.3,16.2,94.9c38-2.2,748.7-0.8,799.6-0.8c10.4-36.4,16-95.7,16-95.7s-2.7-67.3-7.9-93.5C816.5,1376.2,179.4,1375.3,90.6,1375.3L90.6,1375.3z" /></g></g>
                </svg>
            </div>
            <div className="fkingMiddle">
                <p className="unauthText">ACCESS DENIED, GO AWAY</p>
            </div>
        </div >
    )
}