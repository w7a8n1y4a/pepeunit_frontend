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
    console.log(error)
    const errorMessage = error?.graphQLErrors?.[0]?.message?.slice(4) || 'Unknown error';
    console.log(errorMessage)
    setResultData({
      type: ResultType.Angry,
      message: errorMessage,
    });
  };

  return { resultData, setResultData, handleSuccess, handleError };
}
