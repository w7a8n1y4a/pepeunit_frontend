import BaseModal from '../modal/baseModal'
import SearchForm from '../forms/search/searchForm';

import { useModalStore } from '@stores/baseStore';


interface GraphSearchProps {
  onFocusNode?: (uuid: string) => void
}

export default function GraphSearch({ onFocusNode }: GraphSearchProps){

  const { activeModal } = useModalStore();

  return (
    <>
      <BaseModal
        modalName={"Node Search"}
        open={activeModal === 'graphSearch'}
      >
        <SearchForm onFocusNode={onFocusNode} />
      </BaseModal>
    </>
  )
}
