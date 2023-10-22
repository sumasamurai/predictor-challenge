import { Timer } from "./Timer";

const getSlideStatus = (inputText: string) => {
  if (inputText.includes("live-slide")) {
    return 'live'
  }
  if (inputText.includes("next-slide")) {
    return 'playable'
  }
  if (inputText.includes("closed-slide") && !inputText.includes("live-slide") && !inputText.includes("next-slide")) {
    return 'closed'
  }
}

export const Slide = (props: any) => (
  <div className={`swiper-slide ${props.className}`} key={props.epoch}>
    <div className="candlestick">
      <div className="candlestick-label">
        <div className="candlestick-label-open">
          <span className="candlestick-date">Open</span>
          <span className="candlestick-open">{props.openPrice.toFixed(2)}</span>
        </div>
        <Timer unixTimestamp={props.lockTimestamp} />
        <div className="candlestick-label-close">
          <span className="candlestick-date">Close</span>
          <span className="candlestick-close">{props.closePrice.toFixed(2)}</span>
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
            </svg>#{props.epoch} <span className="candlestick-epoch-status">{getSlideStatus(props.className)}</span></div>
          <div className="candlestick-body__long">
            <p className="candlestick-amount">{props.longAmount.toFixed(3)}</p>
            <span className="text-[0.3em] font-bold ml-1">ETH</span>
          </div>
          <div className="candlestick-body__short">
            <p className="candlestick-amount">{props.shortAmount.toFixed(3)}</p>
            <span className="text-[0.3em] font-bold ml-1">ETH</span>
          </div>
        </div>
        <div className="candlestick-wick candlestick-wick-bottom"></div>
      </div>
    </div>
  </div>
);
