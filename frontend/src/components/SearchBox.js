import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };
  const { t,i18n } = useTranslation()
  console.log("SearchBox render")
  
  return (
    <Form className="d-flex mx-auto" onSubmit={submitHandler}>
      <InputGroup> 
        <FormControl
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search products...")}
          aria-label="Search Products"
          aria-describedby="button-search"
          style={
            document.body.dir=='rtl'? 
            {borderTopRightRadius: '.375rem',
            borderTopLeftRadius: '0',
            borderBottomRightRadius: '.375rem',
            borderBottomLeftRadius: '0'
            }:
            {borderTopRightRadius: '0',
            borderTopLeftRadius: '.375rem',
            borderBottomRightRadius: '0',
            borderBottomLeftRadius: '.375rem'
            }
          }

        ></FormControl>
        <Button variant="outline-primary" type="submit" id="button-search"
        style={
          document.body.dir=='rtl'? 
          {borderTopRightRadius: '0',
          borderTopLeftRadius: '.375rem',
          borderBottomRightRadius: '0',
          borderBottomLeftRadius: '.375rem'
          }:
          {borderTopRightRadius: '.375rem',
          borderTopLeftRadius: '0',
          borderBottomRightRadius: '.375rem',
          borderBottomLeftRadius: '0'
          }
        }
        >
          <i className="fas fa-search"></i>
        </Button>
        </InputGroup> 
    </Form>
  );
}
