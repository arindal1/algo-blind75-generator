# 🔗 Linked List In‑Place Reversal Pattern Guide

---

## 1. Pattern Overview

* **Definition:**
  Reversing a singly linked list in-place reassigns each node’s `next` pointer so that the list’s direction is flipped, without allocating new nodes or auxiliary data structures.
* **Why It Matters:**

  * **Foundational Operation:** Many linked‑list problems (rotate, check palindrome, merge, reorder) rely on reversing sublists.
  * **In‑Place & O(1) Space:** Meets strict interview constraints.
  * **Pointer Manipulation Mastery:** Sharpens understanding of low‑level memory links.

---

## 2. Prerequisites

* **Data Structures:**

  * Singly linked list (`struct ListNode { int val; ListNode* next; };`)
* **Language Features:**

  * Raw pointers manipulation
  * `nullptr` checks
* **Concepts:**

  * Loop invariants
  * Multiple-pointer tracking

---

## 3. Recognition Checklist

* You must **reverse** an entire list or a sublist between two positions.
* The problem asks for operations **after** reversing (e.g., reorder list, swap pairs).
* Constraints demand **O(1) extra space** and **O(n)** time.
* You need to **modify links** rather than copying values or nodes.

---

## 4. Core Idea & Steps

1. **Initialize Pointers:**

   ```cpp
   ListNode* prev = nullptr;
   ListNode* curr = head;
   ```
2. **Iterate & Rewire:**

   ```cpp
   while (curr) {
     ListNode* nextNode = curr->next;  // store next
     curr->next = prev;                // reverse link
     prev = curr;                      // advance prev
     curr = nextNode;                  // advance curr
   }
   ```
3. **Return New Head:**

   * At loop end, `prev` points to the new head.

> **Sublist Reversal (between positions m and n):**
>
> 1. Traverse to node before `m` (`preM`).
> 2. Reverse `n−m+1` nodes starting at `m`.
> 3. Reconnect reversed segment back to `preM` and the node after `n`.

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

namespace LinkedListReversal {
    // 1) Reverse entire list, return new head
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr) {
            ListNode* nextNode = curr->next;  // save next
            curr->next = prev;                // reverse pointer
            prev = curr;                      // move prev
            curr = nextNode;                  // move curr
        }
        return prev;  // new head
    }

    // 2) Reverse sublist from position m to n (1‑indexed)
    ListNode* reverseBetween(ListNode* head, int m, int n) {
        if (!head || m == n) return head;
        ListNode dummy(0);
        dummy.next = head;
        ListNode* preM = &dummy;
        // 1) Move preM just before m-th node
        for (int i = 1; i < m; i++) 
            preM = preM->next;
        // 2) Reverse the sublist of length (n−m+1)
        ListNode* prev = nullptr;
        ListNode* curr = preM->next;
        for (int i = 0; i <= n - m; i++) {
            ListNode* nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }
        // 3) Reconnect
        preM->next->next = curr; // tail of reversed segment → node after n
        preM->next = prev;       // node before m → new head of segment
        return dummy.next;
    }
}
```

---

## 6. Worked Example

**Problem:** Reverse the list `1 → 2 → 3 → 4 → 5` entirely.

* **Input:** head of `[1,2,3,4,5]`
* **Output:** head of `[5,4,3,2,1]`

```cpp
#include <bits/stdc++.h>
using namespace std;
struct ListNode { int val; ListNode* next; ListNode(int x): val(x), next(nullptr) {} };

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr) {
        ListNode* nextNode = curr->next;  // 1) save next
        curr->next = prev;                // 2) reverse pointer
        prev = curr;                      // 3) advance prev
        curr = nextNode;                  // 4) advance curr
    }
    return prev;  // new head
}

int main() {
    // Build list 1→2→3→4→5
    vector<int> vals = {1,2,3,4,5};
    ListNode* head = new ListNode(vals[0]);
    ListNode* tail = head;
    for (int i = 1; i < vals.size(); i++) {
        tail->next = new ListNode(vals[i]);
        tail = tail->next;
    }

    // Reverse
    ListNode* newHead = reverseList(head);
    // Print reversed list
    while (newHead) {
        cout << newHead->val << " ";
        newHead = newHead->next;
    }
    // Prints: 5 4 3 2 1
    return 0;
}
```

---

## 7. Common Pitfalls & Tips

* **Losing the Rest:** Always store `nextNode = curr->next` before rewiring `curr->next`.
* **Edge Cases:**

  * Empty list (`head == nullptr`).
  * Single node (`head->next == nullptr`).
* **Sublist Boundaries:** In `reverseBetween`, be careful with reconnections:

  * `preM->next->next = curr` attaches the tail of reversed segment.
  * `preM->next = prev` attaches the head.
* **Memory Management:** If deleting or freeing nodes, ensure no dangling pointers.

---

## 8. Practice Problems

1. **Reverse Linked List** (LeetCode 206)
2. **Reverse Linked List II** (LeetCode 92)
3. **Reorder List** (LeetCode 143) – uses half‑list reverse
4. **Palindrome Linked List** (LeetCode 234) – reverse second half
5. **Rotate List** (LeetCode 61) – involves tail reconnect after reversal
