import * as React from 'react';
import { useRouter } from 'next/router';

interface Props {
  id: string
  type: string
  cmsUrl: string
  token: string | null
  onSave: any
  hide: any
}

export default function EditForm ({ id, type, cmsUrl, token, onSave, hide }: Props): JSX.Element {
  const router = useRouter();

  React.useEffect(() => {
    // Execute the onSave function.
    function onReceiveMessage (event: any): void {
      if (typeof event.data === 'object') {
        if (event.data.type === 'SUBMIT_FORM') {
          onSave();
        }
      }
    }

    // Listen for messages coming from the iFrame.
    window.addEventListener('message', onReceiveMessage, false);
    return () => window.removeEventListener('message', onReceiveMessage, false);
  })

  // Build the URL for the iFrame.
  const src = new URL(`${cmsUrl}/frontend-editing/edit/${type}/${id}/${router?.locale ?? 'en'}`);

  // Set JSON web token for authorization.
  if (typeof token === 'string') {
    src.searchParams.set('jwt', token);
  }

  return (
    <>
      <div onClick={hide} style={{ position: 'fixed', zIndex: 9998, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', top: 0, right: 0, cursor: 'pointer' }} />
      <iframe src={src.toString()} style={{ position: 'fixed', top: 0, right: 0, resize: 'horizontal', overflowX: 'scroll', overflowY: 'hidden', overscrollBehaviorX: 'contain', zIndex: 9999, width: '70%', height: '100%', backgroundColor: 'white' }} />
    </>
  )
}
