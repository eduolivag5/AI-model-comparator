import { Chip } from "@heroui/react";
import { CheckIcon } from "../assets/icons/CheckIcon";
import { Model } from "../types";

export default function ChatModelHeader({ model }: { model: Model }) {
    return (
        <div className="flex-shrink-0 flex items-center justify-between mb-2 text-white">
            <div className="flex gap-4 items-center">
                <img src={model.icon} alt={model.name} className="w-8 h-8 rounded-lg" />
                <div className="text-sm flex flex-col">
                    <span className="font-bold">{model.name}</span>
                    <span className="text-xs">{model.company}</span>
                </div>
            </div>
            
            {model.active && (
                <div className="flex gap-2 items-center">
                    {model.last_execution_duration && (
                        <span className="text-xs text-gray-400 items-end text-right justify-end">
                            {model.last_execution_duration.toFixed(2)}ms
                        </span>
                    )}            
                    <Chip className="border-none" startContent={<CheckIcon size={14} />} color="success" size="sm" variant="faded">Active</Chip>
                </div>
            )}
        </div>
    )
}
