// AUTH SERVER
import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const users = [
  {
    id: 1,
    username: "lyduc",
    password: "123456",
    displayName: "Duc Tran",
    age: 20,
  },
];

app.post("/login", (req, res) => {
  const body = req.body;
  // Authentication
  const foundUser = users.find(
    (user) => user.name === body.name && user.password === body.password
  );

  if (!foundUser)
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ status: ReasonPhrases.UNAUTHORIZED });

  // Authorization
  const accessToken = jwt.sign(
    { username: body.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10s",
    }
  );

  // Create Refresh Token
  const refreshToken = jwt.sign(
    { username: body.username },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "20s",
    }
  );

  res.status(StatusCodes.OK).json({
    accessToken,
    refreshToken,
    displayName: foundUser.displayName || `@${body.username}`,
  });
});

app.post("/refreshToken", (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.sendStatus(StatusCodes.FORBIDDEN);
    }

    const accessToken = jwt.sign(
      { username: data.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10s",
      }
    );
    res.status(StatusCodes.OK).json({ accessToken });
  });
});

const PORT = 5500;

app.listen(PORT, () => {
  console.log(`Auth Server is running on PORT ${PORT}`);
});
