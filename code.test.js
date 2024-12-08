const fs = require('fs');
const jsc = require('jsverify');

eval(fs.readFileSync('code.js') + '');

// Function to generate a random graph as an adjacency list
function generateGraph(numNodes, numEdges) {
    let edges = [];
    for (let i = 0; i < numEdges; i++) {
        let u = Math.floor(Math.random() * numNodes);
        let v = Math.floor(Math.random() * numNodes);
        if (u !== v) {
            edges.push([u, v]);
        }
    }
    return edges;
}

// Convert edges to adjacency list format
function edgesToAdjList(edges) {
    let adjList = {};
    edges.forEach(([u, v]) => {
        if (!adjList[u]) adjList[u] = [];
        if (!adjList[v]) adjList[v] = [];
        adjList[u].push(v);
        adjList[v].push(u);
    });
    return adjList;
}

// Property-based test: checks that isomorphism holds between two graphs
const test = jsc.forall("nat nat", function (numNodes, numEdges) {
    // Ensure valid numbers for nodes and edges
    numNodes = Math.max(1, numNodes % 10); // limit nodes to be between 1 and 10
    numEdges = Math.max(0, numEdges % (numNodes * (numNodes - 1) / 2)); // valid number of edges

    // Generate two random graphs
    let edges1 = generateGraph(numNodes, numEdges);
    let edges2 = generateGraph(numNodes, numEdges);

    // Convert edges to adjacency lists
    let graph1 = edgesToAdjList(edges1);
    let graph2 = edgesToAdjList(edges2);

    // Check if the graphs are isomorphic using the are_isomorphic function
    let result = are_isomorphic(graph1, graph2);

    // Check if the graphs have the same degree distribution
    let degreeList1 = Object.values(graph1).map(neighbors => neighbors.length).sort();
    let degreeList2 = Object.values(graph2).map(neighbors => neighbors.length).sort();

    // The graphs should be isomorphic if their degree distributions are the same
    return JSON.stringify(degreeList1) === JSON.stringify(degreeList2) === result;
});

// Run the property test
jsc.assert(test, { tests: 1000 });
