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
