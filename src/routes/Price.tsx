import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinTickers, ITickers } from "../api";

const PriceWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding-bottom: 60px;
`;
const PriceItem = styled.div`
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgOpacity2};
  text-align: center;

  span {
    display: block;
    font-weight: 400;
  }
  span:first-child {
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  span:last-child {
    font-size: 20px;
    color: ${(props) => props.theme.accentColor1};
  }
`;

interface IPriceProps {
  coinId: string;
}

function Price({ coinId }: IPriceProps) {
  const { isLoading, data } = useQuery<ITickers>(["price", coinId], () =>
    fetchCoinTickers(coinId)
  );
  const USD = data?.quotes.USD;

  return (
    <PriceWrap>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <>
          <PriceItem>
            <span>from 15 minutes ago</span>
            <span>{USD?.percent_change_15m.toFixed(2)} %</span>
          </PriceItem>
          <PriceItem>
            <span>from 30 minutes ago</span>
            <span>{USD?.percent_change_30m.toFixed(2)} %</span>
          </PriceItem>
          <PriceItem>
            <span>from 1 hours ago</span>
            <span>{USD?.percent_change_1h.toFixed(2)} %</span>
          </PriceItem>
          <PriceItem>
            <span>from 6 hours ago</span>
            <span>{USD?.percent_change_6h.toFixed(2)} %</span>
          </PriceItem>
          <PriceItem>
            <span>from 12 hours ago</span>
            <span>{USD?.percent_change_12h.toFixed(2)} %</span>
          </PriceItem>
          <PriceItem>
            <span>from 7 days ago</span>
            <span>{USD?.percent_change_7d.toFixed(2)} %</span>
          </PriceItem>
          <PriceItem>
            <span>from 30 days ago</span>
            <span>{USD?.percent_change_30d.toFixed(2)} %</span>
          </PriceItem>
          <PriceItem>
            <span>from 1 year ago</span>
            <span>{USD?.percent_change_1y.toFixed(2)} %</span>
          </PriceItem>
        </>
      )}
    </PriceWrap>
  );
}

export default Price;
