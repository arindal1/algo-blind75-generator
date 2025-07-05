# 🪶 Modified Binary Search Pattern Guide

---

## 1. Pattern Overview

* **Definition:**
  A “Modified Binary Search” tweaks the classic binary‑search template (`while (lo ≤ hi) mid = lo+(hi−lo)/2 …`) by changing the condition or update rules to solve variants on sorted data or unimodal sequences in **O(log n)** time.
* **Why It Matters:**

  * **Boundary Searches:** Find first/last occurrence, lower/upper bounds.
  * **Rotated Arrays & Peaks:** Locate elements in a rotated sorted array or find the maximum in a bitonic (mountain) array.
  * **Root & Inverse Problems:** Compute integer square roots, search in virtual/implicit arrays.

---

## 2. Prerequisites

* **Data Structures:**

  * Arrays (`vector<int>`)
* **Language Features:**

  * Integer division (`/`)
  * 64‑bit arithmetic (`long long`) for midpoint and comparisons
* **Concepts:**

  * Loop invariants
  * Monotonic predicates (true ↦ false or vice versa)
  * Overflow avoidance in `mid` calculation

---

## 3. Recognition Checklist

* Input is **sorted**, **rotated**, or **bitonic**, and you need faster than O(n).
* You must find the **first** or **last** index satisfying a predicate (≥, ≤, =).
* You need to search a **rotated** sorted array (pivot unknown).
* You must find the **peak** in a mountain array.
* Constraints: **n** up to 10⁵–10⁶; O(n) scans are too slow.

---

## 4. Core Idea & Steps

1. **Identify the Monotonic Predicate:**

   * E.g., “Is `nums[mid] < target`?” for lower bound.
   * E.g., “Is `nums[mid] ≥ nums[mid+1]`?” for peak search.
2. **Initialize Bounds:**

   ```cpp
   int lo = 0, hi = n - 1;
   ```
3. **Loop Until Convergence:**

   ```cpp
   while (lo < hi) {
     int mid = lo + (hi - lo) / 2;
     if (predicate(mid)) 
       lo = mid + 1;     // or hi = mid, depending on true/false branch
     else
       hi = mid;
   }
   ```
4. **Post‑Process Result:**

   * `lo` (or `hi`) is the boundary index.
   * Validate `nums[lo]` if searching for an exact match.
5. **For Rotated Arrays:**

   * In each iteration, determine which half is sorted.
   * Restrict search to half that can contain the target.

---

## 5. Code Template in C++

```cpp
#include <bits/stdc++.h>
using namespace std;

/*
  ModifiedBinarySearch namespace:
   - lowerBound: first idx with nums[idx] ≥ target
   - upperBound: first idx with nums[idx] > target
   - searchRotated: idx of target in rotated sorted array or -1
   - findPeak: peak idx in bitonic array
*/
namespace ModifiedBinarySearch {
    // 1) lower_bound emulation
    int lowerBound(const vector<int>& nums, int target) {
        int lo = 0, hi = nums.size();  // [lo, hi)
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) 
                lo = mid + 1;
            else 
                hi = mid;
        }
        return lo;  // may be nums.size() if not found
    }

    // 2) upper_bound emulation
    int upperBound(const vector<int>& nums, int target) {
        int lo = 0, hi = nums.size();
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] <= target)
                lo = mid + 1;
            else
                hi = mid;
        }
        return lo;
    }

    // 3) search in rotated sorted array
    int searchRotated(const vector<int>& nums, int target) {
        int lo = 0, hi = nums.size() - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) return mid;
            // left half sorted?
            if (nums[lo] <= nums[mid]) {
                if (nums[lo] <= target && target < nums[mid])
                    hi = mid - 1;
                else
                    lo = mid + 1;
            } else {
                // right half sorted
                if (nums[mid] < target && target <= nums[hi])
                    lo = mid + 1;
                else
                    hi = mid - 1;
            }
        }
        return -1;
    }

    // 4) find peak in bitonic (strictly increasing then decreasing)
    int findPeak(const vector<int>& nums) {
        int lo = 0, hi = nums.size() - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < nums[mid + 1])
                lo = mid + 1;  // peak is to the right
            else
                hi = mid;      // peak is at mid or left
        }
        return lo;
    }
}
```

---

## 6. Worked Example

**Problem (LeetCode 33 – Search in Rotated Sorted Array):**

> Given a rotated sorted array `nums = [4,5,6,7,0,1,2]` and `target = 0`, return its index, or `-1` if not found.
> **Input:** `nums = [4,5,6,7,0,1,2]`, `target = 0`
> **Output:** `4`

```cpp
#include <bits/stdc++.h>
using namespace std;

int searchRotated(const vector<int>& nums, int target) {
    int lo = 0, hi = nums.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        // Determine sorted half
        if (nums[lo] <= nums[mid]) {            // left sorted
            if (nums[lo] <= target && target < nums[mid])
                hi = mid - 1;                   // target in left
            else
                lo = mid + 1;                   // search right
        } else {                                 // right sorted
            if (nums[mid] < target && target <= nums[hi])
                lo = mid + 1;                   // target in right
            else
                hi = mid - 1;                   // search left
        }
    }
    return -1;
}

int main() {
    vector<int> nums = {4,5,6,7,0,1,2};
    cout << searchRotated(nums, 0) << "\n";   // prints 4
    return 0;
}
```

* **Key Annotations:**

  1. Check equality at `mid`.
  2. Use `nums[lo] ≤ nums[mid]` to detect which half is sorted.
  3. Restrict `lo`/`hi` based on whether `target` lies in the sorted half.

---

## 7. Common Pitfalls & Tips

* **Midpoint Overflow:** Always compute `mid = lo + (hi−lo)/2`.
* **Infinite Loops:** Ensure loop bounds shrink (`lo = mid+1` or `hi = mid-1` for `≤` variant).
* **Edge Conditions:** Distinguish `while (lo < hi)` vs. `while (lo ≤ hi)` clearly.
* **Equal Elements:** With duplicates, rotated‑array search may require extra checks to skip equals.
* **Predicate Monotonicity:** Only apply when the predicate splits the search space in two monotonic halves.

---

## 8. Practice Problems

1. **Binary Search** (LeetCode 704) – classic exact match
2. **First Bad Version** (LeetCode 278) – lower bound on predicate
3. **Search in Rotated Sorted Array** (LeetCode 33, 81 with duplicates)
4. **Find Peak Element** (LeetCode 162)
5. **Sqrt(x)** (LeetCode 69) – integer square root via boundary search

