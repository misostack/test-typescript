/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';

export class Database {
  public connection?: Connection;
  constructor() {}

  connect(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      try {
        createConnection().then(async (connection) => {
          this.connection = connection;
          resolve(this.connection);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async runQuery(query: string, parameters = []): Promise<unknown> {
    return this.connection?.manager.query(query, parameters);
  }
}
