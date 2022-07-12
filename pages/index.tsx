import { useEffect, useState } from "react";
import Head from "next/head";
import TableRow from "../components/TableRow";
import {
  Heading,
  Flex,
  Stack,
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@chakra-ui/core";
export default function Home() {
  const initialFormData = Object.freeze({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    cardType: "",
    cardNumber: null,
  });

  const [data, setData] = useState([]);
  const [formData, updateFormData] = useState({});
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: formData }),
  };
  async function getData() {
    const res = await fetch("/api/getCustomers", { cache: "no-store" });
    const newData = await res.json();
    setData(newData);
  }

  async function addCustomer() {
    await fetch("/api/newCustomer", requestOptions)
      .then(() => getData())
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomer();
  };
  return (
    <main>
      <Head>
        <title>Next.js and FaunaDB</title>
      </Head>
      <Heading as="h1" my={2} textAlign="center">
      Next.js and FaunaDB
      </Heading>
      <Heading as="h2" my={2} textAlign="center">
        Customer Data
      </Heading>
      <Flex mt={12} align="center" justify="center">
        <Stack>
          <Heading mb={6} as="h4">
            Name:
          </Heading>
          <Heading mt={6} as="h4">
            Phone:
          </Heading>
          <Heading my={4} as="h4">
            Credit Card:
          </Heading>
        </Stack>
        {data.length > 0 ? (
          data.map((d) => (
            <TableRow
              key={d.data.telephone}
              creditCard={d.data.creditCard.number}
              firstName={d.data.firstName}
              lastName={d.data.lastName}
              telephone={d.data.telephone}
            />
          ))
        ) : (
          <>
            <TableRow loading />
            <TableRow loading />
            <TableRow loading />
          </>
        )}
      </Flex>
      <Heading as="h4" mt={6} textAlign="center">
        Add a new customer
      </Heading>
      <Flex mt={12} align="center" justify="center">
        <form onSubmit={handleSubmit} method="post">
          <FormControl onChange={handleChange}>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              onChange={handleChange}
              aria-describedby="first-name-helper-text"
            />
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              aria-describedby="last-name-helper-text"
            />
            <FormLabel htmlFor="streetAddress">Street Address</FormLabel>
            <Input
              type="text"
              id="streetAddress"
              name="streetAddress"
              onChange={handleChange}
              aria-describedby="street-address-helper-text"
            />
            <Stack isInline mt={2}>
              <FormLabel mt={2} htmlFor="city">
                City
              </FormLabel>
              <Input
                type="text"
                id="city"
                name="city"
                onChange={handleChange}
                aria-describedby="city-helper-text"
              />
              <FormLabel mt={2} htmlFor="state">
                State
              </FormLabel>
              <Input
                type="text"
                id="state"
                name="state"
                onChange={handleChange}
                aria-describedby="state-helper-text"
              />
              <FormLabel htmlFor="zipcode">Zip Code</FormLabel>
              <Input
                type="text"
                name="zipcode"
                id="zipcode"
                onChange={handleChange}
                aria-describedby="zipcode-helper-text"
              />
            </Stack>
            <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
            <Input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              onChange={handleChange}
              aria-describedby="phoneNumber-helper-text"
            />
            <RadioGroup name="cardType" my={4} spacing={8} isInline>
              <Radio
                onChange={handleChange}
                name="Visa"
                value="Visa"
                label="Visa"
              >
                Visa
              </Radio>
              <Radio
                onChange={handleChange}
                name="MasterCard"
                label="MasterCard"
                value="MasterCard"
              >
                MasterCard
              </Radio>
              <Radio
                onChange={handleChange}
                name="Amex"
                value="Amex"
                label="Amex"
              >
                American Express
              </Radio>
            </RadioGroup>
            <FormLabel htmlFor="cardNumber">Card Number</FormLabel>
            <Input
              type="number"
              name="cardNumber"
              id="cardNumber"
              onChange={handleChange}
              aria-describedby="cardNumber-helper-text"
            />
            <Button
              type="submit"
              my={8}
              ml="20%"
              width="50%"
              size="md"
              height="48px"
              border="2px"
              borderColor="green.500"
            >
              Add Customer
            </Button>
          </FormControl>
        </form>
      </Flex>
    </main>
  );
}
