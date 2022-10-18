import AsyncStorage from '@react-native-async-storage/async-storage';

const MEMORY_KEY_PREFIX = '@MemoryStorage:';
const MEMORY_KEY_PREFIX_V1 = '@MemoryStoragev1:';
const MEMORY_KEY_PREFIX_V2 = '@MemoryStoragev2:';
let dataMemory = {};

class MemoryStorage {
  static syncPromise = null;
	/**
	 * This is used to set a specific item in storage
	 * @param {string} key - the key for the item
	 * @param {object} value - the value
	 * @returns {string} value that was set
	 */
	static setItem(key, value) {
		AsyncStorage.setItem(MEMORY_KEY_PREFIX_V2 + key, value);
		//AsyncStorage.setItem(MEMORY_KEY_PREFIX + key, value);
		dataMemory[key] = value;
		return dataMemory[key];
	}

	/**
	 * This is used to get a specific key from storage
	 * @param {string} key - the key for the item
	 * This is used to clear the storage
	 * @returns {string} the data item
	 */
	static getItem(key) {
		return Object.prototype.hasOwnProperty.call(dataMemory, key)
			? dataMemory[key]
			: undefined;
	}

	/**
	 * This is used to remove an item from storage
	 * @param {string} key - the key being set
	 * @returns {string} value - value that was deleted
	 */
	static removeItem(key) {
		AsyncStorage.removeItem(MEMORY_KEY_PREFIX_V1 + key);
		AsyncStorage.removeItem(MEMORY_KEY_PREFIX_V2 + key);
		AsyncStorage.removeItem(MEMORY_KEY_PREFIX + key);
		return delete dataMemory[key];
	}

	/**
	 * This is used to clear the storage
	 * @returns {string} nothing
	 */
	static clear() {
		dataMemory = {};
		return dataMemory;
	}

	/**
	 * Will sync the MemoryStorage data from AsyncStorage to storageWindow MemoryStorage
	 * @param {nodeCallback<string>} callback callback with (err, 'SUCCESS')
	 * @returns {void}
	 */
	static sync() {
    if (!MemoryStorage.syncPromise) {
      MemoryStorage.syncPromise =  new Promise((res, rej) => {
        AsyncStorage.getAllKeys((errKeys, keys) => {
          if (errKeys) rej(errKeys);
          const memoryKeys = keys.filter(key => key.startsWith(MEMORY_KEY_PREFIX_V1) || key.startsWith(MEMORY_KEY_PREFIX)
		  || key.startsWith(MEMORY_KEY_PREFIX_V2) );
		  //console.log('memoryKeys-------key',JSON.stringify(memoryKeys))
		  let changedMemkeyStore = []
		
          AsyncStorage.multiGet(memoryKeys, (err, stores) => { 
            if (err) rej(err);
            stores.map((result, index, store) => {	
		    try {
              const key = store[index][0];
              //const value = store[index][1]
			  const value = (key.startsWith(MEMORY_KEY_PREFIX) || key.startsWith(MEMORY_KEY_PREFIX_V1)) ? store[index][1] : store[index][1]
              const memoryKey = key.replace(MEMORY_KEY_PREFIX_V1, '').replace(MEMORY_KEY_PREFIX,'').replace(MEMORY_KEY_PREFIX_V2,'')
              dataMemory[memoryKey] = value;

			  // to migrate data 
			 if(key.startsWith(MEMORY_KEY_PREFIX) || key.startsWith(MEMORY_KEY_PREFIX_V1)){
				 let newKey = ''
				 if (key.startsWith(MEMORY_KEY_PREFIX)) {
					 newKey = key.replace(MEMORY_KEY_PREFIX, MEMORY_KEY_PREFIX_V2)
				 }
				 if (key.startsWith(MEMORY_KEY_PREFIX_V1)) {
					 newKey = key.replace(MEMORY_KEY_PREFIX_V1, MEMORY_KEY_PREFIX_V2)
				 }
				 if (newKey) {
					 changedMemkeyStore = [...changedMemkeyStore, [newKey, value]]
				 }
			 }
		    } catch (error) {
				console.log("Error ",error)
				rej(err)
			}
			});
			
			// remove old key data and migrate to new prefix 
			if (changedMemkeyStore.length > 0) {
				AsyncStorage.multiSet(changedMemkeyStore)
				const removeKeys = keys.filter(key => key.startsWith(MEMORY_KEY_PREFIX) || key.startsWith(MEMORY_KEY_PREFIX_V1) );
				AsyncStorage.multiRemove(removeKeys)
			}
            res();
          });
          
        });
    });
 
    }
    return MemoryStorage.syncPromise;
	}
}

/** @class */
export default class StorageHelper {
	/**
	 * This is used to get a storage object
	 * @returns {object} the storage
	 */
	constructor() {
		this.storageWindow = MemoryStorage;
	}

	/**
	 * This is used to return the storage
	 * @returns {object} the storage
	 */
	getStorage() {
		return this.storageWindow;
	}
}
