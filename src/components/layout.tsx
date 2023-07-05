import React, { PropsWithChildren } from "react"
import "./index.css"
import Header from "./header"

const Layout = (
  props: PropsWithChildren<{
    hero: React.ReactElement
  }>
): React.ReactElement => {
  return (
    <>
      <div className={`grid grid-rows-[min-content,min-content] h-full`}>
        <Header className="z-30" />
        {props.hero}
        {props.children}
      </div>
    </>
  )
}

export default Layout
