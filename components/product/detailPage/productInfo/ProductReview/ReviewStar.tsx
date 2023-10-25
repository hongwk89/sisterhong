import CustomImage from '@components/CustomImage';

const STARS = [1, 2, 3, 4, 5];

export function ReviewStar({ score }) {
    return (
        <>
            <ul>
                {STARS.map((val, idx) => {
                    if (val <= score) {
                        return (
                            <li key={idx}>
                                <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/star.png`} alt="별" width={20} height={20} />
                            </li>
                        );
                    }
                })}
            </ul>
            <style jsx>{`
                ul {
                    display: flex;
                    gap: 0.1rem;
                    li {
                        line-height: 0;
                        width: 1rem;
                        height: 1rem;
                    }
                }
            `}</style>
        </>
    );
}
