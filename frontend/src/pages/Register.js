import React from "react";

import "./Register.css"

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "",
            email: "",
            password: "",
            confirmPassword: "",
        }

        this.submitHandle = this.submitHandle.bind(this);
    }

    submitHandle(event) {
        event.preventDefault();

        //this.props.setUser(this.state.user)

        window.location.replace("/")
    }

    render() {
        return (
            <div className="register">
                <form onSubmit={this.submitHandle}>
                    <h2>Registro de Usuário</h2>

                    <div className="form-group">
                        <label>Nome</label>
                        <input required type="user" className="form-control" placeholder="Digite o usuário" onChange={e => this.setState({ user: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label>E-mail</label>
                        <input required type="email" className="form-control" placeholder="Digite o usuário" onChange={e => this.setState({ email: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label>Senha</label>
                        <input required type="password" className="form-control" placeholder="Digite a senha" onChange={e => this.setState({ password: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label>Confirmação da senha</label>
                        <input required type="password" className="form-control" placeholder="Digite a senha novamente" onChange={e => this.setState({ confirmPassword: e.target.value })} />
                    </div>

                    <div className="form-group" >
                        <button disabled={!(this.state.password === this.state.confirmPassword && this.state.password !== "" && this.state.user !== "" && this.state.email !== "")} type="submit" className="button">Entrar</button>
                    </div>
                </form>
            </div>
        );
    }

}

export default Register;