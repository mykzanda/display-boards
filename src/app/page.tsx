import { Metadata } from "next"
import Image from "next/image"


import { getDisplayBoardLocations } from "@/lib/directus"
import { IData, BoardItem } from "@/lib/types"

import Main from "@/components/main"

export const metadata: Metadata = {
  title: "Display Boards",
  description: "The OpenAI Playground built using the components.",
}

export default async function PlaygroundPage() {

  const data = await getDisplayBoardLocations()

  const result: IData[] = JSON.parse(data)
  // console.log(JSON.stringify(result, null, 2));
  const locations = result.map((item) => { return { id: item.id, name: item.Location_Name } })

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/playground-light.webp"
          width={1280}
          height={916}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/playground-dark.webp"
          width={1280}
          height={916}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>

      <Main location={result} />
    </>
  )
}