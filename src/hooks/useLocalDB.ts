
import { useState, useEffect } from 'react';
import { localDB } from '@/utils/localStorageDB';

export function useLocalDB<T>(tableName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await localDB.findAll(tableName);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tableName]);

  const insert = async (item: Omit<T, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const id = await localDB.insert(tableName, item);
      await fetchData(); // Refresh data
      return id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to insert');
      throw err;
    }
  };

  const update = async (id: string, item: Partial<T>) => {
    try {
      await localDB.update(tableName, id, item);
      await fetchData(); // Refresh data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update');
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      await localDB.delete(tableName, id);
      await fetchData(); // Refresh data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
      throw err;
    }
  };

  const findById = async (id: string) => {
    try {
      return await localDB.findById(tableName, id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to find by ID');
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    insert,
    update,
    remove,
    findById,
    refresh: fetchData
  };
}
