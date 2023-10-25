import CodeInput from './CodeInput';
import { gocaf_codes } from './Gocaf';

export default function CodeList({ codes, setCodes, count, prefix }) {
    return (
        <>
            <ul>
                {codes.map((code: gocaf_codes, idx: number) => (
                    <CodeInput key={code.idx} idx={idx} code={code} setCodes={setCodes} count={count} prefix={prefix} button={idx === codes.length - 1 ? 'add' : 'sub'} />
                ))}
            </ul>
            <style jsx>{`
                ul {
                    margin-top: 2rem;
                }
            `}</style>
        </>
    );
}
