const faunadb = require("faunadb");

// your secret hash
const secret = process.env.FAUNADB_SECRET_KEY;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

module.exports = async (req, res) => {
  const formData = req.body.data;
  console.log(formData);
  try {
    const dbs = await client.query(
      q.Create(
        // iterate each item in result
        q.Collection("customers"),
        {
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: {
              street: formData.streetAddress,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipcode,
            },
            telephone: formData.phoneNumber,
            creditCard: {
              network: formData.cardType,
              number: formData.cardNumber,
            },
          },
        }
      )
    );
    // ok
    res.status(200).json(dbs.data);
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
