export const setupGoogleAnalytics = () => {
  const scriptGtag = document.createElement('script');
  scriptGtag.async = true;
  scriptGtag.src = "https://www.googletagmanager.com/gtag/js?id=G-NLJKS6MSQ8";
  document.head.appendChild(scriptGtag);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-NLJKS6MSQ8');

  window.gtag = gtag;
};