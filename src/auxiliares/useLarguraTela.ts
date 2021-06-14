import { useEffect, useState } from "react"

export interface LarguraTela {
  largura: number;
}

export const useLarguraTela = (): LarguraTela => {
  const [largura, setLargura] = useState<LarguraTela>({
    largura: 0
  });

  const handleResize = () => {
    setLargura({largura: window.innerWidth})
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return() => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return largura;
}

