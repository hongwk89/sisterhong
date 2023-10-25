import useMenuToggle from '@hooks/store/useMenuToggle';
import scrollLock from './scrollLock';

export default function initMenu() {
    useMenuToggle.setState({ menuToggle: false, searchToggle: false });
    scrollLock(false);
}
