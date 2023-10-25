import _ from 'lodash';
import convertPrice from 'utils/convertPrice';
import PRRatingOne from './PRRatingOne';

export default function PRRating({ data }) {
    let top = 0;
    let prev = 0;

    Object.keys(data.range).map((key, idx) => {
        if (prev <= data.range[key]) {
            prev = data.range[key];
            top = parseInt(key);
        }
    });

    return (
        <>
            <div className="wrap">
                <div className="rating">
                    <span>{data.average}</span>
                    <span>{convertPrice(data.total)}개의 구매평</span>
                </div>
                <div className="graph">
                    <ul>
                        {Object.keys(data.range).map((key, idx) => (
                            <li key={idx}>
                                <PRRatingOne star={5 - idx} num={data.range[5 - idx]} top={top} total={data.total} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <style jsx>{`
                .wrap {
                    display: flex;
                    .rating {
                        width: 40%;
                        padding-right: 3%;
                        text-align: center;
                        span {
                            display: block;
                            &:first-child {
                                font-size: 3.6rem;
                                font-weight: bold;
                                font-family: 'roboto';
                                line-height: 1.2;
                            }
                            &:last-child {
                                font-size: 1.4rem;
                            }
                        }
                    }
                    .graph {
                        width: 60%;
                        li {
                            margin-bottom: 0.5rem;
                        }
                    }
                }
            `}</style>
        </>
    );
}
