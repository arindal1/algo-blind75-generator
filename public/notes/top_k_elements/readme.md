# 🔝 Top K Elements Pattern Guide

---

## 1. Pattern Overview

* **Definition:**
  The Top K Elements pattern finds the K largest or smallest items in a collection efficiently, using data structures (heaps) or selection algorithms (Quickselect) to avoid full sorting.
* **Why It Matters:**

  * **Performance:** Extract top K out of N in **O(n log K)** time versus **O(n log n)** full sort.
  * **Streaming Data:** Maintain a running top K with a fixed‑size heap.
  * **Order Statistics:** Foundation for median‐finding and percentile calculations.

---

## 2. Prerequisites

* **Data Structures:**

  * Min‑heap (`priority_queue` with inverted comparator)
  * Max‑heap (default `priority_queue`)
* **Language Features:**

  * `std::priority_queue`
  * Randomized partitioning for Quickselect
* **Concepts:**

  * Heap invariants (push/pop cost)
  * Divide‑and‑conquer selection
  * Zero‑based indexing

---

## 3. Recognition Checklist

* You need **K largest** or **K smallest** elements from an unsorted array.
* **K** is significantly smaller than **N** (e.g., K ≪ N).
* You must process a **stream** or large dataset without storing all elements.
* Full sort (**O(n log n)**) is too slow for your constraints.

---

## 4. Core Idea & Steps

1. **Heap Approach (O(n log K)):**

   * **Find K largest:**

     * Maintain a **min‑heap** of size K.
     * For each element:

       * Push into heap.
       * If heap size > K, pop the smallest.
     * Heap holds K largest.
   * **Find K smallest:**

     * Maintain a **max‑heap** of size K.
2. **Quickselect Approach (Average O(n)):**

   * Choose a random pivot.
   * Partition array into `< pivot`, `== pivot`, `> pivot`.
   * Recurse on the side containing the Kth element until pivot ranks at K.
3. **Streaming Variation:**

   * Continuously push new items, pop when size exceeds K.
   * At any point, heap contains current top K.

---

## 5. Code Template in C++

```cpp
#include <bits/stdc++.h>
using namespace std;

namespace TopK {
    // 1) K largest via min-heap (O(n log K))
    vector<int> kLargest(const vector<int>& nums, int K) {
        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (int x : nums) {
            minHeap.push(x);
            if (minHeap.size() > K)
                minHeap.pop();
        }
        vector<int> res;
        while (!minHeap.empty()) {
            res.push_back(minHeap.top());
            minHeap.pop();
        }
        reverse(res.begin(), res.end());  // largest first
        return res;
    }

    // 2) Quickselect for K-th largest (in-place average O(n))
    int quickselect(vector<int>& A, int left, int right, int K) {
        int pivot = A[left + rand() % (right - left + 1)];
        int i = left, j = right;
        while (i <= j) {
            while (A[i] > pivot) i++;
            while (A[j] < pivot) j--;
            if (i <= j) swap(A[i++], A[j--]);
        }
        int cnt = j - left + 1;  // # greater than pivot
        if (K <= cnt) return quickselect(A, left, j, K);
        if (K > (i - left)) return quickselect(A, i, right, K - (i - left));
        return A[j + 1];
    }

    // Helper to get K-th largest element
    int findKthLargest(vector<int>& nums, int K) {
        return quickselect(nums, 0, nums.size() - 1, K);
    }
}
```

---

## 6. Worked Example

**Problem (LeetCode 215 – Kth Largest Element in an Array):**

> Given `nums = [3,2,1,5,6,4]`, `K = 2`, return the 2nd largest element.
> **Output:** `5`

```cpp
#include <bits/stdc++.h>
using namespace std;

int findKthLargest(vector<int>& nums, int K) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int x : nums) {
        minHeap.push(x);
        if (minHeap.size() > K) 
            minHeap.pop();
    }
    return minHeap.top();
}

int main() {
    vector<int> nums = {3,2,1,5,6,4};
    int K = 2;
    cout << findKthLargest(nums, K) << "\n";  // prints 5
    return 0;
}
```

* **Key Steps:**

  1. Push `3,2` → heap = `[2,3]`.
  2. Push `1` → heap = `[1,3]` (pop `2`).
  3. Push `5` → heap = `[3,5]` (pop `1`).
  4. Push `6` → heap = `[5,6]` (pop `3`).
  5. Push `4` → heap = `[5,6]` (pop `4`).
  6. Top of heap = `5`.

---

## 7. Common Pitfalls & Tips

* **Heap Size Management:** Always pop immediately when size exceeds K.
* **K = 0 or K > N:** Validate inputs; return empty or error.
* **Random Pivot Edge Cases:** Worst‐case Quickselect is O(n²)—randomize pivot to avoid adversarial inputs.
* **Space vs. Time Trade‑off:** Heaps use O(K) extra space; Quickselect is in‑place.

---

## 8. Practice Problems

1. **Kth Largest Element in an Array** (LeetCode 215)
2. **Top K Frequent Elements** (LeetCode 347)
3. **K Closest Points to Origin** (LeetCode 973)
4. **Stream of Characters – Running Median** (design problem)
5. **Sliding Window Median** (LeetCode 480)
