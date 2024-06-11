import style from "./Tooltip.module.scss";

const Tooltip = (props) => {
  const { children, text, top, left, right, bottom } = props;

  const textPosition = {
    top,
    left,
    right,
    bottom,
  };

  if (!left && !right) {
    textPosition.left = "50%";
    textPosition.translate = "-50%";
  }

  return (
    <div className={style.tooltipWrapper}>
      <div className={style.childrenWrapper}>{children}</div>
      <p className={style.text} style={textPosition}>
        {text}
      </p>
    </div>
  );
};

export default Tooltip;
