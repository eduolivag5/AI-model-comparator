import { create } from 'zustand';
import { Model } from "../types";
import { models } from '../data/models';

interface ModelState {
  selectedModels: Model[];
  setSelectedModels: (models: Model[]) => void;
  setModelExecutionDuration: (modelId: string, duration: number) => void;
}

const LOCAL_STORAGE_KEY = "selectedModels";  

export const useModelsStore = create<ModelState>((set) => {
  
  const storedModelIds = localStorage.getItem(LOCAL_STORAGE_KEY);
  const initialModelIds: string[] = storedModelIds ? JSON.parse(storedModelIds) : [];
  
  
  const models = getModelsByIds(initialModelIds); 
  
  return {
    selectedModels: models,
    setSelectedModels: (models: Model[]) => {
      
      const modelIds = models.map(model => model.id);
      set({ selectedModels: models });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(modelIds));
    },
    setModelExecutionDuration: (modelId: Model['id'], duration: Model['last_execution_duration']) => 
      set((state) => ({
        selectedModels: state.selectedModels.map((model) =>
          model.id === modelId ? { ...model, last_execution_duration: duration } : model
      ),
    })),
  };
});


function getModelsByIds(ids: Model['id'][]): Model[] {
  return models.filter((model) => ids.includes(model.id));
}
