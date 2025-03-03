import { useState } from 'react';
import { ResultType } from '@rootTypes/resultEnum';

export interface ResultState {
  type: ResultType;
  message: string | null;
}

export function useResultHandler() {
  const [resultData, setResultData] = useState<ResultState>({
    type: ResultType.Happy,
    message: null,
  });

  const handleSuccess = (message: string) => {
    setResultData({
      type: ResultType.Happy,
      message,
    });
  };

  const handleError = (error: any) => {
    console.log(error);
    
    let errorMessage = 'Unknown error';
    
    if (error?.graphQLErrors?.length) {
      errorMessage = error.graphQLErrors[0]?.message?.slice(4) || errorMessage;
    } else if (error?.errors?.length) {
      errorMessage = error.errors[0]?.message?.slice(4) || errorMessage;
    }
    
    console.log(errorMessage);
    
    setResultData({
      type: ResultType.Angry,
      message: errorMessage,
    });
  };

  return { resultData, setResultData, handleSuccess, handleError };
}
