import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(express.json());

const users = [
  {
    id: 1,
    username: "lyduc",
    password: "123456",
  },
];

let refreshTokenList = [];

app.post("/login", (req, res) => {
  const data = req.body;
  // Authentication
  const authenticated = users.some(
    (user) => user.name === data.name && user.password === data.password
  );
  if (!authenticated) res.sendStatus(401);

  // Authorization
  const accessToken = jwt.sign(
    { username: data.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "20s",
    }
  );

  // Create Refresh Token
  const refreshToken = jwt.sign(
    { username: data.username },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "60s",
    }
  );
  refreshTokenList.push(refreshToken);
  res.json({ accessToken, refreshToken });
});

app.post("/refreshToken", (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) res.sendStatus(401);

  // check refresh Token in database
  if (!refreshTokenList.includes(refreshToken)) res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { username: data.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    res.json({ accessToken });
  });
});

app.post('/logout', (req,res)=>{
  const refreshToken = req.body.refreshToken;
  refreshTokenList = refreshTokenList.filter(token => token !== refreshToken)
  res.sendStatus(200)
})

const PORT = 5500;

app.listen(PORT, () => {
  console.log(`Auth Server is running on PORT ${PORT}`);
});
