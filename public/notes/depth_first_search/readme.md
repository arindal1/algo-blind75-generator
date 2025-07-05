# 🪛 Depth-First Search (DFS) Pattern Guide

---

## 1. Pattern Overview

* **Definition:**
  Depth‑First Search explores as far as possible along each branch before backtracking, using a stack (implicit via recursion or explicit) to track the path.
* **Why It Matters:**

  * **Graph/Tree Exploration:** Visit every reachable node and edge.
  * **Path Finding & Reachability:** Check connectivity, find any path between two nodes.
  * **Backtracking Framework:** Basis for cycle detection, topological sort, strongly connected components, and many puzzle/maze solvers.

---

## 2. Prerequisites

* **Data Structures:**

  * Adjacency list (`vector<vector<int>>`) or adjacency matrix
  * `vector<bool>` or `vector<int>` for visited flags
* **Language Features:**

  * Recursion (function call stack) or explicit `stack`
  * Reference/pointer passing for mutable state
* **Concepts:**

  * Call‐stack behavior
  * Marking visited to avoid infinite loops
  * Graph representations and basic properties

---

## 3. Recognition Checklist

* You need to **visit all nodes** reachable from a start point.
* You must **detect paths, cycles, or connected components**.
* The problem suits a **backtracking** approach (e.g., puzzles, combinations).
* Constraints: Graph size up to 10⁵ nodes—DFS is O(V+E) and efficient.

---

## 4. Core Idea & Steps

1. **Build/Receive Graph:**

   ```cpp
   int N;                             // number of nodes
   vector<vector<int>> adj(N);       // adjacency list
   // fill adj[u].push_back(v) for each edge
   ```
2. **Initialize Visited Array:**

   ```cpp
   vector<bool> visited(N, false);
   ```
3. **Define DFS Function:**

   * **Recursive:**

     ```cpp
     void dfs(int u) {
       visited[u] = true;
       visit(u);                      // process node u
       for (int v : adj[u]) {
         if (!visited[v])
           dfs(v);
       }
     }
     ```
   * **Iterative (using stack):**

     ```cpp
     void dfsIter(int start) {
       stack<int> st;
       st.push(start);
       while (!st.empty()) {
         int u = st.top(); st.pop();
         if (visited[u]) continue;
         visited[u] = true;
         visit(u);
         for (int v : adj[u])
           if (!visited[v]) st.push(v);
       }
     }
     ```
4. **Invoke DFS:**

   * **Single component:** `dfs(startNode);`
   * **All components:**

     ```cpp
     for (int u = 0; u < N; u++)
       if (!visited[u])
         dfs(u);
     ```

---

## 5. Code Template in C++

```cpp
#include <bits/stdc++.h>
using namespace std;

/*
  DFS namespace:
   - dfs: recursive depth‑first traversal
   - dfsIter: iterative version using explicit stack
*/
namespace DFS {
    // Recursive DFS
    void dfs(int u, const vector<vector<int>>& adj, vector<bool>& visited, vector<int>& order) {
        visited[u] = true;
        order.push_back(u);                  // record visitation order
        for (int v : adj[u]) {
            if (!visited[v])
                dfs(v, adj, visited, order);
        }
    }

    // Iterative DFS
    void dfsIter(int start, const vector<vector<int>>& adj, vector<bool>& visited, vector<int>& order) {
        stack<int> st;
        st.push(start);
        while (!st.empty()) {
            int u = st.top(); st.pop();
            if (visited[u]) continue;
            visited[u] = true;
            order.push_back(u);
            // push neighbors; to mimic recursive order, push in reverse
            for (auto it = adj[u].rbegin(); it != adj[u].rend(); ++it) {
                if (!visited[*it])
                    st.push(*it);
            }
        }
    }
}
```

---

## 6. Worked Example

**Problem:** Given an undirected graph with `N = 5` nodes and edges

```
0–1, 0–2, 1–3, 1–4
```

Perform a DFS starting at node 0 and output the visitation order.

```cpp
#include <bits/stdc++.h>
using namespace std;

// Using recursive DFS from template
int main() {
    int N = 5;
    vector<vector<int>> adj(N);
    vector<pair<int,int>> edges = {{0,1},{0,2},{1,3},{1,4}};
    for (auto &e : edges) {
        adj[e.first].push_back(e.second);
        adj[e.second].push_back(e.first);
    }
    // (Optional) sort adjacency so order is deterministic
    for (auto &nbrs : adj) sort(nbrs.begin(), nbrs.end());

    vector<bool> visited(N,false);
    vector<int> order;
    DFS::dfs(0, adj, visited, order);

    // Expected order: 0,1,3,4,2
    for (int u : order)
        cout << u << " ";
    // Output: 0 1 3 4 2
    return 0;
}
```

* **Annotations:**

  1. Start at `0`, mark visited, record `0`.
  2. Recurse to smallest neighbor `1`, then `3`, backtrack to `1`, then `4`, back to `0`.
  3. Finally visit remaining neighbor `2`.

---

## 7. Common Pitfalls & Tips

* **Infinite Recursion:** Always mark `visited[u] = true` **before** recursing.
* **Stack Overflow:** For large/deep graphs, the recursion depth may exceed limits—use the iterative version or increase stack size.
* **Disconnected Graphs:** To cover all nodes, loop over all `u` and start DFS if unvisited.
* **Neighbor Order:** If a specific visitation order matters, sort each adjacency list (cost O(E log E) overall).
* **Undirected vs. Directed:** In undirected graphs, edges exist both ways—ensure you don’t revisit the parent.

---

## 8. Practice Problems

1. **Number of Islands** (LeetCode 200) – grid treated as graph
2. **Clone Graph** (LeetCode 133) – graph copying via DFS
3. **Course Schedule** (LeetCode 207) – cycle detection in directed graph
4. **Word Search** (LeetCode 79) – backtracking on 2D grid
5. **Connected Components in Undirected Graph** (LeetCode 547)

