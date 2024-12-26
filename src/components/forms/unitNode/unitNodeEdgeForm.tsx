import BaseModal from '../../modal/baseModal';
import { useResultHandler } from '@rootTypes/useResultHandler';
import { useGetUnitsOutputByInputLazyQuery, useDeleteUnitNodeEdgeMutation } from '@rootTypes/compositionFunctions';
import { useState, useEffect } from 'react';
import { useModalStore } from '@stores/baseStore';
import Spinner from '@primitives/spinner';
import ResultQuery from '@primitives/resultQuery';
import PaginationControls from '@primitives/pagination';
import IterationList from '@primitives/iterationList'
import UnitNodeEdgeCreateForm from '../../forms/unitNode/unitNodeEdgeCreateForm';
import '../form.css';

interface UnitNodeEdgeFormProps {
    currentNodeData: any;
}

export default function UnitNodeEdgeForm({ currentNodeData }: UnitNodeEdgeFormProps) {
    const { resultData, handleError } = useResultHandler();

    const { activeModal } = useModalStore();
    const [nodeOutputs, setNodeOutputs] = useState<Array<any> | null>(null);
    const [getUnitsOutputByInputQuery] = useGetUnitsOutputByInputLazyQuery();
    const [deleteUnitNodeEdgeMutation] = useDeleteUnitNodeEdgeMutation();
    
    const [isLoaderActive, setIsLoaderActive] = useState(false);
    
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 6;

    const fetchNodeOutputs = () => {
        setIsLoaderActive(true);
        getUnitsOutputByInputQuery({
            variables: {
                unitNodeInputUuid: currentNodeData.uuid,
                limit: itemsPerPage,
                offset: currentPage * itemsPerPage
            }
        }).then(ResultData => {
            if (ResultData.data) {
                setNodeOutputs(ResultData.data.getUnits.units);
                setTotalCount(ResultData.data.getUnits.count);
            }
        }).catch(error => {
            handleError(error);
        }).finally(() => {
            setIsLoaderActive(false);
        });
    };

    useEffect(() => {
        fetchNodeOutputs();
    }, [currentNodeData, currentPage, activeModal]);

    const handleDeleteEdge = (outputNodeUuid: string) => {
        setIsLoaderActive(true);
    
        if (currentNodeData) {
            deleteUnitNodeEdgeMutation({
                variables: {
                    inputUuid: currentNodeData.uuid,
                    outputUuid: outputNodeUuid
                }
            }).then(result => {
                if (result.data) {
                    fetchNodeOutputs();
                }
            }).catch(error => {
                handleError(error);
            }).finally(() => {
                setIsLoaderActive(false);
            });
        }
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <>
            {isLoaderActive && <Spinner />}

            <IterationList
                items={nodeOutputs}
                renderType={'collapse'}
                handleDelete={handleDeleteEdge}
                openModalName={'unitNodeEdgeCreate'}
            />

            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                goToNextPage={() => setCurrentPage(prev => prev + 1)}
                goToPreviousPage={() => setCurrentPage(prev => prev - 1)}
            />

            <BaseModal
                modalName={'Поиск по Unit'}
                open={activeModal === 'unitNodeEdgeCreate'}
                openModalType={"unitNodeAddOutputToInput"} 
            >
                {currentNodeData && (
                    <UnitNodeEdgeCreateForm
                        currentNodeData={currentNodeData}
                    />
                )}
            </BaseModal>

            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}
