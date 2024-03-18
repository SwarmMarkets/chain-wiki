import Dexie, { Table } from 'dexie'

// Generic interface for entities

export type Id = number | string
export interface IEntity {
  id: Id
}

// Extend Dexie with your custom database class
class IndexedDB<T extends IEntity> extends Dexie {
  public items: Table<T, Id>

  constructor(databaseName: string, storeName: string, indexedKeys: string) {
    super(databaseName)
    this.version(1).stores({
      [storeName]: indexedKeys,
    })
    this.items = this.table(storeName)
  }

  getAll(): Promise<T[]> {
    return this.items.toArray()
  }

  getById(id: Id): Promise<T | undefined> {
    return this.items.get(id)
  }

  bulkGet(ids: Id[]): Promise<(T | undefined)[]> {
    return this.items.bulkGet(ids)
  }

  add(item: T): Promise<Id> {
    return this.items.add(item)
  }

  bulkAdd(items: T[], keys: Id[]): Promise<Id> {
    console.log(items, keys)
    return this.items.bulkAdd(items, keys)
  }

  update(id: Id, item: T): Promise<Id> {
    return this.items.update(id, item)
  }

  async remove(id: Id): Promise<void> {
    await this.items.delete(id)
  }
}

export default IndexedDB
