import { graphql, useStaticQuery } from "gatsby"
import { IGatsbyImageData } from "gatsby-plugin-image"

export const useImageByFileNameRegExp = (regexPattern: RegExp) => {
  const data = useStaticQuery(graphql`
    query {
      allFile {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
          }
        }
      }
    }
  `)

  return (
    data.allFile.nodes as {
      relativePath: string
      childImageSharp: { gatsbyImageData: IGatsbyImageData }
    }[]
  )
    .filter(node => node.relativePath.match(regexPattern))
    .map(node => node.childImageSharp.gatsbyImageData)
}
