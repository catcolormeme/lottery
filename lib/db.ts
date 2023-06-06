import { Knex, knex } from "knex";
import path from "path";
import User from "../models/user";

export const db = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve("./database/database.db"),
  },
});

export const getUsers = (): Knex.QueryBuilder<User, User[]> => db("users").orderBy("ammount", "desc");

export const getUser = (address: string): Knex.QueryBuilder<User, User[]> =>
    db("users").where("address", address).first();


export const saveUser = (user: User): Knex.QueryBuilder<User, User[]> =>
    db("users").insert(user);

export const initializeTables = async () => {

  if (!(await db.schema.hasTable("users"))) {
    await db.schema.createTable("users", (table) => {
      table.increments("id", {
        primaryKey: true,
      });
      table.string("address").notNullable();
      table.integer("ammount").notNullable();
      table.integer("ticketid").notNullable();
    });
  }
};

initializeTables();