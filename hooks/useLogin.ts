import axios from 'axios';
import { useRouter } from 'next/router';
import sendAxios from 'utils/sendAxios';
import useTokenStore from './store/auth/useTokenStore';

interface socialData {
    source: string;
    source_key: string;
    user_id: string;
    autoLogin: boolean;
}

interface loginParams {
    sign_type?: string;
    user_id: string;
    password?: string;
    source_key?: string;
    saveId?: string;
    autoLogin?: boolean;
}

interface loginData {
    idx: number;
    user_type: string;
    token: string;
    exp: string;
    autoLogin?: boolean;
}

export default function useLogin() {
    const router = useRouter();

    const loginCheck = async (params: socialData, code: string, returnUrl: string) => {
        const config = {
            url: process.env.API_HOST + '/auth/sign-check',
            method: 'post',
            data: {
                source: params.source,
                source_key: params.source_key ?? '',
                user_id: params.user_id
            }
        };

        const success = async (res) => {
            if (res.data.user_type === 'M') {
                router.push(`/login/memberCheck?user_id=${params.user_id}&source_key=${params.source_key}`);
                return;
            }

            const login = {
                user_id: params.user_id,
                source_key: params.source_key
            };
            loginService({ params: login, autoLogin: params.autoLogin });
        };
        const fail = (err) => {
            if (err.state == 400) {
                const data = { source: params.source, source_key: params.source_key, user_id: params.user_id };
                const query = new URLSearchParams(data).toString();

                router.push('/join?' + query + '&code=' + (code || '') + '&returnUrl=' + (returnUrl || '/'));
                return;
            }

            alert(err.message);
            router.push('/login');
        };

        await sendAxios({ config, resFunc: success, errFunc: fail });
    };

    const loginService = async ({ params, saveId = null, autoLogin = null }) => {
        const data: loginParams = params.source_key
            ? {
                  sign_type: 'social',
                  user_id: params.user_id,
                  source_key: params.source_key
              }
            : {
                  user_id: params.user_id,
                  password: params.password
              };

        data.saveId = saveId;
        data.autoLogin = autoLogin;

        const config = {
            url: `${process.env.DOMAIN}/api/login`,
            method: 'post',
            data
        };

        const result = await sendAxios({ config });

        if (result.state === 'success') {
            // 성공
            setToken(result.data.token);

            if (result.data.user_type === 'M') {
                if (confirm('문자로 전달드린 비밀번호는 임시 비밀번호이니 마이페이지에서 비밀번호 변경 부탁드립니다.\n지금 변경하시려면 [확인] 나중에 변경하시려면 [취소]를 눌러주세요.')) {
                    router.push('/mypage/info');
                    return;
                }
            }

            router.push(decodeURIComponent(decodeURIComponent(result.data.url)));

            return;
        }

        alert(result.data.message);
        return;
    };

    return { loginCheck, loginService };
}

export function setToken(token: string) {
    // _MyApp에도 같은 처리가 있음, _MyApp에서 setToken 부르면 렌더링 warning 뜸
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    useTokenStore.setState({ token: true });
}

export async function setCookieToken(res: loginData) {
    const config = { method: 'post', data: res, url: `${process.env.DOMAIN}/api/cookieToken` };

    await sendAxios({ config });

    setToken(res.token);
}
