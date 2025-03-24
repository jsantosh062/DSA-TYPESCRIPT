type NodeType = TreeNode | null;
type TreeType = BinarySearchTree | null;
class TreeNode  {
    value: number;
    left: NodeType = null;
    right: NodeType = null;
    public constructor(value : number,left=null,right=null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}  
class BinarySearchTree {
    root: TreeNode  | null;
    public constructor() {
        this.root = null;
    }

    public insert (value:number): NodeType {
        if(!value) return null;
        let node : NodeType = new TreeNode(value);
        if(!this.root) {
            this.root = node;
            return node;
        }
        let curr : NodeType = this.root;
        while(true) {
            if(curr && value < curr.value)
            {
                if(!curr.left)
                {
                    curr.left = node;

                    return node;
                }else {
                    curr = curr.left;
                }
            }
            else if (curr && value > curr.value)
            {
                if(!curr.right)
                    {
                        curr.right = node;
                        return node;
                    }else {
                        curr = curr.right;
                    }
            }
            else 
            {
                return null;
            }
        }
    }
    public remove (value : number) {
        return this._removeHelper(this.root,value);
    }
    public height(){
        return this._hightHelper(this.root);
    }
    public isBalanced() : boolean{
        return this._isBalancedHelper(this.root)=== -1;
    }
    public inOrder():number[]{ //left->root->right
        let result : number[] = [],
        curr : NodeType = this.root;
        return this._inOrderHelper(curr,result);
    }
    public preOrder() : number[] {//root->left->right
        let result : number[] = [],
        curr : NodeType = this.root;
        return this._preOrderHelper(curr,result);
    }
    public postOrder() : number[] { //left->right->root
        let result : number[] = [],
        curr : NodeType = this.root;
        return this._postOrderHelper(curr,result);
    }
    public DFS_DP_PREORDER () : number[]| null {
        let visited : number[] = [],
        stack : NodeType[]= [this.root]
        while(stack.length > 0) {
            let curr : NodeType | undefined = stack.pop();
            if(curr){
                visited.push(curr.value);
                //push right node first and then left node so left will pop first
                if(curr.right) stack.push(curr.right);
                if(curr.left) stack.push(curr.left);
            };
        }
        return visited;
    }
    public DFS_DP_INORDER () : number[]| null {
        let visited : number[] = [];
        let curr : NodeType | undefined = this.root;
        let stack : NodeType[] = [curr];
        while(curr && stack.length > 0) {
            while(curr.left &&  stack.length > 0) {
                stack.push(curr.left);
                curr = curr.left
            } 
            curr = stack.pop(); 
            
            if(curr){
                visited.push(curr.value);
                if(curr.right){
                     stack.push(curr.right);
                     curr = curr.right;

                }
            }
        }
        return visited;
    }
    public DFS_DP_POSTORDER () :  number[]| null {
        let visited : number[] = [],
        curr : NodeType | undefined = this.root,
        stack1 : NodeType[] = [curr],
        stack2 : NodeType[] = [curr];

        while(curr && stack1.length > 0){
            curr = stack1.pop();
            stack2.push(curr!)
            if(curr!.left) stack1.push(curr!.left);
            if(curr!.right) stack1.push(curr!.right);
        }
        while(stack2.length > 0){
            visited.push(stack2.pop()!.value)
        }
        return visited;
    }
    private _postOrderHelper(node : NodeType , result : number[]) : number[] {
        if(!node) return result;
        if(node.left) this._postOrderHelper(node.left,result);
        if(node.right) this._postOrderHelper(node.right,result);
        result.push(node.value);
        return result;
    }
    private _preOrderHelper(node : NodeType , result : number[]) : number[] {
        if(!node) return result;
        result.push(node.value);
        if(node.left) this._preOrderHelper(node.left,result);
        if(node.right) this._preOrderHelper(node.right,result);
        return result;
    } 
    private _inOrderHelper(node : NodeType, result : number[]) : number[]{
        if(!node) return result;
        if(node.left) this._inOrderHelper(node.left,result);
        result.push(node.value);
        if(node.right) this._inOrderHelper(node.right,result);
        return result;
    }
    private _isBalancedHelper(node : NodeType) : number {
        if(!node) return 0;

        let leftTreeHeight : number = this._isBalancedHelper(node.left);

        if(leftTreeHeight === -1) return -1;

        let rightTreeHeight : number = this._isBalancedHelper(node.right);

        if(rightTreeHeight === -1) return -1;

        if(Math.abs(leftTreeHeight-rightTreeHeight) > 1) return -1;

        return 1 + Math.max(leftTreeHeight,rightTreeHeight)
    }
    private _removeHelper( node : NodeType,value : number){
        if(!node)return null;
        //if it is a leaf node
        if(node.value < value){
            node.right = this._removeHelper(node.right,value);
        }else if (node.value > value) {
            node.left = this._removeHelper(node.left,value);
        }else {

            if(!node.left && !node.right) return null;

            //if node has single child
            if(!node.left) return node.right;
            if(!node.right) return node.left;
            //if node has two child
            //FIND IN ORDER PREDECESSOR OR SUCCESSOR
            let inOrderPredeccor : TreeNode = this._inorderPreDessor(node.right);
            node.value = inOrderPredeccor.value;
            node.right = this._removeHelper(node.right,inOrderPredeccor.value)
            return node;
        }
        return node;
    }
    private _inorderPreDessor(node : TreeNode) : TreeNode {
        while(node.left) {
            node  = node.left;
        }
        return node;
    }
    private _hightHelper(node : NodeType) : number {
        if(!node) return 0;
        let leftNodeHeight : number = this._hightHelper(node.left);
        let rightNodeHeight : number = this._hightHelper(node.right);
        return 1 + Math.max(leftNodeHeight,rightNodeHeight);
    }

}





export default BinarySearchTree;

