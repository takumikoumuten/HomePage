import React, { ComponentProps } from "react"
import Layout from "../components/layout"
import Hero from "../components/hero"
import classNames from "classnames"
import Breadcrumb from "../components/breadcrumb"
import { consts } from "../consts"
import Footer from "../components/footer"
import { graphql, useStaticQuery } from "gatsby"
import useScrollAnimation from "../useScrollAnimation"
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image"
import Section from "../components/section"
import AccessMap from "../components/accessMap"
import Seo from "../components/seo"

export const Head = () => <Seo pageName="COMPANY" />

const CompanyInformationTable = ({
  data,
}: {
  data: { title: string; content: string; isTel: boolean }[]
}): React.ReactElement => {
  return (
    <>
      <table className="w-full border-collapse border border-r-neutral-300">
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th className="bg-green-400 py-2 px-4 whitespace-nowrap border border-neutral-300">
                {item.title}
              </th>
              <td className="py-2 px-4 border border-neutral-300">
                {item.isTel ? (
                  <a
                    href={`tel:${item.content}`}
                    className="text-[#01984c] hover:opacity-60 transition-all duration-500 underline"
                  >
                    {item.content}
                  </a>
                ) : (
                  item.content
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

const companyData: ComponentProps<typeof CompanyInformationTable>["data"] = [
  { title: "会社名", content: consts.社名, isTel: false },
  { title: "代表者", content: consts.代表者, isTel: false },
  { title: "住所", content: consts.住所, isTel: false },
  { title: "TEL", content: consts.TEL, isTel: true },
  { title: "FAX", content: consts.FAX, isTel: true },
  {
    title: "営業時間",
    content: `${consts.営業開始時間}〜${consts.営業終了時間}`,
    isTel: false,
  },
  { title: "定休日", content: consts.定休日, isTel: false },
  { title: "有資格者", content: consts.有資格者, isTel: false },
]

const Greeting = (): React.ReactElement => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>()

  return (
    <>
      <Section
        className="mt-16"
        contentRef={ref}
        isVisible={isVisible}
        title={{
          tag: "monolingual",
          content: "代表ご挨拶",
        }}
      >
        <div className="px-8 mt-4">{consts.代表ご挨拶}</div>
      </Section>
    </>
  )
}
const CompanyInformation = ({
  companyInformation,
}: {
  companyInformation?: IGatsbyImageData
}): React.ReactElement => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>()

  return (
    <>
      <Section
        className="mt-16"
        contentRef={ref}
        isVisible={isVisible}
        title={{
          tag: "monolingual",
          content: "会社情報",
        }}
      >
        <div className="px-8 grid">
          <div className="w-[70%] justify-self-center">
            {companyInformation && (
              <GatsbyImage
                image={companyInformation}
                alt="Company information"
                className="w-full mt-2"
              />
            )}
          </div>
          <div className="mt-2">
            <CompanyInformationTable data={companyData} />
          </div>
        </div>
      </Section>
    </>
  )
}

const Company = ({}: {}): React.ReactElement => {
  const data = useStaticQuery(graphql`
    query {
      companyHero: file(relativePath: { eq: "companyHero.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      companyInformation: file(relativePath: { eq: "companyInformation.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `)

  const companyHero = getImage(data.companyHero)
  const companyInformation = getImage(data.companyInformation)
  return (
    <>
      <Layout hero={<Hero type="small" image={companyHero} />}>
        <div className="grid w-full justify-self-center items-start h-full">
          <div
            className={classNames([
              "grid max-w-screen-md w-full justify-self-center",
            ])}
          >
            <Breadcrumb
              path={[
                { link: { tag: "/" }, title: `${consts.社名} HOME` },
                { link: null, title: "COMPANY" },
              ]}
              className="mt-4"
            />
            <div className="grid place-content-center text-3xl font-semibold mt-20">
              COMPANY
            </div>
            <Greeting />
            <CompanyInformation companyInformation={companyInformation} />
            <AccessMap className="mt-16 mb-8 px-8" />
          </div>
        </div>
        <div className="h-full"></div>
        <Footer />
      </Layout>
    </>
  )
}

export default Company
