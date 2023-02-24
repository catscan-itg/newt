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

    const smallMobile = useMemo(() => screenWidth < 360, [screenWidth])
    const largeMobile = useMemo(() => screenWidth > 360, [screenWidth])
    const tablet = useMemo(() => screenWidth > 576, [screenWidth])
    const largeTablet = useMemo(() => screenWidth > 768, [screenWidth])
    const desktop = useMemo(() => screenWidth > 992, [screenWidth])
    const largeDesktop = useMemo(() => screenWidth > 1200, [screenWidth])

    return { screenWidth, screenSizes: { smallMobile, largeMobile, tablet, largeTablet, desktop, largeDesktop } };
}

export default useMediaQuery;