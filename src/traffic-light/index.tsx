import React from 'react';
import './index.css';

export interface ITrafficLightProps {
  red?: boolean;
  yellow?: boolean;
  green?: boolean;
}

export const TrafficLight: React.FunctionComponent<ITrafficLightProps> = ({ red, yellow, green }) => {
  return (
    <div className="traffic-lights shape">
      <div className="shadow"></div>
      <div className={`light ${red && 'red'}`}> </div>
      <div className={`light ${yellow && 'amber'}`}> </div>
      <div className={`light ${green && 'green'}`}> </div>
    </div>

  )
}