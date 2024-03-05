import Dexie, { Table } from 'dexie';

// Generic interface for entities
export interface IEntity {
  id?: number;
}

// Extend Dexie with your custom database class
class IndexedDB<T extends IEntity> extends Dexie {
  public items: Table<T, number>;

  constructor(databaseName: string, storeName: string) {
    super(databaseName);
    this.version(1).stores({
      [storeName]: '++id', // Using auto-increment for the id
    });
    this.items = this.table(storeName);
  }
  
  async getAll(): Promise<T[]> {
    return await this.items.toArray();
  }

  async getById(id: number): Promise<T | undefined> {
    return await this.items.get(id);
  }

  async add(item: T): Promise<number> {
    return await this.items.add(item);
  }

  async update(id: number, item: T): Promise<number> {
    return await this.items.update(id, item);
  }

  async remove(id: number): Promise<void> {
    await this.items.delete(id);
  }
}

export default IndexedDB