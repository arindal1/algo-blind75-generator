# 🎟️ Overlapping Intervals Pattern Guide

---

## 1. Pattern Overview

* **Definition:**
  The Overlapping Intervals pattern processes a collection of intervals (pairs of start/end points) to merge, count, or query overlapping segments by first **sorting** and then **iterating** through them in one pass.
* **Why It Matters:**

  * **Merge Intervals:** Consolidate overlapping ranges into disjoint intervals.
  * **Count/Detect Overlaps:** Determine if any intervals collide or how many at a given point.
  * **Scheduling & Resource Allocation:** Allocate non‑conflicting time slots or identify peak concurrency.

---

## 2. Prerequisites

* **Data Structures:**

  * `vector<pair<int,int>>` (or custom `struct Interval { int start, end; }`)
* **Language Features:**

  * `std::sort` with a custom comparator
  * Simple loops and in‑place `vector` modifications
* **Concepts:**

  * Sorting by one key (start time)
  * Greedy merging
  * Sweep‑line idea (optional for advanced overlap counts)

---

## 3. Recognition Checklist

* You have a list of intervals (start, end) and need to:

  * **Merge** overlapping ones into consolidated ranges.
  * **Insert** or **remove** an interval and adjust overlaps.
  * **Count** how many intervals cover a given point or the maximum number overlapping.
* Constraints: `n` up to 10⁵—O(n²) pairwise checks are too slow.

---

## 4. Core Idea & Steps

1. **Sort by Start Time:**

   ```cpp
   sort(intervals.begin(), intervals.end(),
        [](auto &a, auto &b){ return a.first < b.first; });
   ```
2. **Initialize Merged List:**

   ```cpp
   vector<pair<int,int>> merged;
   merged.push_back(intervals[0]);
   ```
3. **Iterate & Merge:**

   ```cpp
   for (int i = 1; i < intervals.size(); ++i) {
     auto &[lastStart, lastEnd] = merged.back();
     auto &[curStart, curEnd] = intervals[i];

     if (curStart <= lastEnd) {
       // Overlaps: extend the end
       lastEnd = max(lastEnd, curEnd);
     } else {
       // No overlap: add new interval
       merged.push_back(intervals[i]);
     }
   }
   ```
4. **Return Result:**

   * `merged` contains non‑overlapping, sorted intervals.

---

## 5. Code Template in C++

```cpp
#include <bits/stdc++.h>
using namespace std;

/*
  OverlappingIntervals namespace provides:
   - mergeIntervals: merge all overlapping intervals
   - canAttendAll: detect any overlaps
   - maxOverlap: count maximum concurrent intervals
*/
namespace OverlappingIntervals {
    // 1) Merge intervals
    vector<pair<int,int>> mergeIntervals(vector<pair<int,int>>& intervals) {
        if (intervals.empty()) return {};
        sort(intervals.begin(), intervals.end(),
             [](auto &a, auto &b){ return a.first < b.first; });

        vector<pair<int,int>> merged;
        merged.push_back(intervals[0]);
        for (int i = 1; i < intervals.size(); ++i) {
            auto &[s, e] = intervals[i];
            auto &last = merged.back();
            if (s <= last.second) {
                last.second = max(last.second, e);
            } else {
                merged.push_back({s, e});
            }
        }
        return merged;
    }

    // 2) Can attend all meetings? (no overlaps)
    bool canAttendAll(vector<pair<int,int>>& intervals) {
        auto merged = mergeIntervals(intervals);
        // if merging reduced count, there was overlap
        return merged.size() == intervals.size();
    }

    // 3) Maximum number of overlapping intervals
    int maxOverlap(vector<pair<int,int>>& intervals) {
        vector<pair<int,int>> events;
        for (auto &in : intervals) {
            events.push_back({in.first, +1});   // start
            events.push_back({in.second, -1});  // end
        }
        sort(events.begin(), events.end());
        int curr = 0, best = 0;
        for (auto &ev : events) {
            curr += ev.second;
            best = max(best, curr);
        }
        return best;
    }
}
```

---

## 6. Worked Example

**Problem:** Merge `[[1,3],[2,6],[8,10],[15,18]]` into disjoint intervals.

* **Input:** `intervals = {{1,3},{2,6},{8,10},{15,18}}`
* **Output:** `{{1,6},{8,10},{15,18}}`

```cpp
#include <bits/stdc++.h>
using namespace std;

vector<pair<int,int>> mergeIntervals(vector<pair<int,int>>& intervals) {
    sort(intervals.begin(), intervals.end(),
         [](auto &a, auto &b){ return a.first < b.first; });
    vector<pair<int,int>> merged;
    merged.push_back(intervals[0]);

    for (int i = 1; i < intervals.size(); ++i) {
        auto &[s, e] = intervals[i];
        auto &last = merged.back();
        // Overlap check
        if (s <= last.second) {
            last.second = max(last.second, e);  // extend
        } else {
            merged.push_back({s, e});           // no overlap
        }
    }
    return merged;
}

int main() {
    vector<pair<int,int>> intervals = {{1,3},{2,6},{8,10},{15,18}};
    auto res = mergeIntervals(intervals);
    for (auto &p : res)
        cout << "[" << p.first << "," << p.second << "] ";
    // Prints: [1,6] [8,10] [15,18]
    return 0;
}
```

---

## 7. Common Pitfalls & Tips

* **Sorting Key:** Always sort by **start**; if starts tie, sorting by end is optional but consistent.
* **Inclusive vs. Exclusive:** Decide whether `[a,b]` and `[b,c]` overlap (here we treat `s ≤ lastEnd` as overlap).
* **Integer Overflow:** For very large endpoints, ensure no overflow when comparing or taking `max`.
* **Empty Input:** Handle `intervals.empty()` before accessing `intervals[0]`.
* **Event Sorting Tie‑Breakers:** In sweep‑line, start events (`+1`) should come before end events (`–1`) at the same time.

---

## 8. Practice Problems

1. **Merge Intervals** (LeetCode 56)
2. **Insert Interval** (LeetCode 57)
3. **Non-overlapping Intervals** (LeetCode 435)
4. **Meeting Rooms I & II** (LeetCode 252, 253)
5. **Minimum Number of Arrows to Burst Balloons** (LeetCode 452)
