"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { PopoverProps } from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { useMutationObserver } from "@/hooks/use-mutation-observer"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Model, ModelType } from "@/data/models"
import { IData, DisplayBoard } from "@/lib/types"



interface ModelSelectorProps extends PopoverProps {
    types: readonly ModelType[]
    models: IData[]
    locationId: number
    locationAvailability: boolean
    setBoard: any
}

export function ModelSelector({ models, locationId, locationAvailability, types, setBoard, ...props }: ModelSelectorProps) {
    const [open, setOpen] = React.useState(locationAvailability)
    const [selectedModel, setSelectedModel] = React.useState<Model>()
    const [peekedModel, setPeekedModel] = React.useState<Model>()
    const [model, setModel] = React.useState<Model[]>()
    const [isDisabled, setIsDisabled] = React.useState<boolean>(true)

    const location = models.find((item) => item.id === locationId)

    React.useEffect(() => {
        if (location) {
            const boards = location.Display_Boards.map((item) => {
                return {
                    id: item.id,
                    name: item.Board_Name,
                    description: JSON.stringify(item.Board_Items.map((x) => x.Board_Items.Parent_Product?.Name), null, 2),
                    type: item.status,
                }
            })
            setModel(boards)
        }
        console.log(locationAvailability);


        if (locationAvailability) {
            setIsDisabled(false)
        }

    }, [location, locationAvailability])






    return (
        <div className="grid gap-2">
            <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                    <Label htmlFor="model">Display Boards</Label>
                </HoverCardTrigger>
                <HoverCardContent
                    align="start"
                    className="w-[260px] text-sm"
                    side="left"
                >
                    Display Board you wish to get data
                </HoverCardContent>
            </HoverCard>
            <Popover open={open} onOpenChange={setOpen} {...props}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a model"
                        className="w-full justify-between"
                        disabled={isDisabled}
                    >
                        {selectedModel ? selectedModel.name : "Select Display Board..."}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-[250px] p-0">
                    <HoverCard>
                        <HoverCardContent
                            side="left"
                            align="start"
                            forceMount
                            className="min-h-[280px]"
                        >
                            <div className="grid gap-2">
                                <h4 className="font-medium leading-none">{peekedModel?.name}</h4>
                                <div className="text-sm text-muted-foreground mt-5">
                                    {peekedModel &&
                                        JSON.parse(peekedModel.description).map((item: string, index: number) => {
                                            return (
                                                <p key={index}>{item}</p>
                                            )
                                        })
                                    }
                                </div>
                                {peekedModel?.strengths ? (
                                    <div className="mt-4 grid gap-2">
                                        <h5 className="text-sm font-medium leading-none">
                                            Strengths
                                        </h5>
                                        <ul className="text-sm text-muted-foreground">
                                            {peekedModel.strengths}
                                        </ul>
                                    </div>
                                ) : null}
                            </div>
                        </HoverCardContent>
                        <Command loop>
                            <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                                <CommandInput placeholder="Search Board..." />
                                <CommandEmpty>No Location found.</CommandEmpty>
                                <HoverCardTrigger />
                                {model && types.map((type) => {

                                    const test = model.find((item) => item.type === type);
                                    if (test) {
                                        return (
                                            <CommandGroup key={type} heading={type}>
                                                {model
                                                    .filter((model) => model.type === type)
                                                    .map((model) => (
                                                        <ModelItem
                                                            key={model.id}
                                                            model={model}
                                                            isSelected={selectedModel?.id === model.id}
                                                            onPeek={(model) => setPeekedModel(model)}
                                                            onSelect={() => {
                                                                setSelectedModel(model)
                                                                setOpen(false)
                                                                setBoard(model.id)
                                                            }}
                                                        />
                                                    ))}
                                            </CommandGroup>
                                        )
                                    } else {
                                        return
                                    }


                                })}
                            </CommandList>
                        </Command>
                    </HoverCard>
                </PopoverContent>
            </Popover>
        </div>
    )
}

interface ModelItemProps {
    model: Model
    isSelected: boolean
    onSelect: () => void
    onPeek: (model: Model) => void
}

function ModelItem({ model, isSelected, onSelect, onPeek }: ModelItemProps) {
    const ref = React.useRef<HTMLDivElement>(null)

    useMutationObserver(ref, (mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === "attributes") {
                if (mutation.attributeName === "aria-selected") {
                    onPeek(model)
                }
            }
        }
    })

    return (
        <CommandItem
            key={model.id}
            onSelect={onSelect}
            ref={ref}
            className="aria-selected:bg-primary aria-selected:text-primary-foreground"
        >
            {model.name}
            <CheckIcon
                className={cn(
                    "ml-auto h-4 w-4",
                    isSelected ? "opacity-100" : "opacity-0"
                )}
            />
        </CommandItem>
    )
}