import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Hero from "../components/hero"
import classNames from "classnames"
import Breadcrumb from "../components/breadcrumb"
import { consts } from "../consts"
import Footer from "../components/footer"
import NewsSection from "../components/newsSection"
import Seo from "../components/seo"

export const Head = () => <Seo title="NEWS" />

const News = (): React.ReactElement => {
  const heroData = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "main.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `)

  const hero = getImage(heroData.file)

  return (
    <Layout hero={<Hero type="small" image={hero} />}>
      <div className="grid w-full justify-self-center items-start h-full px-8">
        <div
          className={classNames([
            "grid max-w-screen-md w-full justify-self-center",
          ])}
        >
          <Breadcrumb
            path={[
              { link: { tag: "/" }, title: `${consts.社名} HOME` },
              { link: null, title: "NEWS" },
            ]}
            className="mt-4"
          />
          <NewsSection className="my-16" filterNumber={null} />
        </div>
      </div>
      <div className="h-full"></div>
      <Footer />
    </Layout>
  )
}

export default News
