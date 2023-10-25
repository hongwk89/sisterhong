import Brands from '@components/Brands';
import useGetPath from '@hooks/useGetPath';
import convertPrice from 'utils/convertPrice';
import friendShare from 'utils/friendShare';
import Timer from '../Timer';
import WishListBtn from './WishListBtn';

export default function DetailPageTop({ data, timer }) {
    const url = useGetPath();

    const shareProduct = () => {
        friendShare('제품페이지 주소가', process.env.DOMAIN + url);
    };

    return (
        <>
            <Brands data={data.brand} />
            {data.promotion_end_date && <Timer startDay={timer} endDay={data.promotion_end_date} rightType={'sidePadding'} />}
            <div className="icons">
                <WishListBtn data={data} />
                <button type="button" onClick={shareProduct}>
                    <svg width="50%" height="50%" viewBox="0 0 40 40" preserveAspectRatio="none">
                        <g transform="translate(-628 -1230)">
                            <path d="M0,13a1,1,0,0,1-.858-.486,1,1,0,0,1,.343-1.372l20-12a1,1,0,0,1,1.372.343A1,1,0,0,1,20.514.857l-20,12A1,1,0,0,1,0,13Z" transform="translate(638 1236)" fill="#707070" />
                            <path d="M20,13a1,1,0,0,1-.514-.143l-20-12A1,1,0,0,1-.857-.515,1,1,0,0,1,.515-.857l20,12A1,1,0,0,1,20,13Z" transform="translate(638.5 1252)" fill="#707070" />
                            <circle cx="6" cy="6" r="6" transform="translate(656 1230)" fill="#f8f8fa" />
                            <path d="M6,2a4,4,0,1,0,4,4A4,4,0,0,0,6,2M6,0A6,6,0,1,1,0,6,6,6,0,0,1,6,0Z" transform="translate(656 1230)" fill="#707070" />
                            <circle cx="6" cy="6" r="6" transform="translate(656 1258)" fill="#f8f8fa" />
                            <path d="M6,2a4,4,0,1,0,4,4A4,4,0,0,0,6,2M6,0A6,6,0,1,1,0,6,6,6,0,0,1,6,0Z" transform="translate(656 1258)" fill="#707070" />
                            <circle cx="6" cy="6" r="6" transform="translate(628 1244)" fill="#f8f8fa" />
                            <path d="M6,2a4,4,0,1,0,4,4A4,4,0,0,0,6,2M6,0A6,6,0,1,1,0,6,6,6,0,0,1,6,0Z" transform="translate(628 1244)" fill="#707070" />
                        </g>
                    </svg>
                </button>
            </div>
            <p className="explain">{data.slogan}</p>
            <h2>{data.name}</h2>
            <span className="price">
                <span className="salePrice">
                    {convertPrice(data.min_price)}원{data.single_options !== 1 && <span className="wave">~</span>}
                </span>
                {data.discount_type !== 0 && <span className="originalPrice">{convertPrice(data.price)}원</span>}
            </span>
            <p className="service">{data.sauce}</p>
            <style jsx>{`
                .icons {
                    position: absolute;
                    top: 50%;
                    right: var(--side-padding);
                    transform: translateY(-40%);
                    button {
                        margin-top: 1rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 4rem;
                        height: 4rem;
                        border-radius: 50%;
                        background: #f8f8fa;
                    }
                }
                .explain {
                    margin-top: 0.5rem;
                    font-size: 1.4rem;
                    color: #707070;
                }
                h2 {
                    font-size: 2.4rem;
                    font-weight: 500;
                }
                .price {
                    display: flex;
                    align-items: baseline;
                    font-size: 2.9rem;
                    font-weight: 700;
                    .originalPrice {
                        font-size: 1.8rem;
                        color: #a2a2a2;
                        text-decoration: line-through;
                        font-weight: 400;
                        margin-left: 0.5rem;
                    }
                    .wave {
                        display: inline-block;
                        vertical-align: 1rem;
                        font-size: 2rem;
                        margin-left: 0.1rem;
                    }
                }
                .service {
                    font-size: 1.4rem;
                    color: #707070;
                }
            `}</style>
        </>
    );
}
