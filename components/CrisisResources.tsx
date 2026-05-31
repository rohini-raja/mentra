'use client'

import { useEffect, useMemo, useState } from 'react'
import type { HelplineData, Helpline } from '@/lib/types'

// Minimal timezone -> ISO country fallback for when the browser language tag
// carries no region (e.g. "en" rather than "en-US"). Not exhaustive; the
// language tag handles the vast majority of cases.
const TZ_TO_CODE: Record<string, string> = {
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Los_Angeles': 'US',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'America/Mexico_City': 'MX',
  'America/Sao_Paulo': 'BR',
  'America/Argentina/Buenos_Aires': 'AR',
  'America/Lima': 'PE',
  'America/Bogota': 'CO',
  'Europe/London': 'GB',
  'Europe/Dublin': 'IE',
  'Europe/Paris': 'FR',
  'Europe/Berlin': 'DE',
  'Europe/Madrid': 'ES',
  'Europe/Rome': 'IT',
  'Europe/Amsterdam': 'NL',
  'Europe/Brussels': 'BE',
  'Europe/Zurich': 'CH',
  'Europe/Stockholm': 'SE',
  'Europe/Oslo': 'NO',
  'Europe/Copenhagen': 'DK',
  'Europe/Helsinki': 'FI',
  'Europe/Warsaw': 'PL',
  'Europe/Moscow': 'RU',
  'Asia/Kolkata': 'IN',
  'Asia/Tokyo': 'JP',
  'Asia/Shanghai': 'CN',
  'Asia/Hong_Kong': 'HK',
  'Asia/Singapore': 'SG',
  'Asia/Seoul': 'KR',
  'Asia/Taipei': 'TW',
  'Asia/Bangkok': 'TH',
  'Asia/Manila': 'PH',
  'Asia/Jakarta': 'ID',
  'Asia/Dubai': 'AE',
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
  'Pacific/Auckland': 'NZ',
  'Africa/Johannesburg': 'ZA',
  'Africa/Lagos': 'NG',
  'Africa/Nairobi': 'KE',
}

function detectCode(available: Set<string>): string | null {
  if (typeof navigator !== 'undefined') {
    const langs = navigator.languages ?? [navigator.language]
    for (const tag of langs) {
      const region = tag.split('-')[1]?.toUpperCase()
      if (region && available.has(region)) return region
    }
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    const code = TZ_TO_CODE[tz]
    if (code && available.has(code)) return code
  } catch {
    // ignore
  }
  return null
}

export function CrisisResources({ data }: { data: HelplineData }) {
  const countries = data.countries
  const available = useMemo(
    () => new Set(countries.map((c) => c.code).filter(Boolean) as string[]),
    [countries]
  )

  // Use the country name as the stable select value (codes can be null).
  const [selectedKey, setSelectedKey] = useState<string>('')

  // Detect on mount (client only) so the build stays static.
  useEffect(() => {
    const code = detectCode(available)
    if (code) {
      const match = countries.find((c) => c.code === code)
      if (match) setSelectedKey(match.country)
    }
  }, [available, countries])

  const selected: Helpline | undefined = useMemo(
    () => countries.find((c) => c.country === selectedKey),
    [countries, selectedKey]
  )

  return (
    <div>
      {/* Universal, always-visible: emergency services */}
      <div className="rounded-xl border-2 border-accent bg-accent-soft p-5">
        <p className="prose-body text-text">
          <strong>If your life is in immediate danger,</strong> call your local
          emergency number now &mdash; <strong>911</strong> (US/Canada),{' '}
          <strong>112</strong> (EU &amp; much of the world),{' '}
          <strong>999</strong> (UK), <strong>000</strong> (Australia).
        </p>
      </div>

      {/* Country picker */}
      <div className="mt-8">
        <label
          htmlFor="country-select"
          className="block text-sm font-semibold text-text"
        >
          Find crisis lines in your country
        </label>
        <select
          id="country-select"
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value)}
          className="mt-2 w-full max-w-sm rounded-xl border border-border bg-surface px-4 py-3 text-base text-text focus:border-accent focus:outline-none"
        >
          <option value="">Select your country&hellip;</option>
          {countries.map((c) => (
            <option key={c.country} value={c.country}>
              {c.country}
            </option>
          ))}
        </select>
      </div>

      {/* Selected country's lines */}
      {selected && (
        <div className="mt-6 rounded-xl border border-border bg-surface p-5">
          <h2 className="text-xl font-bold text-text">{selected.country}</h2>
          <ul className="mt-3 space-y-2.5">
            {selected.lines.map((line, i) => (
              <li key={i} className="flex gap-3 text-[0.95rem] leading-relaxed">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent"
                />
                <span className="text-text">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Fallback: countries not in the list, or to verify a number */}
      <div className="mt-8 rounded-xl border border-border bg-surface-2 p-5">
        <h2 className="text-lg font-bold text-text">
          Don&rsquo;t see your country, or want to confirm a number?
        </h2>
        <p className="mt-2 prose-body text-muted">
          These directories are kept continuously up to date and cover 130+
          countries:
        </p>
        <ul className="mt-3 space-y-2 prose-body">
          <li>
            <a
              href="https://findahelpline.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 hover:opacity-80"
            >
              findahelpline.com
            </a>{' '}
            <span className="text-muted">
              &mdash; search free, confidential helplines by country
            </span>
          </li>
          <li>
            <a
              href="https://www.befrienders.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 hover:opacity-80"
            >
              Befrienders Worldwide
            </a>{' '}
            <span className="text-muted">
              &mdash; emotional support centres in 30+ countries
            </span>
          </li>
          <li>
            <a
              href="https://www.iasp.info/resources/Crisis_Centres/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-2 hover:opacity-80"
            >
              IASP crisis centre directory
            </a>{' '}
            <span className="text-muted">
              &mdash; International Association for Suicide Prevention
            </span>
          </li>
        </ul>
      </div>

      <p className="mt-6 text-sm text-muted">
        Source: {data.source}. Retrieved {data.retrieved}. Numbers can change
        &mdash; if one doesn&rsquo;t connect, use a directory above.{' '}
        <a
          href={data.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-2 hover:opacity-80"
        >
          View source
        </a>
      </p>
    </div>
  )
}
