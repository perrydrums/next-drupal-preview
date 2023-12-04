import * as React from 'react';
import { ReactNode, ReactSVGElement, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import EditForm from '../Editform';
import { Edit } from '../../icons';

interface Props {
  id: string
  type: string
  cmsUrl: string
  token: string | null
  children: ReactNode
  color?: string | null
  absolute?: boolean
  svg?: ReactSVGElement
  iconSize?: number
}

export default function Editable ({ id, type, cmsUrl, token, children, color, absolute = true, svg, iconSize }: Props): React.JSX.Element {
  const [showForm, setShowForm] = useState(false);
  const mediaMatch = window.matchMedia('(max-width: 1024px)');
  const [matches, setMatches] = useState(mediaMatch.matches);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const handler = (e: MediaQueryListEvent): ReturnType<any> => { setMatches(e.matches) }
    mediaMatch.addEventListener('change', handler)
    return (): void => mediaMatch.removeEventListener('change', handler)
  });

  const onSave = (hideForm: () => void): void => {
    setTimeout(() => hideForm(), 100)
    setTimeout(() => {
      const url = new URL(window.location.toString())
      window.location.replace(url.toString())
    }, 500)
  };

  const styles = {
    pencilButtonContainer: (smallWindow: boolean) => ({
      position: absolute ? 'absolute' as 'absolute' : 'relative' as 'relative',
      display: 'flex',
      justifyContent: smallWindow ? 'center' : 'flex-end',
      height: '32p',
      width: '100%'
    }),
    pencilButton: (smallWindow: boolean, hover: boolean) => ({
      display: 'flex',
      transform: hover ? 'scale(1.25)' : 'scale(1)',
      borderRadius: '50%',
      cursor: 'pointer',
      zIndex: 10,
      backgroundColor: color ?? '#808080',
      width: '3.5rem',
      height: '3.5rem',
      right: smallWindow ? '' : '0',
      marginRight: smallWindow ? '' : '5rem',
      marginTop: smallWindow ? '' : '2rem'
    })
  };

  return (
    <Dialog.Root>
      <div
        onClick={() => setShowForm(true)}
        style={styles.pencilButtonContainer(matches)}
      >
        <Dialog.Trigger asChild>
          <div
            style={styles.pencilButton(matches, hover)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Edit size={iconSize} svg={svg} />
          </div>
        </Dialog.Trigger>
      </div>
      {children}
      {showForm && (
        <Dialog.Overlay style={{ overflowY: 'hidden' }}>
          <Dialog.Content asChild>
            <EditForm
              id={id}
              type={type}
              cmsUrl={cmsUrl}
              token={token}
              hide={() => setShowForm(false)}
              onSave={() => onSave(() => setShowForm(false))}
            />
          </Dialog.Content>
        </Dialog.Overlay>
      )}
    </Dialog.Root>
  );
}
