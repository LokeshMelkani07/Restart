// Notes: https://drive.google.com/file/d/1Ulkg_153FXkKwd5F_Q09LxN8NFW2EizL/view?usp=sharing
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
  // Starting from startNode, usko visited mark kro, push in the result, go to its neighbours and if they are unvisited, call the function again for them recursively
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
// Check Cycle in undirected Graph
// Topological Sort in DAG using DFS
// Topological Sort in DAG using BFS (Kahn algo)
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

// Bellman Ford Algorithm
// This algorithm is used to find shortest path from a source to destination in a graph considering there can be negative weight present in the graph also
// When there are negative weight present in the graph then Dikshtra's algo (O(VlogE)) also fails so here bellman ford comes handy which does the work in O(VE)
// It works in such a way that we have a distance array where we have stored INFINITY initially. if we have 4 vertices, we run the algo for V-1 times and everytime.
// We mark distance[startIndex] = 0 as distance between a node to itself is 0 always, In every iteration we have shortest path from source to destination node, we do it for V-1 times where we check
/*
 for (let i = 0; i < this.vertices.length - 1; i++) {
      for (const { source, destination, weight } of this.edges) {
        if (distances[source] + weight < distances[destination]) {
          distances[destination] = distances[source] + weight;
          predecessors[destination] = source;
        }
      }
    }
  }
*/
// We do this for all edges given to us and do it for V-1 times
// At the end, distance array has shortest path in it.
// Now this algo does not work if negative weighted cycle is present in the graph means if there is a cycle such that sum of all weights in it adds upto negative number then this algo does not work
// For negative weighted cycle, there can never be a shortest path because everytime we try to find shortest path, values keeps on changing in it.
// How to check for negative weighted cycle present or not?
// We have done the algo for V-1 times and In V-1 times we should have shortest distance in our array
// We try to run same algo for one more time and if our distance array is updating means there is more answers present and it means there is a negative weighted cycle present there so shortest distance not possible.
class Graph {
  // Initialise vertices Array and edges array which is array of object
  constructor(vertices) {
    this.vertices = vertices;
    this.edges = [];
  }

  // its an directed graph
  addEdge(source, destination, weight) {
    this.edges.push({ source, destination, weight });
  }

  // This is our algo, we have starting index and now we want to find shortest distance from startIndex to all nodes
  bellmanFord(startVertex) {
    // distance map
    const distances = {};
    const MAX_VALUE = Number.MAX_SAFE_INTEGER;

    // Step 1: Initialize distances
    for (const vertex of this.vertices) {
      // Mark all distance as infinity initially
      distances[vertex] = MAX_VALUE;
    }

    // Mark distance array for source as 0
    distances[startVertex] = 0;

    // Step 2: Relax edges repeatedly
    for (let i = 0; i < this.vertices.length - 1; i++) {
      // Run loop for V-1 times
      for (const { source, destination, weight } of this.edges) {
        // keep below condition in mind because distance[source] + weight can break the code otherwise
        if (distances[source] == Infinity) continue;
        // for all the edges, update distance array
        if (distances[source] + weight < distances[destination]) {
          distances[destination] = distances[source] + weight;
        }
      }
    }

    // Step 3: Check for negative-weight cycles
    for (const { source, destination, weight } of this.edges) {
      if (distances[source] + weight < distances[destination]) {
        // if distance changes means negative weighted cycle present
        throw new Error("Graph contains a negative-weight cycle");
      }
    }

    return distances;
  }
}

// Union And Find By Rank (Dis-joint Set)
// In this Union means to make a set of 2 elements or nodes where one act as a parent another act as a child (for assumption: Take it as a tree)
// Find means to check whether one is inside set of another and way of checking it is check who is its parent, if parent is same means they are inside same set
// For Union operation, we first find parent of both elements, if parents is same, we return back, else we see rank of both parents
// Rank is an array which stores, number of elements whose parent a particular element is say rank[0] tells number of children 0 has
// Rank tells us kaun kitno ka baap h
// Union means dono ko saath jod do and in this operation of saath jod do, one with higher rank becomes parent so rank[parent]++ and lower rank vala becomes child and if rank of both are same, anyone can become parent and anyone can become child
// so we check whose rank is greater from both parents. The one with greater rank becomes the parent to one with smaller
// if rank of both is same, pick anyone as parent and increase its rank by 1
// For find operation we just recursively traverse the parent array for that element till we get parent[x] = x itself means the top parent itself which can also be considered as root node
class UnionFind {
  constructor(size) {
    // Initialise parent and rank array
    this.parent = new Array(size);
    this.rank = new Array(size);

    // Initialize each element's parent to itself and rank to 0
    // Initially all has rank = 0, parent is element itself
    // Initially sabka rank krdo 0 and sabko apna hi baap bnado
    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
      this.rank[i] = 0;
    }
  }

  // find operation
  find(x) {
    // Only the root node will be the one jo apna hi parent hoga
    // So till the time parent[x] != x means apan root node nahi pahuche h abhi
    // if element is not parent of itself means we have not reached the top root yet, call recursively but to make our work easy
    // update the parent array value for that x with current parent so that we do not have to again go to depth of same element
    if (this.parent[x] !== x) {
      // Path compression means, we want to make the tree as smallest as possible so instead of joining a node at some level we diectly join it with root node so its easy to find it and we do not need to travel to many depths using recursion
      // Path compression: Make the parent of x point to the root
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  /*
  Without path compression, does the work but less optimised
  find(x) {
    if (this.parent[x] === x) {
      return x;
    }

    return this.find(this.parent[x]);
  }
  */

  union(x, y) {
    // Get the parent of both element before doing union
    const rootX = this.find(x);
    const rootY = this.find(y);

    // if parent is same means both belong already to same set so return
    if (rootX === rootY) {
      return; // Same set, no need to union
    }

    // Union by rank: Attach smaller rank tree under root of higher rank tree
    // if parent are different, check rank and make one as parent of another accordingly
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      // if rank of both is same, choose any
      this.parent[rootY] = rootX;
      // make sure to increase rank of one you are choosing by 1
      this.rank[rootX]++;
    }
  }
}

