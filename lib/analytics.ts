declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  function gtag(command: string, ...args: unknown[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID);
};

// Page view tracking
export const pageview = (url: string) => {
  if (typeof window === 'undefined') return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Event tracking
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window === 'undefined') return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Form submission tracking
export const trackFormSubmission = (formName: string, success: boolean) => {
  event({
    action: success ? 'form_submission_success' : 'form_submission_error',
    category: 'Forms',
    label: formName,
  });
};

// Error tracking
export const trackError = (error: Error, componentName: string) => {
  event({
    action: 'error',
    category: 'Error',
    label: `${componentName}: ${error.message}`,
  });
};

// Performance tracking
export const trackPageLoadPerformance = () => {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      event({
        action: 'page_load_performance',
        category: 'Performance',
        label: window.location.pathname,
        value: Math.round(navigation.loadEventEnd - navigation.startTime),
      });
    }
  });
}; 