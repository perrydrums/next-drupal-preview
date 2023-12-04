import * as React from 'react';
import { Edit, Close } from '../icons';
import Link from 'next/link';
import { useEffect, useState } from "react";
import styles from './styles.module.css';

interface EditInCMSProps {
  id: string
  cmsUrl: string
  clearPreviewUrl?: string
}

export function EditInCMS (props: EditInCMSProps): React.JSX.Element {
  const mediaMatch = window.matchMedia('(max-width: 1024px)');
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e: MediaQueryListEvent): ReturnType<any> => { setMatches(e.matches) }
    mediaMatch.addEventListener('change', handler)
    return (): void => mediaMatch.removeEventListener('change', handler)
  });

  return (
    <div className={styles.banner}>
      <div className={styles.grid}>
        <div className={styles.innerWrapper}>
          <h5 className={styles.title}>Preview mode</h5>
          <div>
            <Link
              href={`${props.cmsUrl}/node/${props.id}/edit`}
            >
              <a
                className={styles.button}
                type='button'
              >
                {!matches && <>Edit this page in CMS &nbsp;</>}
                <Edit />
              </a>
            </Link>
            <Link
              href={props.clearPreviewUrl ?? '/api/preview/clear'}
            >
              <a
                className={`${styles.button} ${styles.buttonSecondary}`}
                type='button'
              >
                {!matches && <> Close preview mode &nbsp;</>}
                <Close />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
