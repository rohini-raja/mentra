import { ImageResponse } from 'next/og'

// Branded social-share card, generated once at build time (static export).
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Mentra — psychological tools for what you’re feeling'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0e0e0d',
          color: '#ececea',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: '#2dd4bf',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 44,
              fontWeight: 800,
              color: '#06201d',
            }}
          >
            M
          </div>
          <div style={{ fontSize: 44, fontWeight: 700 }}>Mentra</div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>
          Psychological tools for what you&rsquo;re feeling.
        </div>
        <div style={{ fontSize: 32, color: '#a3a39d', marginTop: 32 }}>
          Search by feeling · credited to researchers · free, private, no AI
        </div>
      </div>
    ),
    { ...size }
  )
}
