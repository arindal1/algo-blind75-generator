# ⤵️ Monotonic Stack Pattern Guide

---

## 1. Pattern Overview

* **Definition:**
  A Monotonic Stack is a stack data structure that maintains its elements in strictly increasing or strictly decreasing order (by value or key). As you iterate through your data, you push new elements while popping any that violate the monotonic invariant.
* **Why It Matters:**

  * **Next/Previous Greater/Smaller:** Find the nearest neighbor satisfying a comparison in **O(n)**.
  * **Sliding Window Max/Min:** Efficiently track window extremes.
  * **Histogram & Rainwater:** Compute largest rectangle or trapped water via boundary spans.

---

## 2. Prerequisites

* **Data Structures:**

  * `vector` or raw array
  * `stack` (or manually managed `vector<int>` as stack)
* **Language Features:**

  * Zero‑based indexing
  * `pair<int,int>` or custom struct for storing value/index
* **Concepts:**

  * Amortized analysis (each element pushed/popped once)
  * Comparison operators (`<`, `>`)

---

## 3. Recognition Checklist

Look for these signals:

* You need **nearest greater/smaller** element to the left or right for each position.
* You must compute the **maximum or minimum** over a sliding window.
* You’re solving **largest rectangle in histogram** or **trapping rain water**.
* An **amortized O(n)** bound is required and a naive O(n²) is too slow.

---

## 4. Core Idea & Steps

1. **Choose Monotonicity:**

   * Increasing stack ⇒ top is smallest; pop while **new ≤ top**.
   * Decreasing stack ⇒ top is largest; pop while **new ≥ top**.
2. **Iterate Over Elements:**

   ```cpp
   for (int i = 0; i < n; ++i) {
       while (!st.empty() && compare(nums[i], nums[st.top()])) {
           // process st.top() with respect to nums[i]
           st.pop();
       }
       st.push(i);  // or push value/index pair
   }
   ```
3. **Post‑Iteration Cleanup:**

   * For “next greater” you may assign `-1` to remaining indices.
   * For histogram, pop all to compute widths: width = `n - index_of_new_top - 1`.
4. **Record Results:**

   * Whenever you pop, you know the span/neighbor relationship.

---

## 5. Code Template in C++

```cpp
#include <bits/stdc++.h>
using namespace std;

/*
  MonotonicStack namespace provides:
   1) Next Greater Element to the right
   2) Next Smaller Element to the left
   3) Sliding Window Maximum
*/
namespace MonotonicStack {
    // 1) Next Greater Element (to the right)
    vector<int> nextGreater(const vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(n, -1);
        stack<int> st;  // store indices, decreasing stack

        for (int i = 0; i < n; ++i) {
            while (!st.empty() && nums[i] > nums[st.top()]) {
                ans[st.top()] = nums[i];
                st.pop();
            }
            st.push(i);
        }
        return ans;
    }

    // 2) Next Smaller Element (to the left)
    vector<int> prevSmaller(const vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(n, -1);
        stack<int> st;  // store indices, increasing stack

        for (int i = 0; i < n; ++i) {
            while (!st.empty() && nums[i] <= nums[st.top()]) {
                st.pop();
            }
            if (!st.empty()) ans[i] = nums[st.top()];
            st.push(i);
        }
        return ans;
    }

    // 3) Sliding Window Maximum
    vector<int> maxSlidingWindow(const vector<int>& nums, int k) {
        int n = nums.size();
        deque<int> dq;       // store indices, front = max
        vector<int> ans;
        for (int i = 0; i < n; ++i) {
            // remove indices outside window
            if (!dq.empty() && dq.front() == i - k) dq.pop_front();
            // maintain decreasing deque
            while (!dq.empty() && nums[i] >= nums[dq.back()]) dq.pop_back();
            dq.push_back(i);
            if (i >= k - 1) ans.push_back(nums[dq.front()]);
        }
        return ans;
    }
}
```

---

## 6. Worked Example

**Problem (LeetCode 496 – Next Greater Element I):**

> Given `nums = [2,1,2,4,3]`, return the array of next greater elements: `[-1,2,4,-1,-1]`.

```cpp
#include <bits/stdc++.h>
using namespace std;

vector<int> nextGreaterElement(vector<int>& nums) {
    int n = nums.size();
    vector<int> ans(n, -1);
    stack<int> st;  // indices, decreasing by value

    for (int i = 0; i < n; ++i) {
        while (!st.empty() && nums[i] > nums[st.top()]) {
            ans[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return ans;
}

int main() {
    vector<int> nums = {2,1,2,4,3};
    vector<int> res = nextGreaterElement(nums);
    for (int x : res) cout << x << " ";
    // Output: -1 2 4 -1 -1
    return 0;
}
```

* **Annotations:**

  1. **Stack Invariant:** elements’ indices in `st` have strictly decreasing `nums` values.
  2. **When `nums[i]` arrives:** it’s the first greater for all popped indices.
  3. **Remaining stack:** no greater element → default `-1`.

---

## 7. Common Pitfalls & Tips

* **Equal Elements:** Decide if equal should pop (use `>=`) or be retained (`>`).
* **Index vs. Value:** Store indices for span calculations; store values only when index isn’t needed.
* **Window Boundaries:** In sliding window, always expel out‑of‑window indices before pushing.
* **Empty‑Stack Checks:** Always guard `st.top()` or `dq.front()` with a non‑empty check.

---

## 8. Practice Problems

1. **Next Greater Element I & II** (LeetCode 496, 503)
2. **Largest Rectangle in Histogram** (LeetCode 84)
3. **Sliding Window Maximum** (LeetCode 239)
4. **Daily Temperatures** (LeetCode 739)
5. **Trapping Rain Water** (LeetCode 42)
