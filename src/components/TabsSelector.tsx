import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import { useModelsStore } from "../store/models";
import ChatWindow from "./ChatWindow";

export default function TabsSelector() {
    const { selectedModels } = useModelsStore();
  
    return (
        <div className="w-full h-full flex flex-col">
            {selectedModels.length > 0 && 
                <Tabs className="flex-shrink-0" disabledKeys={selectedModels.filter((model) => !model.active).map((model) => model.id)}>
                    {selectedModels.map((model, index) => (
                        <Tab key={model.id} className="h-full w-auto overflow-hidden" title={
                            <div className="flex items-center space-x-2">
                                <img src={model.icon} alt={model.name} className="w-6 h-6 rounded-lg" />
                                <span className="hidden md:block">{model.name}</span>
                            </div>
                        }>
                            <Card className="flex-1 h-full">
                                <CardBody>
                                <ChatWindow key={index} model={model} />
                                </CardBody>
                            </Card>
                        </Tab>
                    ))}
                </Tabs>
            }
        </div>
    );
}
  