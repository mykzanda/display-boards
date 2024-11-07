import { DisplayBoard, BoardItem } from "@/lib/types"
import { LegacyRef, MutableRefObject, RefObject } from "react"
import QRCode from "react-qr-code"

export default function ToPrintElement({ boards }: { boards: DisplayBoard }) {
    return (
        <div className="labels-container flex-1 p-4  max-w-[1112px] overflow-y-hidden grid grid-cols-2 gap-x-[52px] gap-y-[25px] py-[57px] px-[105px]">
            {boards &&
                boards.Board_Items.map((item: BoardItem, index: number) => {
                    return (
                        <div key={index} className="board-item">
                            <div className=" w-full h-[184px] bg-[rgba(255,255,255,85%)] rounded-[6px] text-black p-4 flex items-center gap-6">
                                <div className="grow flex flex-col h-full ">
                                    <span className="text-base font-bold uppercase">{item.Board_Items.Parent_Product ? item.Board_Items.Parent_Product.Name : item.Board_Items.Code}</span>
                                    <br />
                                    <p className="text-[11px]">{item.Board_Items.Code}</p>

                                    {
                                        item.Board_Items.Description ? <p className="text-[11px]">{item.Board_Items.Description}</p> : ""
                                    }
                                    {
                                        item.Board_Items.Item_Finish ? <p className="text-[11px]">Finish: {item.Board_Items.Item_Finish.Finish_ID}</p> : ""
                                    }
                                    {
                                        item.Board_Items.Item_Function ? <p className="text-[11px]">Function: {item.Board_Items.Item_Function.Function}</p> : ""
                                    }
                                </div>
                                <div className="w-[100px] flex flex-col items-center justify-center gap-3">
                                    <QRCode
                                        value="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                        size={100}
                                    />
                                    <span className="text-xs break-words max-w-[100px]">hhttps://cleanuri.com/qX8MyN</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {/* {boards &&
                boards.Board_Items.length < 29 ?
                Array.from({ length: 29 - boards.Board_Items.length }).map((_, index: number) => (
                    <div key={index} className="w-full h-[184px] bg-white border-[2px] border-black rounded-[6px] text-black p-4 flex items-center gap-6"></div>
                ))
                : ""
            } */}
        </div>
    )
}
