import React, { useState } from "react"
import classNames from "classnames"
import { useScrollPosition } from "../useScrollPosition"
import { useLocation } from "@reach/router"
import HamburgerIcon from "./hamburgurIcon"
import Logo from "./logo"
import { Route, routeToLink, toRoute } from "../routes"
import { LinkWrapper } from "./linkButton"

type NavigationLinkProps = {
  title: {
    japanese: string
    english: string
  }
  link: Route
  selected: boolean
}

const NavigationLink = ({
  link,
  title: { english, japanese },
  selected,
}: NavigationLinkProps): React.ReactElement => {
  return (
    <>
      <LinkWrapper
        link={routeToLink(link)}
        className={classNames([
          "no-underline grid place-items-center grid-rows-[auto,auto] gap-1 px-7 text-[#01984c] hover:opacity-80 transition-opacity duration-500 border-b border-b-transparent hover:border-b-[#01984c] p-2",
          { "opacity-70": selected },
        ])}
      >
        <div className="font-bold text-base">{english}</div>
        <div className="text-xs">{japanese}</div>
      </LinkWrapper>
    </>
  )
}
const StackingNavigationLink = ({
  link,
  title: { english, japanese },
  selected,
}: NavigationLinkProps): React.ReactElement => {
  return (
    <>
      <LinkWrapper
        link={routeToLink(link)}
        className={classNames([
          "no-underline mr-9 grid justify-start items-baseline grid-cols-[auto,auto] gap-0 text-[#01984c] hover:opacity-80 transition-opacity duration-500 border-b border-b-transparent hover:border-b-[#01984c] p-1",
          { "opacity-70": selected },
        ])}
      >
        <div className="font-bold text-base">{english}</div>
        <div className="text-xs">{japanese}</div>
      </LinkWrapper>
    </>
  )
}

const links: Array<Omit<NavigationLinkProps, "selected">> = [
  { link: { tag: "/" }, title: { english: "HOME", japanese: "ホーム" } },
  {
    link: { tag: "/company" },
    title: { english: "COMPANY", japanese: "会社概要" },
  },
  {
    link: { tag: "/business", section: null },
    title: { english: "BUSINESS", japanese: "事業内容" },
  },
  {
    link: { tag: "/news", title: null },
    title: { english: "NEWS", japanese: "新着情報" },
  },
  {
    link: { tag: "/contact" },
    title: { english: "CONTACT", japanese: "お問い合わせ" },
  },
]

const Header = ({ className }: { className: string }): React.ReactElement => {
  const location = useLocation()
  const selectedLink: Route | null = toRoute(location.pathname)
  const isScrolled = useScrollPosition(500)
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleHamburgerClick = () => {
    if (isMenuOpened) {
      setIsClosing(true)
      setTimeout(() => {
        setIsMenuOpened(false)
        setIsClosing(false)
      }, 500)
    } else {
      setIsMenuOpened(true)
    }
  }
  return (
    <>
      <div className={classNames([className, { "h-24": isScrolled }])}>
        <div className="md:hidden grid grid-cols-[auto,auto] items-center px-6 justify-between h-24">
          <Logo
            className="z-0 sm:animate-slide-soft-in-left sm:animate-fade-soft-in md:animate-none"
            style={{ gridRow: "1", gridColumn: "1" }}
            type="small"
          />
          {isMenuOpened && (
            <div
              className={classNames([
                "fixed top-0 left-0 right-0 bottom-0 w-full bg-white py-4 px-6 z-10",
                { "animate-slide-in-right": isMenuOpened },
                { "animate-slide-out-right": isClosing },
              ])}
              style={{ gridColumn: "1/3", gridRow: "1" }}
            >
              {links.map((props, i) => (
                <StackingNavigationLink
                  {...props}
                  selected={selectedLink === props.link}
                  key={i}
                />
              ))}
            </div>
          )}
          <HamburgerIcon
            expanded={isMenuOpened && !isClosing}
            size={36}
            onClick={handleHamburgerClick}
            barClassName="bg-[#01984c]"
            className="my-4 z-20 sm:animate-slide-soft-in-right sm:animate-fade-soft-in place-self-center hover:cursor-pointer hover:opacity-80 transition-all duration-500"
            style={{
              gridRow: "1",
              gridColumn: "2",
              alignSelf: "center",
              justifySelf: "end",
            }}
          />
        </div>
        <ul
          className={classNames([
            "list-none md:grid grid-flow-col gap-2 place-content-center py-4 transition-transform duration-1000 ease-in-out w-full text-center bg-white hidden items-center h-24",
            isScrolled ? "fixed top-0 animate-slide-down animate-fade-in" : "",
          ])}
        >
          <Logo type="small" />
          {links.map((props, i) => (
            <NavigationLink
              {...props}
              selected={selectedLink === props.link}
              key={i}
            />
          ))}
        </ul>
      </div>
    </>
  )
}

export default Header
