require("dotenv").config();
let { connectionToDb } = require("./connectionToDB");
const stripe = require("stripe")(process.env.StripeSecretKey);

let bodyParser = require("body-parser");
let express = require("express");
let app = express();
const cors = require("cors");
app.use(cors());

let port = process.env.PORT || 5000;
app.use(express.json());
app.use(bodyParser.raw({ type: "application/json" }));

app.use("/api/user", require("./routes/user.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
// app.use('/api/admin',require('./routes/admin.routes'))
// app.use('/api',(req,res)=>{
//    return  res.send("Hello world")
// })

var models = require("./models");
const sequelize = models.sequelize;

//Sync Database REMOVE FORCE TRUE to prevent overwrite of table
sequelize
  .sync({alter:true})
  .then(function () {
    console.log("Nice! Database synchronization successful");
  })
  .catch(function (err) {
    console.error("Database synchronization error:", err);
  });

// Middleware to handle raw body for Stripe
app.use("/api/webhook", bodyParser.raw({ type: "application/json" }));

app.post("/api/webhook", (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent was successful!`, paymentIntent);
      break;
    case "invoice.payment_succeeded":
      const invoice = event.data.object;
      console.log(`Invoice payment succeeded!`, invoice);
      break;
    // Add more cases as needed
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

app.listen(port, () => {
  console.log(`App is listening on Port ${port}`);
});
