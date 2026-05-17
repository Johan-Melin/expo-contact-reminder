type AsyncStorageLike = {
  getItemAsync: (key: string) => Promise<string | null>;
  setItemAsync: (key: string, value: string) => Promise<void>;
  removeItemAsync: (key: string) => Promise<void>;
};

const memoryStore = new Map<string, string>();

const appStorage: AsyncStorageLike = {
  async getItemAsync(key) {
    return memoryStore.get(key) ?? null;
  },
  async setItemAsync(key, value) {
    memoryStore.set(key, value);
  },
  async removeItemAsync(key) {
    memoryStore.delete(key);
  },
};

export { appStorage };
export type { AsyncStorageLike };
