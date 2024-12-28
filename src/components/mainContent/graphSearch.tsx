import BaseModal from '../modal/baseModal'
import SearchForm from '../forms/search/searchForm';

import { useModalStore } from '@stores/baseStore';

export default function GraphSearch(){

  const { activeModal } = useModalStore();

  return (
    <>
      <BaseModal
        modalName={"Node Search"}
        open={activeModal === 'graphSearch'}
      >
        <SearchForm/>
      </BaseModal>
    </>
  )
}
