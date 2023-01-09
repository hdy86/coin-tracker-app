import styled from "styled-components";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchCoins, ICoin } from "../api";
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
  color: ${(props) => props.theme.accentColor1};
  font-weight: bold;

  @media all and (max-width: 767px) {
    font-size: 30px;
  }
`;
const Text = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;
const CoinsList = styled.ul`
  padding-bottom: 60px;
`;
const Coin = styled.li`
  margin-bottom: 10px;
  border-radius: 15px;
  background-color: white;

  a {
    display: flex;
    align-items: center;
    padding: 20px;
    color: #666;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor2};
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
    <>
      <Container>
        <Helmet>
          <title>COINS TRACKER</title>
        </Helmet>
        <Header>
          <Title>COINS TRACKER</Title>
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
                  <Text>
                    <span>{coin.name}</span>
                    <span>&rarr;</span>
                  </Text>
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </>
  );
}

export default Coins;
