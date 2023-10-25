import CustomImage from '@components/CustomImage';
import Link from 'next/link';

export default function NoticeContent({ data }) {
    return (
        <>
            {data.target_url === '' ? (
                <CustomImage src={data.image} width={data.width} height={data.height} alt={data.title} priority={true} />
            ) : (
                <Link href={data.target_url} passHref>
                    <CustomImage src={data.image} width={data.width} height={data.height} alt={data.title} priority={true} />
                </Link>
            )}
        </>
    );
}
