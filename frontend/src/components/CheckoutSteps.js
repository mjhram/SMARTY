import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Trans } from 'react-i18next'

export default function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}><Trans>Sign-In</Trans></Col>
      <Col className={props.step2 ? 'active' : ''}><Trans>Shipping</Trans></Col>
      <Col className={props.step3 ? 'active' : ''}><Trans>Payment</Trans></Col>
      <Col className={props.step4 ? 'active' : ''}><Trans>Place Order</Trans></Col>
    </Row>
  );
}
