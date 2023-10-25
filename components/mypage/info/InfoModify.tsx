import usePopToggle from '@hooks/usePopToggle';
import { useRouter } from 'next/router';
import { useState } from 'react';
import sendAxios from 'utils/sendAxios';

export default function InfoModify() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { popOn, popOpen, popClose } = usePopToggle();

    const quit = async () => {
        setLoading(true);
        const config = { method: 'post', url: `${process.env.API_HOST}/auth/sign-resign` };

        const success = () => {
            alert('탈퇴되었습니다.');
            router.push('/logout');
        };

        const fail = (err) => {
            alert(err.message);
        };

        await sendAxios({ config, resFunc: success, errFunc: fail });
        setLoading(false);
    };

    return (
        <>
            <div className="quit">
                <button type="button" onClick={popOpen} disabled={loading}>
                    회원탈퇴
                </button>
            </div>
            <div className={`pop_bg ${popOn}`}>
                <div className="content fade">
                    <h2>회원탈퇴</h2>
                    <p>
                        가입한 회원정보가 모두 삭제됩니다.
                        <br />
                        <br />
                        작성하신 게시물은 삭제되지 않습니다.
                        <br />
                        <br />
                        탈퇴 후 동일한 이메일로 재가입 시<br />
                        기존에 가지고 있던 적립금은 복원되지 않으며
                        <br />
                        다운로드했던 쿠폰도 사용불가능합니다.
                        <br />
                        <br />
                        <br />
                        회원탈퇴를 진행하시겠습니까?
                    </p>
                    <div className="btns">
                        <button type="button" onClick={popClose}>
                            취소
                        </button>
                        <button type="button" onClick={quit}>
                            진행하기
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .quit {
                    margin: 0.5rem 0 4rem;
                    text-align: right;
                    padding: 0 var(--side-padding-inner);

                    button {
                        font-size: 1.2rem;
                        color: #707070;
                    }
                }
                .pop_bg {
                    .content {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -55%);
                        background: #fff;
                        width: 95%;
                        padding: 0 1.5rem 1.5rem;
                        text-align: center;
                        h2 {
                            font-size: 2.2rem;
                            font-weight: 700;
                            padding: 4rem 0;
                        }
                        p {
                            font-size: 1.4rem;
                            color: #707070;
                            margin-bottom: 4rem;
                        }
                        .btns {
                            display: flex;
                            justify-content: space-between;
                            gap: 1rem;
                            button {
                                display: block;
                                width: 100%;
                                height: 5.5rem;
                                font-size: 2rem;
                                font-weight: 500;
                                &:first-child {
                                    background: #f8f8fa;
                                }
                                &:last-child {
                                    background: #191919;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            `}</style>
        </>
    );
}
