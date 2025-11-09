import React from "react";

const DirectoryTree = ({ structure }) => {
  const renderNode = (node, level = 0) => {
    return (
      <div key={node.path} className="ml-4">
        <p className="font-mono text-sm">
          {"┃ ".repeat(level)}
          {node.type === "folder" ? "📂 " : "📜 "}
          {node.name}
        </p>

        {node.children?.map((child) => renderNode(child, level + 1))}
      </div>
    );
  };

  return <div>{structure.map((n) => renderNode(n))}</div>;
};

export default DirectoryTree;
