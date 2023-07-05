import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import useScrollAnimation from "../useScrollAnimation"
import { NewsType } from "../news"
import Section from "./section"
import { LinkButton, LinkWrapper } from "./linkButton"
import { Route, routeToLink } from "../routes"

export const formatNewsDate = (date: Date): string => {
  return `${date.getFullYear()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`
}

const NewsItem = ({
  date,
  children,
  title,
}: {
  date: Date
  children: string
  title: string
}): React.ReactElement => {
  const link: Route = { tag: "/news", title }
  return (
    <>
      <div className="grid grid-flow-row w-full">
        <LinkWrapper
          className="w-full text-2xl text-[#01984c] border-b border-[#01984c] p-2 text-center hover:opacity-60 transition-all duration-500"
          link={routeToLink(link)}
        >
          {title}
        </LinkWrapper>
        <div className="grid items-center grid-flow-row place-content-start w-full">
          <div className="bg-[#01984c] rounded-sm text-white grid grid-cols-[auto,auto] py-2 px-3 items-center text-xs mt-3 w-min">
            <div className="border-r border-white italic pr-2">
              {formatNewsDate(date)}
            </div>
            <div className="pl-2">NEWS</div>
          </div>
          <div className="mt-2 text-start">{children}</div>
        </div>
        <LinkButton
          className="mt-2 ml-auto px-8"
          to={link}
          title="詳細はこちら"
          type="normal"
        />
      </div>
    </>
  )
}

const News = ({
  className,
  filterNumber,
}: {
  className: string
  filterNumber: number | null
}): React.ReactElement => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>()
  const data = useStaticQuery(graphql`
    query {
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
    .filter((_, index) => {
      if (filterNumber !== null) {
        return index < filterNumber
      }
      return true
    })

  return (
    <>
      <Section
        className={className}
        isVisible={isVisible}
        contentRef={ref}
        title={{
          tag: "bilingual",
          english: "NEWS",
          japanese: "ニュース",
        }}
      >
        <div className="mt-8">
          {news.map(item => {
            return (
              <NewsItem date={item.date} title={item.title}>
                {item.description}
              </NewsItem>
            )
          })}
          {filterNumber !== null && (
            <div className="grid mx-16 mt-16">
              <LinkButton
                type="inverse"
                className=""
                title="一覧を見る"
                to={{
                  tag: "/news",
                  title: null,
                }}
              />
            </div>
          )}
        </div>
      </Section>
    </>
  )
}

export default News
