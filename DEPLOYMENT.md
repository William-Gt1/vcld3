# Deployment Guide

## Pre-deployment Checklist

### Environment Variables
- [ ] Set up Supabase environment variables
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Configure Google Analytics
  - `NEXT_PUBLIC_GA_ID`
- [ ] Set `NODE_ENV` to "production"

### Security
- [ ] Review Content Security Policy in `netlify.toml`
- [ ] Verify all API routes have proper rate limiting
- [ ] Ensure environment variables are properly configured
- [ ] Check CORS settings for API routes
- [ ] Verify HTTPS enforcement

### Performance
- [ ] Run Lighthouse audit
- [ ] Check bundle size with `npm run build`
- [ ] Verify image optimization settings
- [ ] Test loading performance
- [ ] Validate Core Web Vitals

### Testing
- [ ] Run all tests: `npm test`
- [ ] Check test coverage: `npm run test:coverage`
- [ ] Verify API endpoints in production environment
- [ ] Test form submissions
- [ ] Validate error handling

### SEO & Analytics
- [ ] Verify meta tags
- [ ] Check robots.txt configuration
- [ ] Test Google Analytics integration
- [ ] Validate sitemap
- [ ] Check canonical URLs

## Deployment Steps

1. **Prepare Repository**
   ```bash
   # Clean install dependencies
   npm ci
   
   # Run tests
   npm test
   
   # Build project
   npm run build
   ```

2. **Netlify Setup**
   - Connect repository to Netlify
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Add environment variables
   - Set up custom domain (if applicable)

3. **Post-deployment Verification**
   - [ ] Verify site loads correctly
   - [ ] Test all forms and API endpoints
   - [ ] Check analytics tracking
   - [ ] Validate SSL certificate
   - [ ] Test error boundary functionality
   - [ ] Monitor error logs
   - [ ] Check performance metrics

## Monitoring & Maintenance

### Regular Checks
- Monitor error rates and performance
- Review analytics data
- Check form submission success rates
- Update dependencies regularly
- Monitor API usage and rate limits

### Performance Monitoring
- Use Netlify Analytics
- Monitor Core Web Vitals
- Track page load times
- Check API response times
- Monitor bundle sizes

### Error Tracking
- Review error logs regularly
- Monitor form submission errors
- Track API failures
- Check rate limit hits
- Monitor client-side errors

## Rollback Procedure

If issues are detected post-deployment:

1. **Immediate Actions**
   - Verify the issue in production
   - Check error logs
   - Assess impact on users

2. **Rollback Steps**
   ```bash
   # Return to previous deployment in Netlify
   netlify deploy --prod --restore
   ```

3. **Post-Rollback**
   - Verify site functionality
   - Notify relevant team members
   - Document the issue
   - Plan fix implementation

## Useful Commands

```bash
# Build for production
npm run build

# Run tests
npm test

# Check test coverage
npm run test:coverage

# Analyze bundle size
npm run analyze

# Deploy to Netlify
netlify deploy
```

## Contact Information

For deployment issues or questions:
- Technical Lead: [Name] (email@example.com)
- DevOps Support: [Name] (email@example.com)
- Emergency Contact: [Phone Number] 