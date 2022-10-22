import React from "react";

const Home = () => {
  const [dados, setDados] = React.useState(null);

  React.useEffect(() => {
    async function apiProdutos(url) {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setDados(json);
      } catch (error) {}
    }
    apiProdutos();
  }, []);

  return <div>Home</div>;
};

export default Home;
