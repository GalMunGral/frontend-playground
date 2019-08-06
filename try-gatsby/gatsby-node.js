/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`);

// You can delete this file if you're not using it
exports.createPages = async function({
  actions, graphql
}) {
  require('./download-markdown');
  const { createPage } = actions;
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            path
          }
        }
      }
    }
  `);
  data.allMarkdownRemark.nodes.forEach(node => {
    createPage({
      path: node.frontmatter.path,
      component: path.resolve('src/templates/markdownTemplate.js'),
      context: {}
    });
  });
}