// Using Disjoint Set Approach
// We can find minimum spanning tree which is called Krushkal's algorithm
// Where we sort all the edges depending on increasing order of weights
// Now we want to pick the edges and include the weights till we have V-1 number of edges
// We pick the shortest weight and check if both are union of each other if yes then ignore them else consider them in your answer
// This was we go on till number of edges considered = V-1
// V-1 because if we have to form a tree of V vertices such that there are no loops in it, there will be V-1 edges in it
// At the end we have Minimum spanning tree
class UnionFind {
  // To implement Disjoint set operation
  constructor(size) {
    this.parent = new Array(size);
    this.rank = new Array(size);

    // Initialize each element's parent to itself and rank to 0
    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
      this.rank[i] = 0;
    }
  }

  find(x) {
    if (this.parent[x] !== x) {
      // Path compression: Make the parent of x point to the root
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) {
      return; // Same set, no need to union
    }

    // Union by rank: Attach smaller rank tree under root of higher rank tree
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
  }
}

// The below class forms edges from adj list given to us so that we can sort it in our algo based on weights
class Edge {
  constructor(src, dest, weight) {
    this.src = src;
    this.dest = dest;
    this.weight = weight;
  }
}

class Graph {
  // graph has vertices map and edges array
  constructor(vertices) {
    this.vertices = vertices;
    this.edges = [];
  }

  // make edges
  addEdge(src, dest, weight) {
    this.edges.push(new Edge(src, dest, weight));
  }

  kruskalMST() {
    // sort all edges based on weights
    const sortedEdges = this.edges.sort((a, b) => a.weight - b.weight);
    // get parent and rank array of vertices size to implement disjoint set
    const uf = new UnionFind(this.vertices);

    const result = [];
    let edgeCount = 0;

    for (const edge of sortedEdges) {
      // pick shortest weight edge one by one
      // find will get us to the parent of current node
      const rootSrc = uf.find(edge.src);
      const rootDest = uf.find(edge.dest);

      // if parents are not same means they both do not belong to one set, consider them
      if (rootSrc !== rootDest) {
        // push it in result
        result.push(edge);
        // make them as one set
        uf.union(rootSrc, rootDest);
        // do edge count++
        edgeCount++;
      }

      // if we get V-1 edges, break out, we have our MST
      if (edgeCount === this.vertices - 1) {
        break; // MST found
      }
    }

    return result;
  }
}

// Maximum Total Importance of Roads
/*
You are given an integer n denoting the number of cities in a country. The cities are numbered from 0 to n - 1.

You are also given a 2D integer array roads where roads[i] = [ai, bi] denotes that there exists a bidirectional road connecting cities ai and bi.

You need to assign each city with an integer value from 1 to n, where each value can only be used once. The importance of a road is then defined as the sum of the values of the two cities it connects.

Return the maximum total importance of all roads possible after assigning the values optimally.

Example 1:
Input: n = 5, roads = [[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]
Output: 43
Explanation: The figure above shows the country and the assigned values of [2,4,5,3,1].
- The road (0,1) has an importance of 2 + 4 = 6.
- The road (1,2) has an importance of 4 + 5 = 9.
- The road (2,3) has an importance of 5 + 3 = 8.
- The road (0,2) has an importance of 2 + 5 = 7.
- The road (1,3) has an importance of 4 + 3 = 7.
- The road (2,4) has an importance of 5 + 1 = 6.
The total importance of all roads is 6 + 9 + 8 + 7 + 7 + 6 = 43.
It can be shown that we cannot obtain a greater total importance than 43.
*/
var maximumImportance = function (n, roads) {
  // Basically, Its a graph problem where matrix shows all the connected nodes as roads to cities
  // n = total number of nodes / city
  // 0 <= city <= n-1
  const counts = [];

  for (const [city1, city2] of roads) {
    counts[city1] = (counts[city1] ?? 0) + 1;
    counts[city2] = (counts[city2] ?? 0) + 1;
  }

  console.log("counts ", counts);
  // counts stores number of connections each road has from 0 to n
  const pairs = [];
  // Push each node with its count in a pair
  for (let i = 0; i < n; i++) {
    pairs.push([i, counts[i] ?? 0]);
  }

  // Sort the pairs based on descending order of city value
  pairs.sort((pair1, pair2) => pair2[1] - pair1[1]);
  console.log("pairs ", pairs);
  let sum = 0;

  // We are assigning values to each city and calculting the importance
  for (let i = 0; i < n; i++) {
    sum += (n - i) * pairs[i][1];
  }

  return sum;
};
