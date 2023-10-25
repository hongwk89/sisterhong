import CouponPoint from '@components/order/CouponPoint';
import DestinationInfo from '@components/order/DestinationInfo';
import LastPrice from '@components/order/LastPrice';
import OrdererInfo from '@components/order/OrdererInfo';
import OrderList from '@components/order/OrderList';
import PaymentMethod from '@components/order/PaymentMethod';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import sendAxios from 'utils/sendAxios';
import getFormValues from 'utils/getFormValues';
import PageTitle from '@components/PageTitle';
import ErrorPage from '@components/ErrorPage';
import Donation from '@components/order/Donation';
import dayjs from 'dayjs';
import useDonation from '@hooks/store/useDonation';

interface datas {
    [key: string]: number | string;
}

interface orderCheck {
    orderId: string;
    payment: { price_to_pay: number };
}

interface toss_config {
    amount: number;
    orderId: string;
    orderName: string;
    customerName: string;
    successUrl: string;
    failUrl: string;
    validHours?: number;
}

type toss_name = '카드' | '가상계좌' | '계좌이체';

export default function Order({ checkouts, time, memberCheckUrl, returnUrl }) {
    const agreePay = useRef<HTMLInputElement>();
    const shipment = useRef<HTMLDivElement>();
    const router = useRouter();
    const [type, setType] = useState({ sort: 'card', name: '카드' });
    const [isLoading, setIsLoading] = useState(false);
    const [params, setParams] = useState(checkouts.data);
    const bankInfo = useRef<HTMLFormElement>();
    const { donation } = useDonation();
    const today = router.query.today ? dayjs(router.query.today as string).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
    const donationPeriod = dayjs('2023-05-02').format('YYYY-MM-DD') <= today && dayjs('2023-05-21').format('YYYY-MM-DD') >= today;

    const errorData = {
        type: '',
        title: '죄송합니다.',
        explain: '',
        btn: '돌아가기',
        link: returnUrl
    };

    if (checkouts.state === 'fail') {
        errorData.explain = checkouts.data.message;
    }

    const handleKeyDown = (e: KeyboardEvent): void => {
        e.preventDefault();
        if (e.key === ' ') {
            // 스페이스바
            agreePay.current.checked = !agreePay.current.checked;
        }
    };

    const generateData = (sort: string) => {
        let datas: datas = {};
        const dataArray = Array.from(shipment.current.querySelectorAll('[data-type]'));

        for (let i = 0; i < dataArray.length; i++) {
            const data = dataArray[i] as HTMLInputElement;

            if (data.value === '-' && data.dataset.type !== 'requirement') {
                setIsLoading(false);
                alert('배송지정보를 확인해주세요');
                return null;
            }

            if (data.dataset.type === 'shipping_message' || data.dataset.type === 'requirement') {
                datas[data.dataset.type] = data.value;
            }
        }

        datas.donation = donation;
        datas.cart_idx = checkouts.data.products.map((val) => val.cart_idx);
        datas.addr_idx = params.user.addr_idx;
        datas.payment_type = sort;
        datas.coupon_idx = params.discount.coupon_idx;
        datas.serial_coupon = params.discount.serial_code;
        datas.point_use = params.discount.point_use;

        if (sort === 'bank_transfer') {
            return { ...datas, ...getFormValues(bankInfo.current) };
        }

        return datas;
    };

    const checkPrice = async (datas: datas): Promise<orderCheck> => {
        const config = {
            method: 'post',
            url: `${process.env.API_HOST}/orders/order-id`,
            data: datas
        };

        const response = await sendAxios({ config, errFunc: (res) => alert(res.message) });

        if (response.data.user.auth === 'F') {
            router.push(memberCheckUrl);
            return null;
        }

        if (params.payment.price_to_pay !== response.data.payment.price_to_pay) {
            alert('가격이 변경된 상품이 있습니다. 새로고침 뒤 다시 시도해주세요');
            return null;
        }

        return response.data;
    };

    const tossPay = async () => {
        const datas = generateData(type.sort);
        const check = datas && (await checkPrice(datas));

        if (check) {
            const tossPayments = await loadTossPayments(process.env.PAYMENT_CLIENT_KEY);
            const orderName = checkouts.data.products.length === 1 ? checkouts.data.products[0].name : checkouts.data.products[0].name + ' 외 ' + (checkouts.data.products.length - 1) + '건';

            const config: toss_config = {
                amount: check.payment.price_to_pay,
                orderId: check.orderId,
                orderName,
                customerName: checkouts.data.user.user_name,
                successUrl: `${process.env.DOMAIN}/order/success?payment_type=${datas.payment_type}`,
                failUrl: `${process.env.DOMAIN}/order/fail`
            };

            if (type.sort === 'virtual_account') {
                config.validHours = 24;
            }

            await tossPayments.requestPayment(type.name as toss_name, config);
        }
    };

    const bankPay = async () => {
        const name = (document.querySelector('#account_name') as HTMLInputElement).value;
        const receipt = (document.querySelector('input[name=cash_receipt]:checked') as HTMLInputElement).value;
        const phone = (document.querySelector('#account_phone') as HTMLInputElement).value;

        if (!name) {
            alert('입금자명을 입력하여주세요');
            setIsLoading(false);
            return;
        }

        if (receipt === 'Requested' && phone === '') {
            alert('휴대폰번호 또는 사업자등록번호를 입력해주세요');
            return;
        }

        const datas = generateData('bank_transfer');
        const check = datas && (await checkPrice(datas));

        if (check) {
            router.push({
                pathname: '/order/success',
                query: { orderId: check.orderId, amount: params.payment.price_to_pay, payment_type: datas.payment_type }
            });
        }
    };

    const handlePayment = async () => {
        setIsLoading(true);

        const agree = agreePay.current.checked;

        if (!agree) {
            alert('필수 동의항목에 체크하여주세요.');
            setIsLoading(false);
            return;
        }

        try {
            if (type.name === '무통장입금') {
                await bankPay();
            } else {
                await tossPay();
            }
        } catch (err) {
            console.log(err);
        }

        setIsLoading(false);
    };

    return (
        <>
            <PageTitle title="홍언니고기 - 주문서" />
            {checkouts.state === 'success' ? (
                <>
                    <div className="container">
                        <h1>주문서작성/결제</h1>
                        <div className="box">
                            <h2>주문자정보</h2>
                            <OrdererInfo data={checkouts.data.user} />
                        </div>
                        <div className="box" ref={shipment}>
                            <h2>배송지정보</h2>
                            <DestinationInfo data={checkouts.data.user} params={params} setParams={setParams} />
                        </div>
                        <div className="box">
                            <h2>주문상품</h2>
                            <OrderList data={params.products} />
                        </div>
                        {donationPeriod && (
                            <div className="box donation">
                                <Donation params={params} setParams={setParams} />
                            </div>
                        )}
                        <div className="box">
                            <h2>쿠폰/적립금</h2>
                            <CouponPoint data={checkouts.data} time={time} params={params} setParams={setParams} />
                        </div>
                        <div className="box">
                            <h2>최종결제금액</h2>
                            <LastPrice params={params} />
                        </div>
                        <div className="box noMb">
                            <h2>결제수단</h2>
                            <PaymentMethod setType={setType} bankInfo={bankInfo} />
                        </div>
                        <div className="pay">
                            <div className="check">
                                <input type="checkbox" id="agreePay" ref={agreePay} />
                                <label className="chkbox" htmlFor="agreePay" tabIndex={0} onKeyDown={(e: any) => handleKeyDown(e)}></label>
                                <label htmlFor="agreePay">
                                    <p>
                                        <span>(필수)</span> 구매할 상품의 결제정보를 확인하였으며, 구매진행에 동의합니다.
                                    </p>
                                </label>
                            </div>
                            <button type="button" className="commonButton typeRed" onClick={handlePayment} disabled={isLoading}>
                                결제하기
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <ErrorPage data={errorData} explain={checkouts.data.message} />
            )}

            <style jsx>{`
                .container {
                    h1 {
                        padding: 4rem 0;
                        font-size: 2.2rem;
                        font-weight: 700;
                        text-align: center;
                    }
                    .box {
                        box-shadow: 0 0.3rem 0.3rem 0 rgb(0 0 0 / 5%);
                        margin-bottom: 2rem;
                        &.noMb {
                            margin-bottom: 0;
                        }
                    }
                    .pay {
                        padding: 1.5rem var(--side-padding-inner) 3rem;
                        .check {
                            display: flex;
                            column-gap: 0.5rem;
                            margin-bottom: 1.5rem;
                            input {
                                display: none;
                            }
                            label {
                                cursor: pointer;
                                &.chkbox {
                                    display: block;
                                    flex-shrink: 0;
                                    width: 2.4rem;
                                    height: 2.4rem;
                                    border: 0.1rem solid #a2a2a2;
                                    @at-root .check input:checked + .chkbox {
                                        background: url(${process.env.AWS_IMAGE_URL}/images/checked.png) center center no-repeat;
                                        background-size: 80%;
                                    }
                                }
                                p {
                                    display: flex;
                                    padding-top: 0.2rem;
                                    column-gap: 0.5rem;
                                    font-size: 1.4rem;
                                    word-break: keep-all;
                                    color: #707070;
                                    span {
                                        color: #e01922;
                                        vertical-align: top;
                                    }
                                }
                            }
                        }
                        button {
                            width: 12rem;
                            height: 4.5rem;
                            border-radius: 0;
                            margin: 0 auto;
                        }
                    }
                }
            `}</style>
        </>
    );
}

export async function getServerSideProps(context) {
    const returnUrl = context.req.headers.referer ? context.req.headers.referer?.split('kr')[1] : '/';
    const time = new Date().toString().split(' GMT')[0];
    const query = context.query;
    const config = { method: 'get', url: `${process.env.API_HOST}/orders/checkouts`, params: query };

    const checkouts = await sendAxios({ config: config, context });
    let memberCheckUrl = '';

    if (checkouts.state === 'success') {
        memberCheckUrl = `/login/memberCheck/?user_id=${checkouts.data.user.user_id}&returnUrl=${context.resolvedUrl}`;

        if (checkouts.data.user.auth === 'F') {
            return {
                redirect: {
                    permanent: false,
                    destination: memberCheckUrl
                }
            };
        }
    }

    return {
        props: {
            checkouts,
            time,
            memberCheckUrl,
            returnUrl
        }
    };
}
