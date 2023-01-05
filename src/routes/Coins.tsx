import styled from "styled-components";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px;
`;
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const CoinsList = styled.ul`
  padding-bottom: 60px;
`;
const Coin = styled.li`
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  background-color: white;

  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;
const Loader = styled.div`
  text-align: center;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  /* const [coins, setCoins] = useState<ICoin[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []); */

  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: {
                    name: coin.name,
                  },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
