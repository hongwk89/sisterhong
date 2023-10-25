import { GoogleAnalytics } from 'nextjs-google-analytics';
import Script from 'next/script';
import { useEffect } from 'react';
import useGetPath from '@hooks/useGetPath';
import useNaverCB from '@hooks/store/useNaverCB';

export default function Analytics() {
    const url = useGetPath();
    const { _nasa, check } = useNaverCB();

    useEffect(() => {
        //카카오
        kakaoPixel(process.env.KAKAO_PIXEL).pageView();
    }, [url]);

    useEffect(() => {
        // 네이버
        // 공통 적용 스크립트 , 모든 페이지에 노출되도록 설치. 단 전환페이지 설정값보다 항상 하단에 위치해야함
        if (['/cart', '/join/joinComplete', '/order/success'].includes(url) && !check) return;
        if (!wcs_add) var wcs_add = {};
        window.wcs_add['wa'] = process.env.NAVER_ANALYTICS;
        if (window.wcs) {
            wcs.inflow();
            wcs_do(_nasa);
        }
        useNaverCB.setState({
            _nasa: {},
            check: false
        });
    }, [url, check]);

    return (
        <>
            <GoogleAnalytics trackPageViews />
            <Script src="//t1.daumcdn.net/kas/static/kp.js" strategy="beforeInteractive" />
            <Script src="//wcs.naver.net/wcslog.js" strategy="beforeInteractive" />
        </>
    );
}
