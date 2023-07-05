/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require("path")
const newsData = require("./src/data/news.json")

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  newsData.forEach(newsItem => {
    createPage({
      path: `/news/${(newsItem.title)}`,
      component: path.resolve("./src/templates/news-template.tsx"),
      context: {
        title: newsItem.title,
        description: newsItem.description,
        date: newsItem.date,
      },
    })
  })
}
