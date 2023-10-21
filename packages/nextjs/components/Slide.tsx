import { Timer } from "./Timer";

export interface ISlide {
  epoch: number;
  openPrice: number;
  closePrice: number;
  longAmount: number;
  shortAmount: number;
  totalAmount: number;
  rewardAmount: number;
  startTimestamp: number;
  closeTimestamp: number;
  lockTimestamp: number;
}

const calculateRatios = (longAmount: number, shortAmount: number) => {
  let longRatio = .90;
  let shortRatio = .90;
  const totalAmount = longAmount + shortAmount;
  console.log(longAmount, shortAmount);
  if (longAmount > 0) {
    longRatio = totalAmount / longAmount;
  }

  if (shortAmount > 0) {
    shortRatio = totalAmount / shortAmount;
  }
  return { longRatio, shortRatio };
};

const getWeiToEther = (wei: number): number => {
  const etherValue = Number(wei) / 1e18;
  return Number(etherValue.toFixed(2));
};

export const Slide = (props: any) => {
  if (typeof props === "object") {
    const { longRatio, shortRatio } = calculateRatios(getWeiToEther(props.longAmount), getWeiToEther(props.shortAmount));

    return (
      <div className={`swiper-slide ${props.className}`} key={props.epoch}>
      
        <div className="candlestick">
          <div className="candlestick-label">
            <div className="candlestick-label-open">
              <span className="candlestick-date">Open</span>
              <span className="candlestick-open">{getWeiToEther(props.openPrice)}</span>
            </div>
            <Timer unixTimestamp={props.lockTimestamp} />
            <div className="candlestick-label-close">
              <span className="candlestick-date">Close</span>
              <span className="candlestick-close">{getWeiToEther(props.closePrice)}</span>
            </div>
          </div>
          <div className="candlestick-line">
            <div className="candlestick-wick candlestick-wick-top"></div>
            <div className="candlestick-body">
              <div className="candlestick-epoch">
                <svg viewBox="0 0 340 52" className="candlestick-epoch-decor">
                  <g>
                    <g >
                      <path d="M317,27l-1,1-.08-.07L290,52H50L24.08,27.93,24,28l-1-1H0V25H23l1-1,.08.07L50,0H290l25.92,24.07L316,24l1,1h23v2ZM289,3H51L26.16,26,51,49H289l24.84-23Z" />
                    </g>
                  </g>
                </svg>#{props.epoch}</div>
              <div className="candlestick-body__long">{longRatio}x</div>
              <div className="candlestick-body__short">{shortRatio}x</div>
            </div>
            <div className="candlestick-wick candlestick-wick-bottom"></div>
          </div>
        </div>
      </div>
    );
  }
};