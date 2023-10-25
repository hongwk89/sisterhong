import { useRouter } from 'next/router';

export default function useGetPath() {
    const router = useRouter();
    const id = router.query.id as string;
    return router.pathname.replace('[id]', id);
}
