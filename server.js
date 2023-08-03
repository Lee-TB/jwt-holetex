import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
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
    const authorizationHeader = req.headers['authorization']
    const token = authorizationHeader.split(' ')[1];
    if(!token) {
        res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if(err) {
            res.sendStatus(403)
        }
        console.log({data})
        next()
    })
}

app.get("/books", authenToken, (req, res) => {
  res.json({
    status: "success",
    data: { books },
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
