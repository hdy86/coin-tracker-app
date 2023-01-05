import styled from "styled-components";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

const ChartWrap = styled.div`
  padding-bottom: 60px;
`;
const ChartBox = styled.div`
  & + & {
    margin-top: 20px;
  }
`;

interface IChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: IChartProps) {
  const params = useParams();
  const { isLoading, data } = useQuery<IHistorical[]>(["chart", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const ohlcData = data?.map((price) => ({
    x: new Date(price.time_close * 1000).toUTCString(),
    y: [
      Number(price.open),
      Number(price.high),
      Number(price.low),
      Number(price.close),
    ],
  }));

  return (
    <ChartWrap>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <ChartBox>
            <ApexChart
              type="line"
              series={[
                {
                  name: "Price",
                  data: data?.map((price) => Number(price.close)) as number[],
                },
              ]}
              options={{
                theme: { mode: "dark" },
                chart: {
                  width: 500,
                  height: 500,
                  toolbar: { show: false },
                  background: "transparent",
                },
                xaxis: {
                  type: "datetime",
                  categories: data?.map((price) =>
                    new Date(price.time_close * 1000).toUTCString()
                  ),
                  axisBorder: { show: false },
                  axisTicks: { show: false },
                  labels: { show: false },
                },
                yaxis: { show: false },
                grid: { show: false },
                stroke: {
                  curve: "smooth",
                  width: 4,
                },
                fill: {
                  type: "gradient",
                  gradient: {
                    gradientToColors: ["#7efff5"],
                    stops: [0, 100],
                  },
                },
                colors: ["#17c0eb"],
                tooltip: {
                  y: {
                    formatter: (value) => `$ ${value.toFixed(2)}`,
                  },
                },
              }}
            />
          </ChartBox>
          <ChartBox>
            <ApexChart
              type="candlestick"
              series={
                [{ name: "OhlcPrice", data: ohlcData }] as unknown as number[]
              }
              options={{
                theme: { mode: "dark" },
                chart: {
                  type: "candlestick",
                  height: 500,
                  width: 500,
                  toolbar: { show: false },
                  background: "transparent",
                },
                xaxis: {
                  type: "datetime",
                  categories: data?.map((price) =>
                    new Date(price.time_close * 1000).toISOString()
                  ),
                  axisBorder: { show: false },
                  axisTicks: { show: false },
                  labels: { show: false },
                },
                yaxis: { show: false },
                grid: { show: false },
                stroke: {
                  curve: "smooth",
                  width: 2,
                },
                plotOptions: {
                  candlestick: {
                    colors: {
                      upward: "#7efff5",
                      downward: "#17c0eb",
                    },
                  },
                },
              }}
            />
          </ChartBox>
        </>
      )}
    </ChartWrap>
  );
}

export default Chart;
