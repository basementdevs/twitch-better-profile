import React from "react"

import { t } from "~utils/i18nUtils"

export default function Hero({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ marginTop: 32, marginBottom: 32 }}>
      <h1 className="text-4xl font-semibold">{t("heroTitle")}</h1>
      <p className="text-lg font-light">{t("heroSubtitle")}</p>
      {children}
    </div>
  )
}
