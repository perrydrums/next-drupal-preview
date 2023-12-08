import * as React from 'react';
import { Edit, Close } from '../icons';
import Link from 'next/link';
import { useEffect, useState } from "react";
import './styles.css';

interface DrupalPreviewBannerProps {
  id: string
  cmsUrl: string
  clearPreviewUrl?: string

  // Styling.
  textColor?: string
  backgroundColor?: string
  buttonColor?: string
  buttonSecondaryColor?: string
  buttonTextColor?: string
  buttonSecondaryTextColor?: string
  borderColor?: string
  outline?: string
}

export default function DrupalPreviewBanner (props: DrupalPreviewBannerProps): React.JSX.Element {
  const mediaMatch = window.matchMedia('(max-width: 1024px)');
  const [matches, setMatches] = useState(mediaMatch.matches);

  const color = props.textColor ?? '#232429';
  const backgroundColor = props.backgroundColor ?? '#ffffff';
  const buttonColor = props.buttonColor ?? '#003cc5';
  const buttonSecondaryColor = props.buttonSecondaryColor ?? '#dc2323';
  const buttonTextColor = props.buttonTextColor ?? '#ffffff';
  const buttonSecondaryTextColor = props.buttonSecondaryTextColor ?? '#ffffff';
  const borderColor = props.borderColor ?? '#919297';

  useEffect(() => {
    const handler = (e: MediaQueryListEvent): ReturnType<any> => { setMatches(e.matches) }
    mediaMatch.addEventListener('change', handler)
    return (): void => mediaMatch.removeEventListener('change', handler)
  });

  return (
    <div className="drupal-preview-banner" style={{color}}>
      <div className="grid">
        <div className="inner-wrapper" style={{backgroundColor, outlineColor: borderColor}}>
          <h5 className="title">Preview mode</h5>
          <div>
            <Link
              href={`${props.cmsUrl}/node/${props.id}/edit`}
            >
              <a
                className="button"
                style={{backgroundColor: buttonColor, color: buttonTextColor}}
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
                className="button button--secondary"
                style={{backgroundColor: buttonSecondaryColor, color: buttonSecondaryTextColor}}
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
