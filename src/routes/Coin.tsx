import styled from "styled-components";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";
import { fetchCoinInfo, fetchCoinTickers, IInfo, ITickers } from "../api";

const HomeBtn = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 4px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    cursor: pointer;

    img {
      width: 100%;
    }
  }
`;

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
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgOpacity2};
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;

  span {
    font-size: 20px;
  }
  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  font-size: 16px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 50px 0px 25px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  font-size: 22px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor2 : props.theme.textColor};
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  padding: 10px 0px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgOpacity1};

  a {
    display: block;
  }
`;
const Loader = styled.div`
  text-align: center;
`;

interface IRouteParams {
  coinId: string;
}
interface IRouteState {
  name: string;
}

function Coin() {
  const { coinId } = useParams<IRouteParams>();
  const { state } = useLocation<IRouteState>();
  const chartMatch = useRouteMatch("/:coinId/chart");
  const priceMatch = useRouteMatch("/:coinId/price");

  /* const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<IInfo>();
  const [priceInfo, setPriceInfo] = useState<IPriceInfo>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]); */

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfo>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<ITickers>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const loading = infoLoading || tickersLoading;

  return (
    <>
      <HomeBtn>
        <Link to="/">
          <img src="https://cdn-icons-png.flaticon.com/512/6586/6586715.png" />
        </Link>
      </HomeBtn>
      <Container>
        <Helmet>
          <title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </title>
        </Helmet>
        <Header>
          <Title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </Title>
        </Header>
        {loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>${infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price:</span>
                <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
              </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply:</span>
                <span>{tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{tickersData?.max_supply}</span>
              </OverviewItem>
            </Overview>
            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
            </Tabs>
            <Switch>
              <Route path={`/:coinId/chart`}>
                <Chart coinId={coinId} />
              </Route>
              <Route path={`/:coinId/price`}>
                <Price coinId={coinId} />
              </Route>
            </Switch>
          </>
        )}
      </Container>
    </>
  );
}

export default Coin;
