import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';
import { useTranslation, Trans } from 'react-i18next';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { t } = useTranslation();

  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    //paymentMethod || 
    'Cash'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>{t("Payment Method")}</title>
        </Helmet>
        <h1 className="my-3"><Trans>Payment Method</Trans></h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            {document.body.dir=='rtl'?
            <Form.Check 
              reverse
              type="radio"
              id="cash"
              label={t("Cash")}
              value="Cash"
              checked={paymentMethodName === 'Cash'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />:
            <Form.Check 
              type="radio"
              id="cash"
              label={t("Cash")}
              value="Cash"
              checked={paymentMethodName === 'Cash'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            }
          </div>
          
          <div className="mb-3">
            <Button type="submit"><Trans>Continue</Trans></Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
