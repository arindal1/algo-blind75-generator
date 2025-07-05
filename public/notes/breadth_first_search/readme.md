# 🗿 Breadth‑First Search (BFS) Pattern Guide

---

## 1. Pattern Overview

* **Definition:**
  Breadth‑First Search explores all neighbors of a node before moving to the next level, using a FIFO queue to ensure you visit nodes in order of increasing distance (or layer) from the start.
* **Why It Matters:**

  * **Shortest Paths in Unweighted Graphs:** Finds minimal number of edges to reach every node.
  * **Level‑Order Traversal of Trees:** Visits nodes level by level.
  * **Flood Fill & Connectivity:** Processes regions in grids or graphs uniformly outward.

---

## 2. Prerequisites

* **Data Structures:**

  * `queue<T>` for managing frontier
  * Adjacency list (`vector<vector<int>>`) or grid coordinates
* **Language Features:**

  * `push()`, `pop()` on `std::queue`
  * Boolean or integer `visited` array
* **Concepts:**

  * FIFO behavior
  * Marking visited to prevent revisits
  * Layered exploration

---

## 3. Recognition Checklist

* You need the **shortest path** (fewest edges or moves) in an **unweighted** graph or grid.
* You must **visit nodes level by level** (e.g., serialize a tree by depth).
* You’re doing a **flood fill**, **maze escape**, or **spread simulation** (rotting oranges, water fill).
* Constraints: number of vertices or cells up to 10⁵–10⁶; DFS may blow the stack or find longer paths.

---

## 4. Core Idea & Steps

1. **Initialize:**

   ```cpp
   queue<int> q;
   vector<bool> visited(N, false);
   visited[start] = true;
   q.push(start);
   ```
2. **Process Queue:**

   ```cpp
   while (!q.empty()) {
     int u = q.front();  
     q.pop();
     visit(u);           // process node u or record distance
     for (int v : adj[u]) {
       if (!visited[v]) {
         visited[v] = true;
         q.push(v);
       }
     }
   }
   ```
3. **Track Levels (Optional):**

   * Use a sentinel (`-1`) or loop over `q.size()` at each level to separate layers.
4. **Distance Array (Optional):**

   ```cpp
   vector<int> dist(N, -1);
   dist[start] = 0;
   ...
       dist[v] = dist[u] + 1;
   ```
5. **Terminate:**

   * When you’ve visited all reachable nodes or found your target.

---

## 5. Code Template in C++

```cpp
#include <bits/stdc++.h>
using namespace std;

struct Edge { int to; };

namespace BFS {
    // 1) Graph BFS: record order and distances
    void bfsGraph(int start,
                  const vector<vector<int>>& adj,
                  vector<int>& order,
                  vector<int>& dist) {
        int N = adj.size();
        vector<bool> visited(N, false);
        queue<int> q;

        visited[start] = true;
        dist.assign(N, -1);
        dist[start] = 0;
        q.push(start);

        while (!q.empty()) {
            int u = q.front(); q.pop();
            order.push_back(u);
            for (int v : adj[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    dist[v] = dist[u] + 1;
                    q.push(v);
                }
            }
        }
    }

    // 2) Tree level-order traversal: return per‑level nodes
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> levels;
        if (!root) return levels;

        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            levels.emplace_back();
            for (int i = 0; i < sz; i++) {
                TreeNode* node = q.front(); q.pop();
                levels.back().push_back(node->val);
                if (node->left)  q.push(node->left);
                if (node->right) q.push(node->right);
            }
        }
        return levels;
    }
}
```

---

## 6. Worked Example

**Problem:** Given an undirected graph with `N = 6` and edges

```
0–1, 0–2, 1–3, 2–4, 4–5
```

Perform BFS from node 0, list visitation order and distances.

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int N = 6;
    vector<vector<int>> adj(N);
    vector<pair<int,int>> edges = {{0,1},{0,2},{1,3},{2,4},{4,5}};
    for (auto &e : edges) {
        adj[e.first].push_back(e.second);
        adj[e.second].push_back(e.first);
    }
    vector<int> order, dist;
    BFS::bfsGraph(0, adj, order, dist);

    // order:    0 1 2 3 4 5
    // dist:     0 1 1 2 2 3
    for (int u : order) cout << u << " ";
    cout << "\n";
    for (int d : dist) cout << d << " ";
    return 0;
}
```

---

## 7. Common Pitfalls & Tips

* **Mark Before Enqueue:** Always set `visited[v] = true` **before** `q.push(v)` to avoid duplicates.
* **Level Separation:** To process by layers, capture `q.size()` at loop start.
* **Memory Use:** A large queue plus adjacency can be heavy—clear structures between tests.
* **Grid BFS:** Encode `(r,c)` as a single integer or use a `queue<pair<int,int>>`.
* **Edge Cases:** Empty start node, disconnected components (loop all nodes if needed).

---

## 8. Practice Problems

1. **Binary Tree Level Order Traversal** (LeetCode 102)
2. **01 Matrix** (LeetCode 542) – multi‑source BFS
3. **Rotting Oranges** (LeetCode 994) – time‑layered BFS
4. **Shortest Path in Binary Matrix** (LeetCode 1091)
5. **Word Ladder** (LeetCode 127) – BFS on implicit graph

