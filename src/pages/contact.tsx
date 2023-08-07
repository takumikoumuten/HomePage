import React, { PropsWithChildren, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Layout from "../components/layout"
import Hero from "../components/hero"
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import Breadcrumb from "../components/breadcrumb"
import { consts } from "../consts"
import classNames from "classnames"
import Footer from "../components/footer"
import Seo from "../components/seo"
import useScrollAnimation from "../useScrollAnimation"
import useFirstSuccess from "../useFirstSuccess"
import Recaptcha from "react-google-recaptcha"
import { routeToLink } from "../routes"

export const Head = () => <Seo pageName="CONTACT" />

const RECAPTCHA_KEY = "6LfmoP0mAAAAABYvjz6G2Om1VJSpPmRauJsden5C"

function encode(data: any) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const schema = yup.object().shape({
  name: yup.string().required("お名前は必須です"),
  email: yup
    .string()
    .email("有効なメールアドレスを入力してください")
    .required("メールアドレスは必須です"),
  phoneNumber: yup
    .string()
    .matches(
      /^(0{1}\d{1,4}-{1}\d{1,4}-{1}\d{4})$/,
      "電話番号の形式が正しくありません"
    )
    .optional()
    .transform((value, originalValue) => {
      return originalValue === undefined ? "" : value
    }),
  address: yup
    .string()
    .optional()
    .transform((value, originalValue) => {
      return originalValue === undefined ? "" : value
    }),
  message: yup
    .string()
    .optional()
    .transform((value, originalValue) => {
      return originalValue === undefined ? "" : value
    }),
  recaptcha: yup.string().required(),
})

export const ContactLayout = ({
  children,
}: PropsWithChildren<{}>): React.ReactElement => {
  const contactHeroData = useStaticQuery(graphql`
    query {
      contactHero: file(relativePath: { eq: "contactHero.jpg" }) {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  `)
  const contactHero = getImage(contactHeroData.contactHero)
  return (
    <>
      <Layout hero={<Hero image={contactHero} type="small" />}>
        <div className="grid grid-rows-[min-content]">
          <div className="grid max-w-screen-md justify-self-center w-full grid-rows-[auto,auto] h-min px-8">
            <Breadcrumb
              className="mt-4"
              path={[
                { link: { tag: "/" }, title: `${consts.社名} HOME` },
                { link: null, title: "CONTACT" },
              ]}
            />
            <div className="text-3xl w-full text-center mt-12">CONTACT</div>
          </div>
          <div className="bg-neutral-100 mt-12 grid">
            <div className="grid px-8 max-w-screen-md justify-self-center">{children}</div>
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  )
}

const Contact = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    progressive: true,
  })
  const recaptchaRef = useRef<Recaptcha>(null)
  const onSubmit: Parameters<typeof handleSubmit>[0] = (data, e) => {
    e?.preventDefault()

    const myForm = e?.target
    const formData = new FormData(myForm)

    if (recaptchaRef.current === null) return
    const recaptchaValue = recaptchaRef.current.getValue()
    console.log(recaptchaValue)
    if (recaptchaValue === null) return
    fetch("/", {
      method: "POST",
      body: new URLSearchParams({
        "form-name": "contact",
        "g-recaptcha-response": recaptchaValue,
        ...formData,
      } as any).toString(),
    })
      .then(() => console.log("Form successfully submitted"))
      .catch(error => alert(error))
  }

  const Label = ({ children }: PropsWithChildren<{}>) => (
    <label className={classNames(["text-sm text-[#01984c]"])}>{children}</label>
  )

  const Error = ({ children }: PropsWithChildren) => (
    <p className="text-sm text-red-400">{children}</p>
  )
  const [ref, isVisible] = useScrollAnimation<HTMLFormElement>()
  const isFirstVisible = useFirstSuccess(isVisible)

  return (
    <ContactLayout>
      <form
        data-netlify="true"
        data-netlify-recaptcha="true"
        action={routeToLink({ tag: "/contact-success" }).link}
        name="contact"
        onSubmit={handleSubmit(onSubmit)}
        className={classNames([
          "justify-self-center w-full max-w-screen-md mb-36",
          { "animate-slow-slide-fade-in-left": isFirstVisible },
        ])}
        ref={ref}
      >
        <input type="hidden" name="form-name" value="contact" />

        <div className="text-[#01984c] text-3xl mt-10">お問い合わせ</div>

        <div className="text-lg text-[#01984c] mt-4">
          ご相談、サービスについてのご質問やご要望がございましたら、
          下記フォームよりお気軽にお問い合わせください。
        </div>

        <div className="text-lg text-[#01984c] mt-2">
          送付いただいた内容を確認の上、担当者からご連絡させていただきます。
        </div>

        <div className="grid grid-flow-row gap-2 mt-8">
          <Label>お名前(必須):</Label>
          <input
            {...register("name")}
            className={classNames([
              "px-3 py-2 rounded-sm border border-[#01984c]",
              { "border-red-400": errors.name },
            ])}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </div>

        <div className="grid grid-flow-row gap-2 mt-4">
          <Label>メールアドレス(必須):</Label>
          <input
            {...register("email")}
            className={classNames([
              "px-3 py-2 rounded-sm border border-[#01984c]",
              { "border-red-400": errors.email },
            ])}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </div>

        <div className="grid grid-flow-row gap-2 mt-4">
          <Label>電話番号:</Label>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <input
                {...field}
                className={classNames([
                  "px-3 py-2 rounded-sm border border-[#01984c]",
                  { "border-red-400": errors.phoneNumber },
                ])}
              />
            )}
          />
          {errors.phoneNumber && <Error>{errors.phoneNumber.message}</Error>}
        </div>

        <div className="grid grid-flow-row gap-2 mt-4">
          <Label>住所:</Label>
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <input
                {...field}
                className={classNames([
                  "px-3 py-2 rounded-sm border border-[#01984c]",
                ])}
              />
            )}
          />
        </div>

        <div className="grid grid-flow-row gap-2 mt-4">
          <Label>メッセージ:</Label>
          <Controller
            control={control}
            name="message"
            render={({ field }) => (
              <textarea
                {...field}
                className={classNames([
                  "px-3 py-2 rounded-sm border border-[#01984c]",
                ])}
                rows={6}
              />
            )}
          />
        </div>
        <Controller
          name="recaptcha"
          control={control}
          render={({ field }) => (
            <Recaptcha
              sitekey={RECAPTCHA_KEY}
              onChange={value => {
                if (value === null) return
                field.onChange(value)
              }}
              className="mt-8"
            />
          )}
        />
        {errors.recaptcha && <Error>reCAPTCHAが必須です</Error>}

        <button
          type="submit"
          className="px-16 py-2 rounded mt-8 text-lg text-white bg-[#01984c] hover:opacity-70 transition-all duration-500 hover:shadow shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={
            !!(
              errors.address ||
              errors.email ||
              errors.message ||
              errors.name ||
              errors.phoneNumber ||
              errors.recaptcha
            )
          }
        >
          送信
        </button>
      </form>
    </ContactLayout>
  )
}

export default Contact
