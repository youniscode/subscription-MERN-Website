import styled from "styled-components";
import { Container, Modal } from "react-bootstrap";
import ModalComponent from "../Modal/Modal";

const HeroComponent = styled.header`
  padding: 5rem 0;
  height: 60vh;
  background-image: url("https://images.unsplash.com/photo-1522211988038-6fcbb8c12c7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80");
  background-size: cover;
  background-position: center;
`;

const HeaderContainer = styled.div`
  background-color: rgb(106, 179, 168);
  padding: 3rem;
  color: white;
  width: 32.5rem;
`;

const Heading = styled.h1`
font:size: 5rem;
`;

const SubHeading = styled.h3`
margin: 1rem 0;
font-weight: 400:
`;

const Hero = () => {
  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading>Brain Food</Heading>
          <SubHeading>
            Grow, Learn, and become more successful by reading some of the top
            articles by highly reputable individuals
          </SubHeading>
          <ModalComponent text="Signup" variant="primary" />
          <ModalComponent text="Login" variant="danger" />
        </HeaderContainer>
      </Container>
    </HeroComponent>
  );
};
export default Hero;
