import * as React from 'react';
import { ReactNode, useState } from 'react';

import EditForm from '../EditForm';
import { Edit } from '../../icons';

interface Props {
  id: string
  type: string
  cmsUrl: string
  token: string | null
  children: ReactNode
  color?: string | null
}

export default function Editable ({ id, type, cmsUrl, token, children, color }: Props): React.JSX.Element {
  const [showForm, setShowForm] = useState(false);

  const onSave = (hideForm: () => void): void => {
    setTimeout(() => hideForm(), 100)
    setTimeout(() => {
      if (window !== undefined) {
        const url = new URL(window.location.toString())
        window.location.replace(url.toString())
      }
    }, 500)
  };

  return (
    <div>
      <div onClick={() => setShowForm(true)}
           style={{
             position: 'absolute',
             right: '200px',
             borderRadius: '50%',
             cursor: 'pointer',
             zIndex: 10,
             boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
             textAlign: 'center',
             lineHeight: '60px',
             backgroundColor: color ?? '#003cc5',
             width: '48px',
             height: '48px',
           }}
      >
        <Edit size={24} />
      </div>
      {children}
      {showForm && (
        <EditForm
          id={id}
          type={type}
          cmsUrl={cmsUrl}
          token={token}
          hide={() => setShowForm(false)}
          onSave={() => onSave(() => setShowForm(false))}
        />
      )}
    </div>
  );
}
