import React, { ComponentProps, useEffect, useRef, useState } from "react"
import Section from "./section"
import useScrollAnimation from "../useScrollAnimation"
import { Status, Wrapper } from "@googlemaps/react-wrapper"
import Spinner from "./spinner"
import { consts } from "../consts"

const PlaceCard = ({ address }: { address: string }) => {
  const googleMapsQuery = address

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded py-5 px-5">
      <div className="grid grid-cols-1 gap-3">
        <div className="col-span-1">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Location
          </h3>
          <p className="mt-1 text-sm text-gray-500">{address}</p>
        </div>
        <div className="col-span-1 grid">
          <div className="grid place-items-center grid-flow-row place-self-end">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${googleMapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-900"
            >
              <span className="material-symbols-outlined text-3xl">map</span>
            </a>
            <div className="text-[0.75rem] -mt-1 text-indigo-600 opacity-80">経路</div>
          </div>
        </div>
      </div>
    </div>
  )
}

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
    <div className="grid relative">
      <MyMapComponent center={center} zoom={18} />
      <div className="absolute top-2 left-2">
        <PlaceCard address={consts.住所} />
      </div>
    </div>
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

function MyMapComponent({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral
  zoom: number
}) {
  const ref = useRef(null)
  const markerRef = useRef<google.maps.Marker | null>(null)

  useEffect(() => {
    if (ref.current) {
      const map = new google.maps.Map(ref.current, {
        center,
        zoom,
      })

      markerRef.current = new google.maps.Marker({
        position: center,
        map,
        title: "Center",
      })
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null)
      }
    }
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
