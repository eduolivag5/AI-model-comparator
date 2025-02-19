import { Avatar, Chip, Select, SelectItem } from "@heroui/react";
import { models } from "../data/models";
import { useModelsStore } from "../store/models";

export default function ModelSelector() {
    
    const { selectedModels, setSelectedModels } = useModelsStore();

    const handleSelectionChange = (selectedIds: string[]) => {
        const selected = models.filter((model) => selectedIds.includes(model.id));
        setSelectedModels(selected);
    };

    return (
        <Select
            className="md:max-w-xs"
            label="Modelos IA"
            placeholder="Selecciona los modelos"
            selectedKeys={selectedModels.map((model) => model.id)} 
            selectionMode="multiple"
            disabledKeys={models.filter((model) => !model.active).map((model) => model.id)}
            onChange={(e) => handleSelectionChange(e.target.value.split(","))} 
        >
            {models
                .sort((a, b) => Number(b.active) - Number(a.active)) 
                .map((model) => (
                    <SelectItem
                        startContent={<Avatar alt={model.name} className="w-6 h-6" src={model.icon} />}
                        endContent={
                            model.active ? <Chip className="border-none" color="success" size="sm" variant="dot"></Chip>
                            : <Chip className="border-none" color="warning" size="sm" variant="dot"></Chip>
                        }
                        key={model.id}
                    >
                        {model.name}
                    </SelectItem>
            ))}
        </Select>
    );
}
