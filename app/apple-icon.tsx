import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Home-screen icon in the main olive, with a brick rule under the monogram. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#556b2f', color: '#f4f2ea', fontFamily: 'Georgia, serif' }}>
        <div style={{ fontSize: 78, letterSpacing: -2, lineHeight: 1 }}>JW</div>
        <div style={{ marginTop: 14, width: 96, height: 7, background: '#e9997f' }} />
      </div>
    ),
    size,
  );
}
