import idb from 'idb'

const dbPromise = idb.open('saved-exchanges', 1, upgradeDB => {
  upgradeDB.createObjectStore('exchange');
});

const idbKeyval = {

  set(key, val) {
    return dbPromise.then(db => {
      const tx = db.transaction('exchange', 'readwrite');
      tx.objectStore('exchange').put(val, key);
      return tx.complete;
    });
  },

  delete(key) {
    return dbPromise.then(db => {
      const tx = db.transaction('exchange', 'readwrite');
      tx.objectStore('exchange').delete(key);
      return tx.complete;
    });
  },

  getAll() {
    return dbPromise.then(db => {
      return db.transaction('exchange').objectStore('exchange').getAll();
    }).then(allObjs => allObjs);
  }
};

export default idbKeyval
