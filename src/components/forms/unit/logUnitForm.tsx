import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useGetUnitLogsLazyQuery, LogLevel, OrderByDate } from '@rootTypes/compositionFunctions'
import PaginationControls from '@primitives/pagination';
import LogLevelSelector from '@primitives/logLevelSelector';
import { useState, useEffect } from 'react';
import Spinner from '@primitives/spinner'
import '../form.css'
import download_img from '/images/download.svg'

import { useNodeStore } from '@stores/baseStore';
import { useErrorStore } from '@stores/errorStore';

function filenameFromDisposition(header: string | null, fallback: string): string {
    if (!header) return fallback;
    const utfMatch = header.match(/filename\*=UTF-8''([^;]+)/i);
    if (utfMatch) {
        try {
            return decodeURIComponent(utfMatch[1]);
        } catch {
            return utfMatch[1];
        }
    }
    const match = header.match(/filename="?([^";]+)"?/i);
    return match ? match[1] : fallback;
}

export default function LogUnitForm() {
    const { isLoaderActive, runAsync } = useAsyncHandler();
    const { setHappy, setAngry } = useErrorStore();

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
        if (currentNodeData.__typename == "UnitType"){
            runAsync(async () => {
                let result = await getUnitLogs({
                    variables: {
                        uuid: currentNodeData.uuid,
                        level: level,
                        orderByCreateDate: OrderByDate.Desc,
                        limit: itemsPerPage,
                        offset: currentPage * itemsPerPage
                    }
                })
                if (result.data?.getUnitLogs){
                    setCurrentUnitLogs(result.data.getUnitLogs.unitLogs)
                    setTotalCount(result.data.getUnitLogs.count);
                }else{
                    setCurrentUnitLogs([])
                }
            })
        }
    };

    useEffect(() => {
        // При смене выбранного узла сбрасываем страницу
        setCurrentPage(0);
    }, [currentNodeData]);
    
    useEffect(() => {
        loadEntities(currentPage, selectedLogLevels);
    }, [currentPage, selectedLogLevels, currentNodeData]);

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

    const handleDownloadLogs = () => {
        if (currentNodeData.__typename !== 'UnitType') return;

        runAsync(async () => {
            try {
                const backendUri = (import.meta.env.VITE_BACKEND_URI || window.env.VITE_BACKEND_URI).replace('graphql', '');
                const url = `${backendUri}api/v1/units/logs/${currentNodeData.uuid}`;
                const token = localStorage.getItem('token');

                if (!token) {
                    setAngry('Auth token is missing');
                    return;
                }

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        accept: 'application/octet-stream',
                        'x-auth-token': token,
                    },
                    mode: 'cors',
                });

                if (!response.ok) {
                    let message = 'Failed to download logs';
                    try {
                        const errorData = await response.json();
                        if (typeof errorData?.detail === 'string') {
                            message = errorData.detail;
                        }
                    } catch {
                        // keep fallback message
                    }
                    throw new Error(message);
                }

                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute(
                    'download',
                    filenameFromDisposition(
                        response.headers.get('content-disposition'),
                        `${currentNodeData.name || 'unit'}.log`,
                    ),
                );
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(downloadUrl);
                setHappy('Logs downloaded');
            } catch (error) {
                setAngry(error instanceof Error ? error.message : 'Failed to download logs');
            }
        });
    };

    return (
        <>  
            {
                isLoaderActive && (<Spinner/>)
            }
            <div className="log_toolbar">
                <LogLevelSelector
                    levels={[LogLevel.Debug, LogLevel.Info, LogLevel.Warning, LogLevel.Error, LogLevel.Critical]}
                    selectedLogLevels={selectedLogLevels}
                    setSelectedLogLevels={setSelectedLogLevels}
                />
                <button
                    className="log_download"
                    onClick={handleDownloadLogs}
                    disabled={isLoaderActive}
                    title="Download logs"
                >
                    <img src={download_img} width="24" height="24" alt="Download logs"/>
                </button>
            </div>
            {
            currentUnitLogs &&
            <div className="unit-env-form">
                {currentUnitLogs && Object.entries(currentUnitLogs).reverse().map(([key, value]: [string, any]) => (
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
                inversed={true}
            />
        </>
    );
}