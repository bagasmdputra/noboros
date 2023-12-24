import Dexie, { Table } from "dexie";
// table inteface
export type Transaction = {
  id?: number;
  name: string;
  date: string;
  pocketId: number;
  sourceId: number;
  amount: number;
  note: string;
  status: string;
};

export type Pocket = {
  id?: number;
  name: string;
  limit: number;
  icon: string;
  isActive: boolean;
};

export type FundSource = {
  id?: number;
  name: string;
  icon: string;
  isActive: boolean;
};

export class DB extends Dexie {
  // table name is student
  transactions!: Table<Transaction, number>;
  pockets!: Table<Pocket, number>;
  fundSources!: Table<FundSource, number>;
  constructor() {
    super("noboros");
    this.version(1).stores({
      transactions: "++id, pocketId, sourceId",
      pockets: "++id",
      fundSources: "++id",
    });
  }
}
export const db = new DB(); // export the db
