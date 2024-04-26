// Implementation of Graph in JS
class Graph {
  // Making an adj list using map
  constructor() {
    this.adjList = {};
  }

  // Adding vertex to the adj list
  addVertex(vertex) {
    if (!this.adjList[vertex]) {
      this.adjList[vertex] = [];
    }
  }

  // adding edge between vertices
  addEdge(vertex1, vertex2) {
    if (!this.adjList[vertex1] || !this.adjList[vertex2]) {
      throw new Error("No Vertex Found");
    }

    // This is for an undirected graph means edge is between both vertex
    this.adjList[vertex1].push(vertex2);
    this.adjList[vertex2].push(vertex1);
  }

  // Printing the graph
  printGraph() {
    for (let vertex in this.adjList) {
      console.log(`${vertex} --> [${this.adjList[vertex].join(", ")}]`);
    }
  }

  // Implement depth-first search (DFS) on a graph
  // DFS is an graph traversal technique in which we go to the depth then come back using backtracking
  // We start from root, move to left, till we reach last node, then backtrack and go to right node and so on. So we cover the depth
  DfsRecursive(startVertex) {
    // Make an visited map so to mark a node visited
    let visited = {};
    // Make an result array to store the result
    let result = [];

    // Make a helper funciton to start the traversal
    var dfsHelper = (startNode) => {
      // Mark it visited
      visited[startNode] = true;
      // Add it to result
      result.push(startNode);

      // Explore the neighbours
      this.adjList[startNode].forEach((node) => {
        if (!visited[node]) {
          dfsHelper(node);
        }
      });
    };

    dfsHelper(startVertex);
    return result;
  }

  // BFS Traversal in Graph
  // In BFS traversal we cover the level order traversal
  // We move to a level, cover the nodes at that level, Now we go to next level and so on.
  // We use Queue, visited map, result array for the traversal where we go to a node, mark it visited, push it in queue. Now put its neighbours in queue and push that node in result
  BfsTraversal(startNode) {
    // Make an visited map
    let visited = {};
    // Make an array to store result
    let result = [];
    // Make an queue and push first element to it
    let queue = [startNode];

    // Mark first node as visited
    visited[startNode] = true;
    // Push it in result array
    result.push(startNode);

    // Now we cover every level
    while (queue.length > 0) {
      // Get the FIFO node
      let currentNode = queue.shift();
      // Push it in result
      result.push(currentNode);

      // Move to its adj list
      this.adjList[currentNode].forEach((node) => {
        if (!visited[node]) {
          // if its not visited, mark it visited and push into queue
          visited[node] = true;
          queue.push(currentNode);
        }
      });
    }

    // return resultant array
    return result;
  }
}

// Keys and Rooms
// There are n rooms labeled from 0 to n - 1 and all the rooms are locked except for room 0. Your goal is to visit all the rooms. However, you cannot enter a locked room without having its key. When you visit a room, you may find a set of distinct keys in it. Each key has a number on it, denoting which room it unlocks, and you can take all of them with you to unlock the other rooms. Given an array rooms where rooms[i] is the set of keys that you can obtain if you visited room i, return true if you can visit all the rooms, or false otherwise.
// Input: rooms = [[1,3],[3,0,1],[2],[0]]
// Output: false
// Explanation: We can not enter room number 2 since the only key that unlocks it is in that room.
var canVisitAllRooms = function (rooms) {
  // Same Problem as: Is Graph Connected??
  // rooms array rooms = [[1,3],[3,0,1],[2],[0]] is like an adjacency list
  // We just need to do a DFS Traversal and at the end. check if length of visited array is same as rooms array length
  let visited = {};
  function dfsTraversal(start) {
    visited[start] = true;
    rooms[start].forEach((node) => {
      if (!visited[node]) {
        dfsTraversal(node);
      }
    });
  }

  dfsTraversal(0);
  return Object.keys(visited).length === rooms.length;
};

