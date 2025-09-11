# Google Analytics Integration Guide

## Overview

The Puente Scientific website now includes comprehensive Google Analytics 4 (GA4) tracking with the tracking ID `G-XV96WERESM`. This integration provides detailed insights into user behavior, engagement, and website performance.

## What's Being Tracked

### Automatic Events

1. **Page Views**
   - Tracked automatically when the page loads
   - Includes page title, URL, and path information

2. **Scroll Depth**
   - Tracks when users scroll to 25%, 50%, 75%, and 90% of the page
   - Helps understand content engagement

3. **Time on Page**
   - Tracks engagement milestones at 30 seconds, 1 minute, and 2 minutes
   - Measures user interest and content quality

4. **Session Duration**
   - Tracks total time spent on the website
   - Recorded when user leaves the page

### User Interaction Events

1. **Button Clicks**
   - All button interactions (CTA buttons, form submissions, etc.)
   - Includes button text and type information

2. **Navigation Clicks**
   - Menu navigation usage
   - Tracks which sections users are most interested in

3. **Service Card Interactions**
   - Clicks on service offerings
   - Helps identify most popular services

4. **External Link Clicks**
   - Tracks when users click links to external websites
   - Useful for partnership and referral analysis

5. **Form Submissions**
   - Contact form usage and completion rates
   - Tracks form fields used (without sensitive data)

## Analytics Dashboard Access

To view your analytics data:

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your account and property (G-XV96WERESM)
3. Navigate to different reports:
   - **Realtime**: See current website activity
   - **Audience**: Understand your visitors
   - **Acquisition**: See how users find your site
   - **Behavior**: Analyze user interactions
   - **Conversions**: Track goal completions

## Key Metrics to Monitor

### Business Metrics
- **Page Views**: Total website traffic
- **Unique Visitors**: Number of individual users
- **Session Duration**: How long users stay on your site
- **Bounce Rate**: Percentage of single-page sessions

### Engagement Metrics
- **Scroll Depth**: How far users read your content
- **Button Clicks**: Which CTAs are most effective
- **Service Interest**: Which services get the most attention
- **Form Submissions**: Lead generation effectiveness

### Technical Metrics
- **Page Load Speed**: Website performance
- **Device Types**: Mobile vs desktop usage
- **Browser Types**: Technical compatibility
- **Geographic Data**: Where your visitors are located

## Custom Events Implemented

### Engagement Events
```javascript
// Scroll depth tracking
gtag('event', 'scroll', { scroll_depth: 25 });

// Time on page milestones
gtag('event', 'engagement', { time_on_page: 30 });
```

### Interaction Events
```javascript
// Button clicks
gtag('event', 'click', {
  event_category: 'button',
  event_label: 'Contact Us',
  button_text: 'Contact Us'
});

// Service interactions
gtag('event', 'click', {
  event_category: 'service',
  event_label: 'International Shipping',
  service_name: 'International Shipping'
});
```

### Conversion Events
```javascript
// Form submissions
gtag('event', 'form_submit', {
  form_id: 'contact_form',
  form_name: 'contact'
});
```

## Privacy and Compliance

### Data Collection
- **No Personal Information**: We don't collect names, emails, or personal data in analytics
- **Anonymized IPs**: Google Analytics anonymizes IP addresses
- **Cookie Consent**: Consider adding a cookie consent banner for GDPR compliance

### GDPR Compliance
To ensure GDPR compliance, consider:
1. Adding a privacy policy page
2. Implementing cookie consent
3. Providing opt-out options
4. Data retention settings in GA4

## Optimization Recommendations

### Based on Analytics Data

1. **High Bounce Rate**: Improve page loading speed or content relevance
2. **Low Scroll Depth**: Enhance content engagement or page layout
3. **Few Form Submissions**: Optimize contact form placement or messaging
4. **High Mobile Traffic**: Ensure mobile experience is optimized

### A/B Testing Opportunities
- Different CTA button texts
- Service section layouts
- Contact form positioning
- Hero section messaging

## Advanced Features

### Enhanced E-commerce (Future)
If you add product sales or service bookings:
```javascript
// Purchase tracking
gtag('event', 'purchase', {
  transaction_id: '12345',
  value: 25.25,
  currency: 'USD'
});
```

### Custom Dimensions
Set up custom dimensions in GA4 for:
- User type (new vs returning)
- Service interest level
- Geographic regions
- Device categories

## Troubleshooting

### Common Issues

1. **No Data Appearing**
   - Check that the tracking code is properly installed
   - Verify the tracking ID (G-XV96WERESM) is correct
   - Wait 24-48 hours for data to appear

2. **Events Not Tracking**
   - Check browser console for JavaScript errors
   - Verify gtag function is available
   - Test events in GA4 DebugView

3. **Incorrect Data**
   - Check for duplicate tracking codes
   - Verify event parameters are correct
   - Review filters in GA4 configuration

### Debug Mode
To enable debug mode for testing:
```javascript
gtag('config', 'G-XV96WERESM', {
  debug_mode: true
});
```

## Support and Maintenance

### Regular Monitoring
- Check analytics weekly for unusual patterns
- Monitor conversion rates and user engagement
- Review top pages and traffic sources

### Updates and Improvements
- Add new events as website features expand
- Optimize tracking based on business goals
- Regular review of data accuracy

### Contact for Analytics Support
- Google Analytics Help Center
- GA4 documentation
- Analytics community forums

## Integration Benefits

This comprehensive analytics setup provides:
- **Data-driven decisions** for website improvements
- **User behavior insights** for better UX design
- **Marketing effectiveness** measurement
- **Business growth** tracking and optimization

The analytics system is now fully integrated and will start collecting data immediately once the website is live.
