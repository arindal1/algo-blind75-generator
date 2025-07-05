# 🐍 Backtracking Pattern Guide

---

## 1. Pattern Overview

* **Definition:**
  Backtracking incrementally builds candidates to the solution and abandons (“backtracks”) as soon as it determines a candidate cannot possibly lead to a valid solution.
* **Why It Matters:**

  * **Constraint Satisfaction:** Solves puzzles (N‑queens, Sudoku), combination and permutation generation.
  * **Exploration of Exponential Search Spaces:** Prunes infeasible branches early to cut down work.
  * **Framework for Recursive Search:** Foundation for DFS on implicit state trees with constraints.

---

## 2. Prerequisites

* **Data Structures:**

  * Arrays, vectors for current path
  * Boolean or integer markers (`used[]`, `visited[]`)
* **Language Features:**

  * Recursion and function parameters by reference
  * Passing lambdas or function pointers (optional)
* **Concepts:**

  * Recursive call stack
  * Pruning via early condition checks
  * Copying vs. in‑place modification of state

---

## 3. Recognition Checklist

* You must **generate all** valid configurations (permutations, subsets, partitions).
* You need to **search** for a path under constraints (maze, combination sum).
* Problem size (`n`) is small enough (<20) that exponential solutions (O(kⁿ)) are acceptable with pruning.
* Partial solutions can be **validated early** to prune branches.

---

## 4. Core Idea & Steps

1. **Define State & Choice Space:**

   * Identify parameters representing the current path and remaining options.
2. **Write Recursive Function:**

   ```cpp
   void backtrack(/* state parameters */) {
     if (goal reached) {
       record solution;
       return;
     }
     for (each candidate choice) {
       if (choice is valid) {
         make choice (modify state);
         backtrack(/* updated state */);
         undo choice (restore state);
       }
     }
   }
   ```
3. **Prune Early:**

   * Check constraints before diving deeper to avoid futile recursion.
   * Sort or precompute to enable fast validity checks.
4. **Collect Results:**

   * Accumulate complete solutions in a global or passed‑by‑reference container.

---

## 5. Code Template in C++

```cpp
#include <bits/stdc++.h>
using namespace std;

/*
  Backtracking namespace:
   - generate permutations
   - generate subsets
   - combination sum
*/
namespace Backtracking {
    // 1) Permutations of distinct nums
    void dfsPerm(vector<int>& nums, vector<bool>& used,
                 vector<int>& path, vector<vector<int>>& res) {
        if (path.size() == nums.size()) {
            res.push_back(path);
            return;
        }
        for (int i = 0; i < nums.size(); ++i) {
            if (used[i]) continue;
            used[i] = true;
            path.push_back(nums[i]);
            dfsPerm(nums, used, path, res);
            path.pop_back();
            used[i] = false;
        }
    }

    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> path;
        vector<bool> used(nums.size(), false);
        dfsPerm(nums, used, path, res);
        return res;
    }

    // 2) Subsets
    void dfsSub(int idx, vector<int>& nums,
                vector<int>& path, vector<vector<int>>& res) {
        res.push_back(path);
        for (int i = idx; i < nums.size(); ++i) {
            path.push_back(nums[i]);
            dfsSub(i + 1, nums, path, res);
            path.pop_back();
        }
    }

    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> path;
        dfsSub(0, nums, path, res);
        return res;
    }

    // 3) Combination Sum (candidates unlimited use)
    void dfsComb(int idx, int target, vector<int>& candidates,
                 vector<int>& path, vector<vector<int>>& res) {
        if (target == 0) {
            res.push_back(path);
            return;
        }
        if (target < 0) return;  // prune
        for (int i = idx; i < candidates.size(); ++i) {
            path.push_back(candidates[i]);
            dfsComb(i, target - candidates[i], candidates, path, res);
            path.pop_back();
        }
    }

    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> path;
        dfsComb(0, target, candidates, path, res);
        return res;
    }
}
```

---

## 6. Worked Example

**Problem (LeetCode 46 – Permutations):**

> Generate all permutations of `nums = [1,2,3]`.
> **Output:**
>
> ```
> [
>   [1,2,3],
>   [1,3,2],
>   [2,1,3],
>   [2,3,1],
>   [3,1,2],
>   [3,2,1]
> ]
> ```

```cpp
#include <bits/stdc++.h>
using namespace std;

void dfs(vector<int>& nums, vector<bool>& used,
         vector<int>& path, vector<vector<int>>& res) {
    if (path.size() == nums.size()) {
        res.push_back(path);
        return;
    }
    for (int i = 0; i < nums.size(); ++i) {
        if (used[i]) continue;
        used[i] = true;
        path.push_back(nums[i]);
        dfs(nums, used, path, res);
        path.pop_back();
        used[i] = false;
    }
}

vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    vector<bool> used(nums.size(), false);
    dfs(nums, used, path, res);
    return res;
}

int main() {
    vector<int> nums = {1,2,3};
    auto result = permute(nums);
    for (auto &v : result) {
        for (int x : v) cout << x;
        cout << "\n";
    }
    return 0;
}
```

---

## 7. Common Pitfalls & Tips

* **State Restoration:** Always undo modifications (pop/push, mark/unmark) after recursion.
* **Duplicate Candidates:** Sort and skip duplicates (`if (i>idx && nums[i]==nums[i-1]) continue;`).
* **Pruning Order:** Order choices to enable early failure (e.g., largest candidate first for combination sum).
* **Stack Depth:** Exponential depth equals solution length; ensure system stack can handle it or convert to iterative if needed.
* **Passing by Reference:** Pass result containers and path by reference to avoid excessive copying.

---

## 8. Practice Problems

1. **Permutations** (LeetCode 46)
2. **Subsets** (LeetCode 78)
3. **Combination Sum** (LeetCode 39)
4. **Word Search** (LeetCode 79)
5. **N‑Queens** (LeetCode 51)

