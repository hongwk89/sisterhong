import useWindowSize from '@hooks/useWindowSize';
import MainBannerContent from './MainBannerContent';

export default function MainBanner() {
    const windowSize = useWindowSize();

    return <>{windowSize.over && <MainBannerContent />}</>;
}
