const isTopLevel = (node) => node.parent.type === "Program";

const isStaticRequire = (node) => {
  if (node.type !== "CallExpression") return false;
  return (
    node.callee?.type === "Identifier" &&
    node.callee?.name === "require" &&
    node.arguments?.length === 1
  );
};

const isRequire = (node) =>
  node.declarations[0]?.init?.callee?.name === "require";

const getPackageName = (node) => {
  if (isStaticRequire(node)) return node.arguments[0].value;
  return node.declarations[0].init.arguments[0].value;
};

module.exports = {
  getPackageName: getPackageName,
  isRequire: isRequire,
  isStaticRequire: isStaticRequire,
  isTopLevel: isTopLevel,
};
