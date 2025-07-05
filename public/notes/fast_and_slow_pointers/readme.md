# 🐰 Fast & Slow Pointers Pattern Guide

---

## 1. Pattern Overview

* **Definition:**
  Also called the “Tortoise and Hare,” this pattern uses two pointers moving at different speeds (typically one moves one step, the other two steps) to detect or measure properties of a sequence or linked structure in **O(n)** time with **O(1)** space.
* **Why It Matters:**

  * **Cycle Detection:** Find if a linked list or sequence loops back.
  * **Cycle Entry Point:** Identify the node where a cycle begins.
  * **Middle‑of‑List:** Locate the midpoint of a linked list in one pass.
  * **Relative‑Position Removal:** Remove the k‑th node from the end by spacing pointers.

---

## 2. Prerequisites

* **Data Structures:**

  * Singly linked lists (`ListNode*`)
  * (Optional) Arrays if simulating pointer indices
* **Language Features:**

  * Pointer manipulation
  * `nullptr` checks
* **Concepts:**

  * Linked‑list traversal
  * Loop invariants
  * Mathematical reasoning about speed and distance

---

## 3. Recognition Checklist

* You must **detect** whether a data structure contains a loop or cycle.
* You need to **find** the start of a cycle or the midpoint of a list.
* You want to remove the k-th node from the end **in one pass**.
* Constraints prohibit storing visited nodes (space O(1) required).

---

## 4. Core Idea & Steps

1. **Initialize Pointers:**

   ```cpp
   ListNode* slow = head;
   ListNode* fast = head;
   ```
2. **Advance in Loop:**

   ```cpp
   while (fast && fast->next) {
     slow = slow->next;          // moves 1 step
     fast = fast->next->next;    // moves 2 steps
   }
   ```
3. **Use Termination Condition:**

   * **No Cycle:** `fast` or `fast->next` becomes `nullptr`.
   * **Cycle Detected:** `slow == fast` at some point.
4. **Find Cycle Entry (if needed):**

   ```cpp
   slow = head;
   while (slow != fast) {
     slow = slow->next;
     fast = fast->next;
   }
   // slow (or fast) now at cycle start
   ```
5. **Middle‑of‑List:** after loop, `slow` points at mid (for odd length) or second of two mids (for even).
6. **Remove k-th from End:**

   * Advance `fast` k steps ahead.
   * Then move both until `fast` reaches end; `slow` will be just before target.

---

## 5. Code Template in C++

```cpp
#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x): val(x), next(nullptr) {}
};

namespace FastSlow {
    // 1) Detect cycle in list
    bool hasCycle(ListNode* head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }

    // 2) Find start of cycle
    ListNode* detectCycleEntry(ListNode* head) {
        ListNode *slow = head, *fast = head;
        // First, detect collision
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) {
                // Move one pointer to head
                slow = head;
                while (slow != fast) {
                    slow = slow->next;
                    fast = fast->next;
                }
                return slow;
            }
        }
        return nullptr;
    }

    // 3) Find middle node
    ListNode* middleNode(ListNode* head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow;
    }

    // 4) Remove k-th node from end
    ListNode* removeKthFromEnd(ListNode* head, int k) {
        ListNode dummy(0);
        dummy.next = head;
        ListNode *slow = &dummy, *fast = &dummy;
        // advance fast k+1 steps
        for (int i = 0; i <= k; ++i)
            fast = fast->next;
        while (fast) {
            slow = slow->next;
            fast = fast->next;
        }
        // slow->next is k-th from end
        slow->next = slow->next->next;
        return dummy.next;
    }
}
```

---

## 6. Worked Example

**Problem (LeetCode 142 – Linked List Cycle II):**

> Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return `nullptr`.

```cpp
#include <bits/stdc++.h>
using namespace std;
struct ListNode { int val; ListNode* next; ListNode(int x):val(x),next(nullptr){} };

// Solution using Fast & Slow pointers
ListNode* detectCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    // 1) Detect collision
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            // 2) Find entry
            slow = head;
            while (slow != fast) {
                slow = slow->next;
                fast = fast->next;
            }
            return slow;
        }
    }
    return nullptr;
}

// Example usage
int main() {
    // Construct list: 3 → 2 → 0 → -4
    //                     ↑        ↓
    //                     ←––––––––
    ListNode* n1 = new ListNode(3);
    ListNode* n2 = new ListNode(2);
    ListNode* n3 = new ListNode(0);
    ListNode* n4 = new ListNode(-4);
    n1->next = n2; n2->next = n3; n3->next = n4; n4->next = n2; 

    ListNode* entry = detectCycle(n1);
    cout << (entry ? entry->val : -1) << "\n"; // prints 2
    return 0;
}
```

* **Key Steps:**

  1. Detect collision at node 0 (`slow == fast`).
  2. Reset `slow` to head, then move both one step to find cycle start at node with value 2.

---

## 7. Common Pitfalls & Tips

* **Infinite Loop Risk:** Always check `fast` and `fast->next` for `nullptr` before advancing.
* **Off‑by‑One in Removal:** When removing k‑th from end, use a dummy node shifting pointers by `k+1`.
* **Even vs. Odd Length:** Middle‑of‑list returns second middle on even length; adjust if first is desired.
* **Memory Leaks:** In examples, delete unused nodes if managing memory manually in production.

---

## 8. Practice Problems

1. **Linked List Cycle** (LeetCode 141)
2. **Linked List Cycle II** (LeetCode 142)
3. **Middle of the Linked List** (LeetCode 876)
4. **Remove Nth Node From End of List** (LeetCode 19)
5. **Happy Number** (Cycle detection on integer sequence, LeetCode 202)
