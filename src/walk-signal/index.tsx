import React from 'react';
import './index.css';

export interface ITrafficLightProps {
  red?: boolean;
  green?: boolean;
}

export const WalkSignal: React.FunctionComponent<ITrafficLightProps> = ({ red, green }) => {
  return (
    <div className="walk-signal shape">
      <div className="shadow"></div>
      <div className={`light ${red && 'red'}`}>
        <p>NOT WALK</p>
      </div>
      <div className={`light ${green && 'green'}`}>
        <p>WALK</p>
      </div>
    </div>

  )
}