interface exMax {
    maxVal : number,
    maxHeap : number[]
}
class BinaryHeap {
    maxHeap : number[];
    minHeap : number[];

    constructor () {
        this.maxHeap = [];
        this.minHeap = [];
    }
    public maxBinaryHeap :Function = () : number[] => {return this.maxHeap }
    public minBinaryHeap :Function = () : number[] => {return this.minHeap }

    private parent : Function = (index : number) : number => {return Math.floor((index-1)/2)}

    private swap : Function = (heap : number[],index1: number,index2 : number) : number[] => {
        let temp = heap[index1];
        heap[index1] = heap[index2];
        heap[index2] = temp;
        return heap;
    }
    private leftChildIndex : Function = (index : number) : number => {
        return (2 * index) + 1
    }
    private rightChildIndex : Function = (index : number) : number => {
        return (2 * index) + 2
    }
    public insertToMaxHeap(value : number):void {
        this.maxHeap.push(value);
        let index : number = this.maxHeap.length - 1;
        if(index === 0) return;
        let parentIndex : number = this.parent(index);
        while(index > 0 && this.maxHeap[index] > this.maxHeap[parentIndex] ) {
            this.maxHeap = this.swap(this.maxHeap,index,parentIndex);
            index = parentIndex;
            parentIndex  = this.parent(index);
        }
    }
    public insertToMinHeap(value : number):void {
        this.minHeap.push(value);
        let index : number = this.minHeap.length - 1;
        if(index === 0) return;
        let parentIndex : number = this.parent(index);
        while(index > 0 && this.minHeap[index] < this.minHeap[parentIndex] ) {
            this.minHeap = this.swap(this.minHeap,index,parentIndex);
            index = parentIndex;
            parentIndex  = this.parent(index);
        }
    }

    public extractMax() : exMax{
        let index : number = 0;
        this.swap(this.maxHeap,this.maxHeap.length - 1,0);
        let maxVal : number = this.maxHeap.pop()!;
        while(
         this.leftChildIndex(index) < this.maxHeap.length &&
         this.rightChildIndex(index) < this.maxHeap.length
        ) {
            if(
                this.maxHeap[index] < this.maxHeap[this.leftChildIndex(index)] 
                && this.maxHeap[index] < this.maxHeap[this.rightChildIndex(index)]
            ) {
                if(this.maxHeap[this.leftChildIndex(index)] < this.maxHeap[this.rightChildIndex(index)] ) {
                    this.maxHeap = this.swap(this.maxHeap,index,this.rightChildIndex(index));
                    index = this.rightChildIndex(index);
                }else {
                    this.maxHeap = this.swap(this.maxHeap,index,this.leftChildIndex(index));
                    index = this.leftChildIndex(index);
                }
            }else if (this.maxHeap[index] < this.maxHeap[this.leftChildIndex(index)]) {
                this.maxHeap = this.swap(this.maxHeap,index,this.leftChildIndex(index));
                index = this.leftChildIndex(index);
            }else if(this.maxHeap[index] < this.maxHeap[this.rightChildIndex(index)]) {
                this.maxHeap = this.swap(this.maxHeap,index,this.rightChildIndex(index));
                index = this.rightChildIndex(index);
            }
        }

        return {maxVal,maxHeap : this.maxHeap};
    }
}

export default BinaryHeap;