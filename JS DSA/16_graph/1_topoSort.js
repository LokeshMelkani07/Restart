// Course Schedule
/*
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

Example 1:
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take.
To take course 1 you should have finished course 0. So it is possible.

Example 2:
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take.
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
*/
var canFinish = function (numCourses, prerequisites) {
  // basically, numCourses = Number of nodes
  // prerequisites gives us directed edges between 2 nodes, [u,v] means v -> u
  // We need to return true if we can finish all courses means we have to detect cycle in a graph, because if a cycle is present, we will never be able to finish all courses so best way to detect a cycle in directed graph is Topo Sort
  // Topo Sort works in a DAG (Directed Acyclic Graph) only
  // We will do Topo Sort using BFS
  // Initialize adjacency list and in-degree count
  // Initialize adjacency list and in-degree count
  let adj = Array.from({ length: numCourses }, () => []);
  let inDegree = Array(numCourses).fill(0);

  // Build the adjacency list and in-degree count
  for (let [course, prereq] of prerequisites) {
    adj[prereq].push(course);
    inDegree[course]++;
  }

  // Initialize the queue with courses having no prerequisites (in-degree 0)
  let q = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      q.push(i);
    }
  }

  // Process the queue
  let res = 0;
  while (q.length > 0) {
    let ele = q.shift();
    res++;
    for (let neighbor of adj[ele]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        q.push(neighbor);
      }
    }
  }

  // If we were able to process all courses, return true
  return res === numCourses;
};

//  Course Schedule II
/*
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.

Example 1:
Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
*/
var findOrder = function (numCourses, prerequisites) {
  // Same as Previous one, just that, here we need to return the topo order
  // basically, numCourses = Number of nodes
  // prerequisites gives us directed edges between 2 nodes, [u,v] means v -> u
  // We need to return true if we can finish all courses means we have to detect cycle in a graph, because if a cycle is present, we will never be able to finish all courses so best way to detect a cycle in directed graph is Topo Sort
  // Topo Sort works in a DAG (Directed Acyclic Graph) only
  // We will do Topo Sort using BFS
  // Initialize adjacency list and in-degree count
  // Initialize adjacency list and in-degree count
  let adj = Array.from({ length: numCourses }, () => []);
  let inDegree = Array(numCourses).fill(0);

  // Build the adjacency list and in-degree count
  for (let [course, prereq] of prerequisites) {
    adj[prereq].push(course);
    inDegree[course]++;
  }

  // Initialize the queue with courses having no prerequisites (in-degree 0)
  let q = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      q.push(i);
    }
  }

  // Process the queue
  let res = [];
  while (q.length > 0) {
    let ele = q.shift();
    res.push(ele);
    for (let neighbor of adj[ele]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        q.push(neighbor);
      }
    }
  }

  // Handling cycles
  // If we processed all courses, return the result
  // Otherwise, return an empty array indicating a cycle
  return res.length === numCourses ? res : [];
};

// Find Eventual Safe States
/*
There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is an edge from node i to each node in graph[i].

A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node).

Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

Example 1:
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]
Explanation: The given graph is shown above.
Nodes 5 and 6 are terminal nodes as there are no outgoing edges from either of them.
Every path starting at nodes 2, 4, 5, and 6 all lead to either node 5 or 6.
*/
var eventualSafeNodes = function (graph) {
  // We can think of something like Topo ordering which gives us ordering such that if there is an edge between u->v, ordering will always have u before v in it.
  // It is only applied in DAG, it considers indegree of nodes into consideration
  // According to problem statment, safe nodes is the node which has either no outgoing edge (terminal node) or it is connected to a terminal node in its path
  // If we match it with topo sort, we need to reverse the edges and perform topo sort based on indegree, it gives us those nodes which are neither part of any cycle nor connected to any cycle means they are free
  let n = graph.length;
  let adj = Array.from({ length: n }, () => []);
  let inDegree = Array(n).fill(0);

  // Reverse the edges and build the in-degree array
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      adj[graph[i][j]].push(i);
      inDegree[i]++;
    }
  }

  let q = [];
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) {
      q.push(i);
    }
  }

  let res = [];
  while (q.length) {
    let ele = q.shift();
    res.push(ele);

    // for..of loop gives values of object
    // for..in loop gives keys of object
    for (let neighbor of adj[ele]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        q.push(neighbor);
      }
    }
  }

  return res.sort((a, b) => a - b);
};

// Alien Dictionary
/*
Given a sorted dictionary of an alien language having N words and k starting alphabets of standard dictionary. Find the order of characters in the alien language.
Note: Many orders may be possible for a particular test case, thus you may return any valid order and output will be 1 if the order of string returned by the function is correct else 0 denoting incorrect string returned.


Example 1:
Input:
N = 5, K = 4
dict = {"baa","abcd","abca","cab","cad"}
Output:
1
Explanation:
Here order of characters is
'b', 'd', 'a', 'c' Note that words are sorted
and in the given language "baa" comes before
"abcd", therefore 'b' is before 'a' in output.
Similarly we can find other orders.
*/

function findOrder(dict, N, K) {
  // We will build a adj list based on characters appearing in words
  // if any character appear before another means its before it in the ordering in dictionary
  // like in normal dictionary a,b,c,d,e,f,.......z is the ordering
  // But its not a normal dictionary, its a alien dictionary so we need to check the order by checking each word individually
  // All words are already in sorted order in dict (given) so we just need to match character by character and check so We see "baa" and "abcd"
  // compare first digit of both b appear before a, so b->a,
  // compare "abcd" with "abca" so a,b,c are same we check d appear before a so d -> a
  // So this was we make an adj list
  // Now what we need to return is, ordering of these characters in alien dict based on these present sequences
  // if we see from POV of a graph, we need to return these nodes u->v such that u always appear before v which is nothing but topo ordering
  // So, we make a indegree array and do topo sort
  let adj = Array.from({ length: K }, () => []);
  let indegree = Array(K).fill(0);

  // Build the graph
  for (let i = 0; i < N - 1; i++) {
    let word1 = dict[i];
    let word2 = dict[i + 1];
    let len = Math.min(word1.length, word2.length);
    for (let j = 0; j < len; j++) {
      if (word1[j] != word2[j]) {
        // Storing in terms of charCode
        let u = word1[j].charCodeAt(0) - "a".charCodeAt(0);
        let v = word2[j].charCodeAt(0) - "a".charCodeAt(0);
        adj[u].push(v);
        indegree[v]++;
        break;
      }
    }
  }

  // Initialize the queue with all nodes having 0 in-degree
  let q = [];
  for (let i = 0; i < K; i++) {
    if (indegree[i] == 0) {
      q.push(i);
    }
  }

  let res = [];
  // Process the nodes in topological order
  while (q.length) {
    let ele = q.shift();
    // store the characters only, as in the adj list we have stored charCode so we convert back from charCode to character
    res.push(String.fromCharCode(ele + "a".charCodeAt(0)));
    for (let neighbor of adj[ele]) {
      indegree[neighbor]--;
      if (indegree[neighbor] == 0) {
        q.push(neighbor);
      }
    }
  }

  // If all characters are used in the topological sort, return the result
  if (res.length === K) {
    return res.join("");
  }
  // If there's a cycle or not all nodes are processed, return an empty string
  return "";
}
