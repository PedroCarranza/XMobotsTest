import React from "react";

import "./Nav.css"

class Nav extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li style={{ float: "right" }}><a href="/register">Criar Conta</a></li>
                    <li style={{ float: "right" }}><a href="/login">Login</a></li>
                </ul>
            </nav>
        );
    }

}

export default Nav;