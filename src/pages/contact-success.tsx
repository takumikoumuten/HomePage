import React from "react"
import { ContactLayout } from "./contact"
import { LinkButton } from "../components/linkButton"

const ContactSuccess = (): React.ReactElement => {
  return (
    <>
      <ContactLayout>
        <div className="grid place-items-center">
          <div className="p-8 mx-auto">成功しました。</div>
          <LinkButton
            className="mx-auto px-8"
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
