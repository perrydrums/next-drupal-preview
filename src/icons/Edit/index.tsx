import * as React from 'react';
import { ReactSVGElement } from 'react';

const Edit = (props: { size?: number|null, svg?: ReactSVGElement }): React.JSX.Element => {
  const size = props.size ?? 24;
  return props.svg ?? (
    <svg
      width={size}
      height={size}
      viewBox='0 0 16 16'
      style={{ margin: 'auto', height: 'auto' }}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.6626 2.87675L13.0766 1.29175C12.6876 0.90275 12.0516 0.90275 11.6626 1.29175L10.3696 2.58475L13.3696 5.58475L14.6626 4.29175C15.0516 3.90275 15.0516 3.26575 14.6626 2.87675Z'
        fill='#FD2CA8'
      />
      <path
        d='M2.36714 10.5861L5.36694 13.5859L12.3655 6.58734L9.36574 3.58754L2.36714 10.5861Z'
        fill='#FFE203'
      />
      <path
        d='M1.0256 14.6098C0.9386 14.8718 1.0806 15.0068 1.3416 14.9218L3.3426 14.2548L1.6926 12.6088L1.0256 14.6098Z'
        fill='#000000'
      />
    </svg>
  );
}

export default Edit;
