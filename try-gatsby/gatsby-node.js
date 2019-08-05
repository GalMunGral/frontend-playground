/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`);

// You can delete this file if you're not using it
exports.createPages = function({
  actions, graphql
}) {
  const { createPage } = actions;
  createPage({
    path: '/test',
    component: path.resolve('src/templates/markdownTemplate.js'),
    context: {}
  });
}