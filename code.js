function are_isomorphic(graph1, graph2) {
    let isIsomorphic = false;
    let numOfNodesGraph1 = Object.keys(graph1).length;
    //console.log(numOfNodesGraph1);
    let numOfNodesGraph2 = Object.keys(graph2).length;
    //1. Check if they have the same number of nodes
    if(numOfNodesGraph1 != numOfNodesGraph2) {
        return false;
    }
    //2. Check they are onto, have a bijection
    let vertexDegreeListGraph1 = [];
    let vertexDegreeListGraph2 = [];
    
    for(let node in graph1) {
        vertexDegreeListGraph1.push(findDegree(graph1[node]));
    }
    for(let node in graph2) {
        vertexDegreeListGraph2.push(findDegree(graph2[node]));
    }
    //console.log("vertex degree list for graph 1: " + vertexDegreeListGraph1);
    //console.log("vertex degree list for graph 2: " + vertexDegreeListGraph2);
    //Since names of nodes do not matter, from least to greatest organize the degrees
    vertexDegreeListGraph1 = sortDegrees(vertexDegreeListGraph1);
    vertexDegreeListGraph2 = sortDegrees(vertexDegreeListGraph2);
    //console.log("vertex degree list for graph 1: " + vertexDegreeListGraph1);
    //console.log("vertex degree list for graph 2: " + vertexDegreeListGraph2);
    for(let i = 0; i < vertexDegreeListGraph1.length; i++) {
        if(vertexDegreeListGraph1[i] == vertexDegreeListGraph2[i]) {
            isIsomorphic = true;
        }
        else {
            isIsomorphic = false;
            break;
        }
    }
    
    return isIsomorphic;
}

function findDegree(node) {
    //console.log(node);
    //console.log(node.length);
    return node.length;
}

function sortDegrees(degreeList) {
    for(let i = 0; i < degreeList.length; i++) {
        for(let j = i + 1; j < degreeList.length; j++) {
            if(degreeList[i] > degreeList[j]) {
                let tmp = degreeList[i];
                degreeList[i] = degreeList[j];
                degreeList[j] = degreeList[i];
            }
        }
    }
    return degreeList;
}

//testing

//let graph1 = {
//    0: [1, 3],
//    1: [0, 2],
//    2: [1],
//    3: [0]
//};

//let graph2 = {
//    0: [3],
//    1: [2],
//    2: [1, 3],
//    3: [0, 2]
//};

//if(are_isomorphic(graph1, graph2)) {
//    console.log("This works for graphs 1 & 2!");
//} else {console.log("This does not work for graphs 1 & 2!");}

// let graph3 = {
//     0: [1, 3],
//     1: [0, 2],
//     2: [1],
//     3: [0]
// };

// let graph4 = {
//     0: [3],
//     1: [2],
//     2: [1, 3],
//     3: [0, 2]
// };

// if(are_isomorphic(graph3, graph4)) {
//     console.log("This works for graphs 3 & 4!");
// } else {console.log("This does not work for graphs 3 & 4!");}

// let graph5 = {
//     0: [1, 3],
//     1: [0, 2],
// };

// let graph6 = {
//     0: [3],
//     1: [2],
//     2: [1, 3],
//     3: [0, 2]
// };

// if(are_isomorphic(graph5, graph6) == false) {
//     console.log("This works for graphs 5 & 6!");
// } else {console.log("This does not work for graphs 5 & 6!");}

// if(findDegree(graph[0]) == 2) {
//     console.log("findDegree works!");
// }
// else{
//     console.log("findDegree does not works!");
// }
