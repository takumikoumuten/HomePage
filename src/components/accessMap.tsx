import React, { ComponentProps, useEffect, useRef, useState } from "react"
import Section from "./section"
import useScrollAnimation from "../useScrollAnimation"
import { Status, Wrapper } from "@googlemaps/react-wrapper"
import Spinner from "./spinner"
import { consts } from "../consts"

const MapComponent = ({ apiKey }: { apiKey: string }): React.ReactElement => {
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLocation(consts.住所, apiKey)
      .then(location => {
        setCenter(location)
      })
      .catch(error => {
        setError(error.message)
      })
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  return center ? (
    <MyMapComponent center={center} zoom={15} />
  ) : (
    <div>centerが存在しない</div>
  )
}

const fetchLocation = async (
  address: string,
  apiKey: string
): Promise<google.maps.LatLngLiteral> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  )
  const data = await response.json()

  if (data.status !== "OK") {
    throw new Error(`Geocoding failed: ${data.status}`)
  }

  return data.results[0].geometry.location
}

// 地図を表示するコンポーネント
function MyMapComponent({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral
  zoom: number
}) {
  const ref = useRef(null)

  useEffect(() => {
    ref.current &&
      new google.maps.Map(ref.current, {
        center,
        zoom,
      })
  }, [center, zoom])

  return <div ref={ref} id="map" className="aspect-[4/3] w-full" />
}

const render =
  (apiKey: string): ComponentProps<typeof Wrapper>["render"] =>
  status => {
    switch (status) {
      case Status.LOADING:
        return <Spinner />
      case Status.FAILURE:
        return (
          <>
            <div className="text-sm text-slate-800">読み込みに失敗しました</div>
          </>
        )
      case Status.SUCCESS:
        return <MapComponent apiKey={apiKey} />
    }
  }

const AccessMap = ({
  className,
}: {
  className: string
}): React.ReactElement => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>()
  const apiKey = process.env.GATSBY_GOOGLE_MAP_API_KEY || ""
  useEffect(() => {
    console.log({ apiKey, env: process.env })
  }, [])

  return (
    <>
      <Section
        className={className}
        isVisible={isVisible}
        contentRef={ref}
        title={{
          tag: "bilingual",
          english: "ACCESS MAP",
          japanese: "アクセスマップ",
        }}
      >
        <Wrapper apiKey={apiKey} render={render(apiKey)} />
      </Section>
    </>
  )
}

export default AccessMap
