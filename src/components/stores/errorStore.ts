import { create } from 'zustand';
import { ResultType } from '@rootTypes/resultEnum';

interface ErrorState {
  error: {
    type: ResultType;
    message: string | null;
  };
  setHappy: (message: string) => void;
  setAngry: (message: string) => void;
  setDefault: (message: string) => void;
  setError: (error: any) => void;
  clearError: () => void;
  setState: (type: ResultType, message: string | null) => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  error: {
    type: ResultType.Default,
    message: null,
  },
  setHappy: (message) => set({ 
    error: { 
      type: ResultType.Happy, 
      message 
    } 
  }),
  setAngry: (message) => set({ 
    error: { 
      type: ResultType.Angry, 
      message 
    } 
  }),
  setDefault: (message) => set({ 
    error: { 
      type: ResultType.Default, 
      message 
    } 
  }),
  setError: (error) => {
    let errorMessage = 'Unknown error';
    
    if (error?.graphQLErrors?.length) {
      errorMessage = error.graphQLErrors[0]?.message?.slice(4) || errorMessage;
    } else if (error?.errors?.length) {
      errorMessage = error.errors[0]?.message?.slice(4) || errorMessage;
    }
    
    set({ 
      error: { 
        type: ResultType.Angry, 
        message: errorMessage 
      } 
    });
  },
  clearError: () => set({ 
    error: { 
      type: ResultType.Default, 
      message: null 
    } 
  }),
  setState: (type, message) => set({
    error: {
      type,
      message
    }
  }),
}));