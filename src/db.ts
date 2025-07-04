import Dexie from "dexie";
import type { Table } from "dexie";

export interface Memo {
  id: string;
  content: string;
  updatedAt: number;
  createdAt: number;
}

class MemoDB extends Dexie {
  memos!: Table<Memo, string>;

  constructor() {
    super("memoDB");
    this.version(1).stores({
      memos: "&id, updatedAt, createdAt",
    });
  }
}

export const db = new MemoDB();
