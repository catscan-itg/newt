import { useState, useEffect, useMemo } from "react"

const useMediaQuery = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const screens = useMemo(() => ({
        smallMobile: 360,
        largeMobile: 414,
        smallTablet: 576,
        largeTablet: 768,
        desktop: 992,
        largeDesktop: 1200
    }), [])

    const smallMobileWidth = useMemo(() => screenWidth < screens.smallMobile, [screenWidth, screens])
    const largeMobileWidth = useMemo(() => screenWidth > screens.smallMobile, [screenWidth, screens])
    const tabletWidth = useMemo(() => screenWidth > screens.smallTablet, [screenWidth, screens])
    const largeTabletWidth = useMemo(() => screenWidth > screens.largeTablet, [screenWidth, screens])
    const desktopWidth = useMemo(() => screenWidth > screens.desktop, [screenWidth, screens])
    const largeDesktopWidth = useMemo(() => screenWidth > screens.largeDesktop, [screenWidth, screens])

    const mobileQuery = useMemo(() => `(max-width: ${screens.largeMobile}px)`, [screens])
    const tabletQuery = useMemo(() => `(max-width: ${screens.largeTablet}px)`, [screens])
    const desktopQuery = useMemo(() => `(min-width: ${screens.largeTablet}px)`, [screens])

    return {
        screenWidth,
        screenSize: { smallMobileWidth, largeMobileWidth, tabletWidth, largeTabletWidth, desktopWidth, largeDesktopWidth },
        queries: {mobileQuery, tabletQuery, desktopQuery}
    };
}

export default useMediaQuery;
