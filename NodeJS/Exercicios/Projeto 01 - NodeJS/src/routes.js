import crypto from 'node:crypto';

import { Database } from './database.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: (req, res) => {
      const users = database.select('users');

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: 'POST',
    path: '/users',
    handler: (req, res) => {
      const { name, email } = req.body;

      const newUser = {
        id: crypto.randomUUID(),
        name,
        email,
      };

      database.insert('users', newUser);

      return res.writeHead(201).end();
    },
  },
  {
    method: 'PUT',
    path: '/users',
    handler: (req, res) => {},
  },
  {
    method: 'PATCH',
    path: '/users',
    handler: (req, res) => {},
  },
  {
    method: 'DELETE',
    path: '/users',
    handler: (req, res) => {},
  },
];
