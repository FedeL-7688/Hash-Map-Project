import { Node } from "./node.js";
import "./style.css";

class LinkedList {
  constructor() {
    this.head = null;
    this._size = 0;
  }

  arrayMaker(){
    let result = []
    let actualNode = this.head
    while (actualNode!==null){
      result.push(actualNode.value)
      actualNode = actualNode.nextNode
      
    }
    return result
  }
  innerValArrMaker(){
    let result = []
    let actualNode = this.head
    while (actualNode!==null){
      result.push(actualNode.innerVal)
      actualNode = actualNode.nextNode
      
    }
    return result
  }

  listIterate(callback){
    let actualNode = this.head
     while(actualNode!==null){
      callback(actualNode.value,actualNode.innerVal)
      actualNode = actualNode.nextNode
     }

  }
  
  append(val,innerVal) {
    const newNode = new Node(val,innerVal);
    if (this.head == null) {
      this.prepend(val,innerVal);
    } else {
      let last = this.head;
      while (last.nextNode != null) last = last.nextNode;
      last.nextNode = newNode;
      this._size++;
    }
  }
  prepend(val,innerVal) {
    const newNode = new Node(val,innerVal, this.head);

    this.head = newNode;

    this._size++;
  }
  size() {
    return this._size;
  }
  returnHead() {
    return this.head.value;
  }
  returnTail() {
    if (this.head == null) {
      return undefined;
    } else {
      let last = this.head;
      while (last.nextNode != null) {
        last = last.nextNode;
        if (last.nextNode == null) {
          return last.value;
        }
      }
    }
  }
  at(index) {
    if (index<0) return null
    let counter = 0;
    let actual = this.head;
    while (actual != null) {
      if (counter == index) {
        return (actual);
      }
      actual = actual.nextNode;
      counter++;
    }
    return null
  }
  pop() {
    let prevEl = this.head;
    this.head = prevEl.nextNode;
    prevEl.nextNode = undefined;

    this._size--;
    return prevEl.value;
  }

  contains(val) {
    let actual = this.head;
    while (actual !== null) {
      if (actual.value == val) {
        return true;
      }
      actual = actual.nextNode;
    }
    return false;
  }
  findIndex(val) {
    let index = 0;
    let actual = this.head;
    while (actual != null) {
      if (actual.value == val) {
        return index;
      }
      actual = actual.nextNode;
      index++;
    }
    return -1;
  }
  toString() {
    if (!this.head) {
      return "";
    }

    let result = "";
    let actual = this.head;

    while (actual) {
      result += `( ${actual.value} ) -> `;
      actual = actual.nextNode;
    }

    result += "null";

    return result;
  }
  insertAt(index, ...values) {
    if (values.length == 0) return;
    let tempHead = new Node(values[0]);
    let currNew = tempHead;
    

    for (let i = 1; i < values.length; i++) {
     currNew.nextNode = new Node(values[i]);
     currNew = currNew.nextNode;
      this._size++
    }

    if (index == 0) {
     currNew.nextNode = this.head;
      this.head = tempHead;
      return;
    }

    let actual = this.head;
    let counter = 0;

    while (actual !== null) {
      if (counter === index - 1) {
        let lastToAdd = actual.nextNode;
        actual.nextNode = tempHead;
       currNew.nextNode = lastToAdd;
        return;
      }
      actual = actual.nextNode;
      counter++;
    }
  }

  removeAt(index){
    let actual = this.head
    let counter = 0
    if(index===0){
      this.head = actual.nextNode
      this._size--
    }
    else{
      while (counter<index){
      
        if (counter==index-1){
           let previous = actual
           actual = actual.nextNode.nextNode
           previous.nextNode=actual
           this._size--
           return true
        }
        actual=actual.nextNode
        counter++
      }
      
    }
  }
}

export { LinkedList };
