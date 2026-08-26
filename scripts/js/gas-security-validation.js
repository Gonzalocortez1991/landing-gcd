/**
 * SEGURIDAD GAS — Validación de requests
 * 
 * Copiar estas funciones al inicio de cada Google Apps Script
 * que reciba datos desde landings GCD.
 * 
 * Protege contra:
 * - Spam/bots
 * - Requests desde dominios no autorizados
 * - Abuso de endpoints
 */

// === CONFIGURACIÓN ===
const ALLOWED_ORIGINS = [
  'https://landing-gcd.vercel.app',
  'https://landing-gcd-gonzalocortez1991-6054s-projects.vercel.app',
  // Agregar otros dominios autorizados aquí
];

const RATE_LIMIT_WINDOW = 60000; // 1 minuto
const RATE_LIMIT_MAX = 10; // máximo 10 requests por minuto por IP
const rateLimitStore = {};

// === FUNCIONES DE SEGURIDAD ===

/**
 * Valida que el request venga de un origen permitido
 */
function validateOrigin(e) {
  const origin = e.parameter.origin || e.parameter.referer || '';
  const headers = e.headers || {};
  const referer = headers.Referer || headers.referer || '';
  
  // Si no hay origin/referer, permitir (formularios directos)
  if (!origin && !referer) return true;
  
  const checkUrl = origin || referer;
  return ALLOWED_ORIGINS.some(allowed => checkUrl.includes(allowed));
}

/**
 * Rate limiting por IP
 */
function checkRateLimit(ip) {
  const now = Date.now();
  
  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = [];
  }
  
  // Limpiar requests viejos
  rateLimitStore[ip] = rateLimitStore[ip].filter(t => now - t < RATE_LIMIT_WINDOW);
  
  if (rateLimitStore[ip].length >= RATE_LIMIT_MAX) {
    return false; // Límite excedido
  }
  
  rateLimitStore[ip].push(now);
  return true;
}

/**
 * Valida datos básicos del formulario
 */
function validateFormData(e) {
  const email = e.parameter.email || '';
  const name = e.parameter.name || '';
  
  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Email inválido' };
  }
  
  // Sanitizar nombre (prevenir XSS)
  const sanitizedName = name.replace(/<[^>]*>/g, '').substring(0, 100);
  
  return { 
    valid: true, 
    email: email.toLowerCase().trim(),
    name: sanitizedName
  };
}

/**
 * Función principal de validación组合
 */
function validateRequest(e) {
  // 1. Rate limit
  const ip = e.parameter.ip || e.headers['x-forwarded-for'] || 'unknown';
  if (!checkRateLimit(ip)) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: 'Rate limit exceeded' })
    ).setMimeType(ContentService.MimeType.JSON);
  }
  
  // 2. Origin validation
  if (!validateOrigin(e)) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: 'Unauthorized origin' })
    ).setMimeType(ContentService.MimeType.JSON);
  }
  
  // 3. Data validation
  const data = validateFormData(e);
  if (!data.valid) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: data.error })
    ).setMimeType(ContentService.MimeType.JSON);
  }
  
  return null; // Validación pasada
}

/**
 * Ejemplo de uso en doPost:
 * 
 * function doPost(e) {
 *   const validation = validateRequest(e);
 *   if (validation) return validation;
 *   
 *   // ... resto del código
 * }
 */
