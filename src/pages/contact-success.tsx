import React from "react"
import { ContactLayout } from "./contact"
import { LinkButton } from "../components/linkButton"

const ContactSuccess = (): React.ReactElement => {
  return (
    <>
      <ContactLayout>
        <div className="">
          <div className="">成功しました。</div>
          <LinkButton
            className=""
            title="ホーム画面へ"
            to={{ tag: "/" }}
            type="normal"
          ></LinkButton>
        </div>
      </ContactLayout>
    </>
  )
}

export default ContactSuccess
