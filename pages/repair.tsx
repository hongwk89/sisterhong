import CustomImage from '@components/CustomImage';

const CONTENTS = {
    preparing: {
        img: 'builder.png',
        h: '홍언니고기 공식몰\n 리뉴얼 준비중입니다.',
        p1: '4월 3일 오후 5시\n 새로운 모습으로 찾아뵙겠습니다.',
        p2: '감사합니다.'
    },
    checking: {
        img: 'miner.png',
        h: '사이트 점검 중입니다.',
        p1: '불편을 끼쳐드려 죄송합니다.',
        p2: '빠른 시일 내에 작업을 완료하고\n서비스를 제공할 수 있도록 노력하겠습니다.'
    }
};

export default function Repair() {
    const type = 'checking';

    return (
        <>
            <div className="wrap">
                <span className="image">
                    <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/${CONTENTS[type].img}`} alt="" width={120} height={120} />
                </span>
                <h1>{CONTENTS[type].h}</h1>
                <p className="p1">{CONTENTS[type].p1}</p>
                <p className="p2">{CONTENTS[type].p2}</p>
            </div>
            <style jsx>{`
                .wrap {
                    padding: 4rem var(--side-padding);
                    text-align: center;
                    .image {
                        display: block;
                        margin: 0 auto;
                        width: 6rem;
                    }
                    h1 {
                        font-size: 3rem;
                        font-weight: 700;
                        color: var(--main-color);
                        margin: 1rem 0 2rem;
                        white-space: pre-wrap;
                    }
                    p {
                        white-space: pre-wrap;
                        &.p1 {
                            font-size: 1.8rem;
                            font-weight: 700;
                            margin-bottom: 2rem;
                        }
                        &.p2 {
                            font-size: 1.4rem;
                        }
                    }
                }
            `}</style>
        </>
    );
}
