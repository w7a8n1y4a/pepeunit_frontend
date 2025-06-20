import { ResultType } from '@rootTypes/resultEnum'
import angry_img from '/images/pepe/angry.svg'
import happy_img from '/images/pepe/happy.svg'
import default_img from '/images/pepe/default.svg'

import './primitives.css'

import { useErrorStore } from '@stores/errorStore';

export default function ResultQuery() {

    const { error } = useErrorStore();

    const imageMap = {
        [ResultType.Happy]: happy_img,
        [ResultType.Default]: default_img,
        [ResultType.Angry]: angry_img,
      };

    const classMap = {
        [ResultType.Happy]: 'result_happy',
        [ResultType.Default]: 'result_default',
        [ResultType.Angry]: 'result_angry',
      };

    return (
        <>
            {
                error.message && (
                    <div className={classMap[error.type]}>
                        <img src={imageMap[error.type]} width="36" height="36" />
                        <div className={classMap[error.type] + "_message"}>
                            {error.message}
                        </div>
                    </div>
                )
            }
        </>
    );
}