import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { useImageByFileNameRegExp } from "../useImageByFileNameRegExp"
import Layout from "../components/layout"
import Hero from "../components/hero"
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image"
import Commitment from "../components/commitment"
import Breadcrumb from "../components/breadcrumb"
import { consts } from "../consts"
import classNames from "classnames"
import Footer from "../components/footer"
import Seo from "../components/seo"

export const Head = () => <Seo pageName="BUSINESS" />

const Example = ({
  images,
  title,
  className,
}: {
  images: IGatsbyImageData[]
  title: string
  className: string
}) => {
  return (
    <>
      <div className={classNames(["grid place-self-center w-full", className])}>
        <div className="text-base place-self-center mb-6">{title}</div>
        <div className="grid place-self-center w-[40%] md:w-full grid-cols-[1fr] md:grid-cols-[1fr,1fr,1fr]">
          {images.map((image, index) => (
            <GatsbyImage
              image={image}
              alt={`${title}_image${index + 1}`}
              className=""
            />
          ))}
        </div>
      </div>
    </>
  )
}

const Business = (): React.ReactElement => {
  const businessHeroData = useStaticQuery(graphql`
    query {
      businessHero: file(relativePath: { eq: "businessHero.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `)
  const business1 = useImageByFileNameRegExp(/business1.(jpg|jpeg)/).sort()
  const business2 = useImageByFileNameRegExp(/business2.(jpg|jpeg)/).sort()
  const business3 = useImageByFileNameRegExp(/business3.(jpg|jpeg)/).sort()
  const example1 = useImageByFileNameRegExp(/business1[1-5].(jpg|jpeg)/).sort()
  const example2 = useImageByFileNameRegExp(/business2[1-5].(jpg|jpeg)/).sort()
  const example3 = useImageByFileNameRegExp(/business3[1-5].(jpg|jpeg)/).sort()
  const example4 = useImageByFileNameRegExp(/business4[1-3].(jpg|jpeg)/).sort()

  const businessHero = getImage(businessHeroData.businessHero)
  return (
    <>
      <Layout hero={<Hero type="small" image={businessHero} />}>
        <div className="max-w-screen-md w-full grid place-self-center">
          <Breadcrumb
            className="mt-4"
            path={[
              { link: { tag: "/" }, title: `${consts.社名} HOME` },
              { link: null, title: "BUSINESS" },
            ]}
          />
          <div className="place-self-center text-3xl mt-16 mb-10">BUSINESS</div>
        </div>
        <div className="grid grid-cols-[1fr] md:grid-cols-[1fr,1fr] lg:grid-cols-[1fr] lg:w-full">
          {business1[0] && (
            <Commitment
              alt="こだわり①"
              imagePosition="left"
              description={`屋根の葺き替えとは、全面的に屋根を新しくするリフォームのことです。
  葺き替え工事では、もともとある屋根の下地から表面までを丸ごと新品へと取り替えます。
  漆喰の剥がれ・瓦の割れやズレ・瓦のうねりや歪み・雨漏りのご相談はお気軽にご相談ください。`}
              slideInFrom="left"
              image={business1[0]}
              title="こだわり①　屋根の葺き替え工事"
              className=""
            />
          )}
          {business2[0] && (
            <Commitment
              alt="こだわり②"
              imagePosition="right"
              description={`足場工事は、手が届かない場所の建設工事を行う前に行われる工事で、建物周辺に足場を組み立てることで作業員が、安全に効率的に工事ができるようにするための工事です。
  建設現場全体を支える役割を果たす足場は、作業を効率よく進められる安全なものでなければなりません。弊社は、熟練のスタッフが安全に気を配ることで、高水準な足場づくりを実現しています。`}
              slideInFrom="right"
              image={business2[0]}
              title="こだわり②　足場工事"
              className=""
            />
          )}
          {business3[0] && (
            <Commitment
              alt="こだわり③"
              imagePosition="left"
              description={`弊社では外壁塗装から本格的な内装リフォームまで、横浜市を拠点に神奈川県内の施工にご対応しております。
  様々な現場で得た経験値を強みに、日々こだわるのは“お客様の求めるもの”を提供すること。ご要望やライフスタイルをじっくりお聞きし、イメージ以上の仕上がりになるよう、一生懸命取り組んでいます。
  お住まいのことなら丸ごとお任せいただける対応力がありますので、どうぞ小さなことから安心して私達にお任せください。皆様の理想を実現できるよう、親身に対応させて頂きます。`}
              slideInFrom="left"
              image={business3[0]}
              title="こだわり③　内装リフォーム工事"
              className=""
            />
          )}
        </div>
        <div className="grid max-w-screen-lg w-full place-self-center">
          <h2 id="example" className="text-4xl text-center w-full pt-32">
            施工事例
          </h2>
          <Example
            images={example1}
            title="屋根葺替工事【瓦Uからリッジウェイ(デュアルブラック)】"
            className="mt-10"
          />
          <Example
            images={example2}
            title="屋根葺替工事【波板トタン屋根からガルバリウム鋼板(MSタフワイド：ダークグレイ)】"
            className="mt-10"
          />
          <Example
            images={example3}
            title="外壁塗装工事【セラMシリコン３：ベージュ】"
            className="mt-10"
          />
          <Example
            images={example4}
            title="店舗内装工事"
            className="mt-10 mb-16"
          />
        </div>
        <Footer />
      </Layout>
    </>
  )
}

export default Business
