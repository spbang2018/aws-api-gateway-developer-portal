'use strict'

const headersToAdd = {
  // Don't include subdomains - the user might have a subdomain hosted on something else and not
  // support it.
  'strict-transport-security': [{ key: 'Strict-Transport-Security', value: 'max-age=63072000' }],
  'content-security-policy-report-only': [{ key: 'Content-Security-Policy', value: "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'" }],
  'x-content-type-options': [{ key: 'X-Content-Type-Options', value: 'nosniff' }],
  'x-frame-options': [{ key: 'X-Frame-Options', value: 'DENY' }],
  'x-xss-protection': [{ key: 'X-XSS-Protection', value: '1; mode=block' }],
  'referrer-policy': [{ key: 'Referrer-Policy', value: 'same-origin' }]
}

exports.handler = (event, context, callback) => {
  const response = event.Records[0].cf.response
  Object.assign(response.headers, headersToAdd)
  callback(null, response)
}
