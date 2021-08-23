import React from "react";

import "./Login.css"

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
            password: "",
        }

        this.submitHandle = this.submitHandle.bind(this);
    }

    submitHandle(event) {
        event.preventDefault();

        this.props.setUser(this.state.user)
    }

    render() {
        return (
            <div className="login">
                <form onSubmit={this.submitHandle}>
                    <h2>Login</h2>

                    <div className="form-group">
                        <label>Usuário</label>
                        <input required type="user" className="form-control" placeholder="Digite o usuário" onChange={e => this.setState({ user: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label>Senha</label>
                        <input required type="password" className="form-control" placeholder="Digite a senha" onChange={e => this.setState({ password: e.target.value })} />
                    </div>

                    <div className="form-group" >
                        <button type="submit" className="button">Entrar</button>
                    </div>
                </form>
            </div>
        );
    }

}

export default Login;