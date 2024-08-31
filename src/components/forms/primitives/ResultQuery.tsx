import { ResultType } from '../../../types/resultEnum'
import angry_img from '/images/pepe/angry.svg'
import happy_img from '/images/pepe/happy.svg'
import default_img from '/images/pepe/default.svg'
import '../form.css'

interface ResultQueryProps {
    resultType: ResultType
    resultMessage: string | null
}

export default function ResultQuery({ resultType, resultMessage }: ResultQueryProps) {

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
                resultMessage !== null ? (
                    <div className={classMap[resultType]}>
                        <img src={imageMap[resultType]} width="36" height="36" />
                        <div className={classMap[resultType] + "_message"}>
                            {resultMessage}
                        </div>
                    </div>
                ) : (<></>)
            }
        </>
    );
}