import http from "node:http";
import crypto from "node:crypto";

const usersDB = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;
  
  if ( method === "GET" && url === "/users") {
    
    return res
      .setHeader('Content-type', 'aplication/json')
      .end(JSON.stringify(usersDB));
  }

  if (method === "POST" && url === '/users') {
    const newUser = {
      id: crypto.randomUUID(),
      name: "John Doe",
      email: "johndoe@example.com",
    }
    
    usersDB.push(newUser);
    
    return res.writeHead(201).end();
  }

  return res.writeHead(404).end()
})

server.listen(3333);