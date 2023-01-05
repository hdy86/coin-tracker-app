import styled from "styled-components";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);
  const { state } = useLocation<IRouteState>();

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;
