const sizes = {
    down(size) {
        const sizes = {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            xxl: '1600px',
        }
        return `@media (max-width: ${sizes[size]})`;
    }
}
export default sizes;