# 🪟 Sliding Window Pattern Guide

---

## 1. Pattern Overview

* **Definition:**
  The Sliding Window pattern maintains a moving subarray (window) defined by two pointers (usually `left` and `right`) that expand or contract to satisfy a condition over a contiguous sequence in **O(n)** time.
* **Why It Matters:**

  * Transforms many **O(n²)** brute‑force subarray scans into **O(n)** passes.
  * Ideal for problems involving sums, products, or other aggregate metrics over contiguous segments.
  * Foundation for variable‑length window challenges (minimum/maximum window size).

---

## 2. Prerequisites

* **Data Structures:**

  * Arrays or `vector<int>`
* **Language Features:**

  * Index variables and simple loops
* **Concepts:**

  * Two‑pointer technique
  * Cumulative metrics (sum, count)
  * While‑loop invariants

---

## 3. Recognition Checklist

* You must find the **smallest** or **largest** contiguous subarray meeting a condition (sum ≥ K, unique count ≤ K, etc.).
* You need to count or identify **all** subarrays whose aggregate metric lies within bounds.
* You’re optimizing over a **dynamic** window size (not fixed).
* Constraints: `n` up to 10⁵ or higher—nested loops too slow.

---

## 4. Core Idea & Steps

1. **Initialize:**

   ```cpp
   int left = 0, right = 0;
   aggregate = 0;  // sum, count, product, etc.
   ```
2. **Expand Window:**

   * Move `right` forward, updating `aggregate` to include `nums[right]`.
3. **Check Condition:**

   * While the window **satisfies** (or violates) the desired condition:

     * Record result (count, min‑length, max‑length, etc.).
     * **Contract**: remove `nums[left]` from `aggregate`, then `left++`.
4. **Repeat:**

   * Continue expanding with `right` until end of array.
   * Contract as needed each time the condition holds.

---

## 5. Code Template in C++

```cpp
#include <bits/stdc++.h>
using namespace std;

/*
  SlidingWindow:
   - minLengthSubarray: smallest subarray sum ≥ target
   - countSubarraysAtMostK: count subarrays with sum ≤ target
*/
namespace SlidingWindow {
    // 1) Minimum-length subarray with sum ≥ target
    int minLengthSubarray(const vector<int>& nums, int target) {
        int n = nums.size();
        int left = 0, right = 0;
        long long sum = 0;
        int minLen = INT_MAX;
        while (right < n) {
            sum += nums[right++];                 // expand window
            while (sum >= target) {               // contract when valid
                minLen = min(minLen, right - left);
                sum -= nums[left++];
            }
        }
        return (minLen == INT_MAX) ? 0 : minLen;
    }

    // 2) Count subarrays with sum ≤ target
    long long countSubarraysAtMostK(const vector<int>& nums, int K) {
        int left = 0;
        long long sum = 0, count = 0;
        for (int right = 0; right < nums.size(); right++) {
            sum += nums[right];
            while (sum > K) {
                sum -= nums[left++];
            }
            count += (right - left + 1);         // all windows ending at right
        }
        return count;
    }
}
```

---

## 6. Worked Example

**Problem (LeetCode 209 – Minimum Size Subarray Sum):**

> Given an array of positive integers `nums` and an integer `s`, return the minimal length of a contiguous subarray of which the sum is at least `s`. If none exists, return `0`.
> **Input:** `nums = [2,3,1,2,4,3]`, `s = 7`
> **Output:** `2`
> **Explanation:** The subarray `[4,3]` has sum = 7 and length = 2.

```cpp
#include <bits/stdc++.h>
using namespace std;

int minSubArrayLen(int s, vector<int>& nums) {
    int n = nums.size();
    int left = 0, right = 0;
    long long sum = 0;
    int minLen = INT_MAX;

    // Expand right pointer
    while (right < n) {
        sum += nums[right++];
        // Contract left pointer while window is valid
        while (sum >= s) {
            minLen = min(minLen, right - left);
            sum -= nums[left++];
        }
    }
    return (minLen == INT_MAX) ? 0 : minLen;
}

int main() {
    vector<int> nums = {2,3,1,2,4,3};
    int s = 7;
    cout << minSubArrayLen(s, nums) << "\n";  // prints 2
    return 0;
}
```

* **Key Annotations:**

  1. **`sum += nums[right++]`:** include new element and advance window end.
  2. **`while (sum >= s)`:** as soon as the window meets the target, record its length and **shrink** from the left to seek a smaller window.
  3. **Return 0** if no valid window found.

---

## 7. Common Pitfalls & Tips

* **Positive vs. Negative Values:**

  * Standard sliding window only works when all numbers are **non‑negative**.
  * With negatives, window sum isn’t monotonic; consider other techniques.
* **Off‑by‑One Errors:**

  * Be precise about when you increment `right` vs. use its value.
* **Window Metrics:**

  * For counts (e.g., number of valid windows), add `(right − left + 1)`, not just `1`.
* **Reset Between Calls:**

  * Always reinitialize `left`, `sum`, and `result` for separate function calls.

---

## 8. Practice Problems

1. **Minimum Size Subarray Sum** (LeetCode 209)
2. **Subarrays with K Different Integers** (LeetCode 992)
3. **Longest Substring Without Repeating Characters** (LeetCode 3)
4. **Permutation in String** (LeetCode 567)
5. **Fruit Into Baskets** (LeetCode 904)