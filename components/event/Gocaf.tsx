import CustomImage from '@components/CustomImage';
import InnerHtml from '@components/product/detailPage/productInfo/InnerHtml';
import usePopToggle from '@hooks/usePopToggle';
import { useRef, useState } from 'react';
import sendAxios from 'utils/sendAxios';
import CodeList from './CodeList';

export interface gocaf_codes {
    idx: number;
    value: string;
    check: boolean;
    error: string;
}

export default function Gocaf({ data, anchor }) {
    const { popOn, popOpen, popClose } = usePopToggle();
    const count = useRef(0);
    const [codes, setCodes] = useState<gocaf_codes[]>([{ idx: count.current, value: '', check: false, error: '' }]);
    const prefix = '05KIN';

    const handleSubmit = async () => {
        if (codes.filter((data) => data.check === false && data.value !== '').length > 0) {
            alert('응모코드를 다시 확인하여주세요');
            return;
        }

        const config = { method: 'post', url: `${process.env.API_HOST}/set/issue/code`, data: { issue_code: codes.map((data) => prefix + data.value.toUpperCase()) } };
        const success = () => {
            alert('응모되었습니다.');
            popClose();
        };

        await sendAxios({ config, resFunc: success, errFunc: (err) => alert(err.message) });
    };

    return (
        <>
            <div className="wrap" onClick={popOpen}>
                <InnerHtml data={data} anchor={anchor} />
            </div>
            <div className={`pop_bg ${popOn}`}>
                <div className="content fade">
                    <button className="close" onClick={popClose}>
                        <span className="hidden">닫기</span>
                    </button>
                    <div className="image">
                        <CustomImage src={`${process.env.AWS_IMAGE_URL}/images/event/gocaf.png`} alt="" width={336} height={163} />
                    </div>
                    <div className="entry">
                        <h2>응모코드 입력하기</h2>
                        <CodeList codes={codes} setCodes={setCodes} count={count} prefix={prefix} />
                        <button type="button" onClick={handleSubmit}>
                            응모완료
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @use 'styles/mixins';
                .wrap {
                    cursor: pointer;
                    padding: 2rem var(--side-padding);
                }
                .pop_bg {
                    .content {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-55%);
                        width: 80%;
                        margin: 0 10%;
                        .close {
                            @include mixins.closeBtn(2rem, 0.3rem, #fff);
                            position: absolute;
                            top: 1rem;
                            right: 1rem;
                            z-index: 5;
                            border-radius: 50%;
                            width: 1.5rem;
                            height: 1.5rem;
                        }
                        .image {
                            display: block;
                            vertical-align: top;
                        }
                        .entry {
                            padding: 2rem 3.5rem;
                            background: #259ce0;
                            h2 {
                                color: #fff;
                                font-weight: 700;
                                font-size: 2rem;
                                text-align: center;
                            }
                            button {
                                width: 100%;
                                padding: 0.8rem 0;
                                background: #fff;
                                border-radius: 0.5rem;
                                font-weight: 700;
                                font-size: 2rem;
                                margin-top: 2rem;
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
