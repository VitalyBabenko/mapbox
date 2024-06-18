import DatePicker from "react-datepicker";

import { BiCalendarAlt as CalendarIcon } from "react-icons/bi";
import style from "./DateFilter.module.scss";

const DateFilter = (props) => {
  const { label, startValue, setStartValue, endValue, setEndValue } = props;

  return (
    <>
      <h3>{label}</h3>

      <div className={style.inputs}>
        <DatePicker
          selectsStart
          selected={startValue}
          onChange={(date) => setStartValue(date)}
          wrapperClassName={style.inputWrapper}
          calendarClassName={style.calendarStart}
          placeholderText="From"
          startDate={startValue}
          endDate={endValue}
          showIcon
          icon={<CalendarIcon className={style.inputIcon} />}
          toggleCalendarOnIconClick={true}
        />

        <DatePicker
          selectsEnd
          selected={endValue}
          onChange={(date) => setEndValue(date)}
          wrapperClassName={style.inputWrapper}
          calendarClassName={style.calendarEnd}
          placeholderText="To"
          startDate={startValue}
          endDate={endValue}
          showIcon
          icon={<CalendarIcon className={style.inputIcon} />}
          toggleCalendarOnIconClick={true}
        />
      </div>
    </>
  );
};

export default DateFilter;
