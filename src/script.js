import { LinkedList } from "./LinkedList.js";

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.result = new Array(this.capacity);
    this.size = 0;
  }
  hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;

    let result = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);

      result = hashCode % this.capacity;
    }
    if (result < 0 || result >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }
    return result;
  };

  set(key, value) {

    if (this.size >= this.capacity * this.loadFactor) {
      let oldResult = this.result;
      this.capacity = this.capacity * 2;
      this.result = new Array(this.capacity);
      this.size = 0;

      oldResult.forEach((oldList) => {
        if (oldList !== null & oldList.head !== null) {
          oldList.listIterate((key, val) => this.set(key, val));
        }
   
      });
    }
     
    let hashCode = this.hash(key);

    if (!this.result[hashCode]) {
      this.result[hashCode] = new LinkedList();
    }
    let bucketList = this.result[hashCode];

    let index = bucketList.findIndex(key);
    if (index !== -1) {
      let targetNode = bucketList.at(index);

      if (targetNode) {
        targetNode.innerVal = value;
      } else {
        bucketList.append(key, value);
        this.size++;
      }
    } else {
      bucketList.append(key, value);
      this.size++;
    }
     

    return this.result;
  }

  get(key) {
    let hashCode = this.hash(key);
    let bucketList = this.result[hashCode];
    if (!bucketList) return null;

    let index = bucketList.findIndex(key);
    if (index !== -1) {
      let node = bucketList.at(index);
      return node.innerVal;
    }
    return null;
  }
  has(key) {
    let hashCode = this.hash(key);
    let bucketList = this.result[hashCode];

    if (bucketList) {
      return bucketList.contains(key);
    } else return false;
  }
  remove(key) {
    let hashCode = this.hash(key);
    let bucketList = this.result[hashCode];
    if (bucketList) {
      let index = bucketList.findIndex(key);
      if (index !== -1) {
        bucketList.removeAt(index);
        this.size--;
        if (bucketList.size() === 0) {
        delete this.result[hashCode];
      }
        return true;
      } else return false;
    } else return false;
  }
  length() {
    return this.size;
  }
  clear() {
    this.result = [];
  }

  keys() {
    let keysArr = [];
    this.result.forEach((element) => {
      if (element.head !== null) {
        let bucketArr = element.arrayMaker();
        keysArr.push(...bucketArr);
      }
    });
    return keysArr;
  }
  values() {
    let valsArr = [];
    this.result.forEach((element) => {
      if (element.head !== null) {
        let bucketArr = element.innerValArrMaker();
        valsArr.push(...bucketArr);
      }
    });
    return valsArr;
  }
  entries() {
    console.log(this.result);
  }
}

let test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("penguin", "white");
test.set("cougar", "beige");
console.log(test.get("apple"));
console.log(test.has("kite"));
console.log(test.remove("banana"));
console.log(test.length());
console.log(test.keys());
console.log(test.values());

test.entries();
console.log("the size of the hashMap is", test.length());
