import classNames from "classnames"
import React from "react"
import { routeToLink } from "../routes"
import { consts } from "../consts"
import { useScrollPosition } from "../useScrollPosition"
import { LinkWrapper } from "./linkButton"

const returnTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

const Footer = ({}: {}): React.ReactElement => {
  const isVisible = useScrollPosition(1)
  const links: {
    to: { link: string; section: string | null }
    content: string
  }[] = [
    {
      to: routeToLink({ tag: "/" }),
      content: "HOME",
    },
    {
      to: routeToLink({ tag: "/privacy-policy" }),
      content: "PRIVACY POLICY",
    },
    {
      to: routeToLink({ tag: "/sitemap" }),
      content: "SITE MAP",
    },
    {
      to: routeToLink({ tag: "/contact" }),
      content: "CONTACT",
    },
  ]
  return (
    <>
      <div className="grid grid-flow-row">
        <div
          className={classNames([
            "grid md:grid-flow-col md:gap-4 sm:grid-flow-row sm:gap-2 pt-10 px-6 pb-6 md:place-content-center text-sm bg-[#4ad65d1a] sm:justify-items-center items-center",
          ])}
        >
          {links.map(({ to, content }) => {
            return (
              <LinkWrapper
                link={to}
                className="hover:opacity-60 transition-all border-b border-b-transparent hover:border-b-[#01984c] justify-items-center grid"
              >
                <div className="text-[#01984c] duration-500 leading-none mb-1">
                  {content}
                </div>
              </LinkWrapper>
            )
          })}
        </div>
        <div className="grid place-items-center pt-8 px-4 pb-4 bg-green-400 text-white text-xs">
          Copyright © 2023 {consts.社名} All rights Reserved.
        </div>
      </div>
      <div
        className={classNames([
          "fixed right-4 bottom-4 bg-slate-800 rounded-sm hover:bg-slate-950 transition-all duration-500 opacity-0 aspect-square p-2 grid place-items-center",
          { "opacity-100": isVisible },
        ])}
        onClick={returnTop}
      >
        <span className="material-symbols-outlined text-slate-300 text-lg">
          arrow_upward
        </span>
      </div>
    </>
  )
}

export default Footer
