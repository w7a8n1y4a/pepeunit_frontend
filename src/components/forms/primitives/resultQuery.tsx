import { ResultType } from '@rootTypes/resultEnum'
import angry_img from '/images/pepe/angry.svg'
import happy_img from '/images/pepe/happy.svg'
import default_img from '/images/pepe/default.svg'
import '../form.css'

export default function ResultQuery({ resultData }: { resultData: { type: ResultType; message: string | null }}) {

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
                resultData.message && (
                    <div className={classMap[resultData.type]}>
                        <img src={imageMap[resultData.type]} width="36" height="36" />
                        <div className={classMap[resultData.type] + "_message"}>
                            {resultData.message}
                        </div>
                    </div>
                )
            }
        </>
    );
}