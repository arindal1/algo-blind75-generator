# 💪🏼 Dynamic Programming Pattern Guide

---

## 1. Pattern Overview

* **Definition:**
  Dynamic Programming (DP) breaks a complex problem into overlapping subproblems, solves each subproblem once, and stores its solution to avoid redundant work.
* **Why It Matters:**

  * Transforms exponential brute‑force into polynomial‑time solutions.
  * Handles optimization, counting, and decision problems with optimal substructure and overlapping subproblems.
  * Foundation for advanced algorithms in strings, trees, graphs, and more.

---

## 2. Prerequisites

* **Data Structures:**

  * Arrays or matrices for DP tables
  * (Optional) Hash maps for memoization
* **Language Features:**

  * Fixed‑size containers (`vector`)
  * Recursion (for top‑down DP)
* **Concepts:**

  * Optimal substructure: optimal solution built from optimal sub‑solutions
  * Overlapping subproblems: repeated computation across recursive calls
  * State definition: identifying parameters that describe each subproblem

---

## 3. Recognition Checklist

Look for problems that:

* Can be phrased as “What is the **best**, **count**, or **feasible** solution up to index `i` (or capacity `w`, length `l`, etc.)?”
* Have **overlapping** recursive structure (same call appears multiple times).
* Exhibit a **choice** at each step that leads to smaller subproblems.
* Constraints `n` up to 10³–10⁴ where exponential recursion is infeasible.

---

## 4. Core Idea & Steps

1. **Define the DP State:**

   * Identify parameters `(i, …)` and what `dp[i][…]` represents (e.g., max value using first `i` items).
2. **Derive the Recurrence:**

   * Express `dp[i][…]` in terms of smaller states:

     ```
     dp[i][w] = max(
       dp[i-1][w],                    // skip item i
       dp[i-1][w - weight[i]] + value[i]  // take item i (if w ≥ weight[i])
     )
     ```
3. **Base Cases:**

   * Initialize `dp[0][*] = 0` (no items) and `dp[*][0] = 0` (zero capacity).
4. **Choose Implementation Style:**

   * **Bottom‑Up:** Fill table in increasing order of states.
   * **Top‑Down (Memoization):** Recursively compute with caching.
5. **Optimize Space (Optional):**

   * If recurrence only depends on `i−1`, use a 1D array and iterate capacity backward.

---

## 5. Code Template in C++

```cpp
#include <bits/stdc++.h>
using namespace std;

/*
  0/1 Knapsack bottom‑up:
   - n items, capacity W
   - weights w[i], values v[i]
   - dp[i][j] = max value using first i items at capacity j
*/
int knapsack(const vector<int>& w, const vector<int>& v, int W) {
    int n = w.size();
    vector<vector<int>> dp(n+1, vector<int>(W+1, 0));
    for (int i = 1; i <= n; ++i) {
        for (int cap = 0; cap <= W; ++cap) {
            // 1) skip item i
            dp[i][cap] = dp[i-1][cap];
            // 2) take item i
            if (cap >= w[i-1]) {
                dp[i][cap] = max(
                    dp[i][cap],
                    dp[i-1][cap - w[i-1]] + v[i-1]
                );
            }
        }
    }
    return dp[n][W];
}

// Optional 1D optimization
int knapsackOptim(const vector<int>& w, const vector<int>& v, int W) {
    int n = w.size();
    vector<int> dp(W+1, 0);
    for (int i = 0; i < n; ++i) {
        for (int cap = W; cap >= w[i]; --cap) {
            dp[cap] = max(dp[cap], dp[cap - w[i]] + v[i]);
        }
    }
    return dp[W];
}
```

---

## 6. Worked Example

**Problem (LeetCode 416 variant – maximize value):**

> Given `weights = [3,4,5]`, `values = [7,8,9]`, capacity `W = 7`, find the maximum total value.
> **Input:** `w = [3,4,5], v = [7,8,9], W = 7`
> **Output:** `15`
> **Explanation:** Take items 1 and 2 (3+4=7, value=7+8=15).

```cpp
#include <bits/stdc++.h>
using namespace std;

// Bottom‑up DP as above
int main() {
    vector<int> w = {3, 4, 5};
    vector<int> v = {7, 8, 9};
    int W = 7;
    int result = knapsack(w, v, W);
    cout << result << "\n";  // prints 15
    return 0;
}
```

* **Table Construction:**

  * `dp[0][*] = 0` (no items)
  * `i=1`: can only take item 1 for capacities ≥3 → `dp[1][3..7] = 7`
  * `i=2`: for cap=7, either skip (7) or take both (7+8=15) → `dp[2][7] = 15`
  * `i=3`: item 3 weight=5, but combining with item 1 gives value=16? No, weight 3+5=8>7 → `dp[3][7] = 15`

---

## 7. Common Pitfalls & Tips

* **State Definition Errors:** Misdefining `dp[i][j]` leads to wrong recurrences.
* **Iteration Order:** For 1D arrays, iterate capacity **backward** to avoid reuse of the current row.
* **Large Dimensions:** 2D DP with `n×W` may exceed memory if both are large; consider alternative strategies or compressing state.
* **Integer Overflow:** Use `long long` if values or sums can exceed 2³¹−1.
* **Memoization Stack Depth:** Top‑down recursion may overflow; prefer bottom‑up for deep state spaces.

---

## 8. Practice Problems

1. **0/1 Knapsack** (classic DP)
2. **Coin Change II** (count ways to make amount)
3. **Longest Common Subsequence** (2D string DP)
4. **House Robber** (1D DP on array)
5. **Unique Paths** (grid DP)
