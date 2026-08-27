
import './style.css'
import {LinkedList} from './LinkedList.js'



class HashMap{

    loadFactor = 0.75
    
    constructor(){
      this.capacity=16
      this.result = []
      this.size = 0
    }
   hash = (key) =>{
  let hashCode = 0;

  const primeNumber = 31;

  let result = 0
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
   
  result = hashCode%this.capacity
  }
  if (result < 0 || result >= this.capacity) {
  throw new Error("Trying to access index out of bounds");
  
  }
  return result
     
    }
    
    set(key,value){

        let hashCode = this.hash(key)


        if(!this.result[hashCode]){
           this.result[hashCode] = new LinkedList()
        }
        let bucketList = this.result[hashCode]

        if (bucketList.contains(key)){
          bucketList.contains(key).innerValue = value 
        }

        else{
         bucketList.append(key,value)
        }
        

        
        return this.result
    }

    get(key){
       let hashCode = this.hash(key)
      if (this.result[hashCode]){
        return  this.result[hashCode].value
      }
      else return null
    }
    has(key){
      let hashCode = this.hash(key)
      if (this.result[hashCode]) return true
      else return false
    }
    remove(key){
      let hashCode = this.hash(key)
      if (this.result[hashCode]){
       this.result.splice(hashCode,1)
        return true
      }
      else return false
    }
    length(){
      return this.size
    }
    clear(){
      this.result = []
    }

    keys(){
      let keyArr = []
      this.result.forEach(element => {
          keyArr.push(element.key)
        
      });
      return keyArr
    }
    values(){
      let keyArr = []
      this.result.forEach(element => {
          keyArr.push(element.value)
        
      });
      return keyArr
    }
    entries(){
       console.log(this.result)
         
    }
}

let test = new HashMap

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
console.log(test.remove("tinosrt"))
console.log(test.length())
console.log(test.keys())
console.log(test.values())

test.entries()




