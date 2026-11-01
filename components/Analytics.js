import Script from 'next/script';

const measurementId = 'G-B6XB6EMPQH';

export default function Analytics() {
  return <Script id="google-analytics" strategy="afterInteractive">{`
    if (!['localhost', '127.0.0.1', '::1', '[::1]'].includes(window.location.hostname)) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', '${measurementId}', {
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      });
      var tag = document.createElement('script');
      tag.async = true;
      tag.src = 'https://www.googletagmanager.com/gtag/js?id=${measurementId}';
      document.head.appendChild(tag);
    }
  `}</Script>;
}
