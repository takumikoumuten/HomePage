import React from "react"
import { PageProps, graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Hero from "../components/hero"
import { formatNewsDate } from "../components/newsSection"
import useScrollAnimation from "../useScrollAnimation"
import useFirstSuccess from "../useFirstSuccess"
import classNames from "classnames"
import { Route, routeToLink } from "../routes"
import Breadcrumb from "../components/breadcrumb"
import {
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share"
import { consts } from "../consts"
import Footer from "../components/footer"
import { LinkWrapper } from "../components/linkButton"
import Seo from "../components/seo"

export const Head = () => <Seo title="Home" />

interface NewsPageContext {
  title: string
  description: string
  date: string
}

const NewsTemplate = ({
  pageContext,
  location,
}: PageProps<{}, NewsPageContext>) => {
  const heroData = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "main.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `)
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>()
  const isFirstVisible = useFirstSuccess(isVisible)

  const hero = getImage(heroData.file)

  const date = new Date(pageContext.date)
  const link: Route = { tag: "/news", title: pageContext.title }
  const iconProps = {
    className: "rounded-sm",
    size: 30,
  }

  return (
    <Layout hero={<Hero type="small" image={hero} />}>
      <div className="grid w-full justify-self-center items-start h-full px-8">
        <div
          className={classNames([
            "grid max-w-screen-md w-full justify-self-center",
            { "animate-slow-slide-fade-in-left": isFirstVisible },
          ])}
          ref={ref}
        >
          <Breadcrumb
            path={[
              { link: { tag: "/" }, title: `${consts.社名} HOME` },
              { link: { tag: "/news", title: null }, title: "NEWS" },
              { link: null, title: pageContext.title },
            ]}
            className="mt-4"
          />
          <div className="grid place-content-center text-3xl mt-20">NEWS</div>
          <div className="grid grid-flow-row w-full mt-28">
            <div className="grid justify-end italic">
              {formatNewsDate(date)}
            </div>
            <LinkWrapper
              className="w-full text-2xl text-[#01984c] border-b border-[#01984c] p-2 text-center hover:opacity-60 transition-all duration-500 mt-4"
              link={routeToLink(link)}
            >
              {pageContext.title}
            </LinkWrapper>
            <div className="grid items-center grid-flow-row place-content-start w-full">
              <div className="mt-2 text-start">{pageContext.description}</div>
            </div>
            <div className="grid grid-flow-col gap-2 place-content-start mt-4">
              <FacebookShareButton
                url={location.href}
                title={pageContext.title}
              >
                <FacebookIcon {...iconProps} />
              </FacebookShareButton>
              <TwitterShareButton url={location.href} title={pageContext.title}>
                <TwitterIcon {...iconProps} />
              </TwitterShareButton>
              <LineShareButton url={location.href} title={pageContext.title}>
                <LineIcon {...iconProps} />
              </LineShareButton>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full"></div>
      <Footer />
    </Layout>
  )
}

export default NewsTemplate
