import React from "react"
import Seo from "../components/seo"
import Layout from "../components/layout"
import Logo from "../components/logo"
import { useStaticQuery, graphql, Link } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import StrongPoints from "../components/strongPoints"
import classNames from "classnames"
import { LinkButton } from "../components/linkButton"
import useScrollAnimation from "../useScrollAnimation"
import Section from "../components/section"
import NewsSection from "../components/newsSection"
import Hero from "../components/hero"
import { consts } from "../consts"
import Footer from "../components/footer"
import AccessMap from "../components/accessMap"

export const Head = () => <Seo title={`${consts.社名} | ${consts.住所} | リフォーム`} />

const Mission = ({ className }: { className: string }): React.ReactElement => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>()
  return (
    <>
      <Section
        className={classNames([className])}
        contentRef={ref}
        isVisible={isVisible}
        title={{
          tag: "bilingual",
          english: "OUR MISSION",
          japanese: "ミッション",
        }}
      >
        <div className="mt-4 text-center w-full">
          {consts.社名}は住まいづくりで未来を明るくをモットーに
        </div>
        <div className="text-center w-full">
          デザイン性や地球環境にやさしい素材選び・施工方法、適正な工期と
          適正な価格のバランス良い住まいづくりをしていきたいと思っています。
        </div>
        <div className="px-16 mt-6 grid w-full">
          <LinkButton
            className="w-full"
            title="お問い合わせ"
            to={{ tag: "/contact" }}
            type="normal"
          />
        </div>
      </Section>
    </>
  )
}

const IndexPage = (): React.ReactElement => {
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
    <>
      <Layout
        hero={
          <Hero type="large" image={hero}>
            <div className="bg-black bg-opacity-20 grid place-items-center justify-center place-content-center h-full animate-[fade-in_3s_forwards]">
              <Logo type="big" className="mb-4" />
              <div className="font-bold text-white text-5xl">幸せな家創り</div>
              <div className="font-bold text-white text-5xl">
                愛のある暮らし
              </div>
            </div>
          </Hero>
        }
      >
        <div className="grid grid-flow-row p-8 w-full place-content-center">
          <StrongPoints />
          <Mission className="mt-32 max-w-screen-lg" />
          <AccessMap className="mt-32 max-w-screen-lg" />
          <NewsSection className="mt-32 max-w-screen-lg" filterNumber={3} />
        </div>
        <Footer />
      </Layout>
    </>
  )
}

export default IndexPage
