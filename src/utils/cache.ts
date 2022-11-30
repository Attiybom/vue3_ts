enum CacheType {
  Local,
  Session
}

class MyCache {
  storage: Storage

  constructor(public type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value?: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new MyCache(CacheType.Local)
const sessionCache = new MyCache(CacheType.Local)

export { localCache, sessionCache }