// Implement Dijkstra Algorithm
// Using this algo we can find shortest distance between any given node to any other node in the graph
// We need an priority queue for this which can be done using sort function also
// At the end our distance object contains distance of start node with all nodes given in the graph
// Define a graph using an adjacency list
const graph = {
  A: { B: 1, C: 4 }, // Node A is connected to Node B with a weight of 1 and Node C with a weight of 4
  B: { A: 1, C: 2, D: 5 }, // ... and so on for other nodes
  C: { A: 4, B: 2, D: 1 },
  D: { B: 5, C: 1 },
};

function dijkstra(graph, start) {
  /*
    Steps of Dijkshtra algo
    1.	Get all vertices inside an array using Object.keys(adjList) say nodes
    2.	Make an distance object which stores distance between given node to all node and initially mark them all as Infinity.
    3.	Mark the distance of given node to itself as 0 in distance object
    4.	Make an Set of visited nodes where we store all visited nodes
    5.	Looping start
    6.	{
    7.	Start traversing till length of nodes array, everytime sort nodes array such that the least distance is at top always
    8.	Get the least distance element from array, mark it visited
    9.	Now check its neighbours, if any of neighbour is unvisited, go it to, add current distance + that_neighbour_distance and check if distance[neighbour] is bigger than current distance + that_neighbour_distance. If yes, update distance[neighbour] because we need shortest distance.
    10.	}
    11.	At the end we have all the distances inside distance object.
   */
  // Create an object to store the shortest distance from the start node to every other node
  let distances = {};

  // A set to keep track of all visited nodes
  let visited = new Set();

  // Get all the nodes of the graph
  let nodes = Object.keys(graph);

  // Initially, set the shortest distance to every node as Infinity except that start node because distance between start node to start node will always be 0
  for (let node of nodes) {
    distances[node] = Infinity;
  }

  // The distance from the start node to itself is 0
  distances[start] = 0;

  // Loop until all nodes are visited
  while (nodes.length) {
    // Sort nodes by distance and pick the closest unvisited node
    nodes.sort((a, b) => distances[a] - distances[b]);
    let closestNode = nodes.shift();

    // If the shortest distance to the closest node is still Infinity, then remaining nodes are unreachable and we can break
    if (distances[closestNode] === Infinity) break;

    // Mark the chosen node as visited
    visited.add(closestNode);

    // For each neighboring node of the current node
    for (let neighbor in graph[closestNode]) {
      // If the neighbor hasn't been visited yet
      if (!visited.has(neighbor)) {
        // Calculate tentative distance to the neighboring node
        let newDistance = distances[closestNode] + graph[closestNode][neighbor];

        // If the newly calculated distance is shorter than the previously known distance to this neighbor
        if (newDistance < distances[neighbor]) {
          // Update the shortest distance to this neighbor
          distances[neighbor] = newDistance;
        }
      }
    }
  }

  // Return the shortest distance from the start node to all nodes
  return distances;
}

// Implement Prim's algorithm for minimum spanning tree
// This algorithm is used to get the minimum spanning tree means a tree where all nodes are connected in such a way that the addition of weights gives us the minimum number
// For that purpose we will use a priority queue, where we store {node, weight} and pq always sorts in such a way that minimum weight is at top
// We store first element of graph in pq with weight 0 and start it
// we will make a visited set to store already visited nodes
// we will make an ans variable to store sum of minimum weights
// Start
// Run a loop till either pq is not empty or we have visited all the nodes i.e vis.size == graph.length
// Pick first element of pq which will be the one with minimum weight
// Mark it visited if its already not visited, if its already visited leave it
// now add it in answer
// Go to its all neighbours, if they are not visited, store them in pq and pq automatically brings one with minimum wieght to the top
// loop ends
// return ans
class PriorityQueue {
  // Implementing priority queue
  constructor() {
    this.queue = [];
  }

