// OrderInfoComponent.js
import React from "react";
import styled from "styled-components";
import { Fade, Slide } from "react-awesome-reveal";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.div`
  width: 100%;
  margin: 20px 0;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
`;

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  margin: 20px;
`;

const OrderInfoComponent = () => {
  return (
    <Container>
      <Fade direction="up">
        <Section>
          <Image
            src="https://images.pexels.com/photos/5849559/pexels-photo-5849559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Order Instructions"
          />
          <Content>
            <Title>Order Instructions</Title>
            <Text>
              Please review the order details above. If everything looks
              correct, you can proceed with payment and submission. If there are
              any changes required, please go back to the previous step to edit
              the information.
            </Text>
          </Content>
        </Section>
      </Fade>
      <Slide direction="left"></Slide>
      <Fade direction="right">
        <Section>
          <Image
            src="https://images.pexels.com/photos/45111/pexels-photo-45111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Payment Details"
          />
          <Content>
            <Title>Payment Details</Title>
            <Text>
              Please review the above payment details carefully. Once you have
              confirmed that all information is correct, click on the "Pay"
              button to proceed with payment. If any changes are needed, please
              go back to the previous step to edit the information.
            </Text>
          </Content>
        </Section>
      </Fade>
    </Container>
  );
};

export default OrderInfoComponent;
