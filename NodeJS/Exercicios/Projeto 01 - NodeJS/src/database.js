import fs from 'node:fs/promises';

const databasePath = new URL('db/db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      }).catch(() => {
        this.#persist()
      })
  }
 
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(item => {
        return Object.entries(search).some(([key, value]) => {
          return item[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  remove(table, id) {   
    const indexOfUser = this.#database[table].findIndex(user => {
      return user.id === id
    })

    if (indexOfUser > -1) {
      this.#database[table].splice(indexOfUser, 1);
      this.#persist();
    }
  }

  update(table, id, data) {
    const indexOfUser = this.#database[table].findIndex((user) => {
      return user.id === id;
    });

    if (indexOfUser > -1) {
      this.#database[table][indexOfUser] = { id, ...data}
      this.#persist();
    }
  }
}