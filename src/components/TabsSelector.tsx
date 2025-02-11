import {Tabs, Tab, Card, CardBody} from "@heroui/react";
import { useModelsStore } from "../store/models";
import ChatWindow from "./ChatWindow";

export default function TabsSelector() {

    const { selectedModels } = useModelsStore();

    return (
        <div>
            {selectedModels.length > 0 && 
                <Tabs disabledKeys={selectedModels.filter((model) => !model.active).map((model) => model.id)}>
                    {selectedModels.map((model, index) => (
                        <Tab key={model.id} className="py-5 w-auto" title={
                            <div className="flex items-center space-x-2">
                                <img src={model.icon} alt={model.name} className="w-6 h-6" />
                                <span className="">{model.name}</span>
                            </div>}
                        >
                            <Card>
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
