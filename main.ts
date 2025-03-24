import BinaryHeap from "./BinaryHeap";

// import BinarySearchTree from "./BinarySearchTree";

const BH : BinaryHeap = new BinaryHeap();

BH.insertToMaxHeap(34);
BH.insertToMaxHeap(35);
BH.insertToMaxHeap(37);
BH.insertToMaxHeap(-1);
BH.insertToMaxHeap(100);
BH.insertToMaxHeap(10);
console.log("MAX BINARY HEAP==>",BH.maxBinaryHeap());


BH.insertToMinHeap(34);
BH.insertToMinHeap(35);
BH.insertToMinHeap(37);
BH.insertToMinHeap(-1);

console.log("MIN BINARY HEAP==>",BH.minBinaryHeap());

console.log("extractMax from HEAP==>",BH.extractMax());
console.log("extractMax from HEAP==>",BH.extractMax());
