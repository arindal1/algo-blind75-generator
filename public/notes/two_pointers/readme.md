# 2️⃣ Two Pointers Pattern Guide

---

### 1. Pattern Overview

* **Definition:**
  The Two Pointers pattern uses two indices that traverse the data structure (usually an array or linked list) at different speeds, directions, or start points to reduce nested loops into a linear pass.
* **Why It Matters:**

  * **Eliminate O(n²) Scans:** Combine loops into one pass.
  * **Solve Pair‑and‑Triplet Problems:** Find pairs/triples achieving a target sum.
  * **Partitioning & Merging:** Merge sorted lists, remove duplicates, or partition arrays in‑place.

---

### 2. Prerequisites

* **Data Structures:**

  * Arrays or sorted arrays
  * Linked lists (for slow/fast pointer)
* **Language Features:**

  * Indexing (`vector` or raw array)
  * Two‑index variable management
* **Concepts:**

  * Sorting (if data isn’t already ordered)
  * In‑place swapping
  * Loop invariants

---

### 3. Recognition Checklist

* Problem asks for **finding pairs** (or k‑tuples) that sum to a target in a sorted context.
* You need to **remove or partition** elements in‑place (e.g., duplicates, zeros).
* Detect or count subarrays/subsequences with **constraints** on order or distance.
* Merge two sorted sequences into one sorted output.
* Constraints: `n` up to 10⁵—nested loops too slow.

---

### 4. Core Idea & Steps

1. **Initialize Pointers**

   * **Opposite Ends:** `l = 0`, `r = n−1` (for sum pairs)
   * **Sliding Window:** `l = 0`, `r = 0` (for variable window)
   * **Slow/Fast:** `slow = head`, `fast = head->next` (for linked lists)
2. **Advance According to Comparison**

   * **Sum Too Small ➔** `l++` or `slow = slow->next`
   * **Sum Too Large ➔** `r--`
3. **Record or Modify**

   * When condition met (sum == target or window valid), record result or adjust window; then move one or both pointers.
4. **Terminate** when pointers cross (`l ≥ r`) or reach end (`fast == nullptr`).

---

### 5. Code Template in C++

```cpp
#include <bits/stdc++.h>
using namespace std;

/*
  TwoPointers functions:
   - find pair sum == target in sorted array
   - remove duplicates in-place
   - merge two sorted arrays
*/
namespace TwoPointers {
    // 1) Find one pair summing to target
    pair<int,int> findPair(const vector<int>& a, int target) {
        int l = 0, r = a.size() - 1;
        while (l < r) {
            int sum = a[l] + a[r];
            if (sum == target)
                return {l, r};
            else if (sum < target)
                l++;
            else
                r--;
        }
        return {-1, -1};  // not found
    }

    // 2) Remove duplicates from sorted array, return new length
    int removeDuplicates(vector<int>& a) {
        if (a.empty()) return 0;
        int slow = 0;
        for (int fast = 1; fast < a.size(); fast++) {
            if (a[fast] != a[slow]) {
                a[++slow] = a[fast];
            }
        }
        return slow + 1;
    }

    // 3) Merge two sorted arrays into result
    vector<int> mergeSorted(const vector<int>& A, const vector<int>& B) {
        int i = 0, j = 0;
        vector<int> ans;
        while (i < A.size() && j < B.size()) {
            if (A[i] <= B[j]) ans.push_back(A[i++]);
            else              ans.push_back(B[j++]);
        }
        while (i < A.size()) ans.push_back(A[i++]);
        while (j < B.size()) ans.push_back(B[j++]);
        return ans;
    }
}
```

---

### 6. Worked Example

**Problem:** Given sorted `nums = [1,2,4,5,6]` and `target = 7`, find one pair that sums to 7.

* **Input:** `nums = [1,2,4,5,6]`, `target = 7`
* **Output:** Indices `(1, 4)` because `2 + 5 = 7`

```cpp
#include <bits/stdc++.h>
using namespace std;

pair<int,int> twoSumSorted(const vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while (l < r) {
        int sum = nums[l] + nums[r];
        if (sum == target)
            return {l, r};
        else if (sum < target)
            l++;
        else
            r--;
    }
    return {-1, -1};
}

int main() {
    vector<int> nums = {1,2,4,5,6};
    int target = 7;
    auto ans = twoSumSorted(nums, target);
    // ans = {1,4}
    cout << ans.first << ", " << ans.second << "\n";
    return 0;
}
```

---

### 7. Common Pitfalls & Tips

* **Unsorted Input:** Always sort first if order not guaranteed—mind the extra O(n log n).
* **Pointer Updates:** After a match, ensure pointers move to avoid infinite loops.
* **In‑Place Edits:** When removing or overwriting, maintain a slow pointer for placement.
* **Edge Cases:**

  * Empty or single‑element arrays (`n < 2`).
  * All elements identical (duplicates removal).
  * Overflow in sum—use `long long` if values large.

---

### 8. Practice Problems

1. **Two Sum II – Input Array Is Sorted** (LeetCode 167)
2. **Container With Most Water** (LeetCode 11)
3. **Remove Duplicates from Sorted Array** (LeetCode 26)
4. **Valid Palindrome II** (LeetCode 680)
5. **Minimum Size Subarray Sum** (Sliding window variant, LeetCode 209)
