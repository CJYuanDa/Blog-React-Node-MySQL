import React from 'react';
import Logo from '../img/footer-logo.png'

function Footer() {
    return(
        <footer>
            <img src={Logo} alt="" />
            <span>
                Made by <b>React.js</b>, <b>Node.js</b> and <b>MySQL</b>.
            </span>
        </footer>
    );
}

export default Footer;