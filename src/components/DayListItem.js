import React from "react";
import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--full": props.spots === 0,
    "day-list__item--selected": props.selected
  });

  const formatSpots = (spots) => {
    if (spots === 1) {
      return <h3 className="text--light">{props.spots} spot remaining</h3>
    } else if (spots === 0) {
      return <h3 className="text--light">no spots remaining</h3>
    } else {
      return <h3 className="text--light">{props.spots} spots remaining</h3>
    }
  }

  return (
    
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      {formatSpots(props.spots)}
    </li>
    
  );
}
