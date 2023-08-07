import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";
import { StatusCodes } from "http-status-codes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const books = [
  {
    id: 1,
    name: "Chi Pheo",
    author: "abc",
  },
  {
    id: 2,
    name: "Chien tranh va hoa binh",
    author: "def",
  },
];

function authenToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: "please provide a token",
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: "Invalid token",
      });
    } else {
      next();
    }
  });
}

app.get("/books", authenToken, (req, res) => {
  res.status(StatusCodes.OK).json({
    books,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
