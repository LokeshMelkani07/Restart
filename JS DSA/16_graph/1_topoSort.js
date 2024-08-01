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
