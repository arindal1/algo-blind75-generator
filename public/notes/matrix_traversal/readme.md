# 🥅 Matrix Traversal Pattern Guide

---

## 1. Pattern Overview

* **Definition:**
  Systematically visit or explore every cell in a 2D grid (matrix), typically using **depth‑first search** (DFS) or **breadth‑first search** (BFS), moving along allowed directions (e.g., up/down/left/right) while tracking visited cells.
* **Why It Matters:**

  * **Grid‑Based Problems:** Flood fill, island counting, maze solving.
  * **Connectivity & Region Detection:** Find connected components in 2D.
  * **Shortest Paths & Distances:** Compute minimum steps in unweighted grids.

---

## 2. Prerequisites

* **Data Structures:**

  * 2D arrays or `vector<vector<int>>`
  * Auxiliary 2D `visited` array (`vector<vector<bool>>`)
* **Language Features:**

  * Recursion or explicit `stack`/`queue`
  * Looping constructs
* **Concepts:**

  * DFS/BFS fundamentals
  * Boundary checks
  * Direction vectors for neighbors

---

## 3. Recognition Checklist

* You need to **explore** or **count** connected regions of cells sharing a property (e.g., same color, same value).
* You must **find shortest path** or minimum moves in a grid (unweighted).
* You’re implementing **flood fill**, **island counting**, **maze/word search**, or **perimeter calculation**.
* Constraints: grid dimensions up to 10³×10³—O(rows×cols) required.

---

## 4. Core Idea & Steps

1. **Define Directions:**

   ```cpp
   int dr[4] = { -1, 1, 0, 0 };
   int dc[4] = { 0, 0, -1, 1 };
   ```
2. **Initialize Visited:**

   ```cpp
   int R = grid.size(), C = grid[0].size();
   vector<vector<bool>> vis(R, vector<bool>(C, false));
   ```
3. **Choose Traversal Method:**

   * **DFS (recursive or stack):** dive deep from a start cell.
   * **BFS (queue):** layer‑by‑layer for shortest distances.
4. **Perform Boundary & Condition Checks:**

   ```cpp
   bool valid(int r, int c) {
       return r>=0 && r<R && c>=0 && c<C;
   }
   ```
5. **Traverse From Each Unvisited Start:**

   ```cpp
   for (int r = 0; r < R; ++r)
     for (int c = 0; c < C; ++c)
       if (!vis[r][c] && grid[r][c] == target)
         dfs(r, c);
   ```

---

## 5. Code Template in C++

```cpp
#include <bits/stdc++.h>
using namespace std;

int R, C;
vector<vector<int>> grid;
vector<vector<bool>> vis;
int dr[4] = { -1, 1, 0, 0 };
int dc[4] = { 0, 0, -1, 1 };

namespace MatrixTraversal {
    // 1) DFS flood‑fill/count
    void dfs(int r, int c, int target) {
        vis[r][c] = true;
        // process cell (r,c) as needed
        for (int k = 0; k < 4; ++k) {
            int nr = r + dr[k], nc = c + dc[k];
            if (nr>=0 && nr<R && nc>=0 && nc<C
                && !vis[nr][nc] && grid[nr][nc]==target) {
                dfs(nr, nc, target);
            }
        }
    }

    // 2) BFS shortest‑path from (sr,sc)
    int bfs(int sr, int sc, int tr, int tc) {
        queue<tuple<int,int,int>> q; // r, c, dist
        vis.assign(R, vector<bool>(C,false));
        vis[sr][sc] = true;
        q.emplace(sr, sc, 0);
        while (!q.empty()) {
            auto [r, c, d] = q.front(); q.pop();
            if (r==tr && c==tc) return d;
            for (int k = 0; k < 4; ++k) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr>=0 && nr<R && nc>=0 && nc<C
                    && !vis[nr][nc] && grid[nr][nc]!=BLOCKED) {
                    vis[nr][nc] = true;
                    q.emplace(nr, nc, d+1);
                }
            }
        }
        return -1; // unreachable
    }
}
```

---

## 6. Worked Example

**Problem (LeetCode 200 – Number of Islands):**

> Given a grid of `'1'`s (land) and `'0'`s (water), return the number of islands.
> **Input:**
>
> ```
> 1 1 0 0 0
> 1 1 0 0 0
> 0 0 1 0 0
> 0 0 0 1 1
> ```
>
> **Output:** `3`

```cpp
#include <bits/stdc++.h>
using namespace std;

int R, C;
vector<vector<char>> grid;
vector<vector<bool>> vis;
int dr[4]={-1,1,0,0}, dc[4]={0,0,-1,1};

void dfs(int r, int c) {
    vis[r][c]=true;
    for(int k=0;k<4;++k){
        int nr=r+dr[k], nc=c+dc[k];
        if(nr>=0&&nr<R&&nc>=0&&nc<C
           &&!vis[nr][nc] && grid[nr][nc]=='1'){
            dfs(nr,nc);
        }
    }
}

int numIslands(vector<vector<char>>& g) {
    grid = g;
    R = grid.size();
    C = grid[0].size();
    vis.assign(R, vector<bool>(C,false));
    int count = 0;
    for(int r=0;r<R;++r){
        for(int c=0;c<C;++c){
            if(!vis[r][c] && grid[r][c]=='1'){
                ++count;
                dfs(r,c);
            }
        }
    }
    return count;
}

int main(){
    vector<vector<char>> g = {
        {'1','1','0','0','0'},
        {'1','1','0','0','0'},
        {'0','0','1','0','0'},
        {'0','0','0','1','1'} };
    cout<<numIslands(g)<<"\n";  // prints 3
    return 0;
}
```

---

## 7. Common Pitfalls & Tips

* **Visited Tracking:** Always mark before recursing or enqueueing to avoid cycles.
* **Boundary Checks:** Encapsulate and reuse to avoid off‑by‑one errors.
* **Recursive Depth:** For large grids, DFS recursion may overflow—use an explicit stack or BFS.
* **Diagonal Directions:** Clarify if 8‑directional moves are allowed; adjust direction arrays.
* **State Mutation:** If you can modify input, you may “sink” visited cells by overwriting (e.g., set `'1'`→`'0'`).

---

## 8. Practice Problems

1. **Number of Islands** (LeetCode 200)
2. **Word Search** (LeetCode 79) – backtracking on 2D grid
3. **Shortest Path in Binary Matrix** (LeetCode 1091)
4. **Rotting Oranges** (LeetCode 994) – multi‑source BFS
5. **Surrounded Regions** (LeetCode 130) – boundary‑based DFS/BFS

