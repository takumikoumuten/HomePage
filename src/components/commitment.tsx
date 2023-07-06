import React from "react"
import SlideIn from "./slideIn"
import classNames from "classnames"
import useScrollAnimation from "../useScrollAnimation"
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

const Commitment = ({
  description,
  image,
  alt,
  title,
  imagePosition,
  slideInFrom,
  className,
}: {
  image: IGatsbyImageData
  title: string
  description: string
  imagePosition: "left" | "right"
  slideInFrom: "left" | "right"
  alt: string
  className: string
}): React.ReactElement => {
  const homeIconData = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "homeIcon.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: NONE)
        }
      }
    }
  `)
  const homeIcon = getImage(homeIconData.file)
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>()

  return (
    <>
      <SlideIn
        contentRef={ref}
        isVisible={isVisible}
        className={classNames([
          "grid grid-cols-[1fr] grid-rows-[1fr,1fr] lg:grid-cols-[1fr,1fr] lg:grid-rows-[1fr] h-min relative",
          className,
        ])}
        slideInFrom={slideInFrom}
      >
        <div
          className={classNames([
            "grid grid-rows-[min-content,min-content,min-content] sm:row-start-1 place-items-center place-content-center px-8 row-span-1 z-20",
            imagePosition === "right" ? "lg:col-start-1" : "lg:col-start-2",
          ])}
        >
          {homeIcon && (
            <GatsbyImage
              image={homeIcon}
              alt="homeIcon"
              className="w-20 h-20"
            />
          )}
          <div className="border-b border-slate-600 sm:pb-2 md:pb-4 lg:pb-6 lg:text-5xl sm:text-3xl md:text-4xl w-full text-center transition-all duration-300">
            {title}
          </div>
          <div className="mt-2">{description}</div>
        </div>
        <div className="z-10 bg-white w-8 h-8 absolute -translate-x-1/2 -translate-y-1/2 rotate-45 left-1/2 top-1/2" />
        <GatsbyImage
          image={image}
          alt={alt}
          className={classNames([
            "sm:row-start-2 lg:row-start-1 row-span-1 aspect-[4/3] z-0",
            imagePosition === "left" ? "lg:col-start-1" : "lg:col-start-2",
          ])}
        />
      </SlideIn>
    </>
  )
}

export default Commitment