  enqueue(node, priority) {
    this.queue.push({ node, priority });
    this.sort();
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.queue.shift().node;
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  // Sort on the basis of increasing weights
  sort() {
    this.queue.sort((a, b) => a.priority - b.priority);
  }
}

const graph1 = {
  A: { B: 1, C: 4 },
  B: { A: 1, C: 2, D: 5 },
  C: { A: 4, B: 2, D: 1 },
  D: { B: 5, C: 1 },
};

function Prim(graph1) {
  // pq to store {node,weight}
  let pq = new PriorityQueue();
  // ans to store answer
  let ans = 0;
  // vis to store visited nodes
  let vis = new Set();

  // get first element of adj list and start with it as weight 0 with itself
  let firstEle = Object.keys(graph1)[0];
  pq.enqueue(firstEle, 0);

  // till pq not empty, run loop
  while (!pq.isEmpty()) {
    // get minimum weight node from pq
    // currentVertex, currentWeight has value of our pq.top.nodem pq.top.priority
    let { node: currentVertex, priority: currentWeight } = pq.dequeue();

    // if visited already, go to next iteration
    if (vis.has(currentVertex)) {
      continue;
    }

    // if not visited, store weight in answer
    ans += currentWeight;
    // mark it visited
    vis.add(currentVertex);

    // go to its neighbours
    for (let neighbor in graph1[currentVertex]) {
      if (!vis.has(neighbor)) {
        // if any neighbour not visited, store it in pq
        pq.enqueue(neighbor, graph1[currentVertex][neighbor]);
      }
    }
  }

  // at the end, return answer
  return ans;
}

console.log(Prim(graph1)); // Output: 4 (Minimum Spanning Tree weight)

// Check Cycle in directed Graph
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
      throw new Error("Vertex not found in the graph");
    }

    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }

  // Check Cycle in Undirected Graph
  // We have a graph where there is a cycle or loop present, we have to detect if there is a any cycle or loop present in the graph
  // We will use DFS technique for that where we will traverse all nodes from a node and mark them visited as we travel but if any node we encounter and is already visited means there is a cycle
  // Mistake: if there is a node which has its parent marked visited, during DFS of that node, we encounter its parent as visited already and say there is a loop whereas there was not any
  // So we need to store the parent also, if there is a node already visited during DFS and its not a parent means there is a cycle otherwise not
  // So we start from first node with parent as null
  hasCycleUndirected() {
    // Make visited map
    const visited = {};
    let hasCycle = false;

    // dfs function where we pass vertex to store dfs from and its parent
    const dfs = (vertex, parent) => {
      // Firts of all mark it visited
      visited[vertex] = true;

      // Go to its neighbours
      for (const neighbor of this.adjacencyList[vertex]) {
        // if neoghbour not visited
        if (!visited[neighbor]) {
          // perform dfs in neighbour considering current vertex as parent
          if (dfs(neighbor, vertex)) {
            // if gives true means cycle present
            return true; // Cycle detected
          }
        } else if (neighbor !== parent) {
          // if its already visited and neighbour is not a parent means there is a cycle
          hasCycle = true;
          return true; // Cycle detected
        }
      }

      // else we traverse all neighbour and we do not find a cycle means no cycle found
      return false;
    };

    // we start traversing first node of adj list and we do it for all nodes of adj list
    // It also covers dis-connected components of graph
    for (const vertex in this.adjacencyList) {
      if (!visited[vertex]) {
        // first node has parent as null
        if (dfs(vertex, null)) {
          return true; // Cycle detected
        }
      }
    }

    return hasCycle;
  }

  // Detect Cycle in a Directed Graph
  // We cannot follow approach where we were storing the parents like in undirected case
  // We will follow DFS but now with visited map, we also keep track of recursive node
  // if we make a dfs call for an node, we mark all nodes connected to it as visited and recursionVisited also
  // Now in directed graph, we have edges directing from one node to another so if at any point we see any node is already visited and its also already recursivelyVisited means we are coming to it for second time so there is a cycle
  // If cycle not present, mark it recursive map as false
  hasCycleDirected() {
    // for visited
    const visited = {};
    // To track recursively visited or not
    const recursionStack = {};

    const dfs = (vertex) => {
      // mark it visited
      visited[vertex] = true;
      // mark it recursively visited
      recursionStack[vertex] = true;

      // go to its neighbours
      for (const neighbor of this.adjacencyList[vertex]) {
        if (!visited[neighbor]) {
          // if not visited, perform its dfs and if its dfs gives true, there is cycle
          if (dfs(neighbor)) {
            return true; // Cycle detected
          }
        } else if (recursionStack[neighbor]) {
          // if already visited and recursively also visited so there is a cycle
          return true; // Cycle detected
        }
      }

      // If cycle not found, mark its recusive map as false but keep it in visited
      recursionStack[vertex] = false; // Backtrack
      return false;
    };

    // cover all nodes of adj list, it also includes disconnected components
    for (const vertex in this.adjacencyList) {
      if (!visited[vertex]) {
        if (dfs(vertex)) {
          return true; // Cycle detected
        }
      }
    }

    return false; // No cycle found
  }

  // Topological Sort
  // This is only applicable for Directed Acyclic Graph
  // This is a sequence of nodes such that if there is an edge between u and v then in our topo sort, our u should always come before v in the sequence
  // We will do DFS Traversal and use a stack in which our stack store the element with most dependency at the bottom
  // We traverse from node 0 and do dfs to all elements we can
  // when we reach end of the call, we store the element on stack while coming back
  // At the end, we pop all element from stack and store them in array which is our topo sort sequence
  topologicalSort() {
    const visited = {};
    const stack = [];

    const dfs = (vertex) => {
      // Mark it visited at first
      visited[vertex] = true;

      // Go to its neighbours
      for (const neighbor of this.adjacencyList[vertex]) {
        if (!visited[neighbor]) {
          dfs(neighbor);
        }
      }

      // On coming back from end of call, push it in stack
      stack.unshift(vertex); // Push to stack after all neighbors are visited
    };

    // Below code also covers disconnected components
    for (const vertex in this.adjacencyList) {
      if (!visited[vertex]) {
        dfs(vertex);
      }
    }

    // return stack which has our order
    return stack;
  }

  // Topological Sort using BFS (Kahn Algorithm)
  // This algo helps us in finding Topo order of DAG using BFS
  // We will use an In-degree array which means number of edges coming towards any node is its in-degree where we have marked 0 for all nodes initially
  // Now, we make the in-degree of all elements using adj list
  // Now we make an queue, push elements having in-degree as 0 to queue
  // Now our BFS starts, pick top of queue, push it in result array, decrease its neighbours indegree by -1
  // if any neighbour's in-degree becomes 0, store it in queue
  // This goes on till queue is not empty
  // At the end, our result contains our answer
  topologicalSortUsingBFS() {
    const inDegree = {}; // Keeps track of incoming edges for each vertex
    const queue = []; // Queue for BFS
    const result = []; // Resulting topological order

    // Initialize in-degree for each vertex
    for (const vertex in this.adjacencyList) {
      inDegree[vertex] = 0;
    }

    // Calculate in-degree for each vertex
    for (const vertex in this.adjacencyList) {
      for (const neighbor of this.adjacencyList[vertex]) {
        inDegree[neighbor]++;
      }
    }

    // Enqueue vertices with in-degree 0
    for (const vertex in inDegree) {
      if (inDegree[vertex] === 0) {
        queue.push(vertex);
      }
    }

    // Perform BFS
    while (queue.length > 0) {
      const currentVertex = queue.shift();
      result.push(currentVertex);

      for (const neighbor of this.adjacencyList[currentVertex]) {
        inDegree[neighbor]--;

        if (inDegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      }
    }

    // Check for cycle (if result length != total vertices)
    if (result.length !== Object.keys(this.adjacencyList).length) {
      throw new Error("Graph contains a cycle, topological sort not possible.");
    }

    return result;
  }
}
