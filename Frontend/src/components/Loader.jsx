import React from 'react';
import '../styles/loader.scss';

const Loader = ({ message = "Loading...", fullScreen = false }) => {
    return (
        <div className={`loader-container ${fullScreen ? 'loader--fullscreen' : ''}`}>
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
            {message && <p className="loader-text">{message}</p>}
        </div>
    );
};

export default Loader;
