type AsyncStorageLike = {
  getItemAsync: (key: string) => Promise<string | null>;
  setItemAsync: (key: string, value: string) => Promise<void>;
  removeItemAsync: (key: string) => Promise<void>;
};

const appStorage: AsyncStorageLike = {
  async getItemAsync(key) {
    return globalThis.localStorage?.getItem(key) ?? null;
  },
  async setItemAsync(key, value) {
    globalThis.localStorage?.setItem(key, value);
  },
  async removeItemAsync(key) {
    globalThis.localStorage?.removeItem(key);
  },
};

export { appStorage };
