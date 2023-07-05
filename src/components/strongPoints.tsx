import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import { LinkButton } from "./linkButton"
import useScrollAnimation from "../useScrollAnimation"
import Section from "./section"

const StrongPoint = ({
  Img,
  description,
  title,
}: {
  Img: (props: { className: string }) => React.ReactElement
  title: string
  description: string
}): React.ReactElement => {
  return (
    <>
      <div className="grid grid-rows-[auto,auto,1fr] mx-6 place-items-center rounded-md p-4">
        <div className="mb-4 border-b border-dashed border-slate-400 text-center text-lg pb-2 w-full">
          {title}
        </div>
        <div className="w-2/3 place-self-center grid place-items-center">
          <Img className="object-cover" />
        </div>
        <div className="text-start text-base whitespace-pre-wrap align-top">
          {description}
        </div>
      </div>
    </>
  )
}

const strongPointData: Array<{
  title: string
  name: string
  description: string
}> = [
  {
    title: "自社大工施工で自信を持って確かな技術を提供します！",
    description: `弊社が得意とする部門は屋根葺替工事/外壁・屋根塗装工事/内装リフォーム/大工工事/電気工事/設備工事全般/基礎補強工事です。専門知識を持った弊社従業員がお客様の悩みを解決致します。

  お客様により満足していただくためにもしっかりとヒアリングして材料から施工までこだわり誇りを持って提供いたします。
  `,
    name: "technique",
  },
  {
    title: "水回り",
    description: `・風呂(ユニットバス新設)
・トイレ(ウォシュレット)
・シンク ・キッチン周り
・システムキッチン
・水道トラブル全般
・クリーニング
※施工完了後のアフターメンテナンスや補償致します。
`,
    name: "sink",
  },
  {
    title: "屋根葺替工事",
    description: `※取扱い可能屋根材商品
・アスファルトシングル屋根

【リッジウェイ】

・スレート屋根

【コロニアルクァッド】

・金属屋根

【ガルバリウム鋼板

【MSタフシリーズ】

【スーパーガルテクト】

【スーパーガルテクト遮熱性フッ素】
`,
    name: "roof",
  },
  {
    title: "外壁塗装工事",
    description: `※取扱い可能塗料色々ございます。

外壁・屋根の状況に合わせて、

現地にて専門知識を用いて従業員が

ヒアリングをしっかりとさせて頂きご提案致します。

小さな子どもから高齢者まで、幅広い世代の方が安心・安全で、 快適に生活できる住まいづくりをモットーにしています。

是非何かお困りごとがあれば弊社に

気軽にご相談いただければ従業員が笑顔でご対応させて頂きますのでよろしくお願い致します。
`,
    name: "wall",
  },
]

const StrongPoints = (): React.ReactElement => {
  const data = useStaticQuery(
    graphql`
      query {
        wall: file(relativePath: { eq: "wall.jpg" }) {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
        technique: file(relativePath: { eq: "technique.jpeg" }) {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
        sink: file(relativePath: { eq: "sink.jpg" }) {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
        roof: file(relativePath: { eq: "roof.jpg" }) {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    `
  )
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>()

  return (
    <>
      <Section
        title={{
          tag: "monolingual",
          content: "家族の幸せと自由に暮らす家づくり",
        }}
        className="mt-16 max-w-screen-lg"
        contentRef={ref}
        isVisible={isVisible}
      >
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
          {strongPointData.map(datum => (
            <StrongPoint
              description={datum.description}
              Img={({ className }) => (
                <>
                  {data[datum.name] && (
                    <GatsbyImage
                      alt={datum.name}
                      image={data[datum.name].childImageSharp.gatsbyImageData}
                      imgClassName={className}
                      sizes=""
                    />
                  )}
                </>
              )}
              title={datum.title}
            />
          ))}
        </div>
        <div className="grid grid-rows-2 mx-16 mt-8">
          <LinkButton
            title="施工事例"
            className="mt-4"
            to={{ tag: "/business", section: "example" }}
            type="normal"
          />
          <LinkButton
            title="お問い合わせ"
            className="mt-4"
            to={{ tag: "/contact" }}
            type="normal"
          />
        </div>
      </Section>
    </>
  )
}

export default StrongPoints
