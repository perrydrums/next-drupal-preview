import * as React from 'react';
import { useEffect, useState } from 'react';
import { Edit, Close } from '../icons';
import Link from 'next/link';

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

  useEffect(() => {
    const handler = (e: MediaQueryListEvent): ReturnType<any> => { setMatches(e.matches) }
    mediaMatch.addEventListener('change', handler)
    return (): void => mediaMatch.removeEventListener('change', handler)
  });

  const buttonStyle = {
    backgroundColor: props.buttonColor ?? '#003cc5',
    color: props.buttonTextColor ?? '#ffffff',
    outline: 'none',
    textDecoration: 'none',
    fontSize: '1.4rem',
    padding: 'calc(1rem - 1px) calc(1.5rem - 1px)',
    alignItems: 'center',
    minHeight: '4rem',
    fontWeight: 700,
    lineHeight: 1,
    borderRadius: '2px',
    transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
    flexShrink: 0,
    display: 'inline-flex',
    cursor: 'pointer',
    marginRight: '2rem',
  }

  const buttonSecondaryStyle = {
    backgroundColor: props.buttonSecondaryColor ?? '#dc2323',
    color: props.buttonSecondaryTextColor ?? '#ffffff',
    marginRight: 0,
  }

  return (
    <div style={{
      color: props.textColor ?? '#232429',
      position: 'fixed',
      zIndex: 10,
      bottom: '2.4rem',
      left: 0,
      right: 0,
      fontFamily: "'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'",
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.6rem repeat(12, 1fr) 1.6rem',
        gridColumnGap: '.8rem',
      }}>
        <div style={{
          backgroundColor: props.backgroundColor ?? '#ffffff',
          outline: `1px solid ${props.borderColor ?? '#919297'}`,
          padding: '1.6rem',
          gridColumn: '4/-4',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '0.125rem',
          backdropFilter: 'blur(13px)',
        }}>
          <h5 style={{margin: 0, fontSize: '2rem'}}>Preview mode</h5>
          <div>
            <Link
              href={`${props.cmsUrl}/node/${props.id}/edit`}
            >
              <a style={buttonStyle} type='button'>
                {!matches && <>Edit this page in CMS &nbsp;</>}
                <Edit />
              </a>
            </Link>
            <Link
              href={props.clearPreviewUrl ?? '/api/preview/clear'}
            >
              <a
                style={{...buttonStyle, ...buttonSecondaryStyle}}
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
