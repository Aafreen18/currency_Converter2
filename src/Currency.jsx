import { RiExchangeDollarFill } from "react-icons/ri";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import GetApi from './api/GetApi';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

const { CurrencyOptions, ExchangeAmount } = GetApi;

const Currency = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  const {
    data: currencyRates,
    isLoading: isCurrencyLoading,
    isError: isCurrencyError,
  } = useQuery({
    queryKey: ['currencyOptions'],
    queryFn: CurrencyOptions,
  });

  const {
    data: exchangedAmount,
    isLoading: isExchangeLoading,
    isError: isExchangeError,
    refetch,
    isFetched
  } = useQuery({
    queryKey: ['exchangeAmount', fromCurrency, toCurrency, amount],
    queryFn: () => ExchangeAmount(fromCurrency, toCurrency, amount),
    enabled: false,
  });

  const handleCurrencyConverter = () => {
    if (amount > 0) {
      refetch();
    }
  };

  const currencyOptions = currencyRates 
  ? Object.keys(currencyRates).map(currencyCode => ({
      value: currencyCode,
      label: currencyCode
    }))
  : [];

 
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      border: '1px solid #ced4da',
      borderRadius: '0.375rem',
      color: 'white',
      minHeight: '38px',
      boxShadow: state.isFocused ? '0 0 0 1px white' : provided.boxShadow,
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: '200px',
      overflowY: 'auto',
    }),
    option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? 'white' 
      : state.isFocused 
      ? 'rgba(128, 128, 128, 0.6)' 
      : 'black',
    color: state.isSelected 
      ? 'black':'white' ,
    ':active': {
      backgroundColor: 'rgba(128, 128, 128, 0.7)',
    },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
    input: (provided) => ({
      ...provided,
      color: 'white',
    }),
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/hbg.svg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h1
          className="text-center fw-bold text-[3rem] pt-8"
          style={{
            background: "linear-gradient(to right, #8b5cf6, #ec4899, #ef4444)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginTop:"50px"
          }}
        >
          Currency
          <span className="block sm:inline"> Converter</span>
        </h1>


      <Container className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Card
          style={{
            width: "500px",
            height: "600px",
            backgroundImage: "url('/dbg2.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "white",
            padding: "1.5rem",
            borderRadius: "2rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            backdropFilter: "blur(8px)",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Card.Body className="d-flex flex-column justify-content-center gap-4">

            <div className="bg-glass p-3 rounded">
              <Form.Group as={Row} controlId="amountInput" className="align-items-center">
                <Form.Label column sm="3" className="fw-bold text-white">Amount :</Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="custom-input"
                  />
                </Col>
              </Form.Group>
            </div>

            <div className="bg-glass p-3 rounded">
              <Form.Group as={Row} controlId="fromCurrency" className="align-items-center">
                <Form.Label column sm="3" className="fw-bold text-white">From :</Form.Label>
                <Col sm="9">
                  <Select
                    options={currencyOptions}
                    value={{ value: fromCurrency, label: fromCurrency }}
                    onChange={(selectedOption) => setFromCurrency(selectedOption.value)}
                    isLoading={isCurrencyLoading}
                    isDisabled={isCurrencyError}
                    placeholder="Select currency"
                    styles={customStyles}
                    menuPlacement="bottom"
                  />
                </Col>
              </Form.Group>
            </div>

            <div className="bg-glass p-3 rounded">
              <Form.Group as={Row} controlId="toCurrency" className="align-items-center">
                <Form.Label column sm="3" className="fw-bold text-white">To :</Form.Label>
                <Col sm="9">
                  <Select
                    options={currencyOptions}
                    value={{ value: toCurrency, label: toCurrency }}
                    onChange={(selectedOption) => setToCurrency(selectedOption.value)}
                    isLoading={isCurrencyLoading}
                    isDisabled={isCurrencyError}
                    placeholder="Select currency"
                    styles={customStyles}
                    menuPlacement="bottom"
                  />
                </Col>
              </Form.Group>
            </div>

            <div className="text-center">
              <Button
                variant="dark"
                onClick={handleCurrencyConverter}
                style={{
                  backgroundColor: "rgba(0,0,0,0.6)",
                  borderRadius: "50%",
                  padding: "0.75rem",
                  border: "none"
                }}
              >
                <RiExchangeDollarFill size={36} color="white" />
              </Button>
            </div>

            {isFetched && !isExchangeLoading && !isExchangeError && (
              <Alert className="text-center fw-bold fs-5 mt-3" style={{ backgroundColor: "rgba(0,0,0,0.6)", color: 'white', borderRadius: '12px', borderBlockStyle: 'none' }}>
                {amount} {fromCurrency} = {exchangedAmount.toFixed(2)} {toCurrency}
              </Alert>
            )}

          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Currency;