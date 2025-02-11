import { create } from 'zustand';
import { Model } from "../types";

interface ModelState {
  selectedModels: Model[];
  setSelectedModels: (models: Model[]) => void;
}

const LOCAL_STORAGE_KEY = "selectedModels";  

export const useModelsStore = create<ModelState>((set) => {
  
  const storedModels = localStorage.getItem(LOCAL_STORAGE_KEY);
  const initialModels = storedModels ? JSON.parse(storedModels) : [];

  return {
    selectedModels: initialModels,  
    setSelectedModels: (models: Model[]) => {
      
      set({ selectedModels: models });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(models));
    },
  };
});
