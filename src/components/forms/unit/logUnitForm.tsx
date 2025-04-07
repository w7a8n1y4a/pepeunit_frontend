import { useResultHandler } from '@handlers/useResultHandler';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useGetUnitLogsLazyQuery, LogLevel } from '@rootTypes/compositionFunctions'
import PaginationControls from '@primitives/pagination';
import LogLevelSelector from '@primitives/logLevelSelector';
import { useState, useEffect } from 'react';
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import '../form.css'

import { useNodeStore } from '@stores/baseStore';


export default function LogUnitForm() {
    const { resultData, handleError } = useResultHandler();
    const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

    const { currentNodeData } = useNodeStore();

    const [currentUnitLogs, setCurrentUnitLogs] = useState<any | null>(null)
    const [selectedLogLevels, setSelectedLogLevels] = useState<LogLevel[]>(
        [LogLevel.Debug, LogLevel.Info, LogLevel.Warning, LogLevel.Error, LogLevel.Critical]
    );

    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 6;

    const [getUnitLogs] = useGetUnitLogsLazyQuery()

    const loadEntities = async (
        currentPage: number,
        level: LogLevel[],
    ) => {
        runAsync(async () => {
            let result = await getUnitLogs({
                variables: {
                    uuid: currentNodeData.uuid,
                    level: level,
                    limit: itemsPerPage,
                    offset: currentPage * itemsPerPage
                }
            })
            if (result.data?.getUnitLogs){
                console.log(result.data.getUnitLogs.unitLogs)
                setCurrentUnitLogs(result.data.getUnitLogs.unitLogs)
                setTotalCount(result.data.getUnitLogs.count);
            }else{
                setCurrentUnitLogs([])
            }
        })
    };

    useEffect(() => {
        loadEntities(currentPage, selectedLogLevels);
    }, [currentNodeData]);
    
    useEffect(() => {
        loadEntities(currentPage, selectedLogLevels);
    }, [currentPage, selectedLogLevels]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);
    
    const formatLogDateTime = (datetimeString: string): string => {
        try {
          const date = new Date(datetimeString);
          return date.toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }).replace(/,/, '');
        } catch (e) {
          return datetimeString;
        }
      };

    return (
        <>  
            {
                isLoaderActive && (<Spinner/>)
            }
            <LogLevelSelector
                levels={[LogLevel.Debug, LogLevel.Info, LogLevel.Warning, LogLevel.Error, LogLevel.Critical]}
                selectedLogLevels={selectedLogLevels}
                setSelectedLogLevels={setSelectedLogLevels}
            />
            {
            currentUnitLogs &&
            <div className="unit-env-form">
                {currentUnitLogs && Object.entries(currentUnitLogs).map(([key, value]: [string, any]) => (
                <div key={key} className="log-entry">
                    <div className="log-header">
                    <span>{formatLogDateTime(value.createDatetime)}</span>
                    <span className={`log-level ${value.level}`}>{value.level}</span>
                    </div>
                    <div className="log-content">
                    {value.text}
                    </div>
                </div>
                ))}
            </div>
            }
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                goToNextPage={() => setCurrentPage(prev => prev + 1)}
                goToPreviousPage={() => setCurrentPage(prev => prev - 1)}
            />
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}