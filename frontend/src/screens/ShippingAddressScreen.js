import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';
import { useTranslation, Trans } from 'react-i18next';

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const cities = ["Baghdad"];

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    fullBox,
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || '');
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
        location: shippingAddress.location,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
        location: shippingAddress.location,
      })
    );
    navigate('/payment');
  };

  useEffect(() => {
    ctxDispatch({ type: 'SET_FULLBOX_OFF' });
  }, [ctxDispatch, fullBox]);

  return (
    <div>
      <Helmet>
        <title>{t("Shipping Address")}</title>
      </Helmet>

      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3"><Trans>Delivery Address</Trans></h1>
        <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="fullName">
            <Form.Label><Trans>Full Name</Trans></Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label><Trans>Address</Trans></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label><Trans>City</Trans></Form.Label>
            
            <Form.Select id="dropdown-basic-button" title="Choose City" 
               style={
                document.body.dir=='rtl'? 
                {backgroundPosition: 'left 1rem center'
                }:
                {
                }
              }
              value={city} onChange={(e: any) => setCity(e.currentTarget.value)}>
              {cities.map(acity => {
                return <option href="#">{acity}</option>
              })}
            </Form.Select>
          </Form.Group>
          <div className="mb-3">
            <Button
              id="chooseOnMap"
              type="button"
              variant="light"
              onClick={() => navigate('/map')}
            >
              <Trans>Choose Location On Map</Trans>
            </Button>
            {shippingAddress.location && shippingAddress.location.lat ? (
              <div>
                LAT: {shippingAddress.location.lat}
                LNG:{shippingAddress.location.lng}
              </div>
            ) : (
              <div><Trans>No location</Trans></div>
            )}
          </div>

          <div className="mb-3">
            <Button variant="primary" type="submit">
              <Trans>Continue</Trans>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
