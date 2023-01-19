import { FC } from "react";

import { IFlag } from "../../typings/ICar";

export const Flag: FC<IFlag> = ({ className }) => {
  return (
    <svg className={className} fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64.001 64.001">
      <g id="Flag_1_">
        <path id="Flag" d="M56.964,26.267L50.079,0.74c-0.079-0.292-0.286-0.533-0.563-0.655c-0.277-0.123-0.596-0.111-0.863,0.028
		C40.82,4.181,35.7,3.706,29.324,2.592c-12.495-2.185-17.779,3.12-22.117,8.742c-0.012,0.016-0.013,0.037-0.024,0.053
		c-0.057,0.084-0.094,0.175-0.124,0.273c-0.012,0.04-0.033,0.075-0.04,0.116c-0.024,0.139-0.025,0.284,0.014,0.429L20.804,63.26
		c0.12,0.446,0.524,0.74,0.965,0.74c0.086,0,0.174-0.011,0.261-0.035c0.533-0.143,0.849-0.692,0.705-1.226l-6.773-25.11
		c2.547-4.113,6.835-10.553,17.786-10.63c3.209-0.04,5.496,0.593,7.741,1.188c3.961,1.049,7.704,2.041,14.87-0.728
		C56.836,27.276,57.097,26.761,56.964,26.267z M42.001,26.254c-2.262-0.599-4.824-1.286-8.266-1.254
		c-10.712,0.075-15.586,5.64-18.478,10.012l-3.248-12.041L9.094,12.165c4.056-5.183,8.755-9.547,19.886-7.603
		c6.254,1.094,11.712,1.627,19.487-2.119l6.329,23.465C48.791,28.052,45.633,27.217,42.001,26.254z"/>
      </g>
    </svg>
  );
};