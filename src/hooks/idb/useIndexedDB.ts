import IndexedDB, { IEntity } from 'src/services/idb'
import { useState } from 'react'

const useIndexedDB = <T extends IEntity>(db: IndexedDB<T>) => {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  // Function to load data from IndexedDB
  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const allData = await db.getAll()
      setData(allData)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  // Function to add a new item to IndexedDB
  const addItem = async (item: T) => {
    setLoading(true)
    setError(null)
    try {
      await db.add(item)
      await loadData() // Reload data after adding
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  // Function to update an item in IndexedDB
  const updateItem = async (id: number, item: T) => {
    setLoading(true)
    setError(null)
    try {
      await db.update(id, item)
      await loadData() // Reload data after updating
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  // Function to delete an item from IndexedDB
  const deleteItem = async (id: number) => {
    setLoading(true)
    setError(null)
    try {
      await db.remove(id)
      await loadData() // Reload data after deleting
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, addItem, updateItem, deleteItem }
}

export default useIndexedDB
