import { create } from 'zustand';
import { Model } from "../types";

interface ModelState {
  selectedModels: Model[];
  setSelectedModels: (models: Model[]) => void;
}

const LOCAL_STORAGE_KEY = "selectedModels";  // Clave para el localStorage

export const useModelsStore = create<ModelState>((set) => {
  // Cargar los modelos desde localStorage, si existen
  const storedModels = localStorage.getItem(LOCAL_STORAGE_KEY);
  const initialModels = storedModels ? JSON.parse(storedModels) : [];

  return {
    selectedModels: initialModels,  // Iniciar con los modelos almacenados
    setSelectedModels: (models: Model[]) => {
      // Actualizar el estado y guardar en localStorage
      set({ selectedModels: models });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(models));
    },
  };
});
