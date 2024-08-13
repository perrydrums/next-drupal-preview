import * as React from 'react';

interface Props {
  id: string
  type: string
  cmsUrl: string
  token: string | null
  onSave: any
  hide: any
  locale?: string
}

export default function EditForm ({ id, type, cmsUrl, token, onSave, hide, locale }: Props): JSX.Element {
  React.useEffect(() => {
    // Execute the onSave function.
    function onReceiveMessage (event: any): void {
      if (typeof event.data === 'object') {
        if (event.data.type === 'SUBMIT_FORM') {
          onSave();
        }
      }
    }

    if (window !== undefined) {
      // Listen for messages coming from the iFrame.
      window.addEventListener('message', onReceiveMessage, false);
      return () => window.removeEventListener('message', onReceiveMessage, false);
    }
  })

  // Build the URL for the iFrame.
  const src = new URL(`${cmsUrl}/frontend-editing/edit/${type}/${id}${locale ? '/' + locale : ''}`);

  // Set JSON web token for authorization.
  if (typeof token === 'string') {
    src.searchParams.set('jwt', token);
  }

  const animations = `
    @keyframes slide-in-full {
      from {
        width: 0;
      }
    
      to {
        width: 100vw;
      }
    }
    
    @keyframes slide-in-half {
      from {
        width: 0;
      }
    
      to {
        width: 70vw;
      }
    }
  `;

  return (
    <>
      <style>{animations}</style>
      <div onClick={hide} style={{ animation: 'slide-in-full 0.4s ease-in forwards', position: 'fixed', zIndex: 9998, width: '0', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', top: 0, right: 0, cursor: 'pointer' }} />
      <iframe src={src.toString()} style={{ animation: 'slide-in-half 0.3s forwards 0.3s', border: 'none', position: 'fixed', top: 0, right: 0, resize: 'horizontal', overflowX: 'scroll', overflowY: 'hidden', overscrollBehaviorX: 'contain', zIndex: 9999, width: '0', height: '100%', backgroundColor: 'white' }} />
    </>
  )
}
