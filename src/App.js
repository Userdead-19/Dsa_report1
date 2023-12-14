import React, { useEffect, useState } from "react";
import "./App.css";

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

function serialize(root) {
  if (!root) return "null";

  const leftSerialized = serialize(root.left);
  const rightSerialized = serialize(root.right);

  return `${root.val},${leftSerialized},${rightSerialized}`;
}

function deserialize(data) {
  const nodes = data.split(",");

  function buildTree() {
    const val = nodes.shift();

    if (val === "null") return null;

    const node = new TreeNode(parseInt(val, 10));
    node.left = buildTree();
    node.right = buildTree();

    return node;
  }

  return buildTree();
}

function Node({ value }) {
  return <div className="node">{value}</div>;
}

function TreeViewer() {
  const initialTree = new TreeNode(1);
  initialTree.left = new TreeNode(2);
  initialTree.right = new TreeNode(3);
  initialTree.right.left = new TreeNode(4);
  initialTree.right.right = new TreeNode(5);

  const [generatedtree, setGeneratedTree] = useState(null);
  const [tree, setTree] = useState(initialTree);
  const [array, setArray] = useState(null);

  useEffect(() => {
    handlegeneration(initialTree);
  }, [initialTree]);

  const handlegeneration = (tree) => {
    const serializedTree = serialize(tree);
    setGeneratedTree(serializedTree);
  };

  const handleSerialize = () => {
    const serializedTree = serialize(tree);
    const array1 = serializedTree.split(",");
    setGeneratedTree(serializedTree);
    setArray(array1);
  };

  const handleDeserialize = () => {
    const serializedTree = generatedtree;
    const deserializedTree = deserialize(serializedTree);
    setArray(null);
    setTree(deserializedTree);
  };

  const renderTree = (node) => {
    if (!node) return null;

    return (
      <div className="tree">
        <Node value={node.val} />
        <div className="tree-children">
          {renderTree(node.left)}
          {renderTree(node.right)}
        </div>
      </div>
    );
  };

  const renderArray = (node) => {
    if (!node) return null;

    return (
      <div className="array">
        <p>{"["}</p>
        {node.map((value, index) => (
          <p key={index}>{value + ","}</p>
        ))}
        <p>{"]"}</p>
      </div>
    );
  };

  if (array === null) {
    return (
      <div className="outerdiv">
        <div className="Maindiv">
          <h2>Binary Tree Viewer</h2>
          <div className="tree-container">{renderTree(tree)}</div>
          <button onClick={() => handleSerialize(tree)}>Serialize Tree</button>
          <button onClick={handleDeserialize}>Deserialize Tree</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="outerdiv">
        <div className="Maindiv">
          <h2>Binary Tree Viewer</h2>
          {array !== null && (
            <div className="Array-container">{renderArray(array)}</div>
          )}
          <button onClick={() => handleSerialize(tree)}>Serialize Tree</button>
          <button onClick={handleDeserialize}>Deserialize Tree</button>
        </div>
      </div>
    );
  }
}

export default TreeViewer;
