export interface ISlide {
    epoch: number;
    openPrice: number;
    closePrice: number;
    longAmount: number;
    shortAmount: number;
}

const calculateRatios = (longAmount: number, shortAmount: number) => {
    const totalAmount = longAmount + shortAmount;
    const longRatio = totalAmount / longAmount;
    const shortRatio = totalAmount / shortAmount;
    return { longRatio, shortRatio };
};

export const Slide = (props: ISlide | number) => {
    if (typeof props === "object") {
        const { longRatio, shortRatio } = calculateRatios(props.longAmount, props.shortAmount);

        return (
            <div className="swiper-slide" key={props.epoch}>
                <div className="candlestick">
                    <div className="candlestick-line">
                        <div className="candlestick-wick candlestick-wick-top"></div>
                        <div className="candlestick-body">
                            <div className="candlestick-epoch">#{props.epoch}</div>
                            <div className="candlestick-body__long">{longRatio}x</div>
                            <div className="candlestick-body__short">{shortRatio}x</div>
                        </div>
                        <div className="candlestick-wick candlestick-wick-bottom"></div>
                    </div>
                    <div className="candlestick-label-open">
                        <span className="candlestick-date">Open</span>
                        <span className="candlestick-open">{props.openPrice}</span>
                    </div>
                    <div className="candlestick-label-close">
                        <span className="candlestick-date">Close</span>
                        <span className="candlestick-close">{props.closePrice}</span>
                    </div>
                </div>
            </div>
        );
    }
};