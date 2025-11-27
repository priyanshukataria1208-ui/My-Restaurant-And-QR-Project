const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

// *** DB CONNECT CALL KARNA ZARURI HAI ***
const dbconnect = require("./config/database");
dbconnect();  //  <-- WITHOUT THIS DB NEVER CONNECTS

const Frontendroute = require("./Router/Frontendroute");
app.use("/api/v1", Frontendroute);

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Hello Welcome to my server");
});
