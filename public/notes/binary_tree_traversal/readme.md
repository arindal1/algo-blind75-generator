# 🌳 Binary Tree Traversal Pattern Guide

---

## 1. Pattern Overview

* **Definition:**
  Tree traversals systematically visit every node in a binary tree in a specific order—commonly **preorder** (root→left→right), **inorder** (left→root→right), **postorder** (left→right→root), and **level-order** (breadth‑first).
* **Why It Matters:**

  * **Data Processing:** Compute expressions, serialize/deserialize trees.
  * **Divide & Conquer:** Many tree algorithms (height, balance, path sum) rely on a traversal.
  * **Ordering Guarantees:** Inorder of BST yields sorted order; level‑order yields breadth layering.

---

## 2. Prerequisites

* **Data Structures:**

  * `struct TreeNode { int val; TreeNode* left; TreeNode* right; };`
* **Language Features:**

  * Recursion (call stack)
  * `queue<TreeNode*>` for breadth‑first
* **Concepts:**

  * Call stack behavior for DFS
  * FIFO queue for BFS
  * Null (`nullptr`) checks

---

## 3. Recognition Checklist

* You need to **visit all nodes** in a binary tree systematically.
* The problem asks for **specific ordering**: root‐first, root‐between, root‐last, or level by level.
* You must **collect**, **print**, or **accumulate** values in traversal order.
* Constraints: tree size up to 10⁵; recursion depth may require iterative or tail recursion.

---

## 4. Core Idea & Steps

1. **Preorder (DFS, root→left→right):**

   ```cpp
   void dfsPre(TreeNode* node) {
     if (!node) return;
     visit(node);
     dfsPre(node->left);
     dfsPre(node->right);
   }
   ```
2. **Inorder (DFS, left→root→right):**

   ```cpp
   void dfsIn(TreeNode* node) {
     if (!node) return;
     dfsIn(node->left);
     visit(node);
     dfsIn(node->right);
   }
   ```
3. **Postorder (DFS, left→right→root):**

   ```cpp
   void dfsPost(TreeNode* node) {
     if (!node) return;
     dfsPost(node->left);
     dfsPost(node->right);
     visit(node);
   }
   ```
4. **Level-Order (BFS):**

   ```cpp
   void bfs(TreeNode* root) {
     if (!root) return;
     queue<TreeNode*> q;
     q.push(root);
     while (!q.empty()) {
       auto cur = q.front(); q.pop();
       visit(cur);
       if (cur->left)  q.push(cur->left);
       if (cur->right) q.push(cur->right);
     }
   }
   ```

---

## 5. Code Template in C++

```cpp
#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x): val(x), left(nullptr), right(nullptr) {}
};

namespace TreeTraversal {
    // Preorder
    void preorder(TreeNode* node, vector<int>& out) {
        if (!node) return;
        out.push_back(node->val);
        preorder(node->left, out);
        preorder(node->right, out);
    }
    // Inorder
    void inorder(TreeNode* node, vector<int>& out) {
        if (!node) return;
        inorder(node->left, out);
        out.push_back(node->val);
        inorder(node->right, out);
    }
    // Postorder
    void postorder(TreeNode* node, vector<int>& out) {
        if (!node) return;
        postorder(node->left, out);
        postorder(node->right, out);
        out.push_back(node->val);
    }
    // Level-order
    vector<int> levelOrder(TreeNode* root) {
        vector<int> out;
        if (!root) return out;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            TreeNode* cur = q.front(); q.pop();
            out.push_back(cur->val);
            if (cur->left)  q.push(cur->left);
            if (cur->right) q.push(cur->right);
        }
        return out;
    }
}
```

---

## 6. Worked Example

**Problem:** Given the tree

```
    1
   / \
  2   3
 / \
4   5
```

List its inorder traversal (`[4,2,5,1,3]`).

```cpp
#include <bits/stdc++.h>
using namespace std;
struct TreeNode { int val; TreeNode* left; TreeNode* right; 
    TreeNode(int x): val(x), left(nullptr), right(nullptr) {}
};
void inorder(TreeNode* node, vector<int>& out) {
    if (!node) return;
    inorder(node->left, out);
    out.push_back(node->val);
    inorder(node->right, out);
}
int main() {
    // build tree
    TreeNode* root = new TreeNode(1);
    root->left  = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left  = new TreeNode(4);
    root->left->right = new TreeNode(5);

    vector<int> result;
    inorder(root, result);
    // result == {4,2,5,1,3}
    for (int v : result) cout << v << " ";
    return 0;
}
```

---

## 7. Common Pitfalls & Tips

* **Null Checks:** Always test `if (!node) return;` before recursion.
* **Stack Overflow:** For deep trees, consider iterative with explicit stack or tail‐recursion elimination.
* **Level‑Order Layers:** To separate levels, track `q.size()` each loop iteration.
* **Mutable Output:** Pass reference to result vector to avoid global state.
* **Memory Cleanup:** In production, free allocated nodes to avoid leaks.

---

## 8. Practice Problems

1. **Binary Tree Preorder Traversal** (LeetCode 144)
2. **Binary Tree Inorder Traversal** (LeetCode 94)
3. **Binary Tree Postorder Traversal** (LeetCode 145)
4. **Binary Tree Level Order Traversal** (LeetCode 102)
5. **Average of Levels in Binary Tree** (LeetCode 637)

