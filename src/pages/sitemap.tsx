import React, { PropsWithChildren } from "react"
import Layout from "../components/layout"
import Hero from "../components/hero"
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import Breadcrumb from "../components/breadcrumb"
import { consts } from "../consts"
import classNames from "classnames"
import Footer from "../components/footer"
import { Route, routeToLink } from "../routes"
import { LinkWrapper } from "../components/linkButton"
import useScrollAnimation from "../useScrollAnimation"
import useFirstSuccess from "../useFirstSuccess"
import { NewsType } from "../news"
import Seo from "../components/seo"

export const Head = () => <Seo pageName="SITEMAP" />

const Row = ({
  children,
  className,
  content,
}: {
  className: string
  children: React.ReactElement[]
  content: React.ReactElement
}): React.ReactElement => {
  return (
    <>
      <div className={classNames(["grid grid-flow-row", className])}>
        {content}
        {!!children.length && (
          <div className="grid ml-8 grid-flow-row">{children}</div>
        )}
      </div>
    </>
  )
}

const LinkItem = ({
  route,
  title,
}: {
  route: Route
  title: string
}): React.ReactElement => {
  return (
    <>
      <LinkWrapper
        link={routeToLink(route)}
        className="text-[#01984c] text-xl hover:opacity-60 transition-all duration-500"
      >
        {title}
      </LinkWrapper>
    </>
  )
}

const LinkComponent = ({
  link,
  className,
}: {
  link: LinkType
  className: string
}): React.ReactElement => {
  return (
    <>
      <Row
        className={classNames([className])}
        content={<LinkItem route={link.route} title={link.name} />}
      >
        {link.children.map(child => (
          <LinkComponent link={child} className="mt-1" />
        ))}
      </Row>
    </>
  )
}

type LinkType = {
  route: Route
  name: string
  children: LinkType[]
}

const links = (news: LinkType[]): LinkType[] => [
  { route: { tag: "/" }, name: `${consts.社名}`, children: [] },
  { route: { tag: "/company" }, name: "COMPANY", children: [] },
  {
    route: { tag: "/business", section: null },
    name: "BUSINESS",
    children: [],
  },
  { route: { tag: "/contact" }, name: "CONTACT", children: [] },
  { route: { tag: "/privacy-policy" }, name: "PRIVACY POLICY", children: [] },
  { route: { tag: "/sitemap" }, name: "SITEMAP", children: [] },
  { route: { tag: "/news", title: null }, name: "NEWS", children: news },
]

const Sitemap = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "sitemapHero.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      allNewsJson {
        edges {
          node {
            title
            description
            date
          }
        }
      }
    }
  `)

  const news: NewsType[] = (
    data.allNewsJson.edges as {
      node: {
        title: string
        description: string
        date: string
      }
    }[]
  )
    .map(edge => ({
      ...edge.node,
      date: new Date(edge.node.date),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
  const sitemapHero = getImage(data.file)
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>()
  const isFirstVisible = useFirstSuccess(isVisible)

  return (
    <Layout hero={<Hero image={sitemapHero} type="small" />}>
      <div className="grid grid-rows-[min-content]">
        <div className="grid max-w-screen-md justify-self-center w-full grid-rows-[auto,auto] h-min">
          <Breadcrumb
            className="mt-4"
            path={[
              { link: { tag: "/" }, title: `${consts.社名} HOME` },
              { link: null, title: "SITEMAP" },
            ]}
          />
          <div className="text-3xl w-full text-center mt-12">SITEMAP</div>
        </div>
        <div className={classNames(["bg-neutral-100 mt-12 grid"])}>
          <div
            className={classNames([
              "justify-self-center w-full max-w-screen-md my-20 px-8",
              {
                "animate-slow-slide-fade-in-left": isFirstVisible,
              },
            ])}
            ref={ref}
          >
            {links(
              news.map(item => {
                return {
                  name: item.title,
                  route: { tag: "/news", title: item.title },
                  children: [],
                }
              })
            ).map((link, index) => {
              return (
                <>
                  <LinkComponent
                    link={link}
                    className={index !== 0 ? "mt-8" : ""}
                  />
                </>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

export default Sitemap
