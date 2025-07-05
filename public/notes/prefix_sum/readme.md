# ➕ Prefix Sum Pattern Guide

---

## 1. Pattern Overview

* **Definition:**
  The Prefix Sum pattern builds an auxiliary array (`P`) where `P[i]` stores the sum of all elements up to index `i−1` in the original array. This lets you answer any range-sum query or detect subarray sums in **O(1)** time after an **O(n)** preprocessing step.
* **Why It Matters:**

  * **Range-Sum Queries:** Speed up repeated sum lookups between any two indices.
  * **Subarray‑Sum Problems:** Detect fixed‑sum or divisible‑sum subarrays via simple subtraction or hash‑based counting.
  * **Foundation for Higher‑Dimensional Variants:** Extends directly to 2D prefix sums for matrix queries.

---

## 2. Prerequisites

* **Data Structures:**

  * Arrays / Vectors
  * (Optional) Hash Map (`unordered_map`) for frequency counts
* **Language Features:**

  * 0‑based indexing
  * `long long` for sum accumulation
* **Concepts:**

  * Cumulative sums
  * Loop invariants
  * Subtraction to get range sums

---

## 3. Recognition Checklist

Look for these signals in a problem statement:

* You need to answer **many** sum queries over subarrays or subranges.
* You must find **any** subarray whose sum equals a given target (or divisible by `k`).
* Constraints:

  * `n` up to 10⁵ or larger (prevents O(n²) solutions).
  * Multiple queries or dynamic checks on the same array.

---

## 4. Core Idea & Steps

1. **Build the Prefix Array**

   ```cpp
   P[0] = 0;
   for (int i = 0; i < n; i++)
     P[i+1] = P[i] + nums[i];
   ```
2. **Answer Range-Sum Queries**

   * Sum of subarray `nums[l…r]` = `P[r+1] − P[l]`.
3. **Detect Fixed-Sum Subarrays**

   * **Brute‑force:** Check all `(i, j)` via two loops (O(n²)).
   * **Optimized:**

     * Maintain a hash map `count` of seen prefix sums.
     * For each `i`, let `curr = P[i]`.
     * You want `curr − prev = target` ⇒ `prev = curr − target`.
     * Add `count[curr]` to answer, then `count[P[i]]++`.

---

## 5. Code Template in C++

```cpp
#include <bits/stdc++.h>
using namespace std;

/*
  PrefixSum class supports:
   1) O(n) construction
   2) O(1) range-sum queries
   3) (Optional) count of subarrays summing to K in O(n)
*/
struct PrefixSum {
    vector<long long> P;           // size n+1
    unordered_map<long long,int> cnt; // for subarray-sum counts

    // 1) Build in O(n)
    PrefixSum(const vector<int>& nums, bool trackFreq = false) {
        int n = nums.size();
        P.assign(n+1, 0LL);
        for (int i = 0; i < n; i++)
            P[i+1] = P[i] + nums[i];
        if (trackFreq) {
            cnt.reserve(n*2);
            cnt[0] = 1;  // empty prefix
        }
    }

    // 2) Range-sum in O(1): sum of nums[l..r]
    long long rangeSum(int l, int r) {
        return P[r+1] - P[l];
    }

    // 3) Count subarrays summing to target in O(n)
    int countSubarrays(int target) {
        int ans = 0;
        for (auto curr : P) {
            // want prev = curr - target
            ans += cnt[curr - target];
            cnt[curr]++;
        }
        return ans;
    }
};
```

---

## 6. Worked Example

**Problem (LeetCode 560):**

> Given an integer array `nums` and an integer `k`, return the number of subarrays whose sum equals `k`.
> **Input:** `nums = [1,1,1]`, `k = 2`
> **Output:** `2`
> **Explanation:** Subarrays `[1,1]` at indices `(0,1)` and `(1,2)`.

```cpp
#include <bits/stdc++.h>
using namespace std;

int subarraySum(vector<int>& nums, int k) {
    int n = nums.size(), result = 0;
    vector<long long> P(n+1, 0);
    // Build prefix sums
    for (int i = 0; i < n; i++)
        P[i+1] = P[i] + nums[i];

    // Map to count frequencies of prefix sums
    unordered_map<long long,int> freq;
    freq[0] = 1;  // empty prefix

    // Iterate over each prefix sum
    for (long long curr : P) {
        // If a previous prefix had sum = curr - k, that subarray sums to k
        result += freq[curr - k];
        // Record current prefix for future matches
        freq[curr]++;
    }
    return result;
}

int main() {
    vector<int> nums = {1,1,1};
    int k = 2;
    cout << subarraySum(nums, k) << "\n";  // prints 2
    return 0;
}
```

* **Key Steps:**

  1. Compute `P = [0,1,2,3]`.
  2. As we scan `P`, at `curr=2` we see `freq[2−2]=freq[0]=1` → one match.
  3. At next `curr=3`, `freq[3−2]=freq[1]=1` → another match.

---

## 7. Common Pitfalls & Tips

* **Off‑by‑One Indexing:**
  Always shift prefix array by one: `P[0]=0`, so that sum of `nums[0..i]` is `P[i+1]`.
* **Integer Overflow:**
  Use `long long` if element values or `n` are large.
* **Hash‑Map Defaults:**
  Accessing `freq[x]` auto‑inserts `0` if `x` not present; leverage that for cleaner code.
* **Space vs. Time Trade‑off:**
  Tracking frequencies adds **O(n)** extra space but reduces to **O(n)** time from **O(n²)**.

---

## 8. Practice Problems

1. **Range Sum Query – Immutable** (LeetCode 303)
2. **Subarray Sum Equals K** (LeetCode 560)
3. **Subarray Sums Divisible by K** (LeetCode 974)
4. **Count Number of Nice Subarrays** (LeetCode 1248)
5. **Range Sum Query 2D – Immutable** (LeetCode 304)
