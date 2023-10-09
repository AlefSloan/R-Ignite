import http from "node:http";
import crypto from "node:crypto";
import { json } from "./middlewares/json.js";

const usersDB = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  
  await json(req, res);

  if ( method === "GET" && url === "/users") {
    
    return res
      .end(JSON.stringify(usersDB));
  }

  if (method === "POST" && url === '/users') {
    const { name, email } = req.body
    
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
    }
    
    usersDB.push(newUser);
    
    return res.writeHead(201).end();
  }

  return res.writeHead(404).end()
})

server.listen(3333);