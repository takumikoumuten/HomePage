import { PageProps, graphql, useStaticQuery } from "gatsby"
import React from "react"
import useScrollAnimation from "../useScrollAnimation"
import useFirstSuccess from "../useFirstSuccess"
import { getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Hero from "../components/hero"
import classNames from "classnames"
import Breadcrumb from "../components/breadcrumb"
import { consts } from "../consts"
import Footer from "../components/footer"
import Seo from "../components/seo"

export const Head = () => <Seo pageName="PRIVACY POLICY" />

const PrivacyPolicy = ({}: PageProps<{}, {}>) => {
  const heroData = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "sky.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `)
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>()
  const isFirstVisible = useFirstSuccess(isVisible)

  const hero = getImage(heroData.file)

  return (
    <Layout hero={<Hero type="small" image={hero} />}>
      <div className="grid w-full items-start h-full">
        <div className={classNames(["grid w-full justify-self-center"])}>
          <div className="max-w-screen-md w-full place-self-center">
            <Breadcrumb
              path={[
                { link: { tag: "/" }, title: `${consts.社名} HOME` },
                { link: null, title: "PRIVACY POLICY" },
              ]}
              className="mt-4"
            />
            <div className="grid place-content-center text-3xl mt-20">
              PRIVACY POLICY
            </div>
          </div>
          <div className="grid grid-flow-row w-full mt-20 bg-slate-100 px-8 py-16 whitespace-pre-wrap">
            <div
              className={classNames([
                "max-w-screen-md w-full place-self-center",
                { "animate-slow-slide-fade-in-left": isFirstVisible },
              ])}
              ref={ref}
            >
              {consts.privacyPolicy}
            </div>
          </div>
        </div>
      </div>
      <div className="h-full"></div>
      <Footer />
    </Layout>
  )
}

export default PrivacyPolicy
