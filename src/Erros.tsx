import React, { Component } from "react";

interface ErrosProps {
  children: React.ReactNode[];
}

interface ErrosState {
  temErro: boolean;
  erro: Error | null;
  info: object;
}

class Erros extends Component<ErrosProps, ErrosState> {

  constructor(props: ErrosProps) {
    super(props);
    this.state = {
      temErro: false,
      erro: new Error(),
      info: { componentStack: "" }
    }
  }

  static getDerivedStateFromError = (erro: Error) => {
    return { temErro: true }
  };

  componentDidCatch(erro: Error | null, info: object) {
    //console.log("erro", erro);
    this.setState({ temErro: true, erro, info })
  }

  render() {
    if (this.state.temErro) {
      return (
        <div className="p-4 text-danger text-center">
          <h3>
            Ocorreu um erro. Por favor tente novamente.
          </h3>
        </div>
      );
    }

    return this.props.children;
  }

};

export default Erros;