
function StockChart({ base64Img }: { base64Img: string }) {
    return (
        <img className="w-full" src={`data:image/png;base64,${base64Img}`} alt="Stock Chart" />
    );
}

export default StockChart;
