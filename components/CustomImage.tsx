import Image from 'next/image';

type objFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

export default function CustomImage({ src, width = 500, height = 100, alt, priority = false, sizes = '9rem', objFit = 'fill' as objFit, fill = null, id = null }) {
    const newSrc = `${process.env.AWS_IMAGE_RESIZE_URL}?url=${src}&w=${width > 500 ? 500 : width}&q=100`;

    if (fill) {
        return <Image src={src} alt={alt} priority={priority} quality={100} loader={() => newSrc} fill sizes={`${sizes}`} style={{ objectFit: `${objFit}` }} id={id} />;
    }

    return <Image src={src} alt={alt} priority={priority} quality={100} width={width} height={height} id={id} loader={() => newSrc} style={{ width: '100%', height: 'auto', objectFit: `${objFit}` }} />;
}
