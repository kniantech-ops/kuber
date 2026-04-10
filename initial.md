# MASTER BUILD PROMPT — KUBER CHIT FUND MANAGER
# Version: 3.0 | Security-First | Zero-Knowledge
# 12 Indian Languages | APK Tamper Protection
# "Not even we can access your data"
# Offline-First | No Backend Required at Launch

## ════════════════════════════════════════
## ROLE & OBJECTIVE
## ════════════════════════════════════════

You are a senior security-focused mobile engineer
specializing in fintech apps for India.

Build a production-ready, offline-first chit fund
management app called "Kuber" with:

1. ZERO-KNOWLEDGE SECURITY (primary differentiator)
   Every byte of user data encrypted.
   Developer cannot access user data.
   Mathematically proven privacy.

2. APK TAMPER & SHARING PROTECTION
   App binds to specific device.
   Copied APK on different device = locked.
   Tampered APK detected and blocked.

3. 12 INDIAN LANGUAGES
   Full UI translation.
   Easy to add more later.
   English toggle on every screen.

4. COMPLETE CHIT FUND FEATURES
   All types: auction, lucky draw, fixed.
   Full lifecycle management.
   WhatsApp integration.

5. PREMIUM UX
   Apple visionOS glass dark theme.
   Smooth animations.
   Designed for semi-literate users.

MARKETING MESSAGES:
  Primary:   "உங்கள் தரவு உங்களுக்கு மட்டுமே"
  Secondary: "Not even we can read your data"
  Trust:     "AES-256 Military Grade Encryption"
  Proof:     "Works 100% offline — data never leaves device"

## ════════════════════════════════════════
## TECH STACK
## ════════════════════════════════════════

Framework:         React Native + Expo SDK 51+
Language:          TypeScript (strict, no any)
Local DB:          expo-sqlite + drizzle-orm
                   + SQLCipher (AES-256 encryption)
State:             Zustand
Navigation:        Expo Router (file-based)
UI:                Custom components ONLY
                   NO React Native Paper
                   NO @rneui/themed
Styling:           NativeWind + StyleSheet
PDF:               expo-print + expo-sharing
Charts:            Victory Native
Backup:            Google Drive API v3 (OAuth2 PKCE)
Background:        expo-background-fetch
Notifications:     expo-notifications
Biometric:         expo-local-authentication
Crypto:            expo-crypto
                   + react-native-quick-crypto
Secure Storage:    expo-secure-store
i18n:              i18next + react-i18next
Device:            expo-device
Screen:            expo-screen-capture
Screen Reader:     @react-native-community/netinfo
IAP:               react-native-iap (NOT expo-in-app-purchases)
Barcode:           expo-camera (NOT expo-barcode-scanner)

## ════════════════════════════════════════
## DOMAIN KNOWLEDGE — CHIT FUNDS
## ════════════════════════════════════════

Understand completely before building.

WHAT IS A CHIT FUND:
  Group savings scheme.
  N members × fixed monthly amount = pot.
  One member wins pot each month via auction.
  Runs N months until all members win once.

EXAMPLE (20 members, ₹5,000/month):
  Pot = 20 × ₹5,000 = ₹1,00,000
  Winner bids ₹20,000 discount to win
  Foreman commission = 5% of ₹1,00,000 = ₹5,000
  Net dividend = (₹20,000 - ₹5,000) ÷ 20 = ₹750
  Winner gets = ₹1,00,000 - ₹20,000 = ₹80,000
  Each member pays = ₹5,000 - ₹750 = ₹4,250

TYPES:
  Auction:    Highest discount bidder wins
  Lucky Draw: Random selection, no bidding
  Fixed:      Pre-decided rotation order

KEY TERMS:
  Chit value:         Total monthly pot
  Subscription:       Monthly contribution per member
  Discount:           Bid amount by winner
  Dividend:           Member's share of discount
  Foreman commission: Organizer fee (usually 5%)
  Prized member:      Member who already won
  Unprized member:    Member yet to win
  Instalment:         Monthly payment due

INSTALMENT FORMULA:
  subscription - dividend
  (same for prized and unprized in standard chits)

## ════════════════════════════════════════
## PROJECT STRUCTURE
## ════════════════════════════════════════

/app
  /(auth)/
    privacy-notice.tsx    ← first launch only
    pin.tsx
    biometric.tsx
  /(tabs)/
    dashboard/
      index.tsx
    chits/
      index.tsx
      new.tsx
      [id].tsx
    members/
      index.tsx
      new.tsx
      [id].tsx
    payments/
      index.tsx
      collect.tsx
      history.tsx
    reports/
      index.tsx
    more/
      index.tsx           ← settings
      security.tsx        ← security dashboard
      language.tsx        ← language picker
      backup.tsx
      subscription.tsx
  /modals/
    auction-entry.tsx
    payment-entry.tsx
    receipt-preview.tsx
    member-picker.tsx

/src
  /db
    schema.ts
    index.ts
    /migrations/
    /repositories/
      chits.repo.ts
      members.repo.ts
      instalments.repo.ts
      auctions.repo.ts
      payments.repo.ts
      settings.repo.ts
      audit.repo.ts
      device.repo.ts

  /security
    crypto.service.ts     ← encryption engine
    auth.service.ts       ← PIN + biometric
    device.service.ts     ← binding + detection
    tamper.service.ts     ← APK protection
    integrity.service.ts  ← audit hash chain

  /i18n
    config.ts
    registry.ts           ← single source of truth
    /translations/
      en.ts hi.ts ta.ts te.ts kn.ts ml.ts
      mr.ts gu.ts bn.ts pa.ts or.ts ur.ts

  /store
    app.store.ts
    auth.store.ts
    language.store.ts
    theme.store.ts
    /slices/
      chits.slice.ts
      members.slice.ts
      payments.slice.ts
      settings.slice.ts

  /services
    pdf.service.ts
    whatsapp.service.ts
    backup.service.ts
    google-auth.service.ts
    notification.service.ts
    instalment.service.ts
    dividend.service.ts
    export.service.ts

  /components
    /ui/
      GlassCard.tsx
      AppButton.tsx
      AppInput.tsx
      AppText.tsx
      AppScreen.tsx
      StatusBadge.tsx
      SectionHeader.tsx
      AmountText.tsx
      ListRow.tsx
      Avatar.tsx
      Skeleton.tsx
      EmptyState.tsx
      LangToggle.tsx
      SecurityBadge.tsx
      AppTabBar.tsx
      SideMenu.tsx

  /hooks
    useDb.ts
    useChits.ts
    useMembers.ts
    usePayments.ts
    useReports.ts
    useBackup.ts
    usePDF.ts
    useWhatsApp.ts
    useLicense.ts
    useColors.ts
    useSecurity.ts

  /utils
    chit-calculator.ts
    currency.ts
    date.ts
    validators.ts
    constants.ts
    indian-numbers.ts

## ════════════════════════════════════════
## SECURITY LAYER 1 — CRYPTOGRAPHY
## ════════════════════════════════════════

Create: src/security/crypto.service.ts

─────────────────────────────────────────
ENCRYPTION ARCHITECTURE:

  User PIN
      ↓
  PBKDF2 (100,000 iterations)
  + Device Hardware ID
  + Unique Device Salt
      ↓
  Master Key (AES-256)
      ↓
  Stored in Hardware Keystore
  (Android Keystore / iOS Secure Enclave)
      ↓
  Used to encrypt:
    → SQLite database (SQLCipher)
    → Backup files (AES-256-GCM)
    → Sensitive fields (AES-256-CBC)
─────────────────────────────────────────

import * as Crypto from 'expo-crypto'
import * as SecureStore from 'expo-secure-store'
import * as Device from 'expo-device'
import { QuickCrypto } from 'react-native-quick-crypto'
import { Buffer } from 'buffer'

const PBKDF2_ITERATIONS = 100_000
const KEY_LENGTH = 32
const SALT_KEY = 'kuber_v3_salt'
const DB_KEY_KEY = 'kuber_v3_db_key'
const FIELD_KEY_KEY = 'kuber_v3_field_key'

// ── Device-unique salt ───────────────────────────
export const getOrCreateSalt = async (): Promise<string> => {
  const existing = await SecureStore.getItemAsync(SALT_KEY)
  if (existing) return existing
  const random = await Crypto.getRandomBytesAsync(32)
  const salt = Buffer.from(random).toString('hex')
  await SecureStore.setItemAsync(SALT_KEY, salt, {
    keychainAccessible:
      SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY
  })
  return salt
}

// ── Derive AES-256 key from PIN ──────────────────
export const deriveKeyFromPIN = async (
  pin: string
): Promise<string> => {
  const salt = await getOrCreateSalt()
  const deviceId = Device.modelId
    ?? Device.deviceName
    ?? 'kuber_device'

  // Input = PIN + DeviceID + Salt
  // Makes key unique per device per PIN
  const input = `${pin}:${deviceId}:${salt}:kuber_v3`

  const key = QuickCrypto.pbkdf2Sync(
    input, salt,
    PBKDF2_ITERATIONS,
    KEY_LENGTH,
    'sha256'
  )
  return key.toString('hex')
}

// ── Hash PIN for verification ────────────────────
export const hashPIN = async (pin: string): Promise<string> => {
  const salt = await getOrCreateSalt()
  const deviceId = Device.modelId ?? 'unknown'
  return await Crypto.digestStringAsync(
    Crypto.CryptographicAlgorithm.SHA256,
    `${pin}:${salt}:${deviceId}:kuber_pin_v3`
  )
}

export const verifyPIN = async (
  pin: string,
  stored: string
): Promise<boolean> => {
  const computed = await hashPIN(pin)
  return computed === stored
}

// ── Store / Get DB key ───────────────────────────
export const storeDBKey = async (key: string) => {
  await SecureStore.setItemAsync(DB_KEY_KEY, key, {
    keychainAccessible:
      SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  })
}

export const getDBKey = async (): Promise<string | null> =>
  SecureStore.getItemAsync(DB_KEY_KEY)

// ── Field-level encryption ───────────────────────
export const encryptField = async (
  value: string
): Promise<string> => {
  const key = await SecureStore.getItemAsync(FIELD_KEY_KEY)
  if (!key) throw new Error('Field encryption key not found')
  const iv = await Crypto.getRandomBytesAsync(16)
  const ivHex = Buffer.from(iv).toString('hex')
  const cipher = QuickCrypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(key, 'hex'),
    Buffer.from(ivHex, 'hex')
  )
  let enc = cipher.update(value, 'utf8', 'hex')
  enc += cipher.final('hex')
  return `${ivHex}:${enc}`
}

export const decryptField = async (
  encrypted: string
): Promise<string> => {
  const key = await SecureStore.getItemAsync(FIELD_KEY_KEY)
  if (!key) throw new Error('Field encryption key not found')
  const [ivHex, enc] = encrypted.split(':')
  const decipher = QuickCrypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(key, 'hex'),
    Buffer.from(ivHex, 'hex')
  )
  let dec = decipher.update(enc, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

// ── Encrypt backup file ──────────────────────────
export const encryptBackup = async (
  data: string,
  pin: string
): Promise<{ encrypted: string; iv: string; checksum: string }> => {
  const key = await deriveKeyFromPIN(pin)
  const iv = await Crypto.getRandomBytesAsync(16)
  const ivHex = Buffer.from(iv).toString('hex')

  const cipher = QuickCrypto.createCipheriv(
    'aes-256-gcm',
    Buffer.from(key, 'hex'),
    Buffer.from(ivHex, 'hex')
  )
  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  const checksum = await Crypto.digestStringAsync(
    Crypto.CryptographicAlgorithm.SHA256, data
  )

  return { encrypted, iv: ivHex, checksum }
}

// ── Decrypt backup file ──────────────────────────
export const decryptBackup = async (
  encrypted: string,
  iv: string,
  checksum: string,
  pin: string
): Promise<string> => {
  const key = await deriveKeyFromPIN(pin)
  const decipher = QuickCrypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(key, 'hex'),
    Buffer.from(iv, 'hex')
  )
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  const computed = await Crypto.digestStringAsync(
    Crypto.CryptographicAlgorithm.SHA256, decrypted
  )
  if (computed !== checksum) {
    throw new Error('INTEGRITY_FAILED: Backup may be corrupted or tampered')
  }
  return decrypted
}

## ════════════════════════════════════════
## SECURITY LAYER 2 — APK PROTECTION
## ════════════════════════════════════════

Create: src/security/tamper.service.ts

This is unique to Kuber — not in VetriApp.
Prevents:
  → Sharing APK to use on another device
  → Modifying APK to bypass subscription
  → Extracting data by cloning app
  → Running on emulator to bypass protections

─────────────────────────────────────────
import * as Device from 'expo-device'
import * as Crypto from 'expo-crypto'
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

const DEVICE_BINDING_KEY = 'kuber_device_binding'
const INSTALL_ID_KEY = 'kuber_install_id'
const FIRST_LAUNCH_KEY = 'kuber_first_launch'

// ── Generate device fingerprint ──────────────────
// Unique string derived from hardware properties
const generateDeviceFingerprint = async (): Promise<string> => {
  const components = [
    Device.modelId ?? '',
    Device.modelName ?? '',
    Device.osVersion ?? '',
    Device.totalMemory?.toString() ?? '',
    Constants.expoConfig?.version ?? '',
    'kuber_v3_binding',
  ].join('|')

  return await Crypto.digestStringAsync(
    Crypto.CryptographicAlgorithm.SHA256,
    components
  )
}

// ── Bind app to this device on first install ─────
export const bindToDevice = async (): Promise<void> => {
  const existing = await SecureStore.getItemAsync(
    DEVICE_BINDING_KEY
  )
  if (existing) return // already bound

  const fingerprint = await generateDeviceFingerprint()
  const installId = await Crypto.digestStringAsync(
    Crypto.CryptographicAlgorithm.SHA256,
    `${fingerprint}_${Date.now()}_${Math.random()}`
  )

  await SecureStore.setItemAsync(
    DEVICE_BINDING_KEY, fingerprint,
    { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY }
  )
  await SecureStore.setItemAsync(
    INSTALL_ID_KEY, installId,
    { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY }
  )
  await SecureStore.setItemAsync(
    FIRST_LAUNCH_KEY, new Date().toISOString()
  )
}

// ── Verify app is on correct device ─────────────
export const verifyDeviceBinding = async (): Promise<{
  valid: boolean
  reason?: string
}> => {
  const stored = await SecureStore.getItemAsync(
    DEVICE_BINDING_KEY
  )

  // First time — bind and allow
  if (!stored) {
    await bindToDevice()
    return { valid: true }
  }

  const current = await generateDeviceFingerprint()

  // Device fingerprint mismatch
  // This happens when APK is copied to another device
  if (stored !== current) {
    return {
      valid: false,
      reason: 'DEVICE_MISMATCH'
    }
  }

  return { valid: true }
}

// ── Detect emulator ──────────────────────────────
export const isEmulator = (): boolean => {
  return !Device.isDevice
}

// ── Detect rooted/jailbroken device ─────────────
export const isDeviceRooted = async (): Promise<boolean> => {
  if (!Device.isDevice) return true // emulator = treat as rooted

  // Additional root indicators
  const rootIndicators = [
    Device.modelName?.toLowerCase().includes('generic'),
    Device.modelName?.toLowerCase().includes('sdk'),
  ]

  return rootIndicators.some(Boolean)
}

// ── Detect if app was tampered ───────────────────
export const checkAppIntegrity = async (): Promise<{
  valid: boolean
  reason?: string
}> => {
  // Check 1: Device binding
  const binding = await verifyDeviceBinding()
  if (!binding.valid) {
    return {
      valid: false,
      reason: 'This app is registered to a different device. ' +
               'Please install from the Play Store on your device.'
    }
  }

  // Check 2: Emulator detection (warn but allow)
  if (isEmulator()) {
    return {
      valid: true,
      reason: 'EMULATOR_DETECTED'
    }
  }

  return { valid: true }
}

// ── Handle integrity failure ─────────────────────
export const handleIntegrityFailure = (reason: string): void => {
  // Show full screen blocking modal
  // User cannot proceed
  // Options: reinstall from Play Store
  // Log to audit trail
}

// ── Generate data transfer token ─────────────────
// For legitimate device migration (user buys new phone)
export const generateMigrationToken = async (
  pin: string
): Promise<string> => {
  const key = await deriveKeyFromPIN(pin)
  const timestamp = Date.now()
  const token = await Crypto.digestStringAsync(
    Crypto.CryptographicAlgorithm.SHA256,
    `${key}_${timestamp}_migration_token`
  )
  // Token valid for 30 minutes
  // User exports backup + enters this token on new device
  await SecureStore.setItemAsync(
    'migration_token',
    JSON.stringify({ token, expiry: timestamp + 30 * 60 * 1000 })
  )
  return token.substring(0, 8).toUpperCase()
  // Shows as: "A3F9-K2M7" — user types on new device
}

export const verifyMigrationToken = async (
  inputToken: string
): Promise<boolean> => {
  const stored = await SecureStore.getItemAsync('migration_token')
  if (!stored) return false
  const { token, expiry } = JSON.parse(stored)
  if (Date.now() > expiry) return false
  return token.substring(0, 8).toUpperCase() === inputToken.toUpperCase()
}

## ════════════════════════════════════════
## SECURITY LAYER 3 — PIN AUTH
## ════════════════════════════════════════

Create: src/security/auth.service.ts

const MAX_ATTEMPTS = 5
const LOCKOUTS = [30, 60, 300, 900, 3600]
const PIN_HASH_KEY = 'kuber_v3_pin_hash'
const ATTEMPTS_KEY = 'kuber_v3_attempts'
const LOCKOUT_KEY = 'kuber_v3_lockout'
const LOCKOUT_COUNT_KEY = 'kuber_v3_lockout_count'
const BIOMETRIC_KEY = 'kuber_v3_biometric'
const TIMEOUT_KEY = 'kuber_v3_timeout'

export const setupPIN = async (pin: string): Promise<void> => {
  const hash = await hashPIN(pin)
  const dbKey = await deriveKeyFromPIN(pin)
  // Generate separate field encryption key
  const fieldKeyBytes = await Crypto.getRandomBytesAsync(32)
  const fieldKey = Buffer.from(fieldKeyBytes).toString('hex')

  await SecureStore.setItemAsync(PIN_HASH_KEY, hash, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY
  })
  await storeDBKey(dbKey)
  await SecureStore.setItemAsync(FIELD_KEY_KEY, fieldKey, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY
  })
  // Reset all lockout counters
  await SecureStore.deleteItemAsync(ATTEMPTS_KEY)
  await SecureStore.deleteItemAsync(LOCKOUT_KEY)
  await SecureStore.deleteItemAsync(LOCKOUT_COUNT_KEY)
}

export const verifyPINAttempt = async (
  pin: string
): Promise<{
  success: boolean
  locked: boolean
  lockoutSeconds?: number
  attemptsRemaining?: number
}> => {
  // Check active lockout
  const lockoutUntil = await SecureStore.getItemAsync(LOCKOUT_KEY)
  if (lockoutUntil) {
    const remaining = parseInt(lockoutUntil) - Date.now()
    if (remaining > 0) {
      return {
        success: false,
        locked: true,
        lockoutSeconds: Math.ceil(remaining / 1000)
      }
    }
  }

  const hash = await SecureStore.getItemAsync(PIN_HASH_KEY)
  if (!hash) return { success: false, locked: false }

  const correct = await verifyPIN(pin, hash)

  if (correct) {
    await SecureStore.deleteItemAsync(ATTEMPTS_KEY)
    await SecureStore.deleteItemAsync(LOCKOUT_KEY)
    return { success: true, locked: false }
  }

  // Failed attempt
  const attStr = await SecureStore.getItemAsync(ATTEMPTS_KEY)
  const attempts = parseInt(attStr ?? '0') + 1
  await SecureStore.setItemAsync(ATTEMPTS_KEY, attempts.toString())

  if (attempts >= MAX_ATTEMPTS) {
    const cntStr = await SecureStore.getItemAsync(LOCKOUT_COUNT_KEY)
    const cnt = parseInt(cntStr ?? '0')
    const duration = LOCKOUTS[Math.min(cnt, LOCKOUTS.length - 1)]
    await SecureStore.setItemAsync(
      LOCKOUT_KEY,
      (Date.now() + duration * 1000).toString()
    )
    await SecureStore.setItemAsync(
      LOCKOUT_COUNT_KEY, (cnt + 1).toString()
    )
    await SecureStore.setItemAsync(ATTEMPTS_KEY, '0')
    return { success: false, locked: true, lockoutSeconds: duration }
  }

  return {
    success: false,
    locked: false,
    attemptsRemaining: MAX_ATTEMPTS - attempts
  }
}

## ════════════════════════════════════════
## SECURITY LAYER 4 — DEVICE PROTECTION
## ════════════════════════════════════════

Create: src/security/device.service.ts

import * as ScreenCapture from 'expo-screen-capture'
import { AppState, Platform } from 'react-native'

// ── Prevent screenshots on all screens ──────────
export const enableScreenProtection = async () => {
  await ScreenCapture.preventScreenCaptureAsync()
}

// ── Allow screenshot on specific screens ─────────
// (e.g. receipt preview — user may want to screenshot)
export const allowScreenshotOnce = async () => {
  await ScreenCapture.allowScreenCaptureAsync()
  // Re-enable after 5 seconds
  setTimeout(async () => {
    await ScreenCapture.preventScreenCaptureAsync()
  }, 5000)
}

// ── Blur app content when backgrounded ───────────
// Prevents app switcher showing financial data
let backgrounded = false
export const setupBackgroundBlur = (
  showBlur: () => void,
  hideBlur: () => void
) => {
  AppState.addEventListener('change', (state) => {
    if (state === 'background' || state === 'inactive') {
      backgrounded = true
      showBlur()
    } else if (state === 'active' && backgrounded) {
      backgrounded = false
      // Keep blur until auth — handled by auth store
    }
  })
}

// ── Calculate security score ─────────────────────
export const calculateSecurityScore = async (): Promise<{
  score: number
  items: Array<{
    label: string
    enabled: boolean
    points: number
  }>
}> => {
  const hasPIN = !!(await SecureStore.getItemAsync(PIN_HASH_KEY))
  const hasBiometric = (await SecureStore.getItemAsync(
    BIOMETRIC_KEY)) === 'true'
  const hasBackup = !!(await SecureStore.getItemAsync(
    'google_access_token'))
  const screenshotBlocked = true // always enabled in Kuber
  const rooted = await isDeviceRooted()

  const items = [
    { label: 'PIN Protected (PBKDF2)',    enabled: hasPIN,            points: 25 },
    { label: 'Biometric Unlock',          enabled: hasBiometric,      points: 15 },
    { label: 'Backup Encrypted',          enabled: hasBackup,         points: 20 },
    { label: 'Screenshot Blocked',        enabled: screenshotBlocked, points: 20 },
    { label: 'Device Secure',             enabled: !rooted,           points: 20 },
  ]

  const score = items.reduce(
    (sum, item) => sum + (item.enabled ? item.points : 0), 0
  )

  return { score, items }
}

## ════════════════════════════════════════
## SECURITY LAYER 5 — AUDIT HASH CHAIN
## ════════════════════════════════════════

Create: src/security/integrity.service.ts

Every audit log entry contains:
  - Hash of its own data
  - Hash of previous entry
  - Tampered entries break the chain

export const createAuditEntry = async (
  entityType: string,
  entityId: string,
  action: string,
  oldValue: object | null,
  newValue: object | null
): Promise<void> => {
  // Get hash of last audit entry
  const lastEntry = await getLastAuditEntry()
  const prevHash = lastEntry
    ? lastEntry.entry_hash : 'GENESIS'

  const entryData = JSON.stringify({
    entityType, entityId, action,
    oldValue, newValue,
    timestamp: new Date().toISOString(),
    prevHash,
  })

  const entryHash = await Crypto.digestStringAsync(
    Crypto.CryptographicAlgorithm.SHA256,
    entryData
  )

  await db.insert(auditLog).values({
    id: nanoid(),
    entity_type: entityType,
    entity_id: entityId,
    action,
    old_value_json: JSON.stringify(oldValue),
    new_value_json: JSON.stringify(newValue),
    timestamp: new Date().toISOString(),
    prev_hash: prevHash,
    entry_hash: entryHash,
  })
}

export const verifyAuditChain = async (): Promise<{
  valid: boolean
  brokenAt?: string
}> => {
  const entries = await getAllAuditEntries()
  let prevHash = 'GENESIS'

  for (const entry of entries) {
    const computed = await Crypto.digestStringAsync(
      Crypto.CryptographicAlgorithm.SHA256,
      JSON.stringify({
        entityType: entry.entity_type,
        entityId: entry.entity_id,
        action: entry.action,
        oldValue: JSON.parse(entry.old_value_json ?? 'null'),
        newValue: JSON.parse(entry.new_value_json ?? 'null'),
        timestamp: entry.timestamp,
        prevHash,
      })
    )

    if (computed !== entry.entry_hash) {
      return { valid: false, brokenAt: entry.id }
    }
    prevHash = entry.entry_hash
  }

  return { valid: true }
}

## ════════════════════════════════════════
## DATABASE SCHEMA
## ════════════════════════════════════════

All tables have:
  id (text, nanoid PK), created_at, updated_at,
  is_deleted (boolean, soft delete)
All amounts in paise (integer). No floats.
All dates ISO 8601 strings.
WAL mode + foreign keys enabled at startup.
SQLCipher AES-256 encryption on entire DB.

TABLE: foreman_profile
  name, phone (encrypted), email, address,
  city, state, pincode, gstin, pan,
  logo_uri, commission_rate, upi_id,
  default_chit_duration, receipt_prefix,
  receipt_counter, language_code,
  script_mode, theme_mode,
  security_score, onboarding_complete

TABLE: chit_groups
  foreman_id, name, chit_value,
  subscription_amount, total_members,
  duration_months, commission_rate,
  type (auction|lucky_draw|fixed),
  start_date, end_date,
  status (draft|active|completed|terminated),
  current_month, next_auction_date,
  account_number (encrypted), ifsc (encrypted),
  bank_name, description

TABLE: members
  name, phone (encrypted), email (encrypted),
  address, city, state, pincode,
  nominee_name, nominee_phone (encrypted),
  nominee_relation, id_proof_type,
  id_proof_number (encrypted),
  photo_uri, notes, is_active

TABLE: chit_members
  chit_id, member_id, ticket_number,
  join_date, status (active|prized|defaulted|exited),
  prized_month, prize_amount_received,
  total_paid, total_due, outstanding_balance

TABLE: months
  chit_id, month_number, month_date,
  status (pending|auction_done|completed),
  pot_amount, discount_amount, dividend_amount,
  foreman_commission, net_prize_amount,
  winner_chit_member_id, auction_type,
  instalment_amount, notes

TABLE: auction_bids
  month_id, chit_member_id,
  bid_amount, bid_time, is_winner

TABLE: instalments
  chit_member_id, month_id, chit_id,
  due_date, due_amount, paid_amount,
  balance, status (pending|partial|paid|defaulted),
  is_prized_member, dividend_applied

TABLE: payments
  chit_member_id, instalment_id, chit_id,
  date, amount, payment_mode,
  reference, notes, receipt_number,
  receipt_generated, receipt_shared

TABLE: receipts
  payment_id, receipt_number, issued_date,
  issued_to_name, amount, chit_name,
  month_number, template_used

TABLE: defaulters
  chit_member_id, month_id, chit_id,
  days_overdue, last_reminder_date,
  reminder_count, notes, status

TABLE: expenses
  chit_id, date, category, amount,
  description, payment_mode, reference

TABLE: notifications_log
  chit_member_id, type, message,
  sent_via, sent_at, status

TABLE: backup_history
  date, size_bytes, drive_file_id,
  encrypted, checksum, status, error

TABLE: subscription_cache
  plan, status, expiry_date, cached_at,
  grace_until, cache_hmac

TABLE: device_registry
  device_fingerprint, install_id,
  first_seen, last_seen, is_current,
  migration_token, migration_expiry

TABLE: audit_log
  entity_type, entity_id, action,
  old_value_json, new_value_json,
  timestamp, prev_hash, entry_hash

TABLE: app_settings
  key, value

Indexes on: chit_id, member_id, month_id,
status, due_date, chit_member_id,
is_deleted, receipt_number.

## ════════════════════════════════════════
## CHIT CALCULATOR
## ════════════════════════════════════════

Create: src/utils/chit-calculator.ts

Implement ALL functions. Test with example:
20 members, ₹5000/mo, 5% commission, ₹20000 bid
→ commission=₹5000, dividend=₹750, prize=₹80000

export const calculateForemansCommission = (
  chitValue: number,    // paise
  commissionRate: number // percentage
): number =>
  Math.round(chitValue * commissionRate / 100)

export const calculateDividend = (
  discountAmount: number,
  foremansCommission: number,
  totalMembers: number
): number =>
  Math.round((discountAmount - foremansCommission) / totalMembers)

export const calculateNetPrizeAmount = (
  chitValue: number,
  discountAmount: number
): number =>
  chitValue - discountAmount

export const calculateInstalmentAmount = (
  subscriptionAmount: number,
  dividendAmount: number
): number =>
  subscriptionAmount - dividendAmount

export const validateBidAmount = (
  bidAmount: number,
  chitValue: number,
  minPercent = 5,
  maxPercent = 40
): { valid: boolean; error?: string } => {
  const min = Math.round(chitValue * minPercent / 100)
  const max = Math.round(chitValue * maxPercent / 100)
  if (bidAmount < min)
    return { valid: false, error: `Minimum bid: ₹${min/100}` }
  if (bidAmount > max)
    return { valid: false, error: `Maximum bid: ₹${max/100}` }
  return { valid: true }
}

export const calculateCollectionPercentage = (
  collected: number,
  expected: number
): number =>
  expected === 0 ? 0 : Math.round((collected / expected) * 100)

export const calculateChitCompletion = (
  currentMonth: number,
  totalMonths: number
): number =>
  Math.round((currentMonth / totalMonths) * 100)

export const getDefaulterList = (
  instalments: any[],
  today: string
): any[] =>
  instalments.filter(i =>
    (i.status === 'defaulted' ||
    (i.status === 'pending' && i.due_date < today))
  )

// Verify: 20 × 5000 = 100000
// commission = 100000 × 5% = 5000
// dividend = (20000 - 5000) / 20 = 750
// prize = 100000 - 20000 = 80000
// instalment = 5000 - 750 = 4250

## ════════════════════════════════════════
## LANGUAGE SYSTEM
## ════════════════════════════════════════

Design: ONE file per language.
Adding new language = create ONE file + ONE
registry entry. Nothing else changes.

─────────────────────────────────────────
Create: src/i18n/registry.ts
─────────────────────────────────────────

import en from './translations/en'
import ta from './translations/ta'
import hi from './translations/hi'
import te from './translations/te'
import kn from './translations/kn'
import ml from './translations/ml'
import mr from './translations/mr'
import gu from './translations/gu'
import bn from './translations/bn'
import pa from './translations/pa'
import or from './translations/or'
import ur from './translations/ur'

export interface LanguageMeta {
  code: string
  name: string
  nativeName: string
  flag: string
  rtl: boolean
  digits: string[]    // 0-9 in that script
  currencyWords: (paise: number) => string
}

// Number digits per language
const D = {
  en: ['0','1','2','3','4','5','6','7','8','9'],
  ta: ['௦','௧','௨','௩','௪','௫','௬','௭','௮','௯'],
  hi: ['०','१','२','३','४','५','६','७','८','९'],
  te: ['౦','౧','౨','౩','౪','౫','౬','౭','౮','౯'],
  kn: ['೦','೧','೨','೩','೪','೫','೬','೭','೮','೯'],
  ml: ['൦','൧','൨','൩','൪','൫','൬','൭','൮','൯'],
  mr: ['०','१','२','३','४','५','६','७','८','९'],
  gu: ['૦','૧','૨','૩','૪','૫','૬','૭','૮','૯'],
  bn: ['০','১','২','৩','৪','৫','৬','৭','৮','৯'],
  pa: ['੦','੧','੨','੩','੪','੫','੬','੭','੮','੯'],
  or: ['୦','୧','୨','୩','୪','୫','୬','୭','୮','୯'],
  ur: ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'],
}

export const LANGUAGES: LanguageMeta[] = [
  { code:'en', name:'English',   nativeName:'English',
    flag:'🇬🇧', rtl:false, digits:D.en,
    currencyWords:(p)=>englishWords(p) },
  { code:'ta', name:'Tamil',     nativeName:'தமிழ்',
    flag:'🇮🇳', rtl:false, digits:D.ta,
    currencyWords:(p)=>tamilWords(p) },
  { code:'hi', name:'Hindi',     nativeName:'हिंदी',
    flag:'🇮🇳', rtl:false, digits:D.hi,
    currencyWords:(p)=>hindiWords(p) },
  { code:'te', name:'Telugu',    nativeName:'తెలుగు',
    flag:'🇮🇳', rtl:false, digits:D.te,
    currencyWords:(p)=>teluguWords(p) },
  { code:'kn', name:'Kannada',   nativeName:'ಕನ್ನಡ',
    flag:'🇮🇳', rtl:false, digits:D.kn,
    currencyWords:(p)=>kannadaWords(p) },
  { code:'ml', name:'Malayalam', nativeName:'മലയാളം',
    flag:'🇮🇳', rtl:false, digits:D.ml,
    currencyWords:(p)=>malayalamWords(p) },
  { code:'mr', name:'Marathi',   nativeName:'मराठी',
    flag:'🇮🇳', rtl:false, digits:D.mr,
    currencyWords:(p)=>marathiWords(p) },
  { code:'gu', name:'Gujarati',  nativeName:'ગુજરાતી',
    flag:'🇮🇳', rtl:false, digits:D.gu,
    currencyWords:(p)=>gujaratiWords(p) },
  { code:'bn', name:'Bengali',   nativeName:'বাংলা',
    flag:'🇮🇳', rtl:false, digits:D.bn,
    currencyWords:(p)=>bengaliWords(p) },
  { code:'pa', name:'Punjabi',   nativeName:'ਪੰਜਾਬੀ',
    flag:'🇮🇳', rtl:false, digits:D.pa,
    currencyWords:(p)=>punjabiWords(p) },
  { code:'or', name:'Odia',      nativeName:'ଓଡ଼ିଆ',
    flag:'🇮🇳', rtl:false, digits:D.or,
    currencyWords:(p)=>odiaWords(p) },
  { code:'ur', name:'Urdu',      nativeName:'اردو',
    flag:'🇮🇳', rtl:true,  digits:D.ur,
    currencyWords:(p)=>urduWords(p) },
]

// Implement FULL currency word functions
// for all 12 languages
// Each handles: ones, tens, hundreds,
// thousands, lakhs, crores
// Example: tamilWords(500000) =
//   "ஐந்து ஆயிரம் ரூபாய் மட்டும்"

// ══ NUMBER → WORDS (implement all) ══════════════
function englishWords(paise: number): string {
  const rupees = Math.floor(paise / 100)
  return `${toEnglish(rupees)} Rupees Only`
}
function tamilWords(paise: number): string {
  const rupees = Math.floor(paise / 100)
  return `${toTamil(rupees)} ரூபாய் மட்டும்`
}
function hindiWords(paise: number): string {
  const rupees = Math.floor(paise / 100)
  return `${toHindi(rupees)} रुपये मात्र`
}
// ... implement all 12 ...

export const RESOURCES = {
  en:{translation:en}, ta:{translation:ta},
  hi:{translation:hi}, te:{translation:te},
  kn:{translation:kn}, ml:{translation:ml},
  mr:{translation:mr}, gu:{translation:gu},
  bn:{translation:bn}, pa:{translation:pa},
  or:{translation:or}, ur:{translation:ur},
}

// ══ HOW TO ADD A NEW LANGUAGE ════════════════════
// 1. Add digits array to D object
// 2. Add entry to LANGUAGES array
// 3. Add currency words function
// 4. Create src/i18n/translations/{code}.ts
// 5. Add to RESOURCES object
// NOTHING ELSE CHANGES. The picker auto-shows it.

─────────────────────────────────────────
Create: src/i18n/translations/en.ts
─────────────────────────────────────────
(Complete translation file — ALL screens)

export default {
  appName: 'Kuber',
  tagline: 'Secure Chit Fund Manager',
  securityTagline: 'Your data. Only yours. Always.',

  // Common
  save:'Save', cancel:'Cancel', delete:'Delete',
  edit:'Edit', add:'Add', back:'Back',
  next:'Next', done:'Done', confirm:'Confirm',
  close:'Close', share:'Share', print:'Print',
  export:'Export', search:'Search...',
  yes:'Yes', no:'No', ok:'OK',
  loading:'Loading...', saving:'Saving...',
  noData:'Nothing here yet',
  optional:'Optional', required:'Required',
  select:'Select', viewAll:'View All',

  // Status
  paid:'Paid', pending:'Pending',
  partial:'Partial', overdue:'Overdue',
  defaulted:'Defaulted', active:'Active',
  completed:'Completed', cancelled:'Cancelled',
  draft:'Draft', prized:'Prized',
  unprized:'Unprized',

  // Payment modes
  cash:'Cash', bank:'Bank Transfer',
  upi:'UPI', cheque:'Cheque', card:'Card',

  // Money
  amount:'Amount', total:'Total',
  subtotal:'Subtotal', discount:'Discount',
  balance:'Balance', due:'Due',
  outstanding:'Outstanding', received:'Received',

  // Dashboard
  dashboard:'Dashboard',
  totalCollection:'Total Collection',
  expectedThisMonth:'Expected This Month',
  collectedThisMonth:'Collected This Month',
  collectionProgress:'Collection Progress',
  defaulterCount:'{{count}} Defaulters',
  outstandingAmount:'₹{{amount}} Outstanding',
  activeChits:'Active Chits',
  upcomingAuctions:'Upcoming Auctions',
  recentPayments:'Recent Payments',
  quickActions:'Quick Actions',
  newChit:'New Chit',
  recordPayment:'Record Payment',
  newMember:'New Member',
  thisMonthAuction:"This Month's Auction",

  // Chit groups
  chitGroups:'Chit Groups',
  newChitGroup:'New Chit Group',
  editChitGroup:'Edit Chit Group',
  chitName:'Chit Name',
  chitValue:'Chit Value',
  subscription:'Monthly Subscription',
  totalMembersLabel:'Total Members',
  duration:'Duration (Months)',
  commissionRate:'Commission Rate (%)',
  chitType:'Chit Type',
  auction:'Auction',
  luckyDraw:'Lucky Draw',
  fixedOrder:'Fixed Order',
  startDate:'Start Date',
  currentMonth:'Current Month',
  monthOf:'Month {{current}} of {{total}}',
  chitProgress:'Progress',
  nextAuction:'Next Auction',
  completionPercent:'{{percent}}% Complete',
  duplicateChit:'Duplicate for Next Cycle',
  terminateChit:'Terminate Chit',
  chitSummary:'Chit Summary',
  monthlyPot:'Monthly Pot',
  prizedMembers:'Prized Members',
  unprizedMembers:'Unprized Members',

  // Members
  members:'Members',
  addMember:'Add Member',
  editMember:'Edit Member',
  memberName:'Member Name',
  phone:'Phone Number',
  email:'Email',
  address:'Address',
  city:'City',
  state:'State',
  pincode:'Pincode',
  nomineeName:'Nominee Name',
  nomineePhone:'Nominee Phone',
  nomineeRelation:'Relation',
  idProofType:'ID Proof Type',
  idProofNumber:'ID Number',
  aadhaar:'Aadhaar Card',
  pan:'PAN Card',
  voterId:'Voter ID',
  ticketNumber:'Ticket Number',
  memberStatus:'Status',
  prizedMonth:'Won in Month',
  memberStatement:'Member Statement',
  transferTicket:'Transfer Ticket',
  importMembers:'Import from CSV',

  // Auction
  auctionTitle:'Monthly Auction',
  enterBids:'Enter Auction Bids',
  monthNumber:'Month {{number}}',
  eligibleMembers:'Eligible Members',
  bidAmount:'Bid Amount',
  highestBid:'Highest Bid',
  winner:'Winner',
  foremansCommission:"Foreman's Commission",
  dividendPerMember:'Dividend Per Member',
  netPrize:'Net Prize Amount',
  instalmentThisMonth:'Instalment This Month',
  confirmAuction:'Confirm Auction Result',
  auctionResult:'Auction Result',
  wonMessage:'🏆 {{name}} has won this month!',
  shareResult:'Share Result',
  auctionHistory:'Auction History',
  luckyDrawWinner:'Lucky Draw Winner',
  drawNow:'Draw Now',
  auctionConfirmWarning:
    'Auction result cannot be changed after confirmation.',

  // Payments
  payments:'Payments',
  collectPayment:'Collect Payment',
  thisMonthDues:"This Month's Dues",
  allMembers:'All',
  paidMembers:'Paid',
  pendingMembers:'Pending',
  partialMembers:'Partial',
  defaultedMembers:'Defaulted',
  markAsPaid:'Mark as Paid',
  markAsDefaulted:'Mark as Defaulted',
  defaultReason:'Reason',
  bulkCollect:'Bulk Collect',
  paymentMode:'Payment Mode',
  referenceNo:'Reference No.',
  notes:'Notes',
  receiptNo:'Receipt No.',
  generateReceipt:'Generate Receipt',
  shareReceipt:'Share via WhatsApp',
  printReceipt:'Print Receipt',
  dailySummary:"Today's Collection",
  totalCollected:'Total Collected',
  totalPending:'Total Pending',
  instalmentDue:'Instalment Due',
  balanceDue:'Balance Due',
  paymentHistory:'Payment History',

  // Defaulters
  defaulters:'Defaulters',
  daysOverdue:'{{days}} days overdue',
  sendReminder:'Send Reminder',
  bulkReminder:'Remind All',
  reminderSent:'Reminder sent to {{count}} members',
  clearDefault:'Payment Received',
  reminderHistory:'Reminder History',

  // Receipt
  receiptTitle:'Payment Receipt',
  issuedTo:'Issued To',
  chitNameLabel:'Chit Name',
  forMonth:'For Month',
  amountReceived:'Amount Received',
  balanceRemaining:'Balance Remaining',
  authorisedBy:'Authorised By',
  thankYou:'Thank you for your payment!',

  // Reports
  reports:'Reports',
  collectionReport:'Collection Report',
  outstandingReport:'Outstanding Report',
  defaulterReport:'Defaulter Report',
  auctionHistoryReport:'Auction History',
  memberStatementReport:'Member Statement',
  chitSummaryReport:'Chit Summary',
  incomeReport:'Income Report',
  expenseReport:'Expense Report',
  exportPdf:'Export PDF',
  exportCsv:'Export CSV',
  dateRange:'Date Range',

  // WhatsApp templates
  wa_due:'Dear {{name}}, Instalment ₹{{amount}} for {{chit}} due on {{date}}. Please pay. - {{foreman}}',
  wa_received:'Dear {{name}}, ₹{{amount}} received for {{chit}} Month {{month}}. Receipt: {{receipt}}. Balance: ₹{{balance}}. - {{foreman}}',
  wa_auction:'Dear {{name}}, {{chit}} Month {{month}} winner: {{winner}}. Dividend: ₹{{dividend}}. Pay ₹{{instalment}} this month. - {{foreman}}',
  wa_reminder:'Dear {{name}}, {{days}} days overdue ₹{{amount}} for {{chit}}. Please pay immediately. - {{foreman}}',
  wa_won:'Congratulations {{name}}! You won {{chit}} Month {{month}}. Net prize ₹{{amount}}. Contact {{foreman}}.',

  // Settings
  settings:'Settings',
  foremansProfile:"Foreman's Profile",
  foremansName:'Your Name',
  foremansPhone:'Your Phone',
  upiId:'UPI ID',
  defaultCommission:'Default Commission %',
  receiptPrefix:'Receipt Prefix',
  language:'Language',
  changeLanguage:'Change Language',
  numberFormat:'Number Format',
  regionalNumbers:'Regional Script',
  englishNumbers:'English (1,2,3)',
  theme:'Theme',
  darkMode:'Dark Mode',
  lightMode:'Light Mode',
  backup:'Backup & Restore',
  googleDrive:'Google Drive',
  backupNow:'Backup Now',
  restore:'Restore',
  lastBackup:'Last Backup',
  security:'Security',
  securityDashboard:'Security Dashboard',
  changePin:'Change PIN',
  biometric:'Biometric Unlock',
  autoLock:'Auto Lock',
  subscription:'Subscription',
  upgrade:'Upgrade to Pro',
  waTemplates:'WhatsApp Templates',
  exportData:'Export All Data',
  factoryReset:'Factory Reset',
  version:'App Version',
  privacyPolicy:'Privacy Policy',
  deviceMigration:'Move to New Device',

  // Security screen
  securityTitle:'Your Data Security',
  securityScore:'Security Score',
  dbEncrypted:'Database Encrypted (AES-256)',
  pinProtected:'PIN Protected (PBKDF2 100k)',
  backupEncrypted:'Backup Encrypted',
  screenshotBlocked:'Screenshot Blocked',
  deviceSecure:'Device is Secure',
  deviceRooted:'Device May Be Rooted ⚠️',
  zeroKnowledge:'Zero-Knowledge Privacy',
  zeroKnowledgeExplain:
    'Your data is encrypted with a key ONLY YOU know. '
  + 'Mathematically impossible for anyone to read it. '
  + 'Not even a court order can make us share data '
  + 'we literally do not have.',
  deviceBound:'App Bound to This Device',
  deviceBoundExplain:
    'Kuber is registered to this specific phone. '
  + 'Copying the app to another device will not work. '
  + 'Your data stays where it belongs — with you.',
  proofSection:'How Do We Prove It?',
  proof1:'Turn off WiFi. App works perfectly.',
  proof2:'We store only your email + plan on our servers.',
  proof3:'Your chit data: 0 bytes on our servers.',
  securityTip:'Security Tips',
  tip1:'Never share your PIN with anyone.',
  tip2:'Enable Google Drive backup regularly.',
  tip3:'Use biometric unlock for convenience.',

  // Onboarding
  welcome:'Welcome to Kuber',
  welcomeSub:'Secure Chit Fund Management',
  setupProfile:'Setup Your Profile',
  yourName:'Your Full Name',
  yourPhone:'Your Phone Number',
  yourCity:'Your City',
  setPin:'Create Your Secret PIN',
  setPinSub:'This PIN encrypts ALL your data.',
  confirmPin:'Confirm PIN',
  pinWarning:
    '⚠️ IMPORTANT: Forgetting your PIN means '
  + 'your data cannot be recovered. '
  + 'Write it down and store safely.',
  dataEncrypted:'🔒 Your data is now encrypted',
  getStarted:'Get Started',
  privacyNoticeTitle:'Privacy Notice',
  privacyNoticeText:
    'All chit fund data is stored ONLY on your device. '
  + 'We store only your email and subscription plan. '
  + 'Your data never leaves your phone unencrypted.',
  iUnderstand:'I Understand & Agree',

  // Device migration
  moveToNewDevice:'Move to New Device',
  migrationStep1:
    '1. Backup your data (Settings → Backup Now)',
  migrationStep2:
    '2. Generate migration token below',
  migrationStep3:
    '3. Install Kuber on new device',
  migrationStep4:
    '4. During setup, enter this token + restore backup',
  generateToken:'Generate Token (valid 30 min)',
  enterToken:'Enter Migration Token',
  tokenExpired:'Token expired. Generate new token.',
  migrationSuccess:'Migration token verified!',

  // Errors
  required_error:'{{field}} is required',
  invalidPhone:'Enter valid 10-digit phone',
  invalidAmount:'Enter valid amount',
  negativeAmount:'Amount cannot be negative',
  pinWrong:'Wrong PIN. {{remaining}} attempts left',
  pinLocked:'Locked. Wait {{seconds}} seconds',
  networkError:'No internet connection',
  saveError:'Could not save. Try again',
  backupError:'Backup failed. Check Drive connection',
  integrityFailed:'Data integrity check failed',
  deviceMismatch:
    'This app is registered to a different device. '
  + 'Please install fresh from Play Store.',
  sessionExpired:'Session expired. Please unlock',
}

─────────────────────────────────────────
Translate ALL keys above to all 11 other
languages. Create one file per language:
src/i18n/translations/ta.ts (Tamil)
src/i18n/translations/hi.ts (Hindi)
src/i18n/translations/te.ts (Telugu)
src/i18n/translations/kn.ts (Kannada)
src/i18n/translations/ml.ts (Malayalam)
src/i18n/translations/mr.ts (Marathi)
src/i18n/translations/gu.ts (Gujarati)
src/i18n/translations/bn.ts (Bengali)
src/i18n/translations/pa.ts (Punjabi)
src/i18n/translations/or.ts (Odia)
src/i18n/translations/ur.ts (Urdu)

Translate VALUES only. Keep all KEYS identical.
─────────────────────────────────────────

## ════════════════════════════════════════
## LANGUAGE STORE
## ════════════════════════════════════════

Create: src/store/language.store.ts

import { create } from 'zustand'
import * as SecureStore from 'expo-secure-store'
import { I18nManager } from 'react-native'
import i18n from '../i18n/config'
import { LANGUAGES, LanguageMeta } from '../i18n/registry'

interface LangStore {
  current: LanguageMeta
  scriptMode: 'regional' | 'english'
  setLanguage: (code: string) => Promise<void>
  toggleScript: () => Promise<void>
  hydrate: () => Promise<void>
  formatAmount: (paise: number) => string
  amountInWords: (paise: number) => string
  formatNumber: (n: number) => string
  t: (key: string, vars?: object) => string
}

function toScript(str: string, digits: string[]): string {
  return str.split('').map(c => {
    const n = parseInt(c)
    return isNaN(n) ? c : digits[n]
  }).join('')
}

export const useLanguageStore = create<LangStore>(
  (set, get) => ({
    current: LANGUAGES[0],
    scriptMode: 'english',

    setLanguage: async (code) => {
      const lang = LANGUAGES.find(l => l.code === code)
               ?? LANGUAGES[0]
      await i18n.changeLanguage(code)
      await SecureStore.setItemAsync('kuber_lang', code)
      if (lang.rtl !== I18nManager.isRTL) {
        I18nManager.forceRTL(lang.rtl)
        // Prompt app restart for RTL
      }
      set({ current: lang })
    },

    toggleScript: async () => {
      const next = get().scriptMode === 'english'
        ? 'regional' : 'english'
      await SecureStore.setItemAsync('kuber_script', next)
      set({ scriptMode: next })
    },

    hydrate: async () => {
      const code   = await SecureStore.getItemAsync('kuber_lang')
      const script = await SecureStore.getItemAsync('kuber_script')
      if (code) {
        const lang = LANGUAGES.find(l => l.code === code)
        if (lang) {
          await i18n.changeLanguage(code)
          set({ current: lang })
        }
      }
      if (script) set({ scriptMode: script as any })
    },

    formatAmount: (paise) => {
      const { current, scriptMode } = get()
      const rupees = paise / 100
      const fmt = rupees.toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
      if (scriptMode === 'english') return `₹${fmt}`
      return `₹${toScript(fmt, current.digits)}`
    },

    amountInWords: (paise) => get().current.currencyWords(paise),

    formatNumber: (n) => {
      const { current, scriptMode } = get()
      if (scriptMode === 'english') return n.toString()
      return toScript(n.toString(), current.digits)
    },

    t: (key, vars) => i18n.t(key, vars),
  })
)

## ════════════════════════════════════════
## FEATURES — IMPLEMENT ALL
## ════════════════════════════════════════

### [1] DASHBOARD
All text via t(). All amounts via formatAmount().

- Total active chits + combined pot value
- This month: expected vs collected
  Visual progress bar (colored by %)
  green >80%, orange 50-80%, red <50%
- Defaulters count + outstanding amount
- Upcoming auction dates (next 7 days)
- Recent payments (last 5)
- Quick action tiles (4 main actions)
- Security score mini badge in header
  "🔒 Score: 85/100"

### [2] CHIT GROUP MANAGEMENT
- Create / edit / duplicate / terminate
- Types: auction, lucky draw, fixed order
- Auto-generate monthly schedule on create
- Status: Draft → Active → Completed
- Chit card showing:
  Pot value, collection%, completion bar,
  next auction date, defaulters count
- Terminate with reason (audit logged)
- Chit completion celebration screen
  (when all months done)

### [3] MEMBER MANAGEMENT
- Full KYC: name, phone, ID proof
- Encrypted fields: phone, ID number
- Assign to multiple chit groups
- Unique ticket per assignment
- Member photo (stored locally)
- Statement: all months, paid/due
- Transfer ticket to another person
- CSV import
- Mark as defaulted with reason

### [4] MONTHLY AUCTION
- Show only eligible (unprized) members
- Auction type auto-applied:
  Auction: enter bids per member
  Lucky Draw: random from eligible
  Fixed: auto-select next in rotation
- Auto-calculate:
  Commission, dividend, prize, instalment
- Confirm requires PIN re-entry
  (prevents accidental confirmation)
- Share result via WhatsApp
  (message to all members in their language)
- Edit window: same day only, with PIN

### [5] PAYMENT COLLECTION
- List all dues for current month
- Filter: All | Paid | Pending | Partial | Defaulted
- Record payment: amount, mode, reference
- Partial payment supported
- Auto receipt number (prefix + sequential)
- Mark as defaulted with reason
- Bulk collect: mark multiple paid
- Daily collection summary card
- Collection percentage progress bar

### [6] RECEIPTS (Enhanced)
- Auto-generated on every payment
- Receipt in member's preferred language
  (if member language stored, use it)
- Contains:
  Receipt no, date, member name + phone,
  chit name, month no, amount, mode,
  balance due, UPI QR code,
  foreman name + signature line,
  "🔒 Secured by Kuber" footer
- Share via WhatsApp (PDF)
- Print via Bluetooth thermal printer
- Regenerate any past receipt
- Receipt template: 3 styles
  (Modern, Classic, Compact)

### [7] DEFAULTER MANAGEMENT
- Defaulter list per chit per month
- Days overdue counter (auto-updating)
- Total outstanding per defaulter
- Reminder history (when sent, how many times)
- WhatsApp reminder in member's language
- Bulk remind: 3 second delay between
- Escalation levels:
  Level 1: Polite reminder
  Level 2: Firm reminder (after 7 days)
  Level 3: Final notice (after 15 days)
  Each level has different message template

### [8] REPORTS
- Collection Report (by chit/month/member)
- Outstanding Report
- Defaulter Report with days overdue
- Auction History (all months, winners, bids)
- Member Statement (full lifecycle)
- Chit Summary Report (complete lifecycle)
- Income Report (foreman commissions)
- Expense Report
All: date range filter + PDF + CSV export
PDF headers in selected language

### [9] GOOGLE DRIVE BACKUP (Enhanced)
- OAuth2 with PKCE (S256)
- Backup encrypted BEFORE upload
- Backup file: kuber_backup_{date}_{deviceId}.kbk
  (custom .kbk extension — not openable outside app)
- List backups with: date, size, encrypted badge
- Restore requires PIN entry (re-derives key)
- PIN verified against backup content
  (wrong PIN = decryption fails = shows error)
- "Backup encrypted — unreadable without PIN"
  message shown on backup screen
- Background auto-backup daily
- Backup notification: success/failure

### [10] DEVICE MIGRATION (New Feature)
When user buys new phone:
  Old phone:
    → Settings → Move to New Device
    → PIN required
    → Shows 8-character token (valid 30 min)
    → User notes token + takes backup

  New phone:
    → Fresh install
    → During PIN setup: "Restore from backup?"
    → Enter migration token
    → Token verified = unbinds old device
    → Restore backup file from Drive
    → Enter PIN = data decrypted
    → New device bound

This solves the biggest UX problem with
device-bound apps — legitimate device change.

### [11] WHATSAPP INTEGRATION
- Payment receipt → WhatsApp instantly
- Auction result to all members (bulk)
- Monthly instalment reminder
- Defaulter escalation (3 levels)
- Custom templates per message type
- Templates editable in Settings
- All templates available in all 12 languages
- Members can have individual language preference
  (stored per member — send in their language)
- Bulk: 3s delay between messages

### [12] AUTH & SECURITY
- PIN (4-6 digits, PBKDF2 100k iterations)
- Biometric (face/fingerprint)
- Auto-lock: 1/5/15 min/never
- Custom keypad (not system keyboard)
- Lockout: 5 attempts → exponential backoff
- Session in memory only
- Blur on background
- Screenshot blocked (all screens)
- Receipt preview: screenshot allowed 5s
- Root detection → warning
- Emulator detection → warning
- Developer mode detection → warning
- Device binding (APK sharing blocked)
- Device migration with token

### [13] SECURITY DASHBOARD SCREEN
Path: Settings → Security Dashboard

Shows:
  Large circular security score (0-100)
  Animated ring — green/orange/red by score

  Score breakdown (5 items):
    PIN Protected      25 pts ✓/✗
    Biometric          15 pts ✓/✗
    Backup Encrypted   20 pts ✓/✗
    Screenshot Blocked 20 pts ✓/✗
    Device Secure      20 pts ✓/✗

  Zero-Knowledge card (expandable):
    "What does Zero-Knowledge mean?"
    Full explanation in current language

  Device Binding card:
    "This app is bound to: {Device Name}"
    "Bound since: {date}"
    "Install ID: {first 8 chars of ID}"

  "Prove It" section:
    3 verifiable claims user can test

  Audit chain status:
    "✓ Audit log intact ({{count}} entries)"
    or "⚠ Anomaly detected"

### [14] SUBSCRIPTION
Free:     1 chit, 25 members, basic reports
Pro:      ₹299/mo — unlimited, all features
Business: ₹799/mo — multi-foreman, priority

License cache: HMAC signed (tamper-proof)
Offline grace: 7 days
Expired grace: 3 days
Rooted device: re-verify online

### [15] SETTINGS
- Foreman profile
- Receipt settings (prefix, template)
- Default payment mode + commission
- Language picker (full screen)
- Number script toggle
- Theme: dark/light
- Google Drive backup
- Security dashboard
- PIN change
- Biometric toggle
- Auto-lock timer
- WhatsApp template editor
- Subscription & billing
- Device migration
- Export all data (JSON + CSV)
- Audit log viewer
- Factory reset (requires PIN, double confirm)
- App version + build number

## ════════════════════════════════════════
## UI DESIGN SYSTEM
## ════════════════════════════════════════

Same as VetriApp — copy all components.
Add these Kuber-specific tokens:

gold:     #FFD700  (winner, auction highlight)
goldSoft: rgba(255,215,0,0.15)

Special UI elements:
  Winner card: GlassCard tinted gold
    glow: rgba(255,215,0,0.30) blur:24
  Security badge: small "🔒" pill on screens
  Device bound badge: "📱 Device Secured" in settings
  APK protection badge: shown in security screen
  Language badge: show current language code
    in header right: "தமிழ் | EN"

Tab bar: 4 tabs + More (same as VetriApp)
  Dashboard | Chits | Payments | Reports | More

Side menu contains:
  Members, Defaulters, Backup,
  Security, Language, Settings

## ════════════════════════════════════════
## CODING STANDARDS
## ════════════════════════════════════════

1.  TypeScript strict. No any.
2.  All DB via drizzle ORM. No raw SQL ever.
3.  All amounts in paise. No floats.
4.  ALL text via t() — zero hardcoded English.
5.  ALL amounts via formatAmount().
6.  ALL currency words via amountInWords().
7.  ALL numbers (counts, %) via formatNumber().
8.  Soft delete only (is_deleted = true).
9.  Every mutation → createAuditEntry().
10. Zod validation on all forms before DB write.
11. Encrypted fields: phone, ID, bank account.
12. No console.log in production (__DEV__ guard).
13. Error boundaries on every screen.
14. Loading = Skeleton, not ActivityIndicator.
15. Empty states: always designed with EmptyState.
16. All receipt numbers sequential + unique.
17. Auction: once per month per chit only.
18. Prized members cannot bid in auction.
19. PIN re-entry required for:
    auction confirm, factory reset,
    device migration, backup restore.
20. SecureStore with WHEN_UNLOCKED_THIS_DEVICE_ONLY
    for ALL sensitive values.

## ════════════════════════════════════════
## ADDITIONAL FEATURES (BONUS)
## ════════════════════════════════════════

These make Kuber exceptional:

### A. SMART PAYMENT REMINDER SCHEDULER
  Background task checks daily at 8 AM:
  Members with due in 3 days → schedule reminder
  Members with due today → immediate reminder
  Members 1 day overdue → send reminder
  Members 7 days overdue → escalate
  All via WhatsApp in member's language

### B. CHIT HEALTH SCORE
  Each chit gets a health score 0-100:
    +20: collection % > 90% this month
    +20: no defaulters
    +20: auction completed on time
    +20: all members active
    +20: backup recent (< 7 days)
  Show in chit card as colored badge

### C. FOREMAN INCOME TRACKER
  Track total commission earned per month
  Total across all chits
  Year-to-date earnings
  Projection for year end
  Simple bar chart

### D. QUICK RECEIPT SHARE
  From payment list: swipe left on paid member
  → "Share Receipt" action (no navigation)
  WhatsApp opens instantly

### E. OFFLINE MEMBER VERIFICATION
  Store member photo + name locally
  Quick verify: show photo when collecting cash
  Prevents paying wrong person

### F. COLLECTION SHEET PDF
  Monthly PDF: all members, due amounts,
  paid/pending checkboxes
  Print and use for door-to-door collection
  Works 100% offline

### G. CHIT AGREEMENT PDF
  Auto-generate chit agreement document
  With member signatures placeholder
  Legally formatted
  In selected language

### H. PASSBOOK VIEW
  Each member has a "passbook" view
  Chronological: every payment, dividend,
  auction result, balance
  Like a bank passbook
  Exportable as PDF

## ════════════════════════════════════════
## VAPT CHECKLIST
## ════════════════════════════════════════

Implement and verify ALL before release:

AUTHENTICATION:
  ✅ PBKDF2 100k iterations for PIN
  ✅ Unique salt per device in hardware keystore
  ✅ Lockout after 5 attempts
  ✅ Exponential backoff: 30s→60s→5m→15m→1h
  ✅ Lockout persists across restarts (SecureStore)
  ✅ Custom keypad (not system keyboard)
  ✅ Session in memory only (not persisted)
  ✅ Blur on background
  ✅ Auth re-check on foreground

APK PROTECTION:
  ✅ Device fingerprint binding on install
  ✅ Fingerprint verified on every launch
  ✅ Mismatch → full screen block + reinstall prompt
  ✅ Migration token system for device change
  ✅ SecureStore ALWAYS_THIS_DEVICE_ONLY
  ✅ No cloneable identifiers in app storage

DATA SECURITY:
  ✅ SQLCipher AES-256 for database
  ✅ Key derived from PIN + device (not stored plain)
  ✅ Field-level encryption for PII
  ✅ Backup AES-256-GCM before upload
  ✅ Integrity checksum on backup
  ✅ android:allowBackup = false
  ✅ No sensitive data in AsyncStorage

NETWORK SECURITY:
  ✅ HTTPS only (no HTTP anywhere)
  ✅ Certificate pinning on Drive + Supabase
  ✅ OAuth PKCE with S256
  ✅ State parameter verified on OAuth callback
  ✅ Token in hardware keystore
  ✅ 10s connect timeout, 30s read timeout
  ✅ cleartextTrafficPermitted = false

DEVICE SECURITY:
  ✅ Root detection → warning
  ✅ Emulator detection → warning
  ✅ Developer mode detection → warning
  ✅ Screenshot blocked (expo-screen-capture)
  ✅ App blur on background

BUSINESS LOGIC:
  ✅ Zod validation on all inputs
  ✅ Negative amount prevention
  ✅ Auction: once per month enforcement
  ✅ Prized member cannot bid
  ✅ License HMAC tamper detection
  ✅ Audit log hash chain

STATIC ANALYSIS:
  ✅ No hardcoded secrets
  ✅ No AsyncStorage for sensitive data
  ✅ No raw SQL strings
  ✅ No console.log in production
  ✅ No HTTP URLs

## ════════════════════════════════════════
## DEVELOPMENT PHASES
## ════════════════════════════════════════

PHASE 1 — SECURITY FOUNDATION (Week 1)
  ✅ crypto.service.ts — full implementation
  ✅ tamper.service.ts — device binding
  ✅ auth.service.ts — PIN + lockout
  ✅ device.service.ts — screen + detection
  ✅ integrity.service.ts — audit hash chain
  ✅ Encrypted SQLite DB with SQLCipher
  ✅ Privacy notice screen (first launch)
  ✅ PIN onboarding
  ✅ Security dashboard screen (empty data)
  TEST: encrypt→decrypt works
  TEST: wrong PIN → lockout
  TEST: copy DB file → cannot open
  TEST: install on emulator → warning shown

PHASE 2 — LANGUAGE SYSTEM (Week 1-2)
  ✅ i18n registry + config
  ✅ All 12 translation files (complete)
  ✅ Language store with formatAmount etc.
  ✅ Language picker screen
  ✅ English toggle button on all screens
  ✅ Number script conversion
  ✅ Currency words (all 12 languages)
  ✅ RTL support for Urdu
  TEST: switch to Tamil → full UI in Tamil
  TEST: toggle script → numbers change
  TEST: amountInWords(500000) → "ஐந்து ஆயிரம்"

PHASE 3 — CORE CHIT FEATURES (Week 2-3)
  ✅ Foreman profile onboarding
  ✅ Chit group management
  ✅ Member management + encryption
  ✅ Chit calculator (verified)
  ✅ Monthly auction (all 3 types)
  ✅ Dashboard with real data
  TEST: 20 members, 5%, ₹20000 bid
        → commission=₹5000, dividend=₹750

PHASE 4 — PAYMENTS + RECEIPTS (Week 3-4)
  ✅ Payment collection (single + bulk)
  ✅ Receipt generation in current language
  ✅ WhatsApp share (receipt + reminders)
  ✅ Defaulter management
  ✅ Bulk WhatsApp (3s delay)
  ✅ Smart reminder scheduler

PHASE 5 — REPORTS + BACKUP (Week 4-5)
  ✅ All 8 reports (PDF + CSV)
  ✅ Google Drive backup (encrypted .kbk)
  ✅ Restore with PIN verification
  ✅ Device migration feature
  ✅ Collection sheet PDF
  ✅ Chit agreement PDF
  ✅ Passbook view

PHASE 6 — POLISH + LAUNCH (Week 5-6)
  ✅ Subscription + feature gating
  ✅ Full settings screen
  ✅ All bonus features (A-H)
  ✅ Security dashboard fully populated
  ✅ Chit health score
  ✅ Foreman income tracker
  ✅ VAPT checklist — all items verified
  ✅ Play Store build (EAS)

## ════════════════════════════════════════
## START COMMAND
## ════════════════════════════════════════

Begin PHASE 1 in this exact order:

1. Scaffold project (copy VetriApp structure)
2. Install all packages:
   npm install i18next react-i18next
   npm install react-native-quick-crypto
   npx expo install expo-crypto expo-device
   npx expo install expo-secure-store
   npx expo install expo-screen-capture
   npx expo install expo-localization
   npx expo install expo-local-authentication

3. Create src/security/crypto.service.ts
   Write unit tests:
   → deriveKeyFromPIN('1234') returns 64-char hex
   → encryptBackup + decryptBackup roundtrip
   → wrong PIN cannot decrypt

4. Create src/security/tamper.service.ts
   Test: bindToDevice() on first run
   Test: verifyDeviceBinding() returns valid

5. Create src/security/auth.service.ts
   Test: 5 wrong PINs → locked
   Test: lockout persists after kill + reopen

6. Create encrypted SQLite with SQLCipher
   Test: DB file opened in DB Browser
         → shows encrypted (not readable)

7. Create Privacy Notice screen
8. Create PIN setup onboarding
9. Create Security Dashboard screen
10. Run on physical Android device
    Screenshot Security Dashboard → share with me

THEN Phase 2 (language system)
THEN Phase 3 (chit features)

VERIFY security layer on device before
ANY chit feature is built.
Security is the product. Features are secondary.

Do not move phases until current is verified.
Ask before any decision not in this prompt.

## ════════════════════════════════════════
## APP STORE METADATA
## ════════════════════════════════════════

App Name:
  Kuber - Chit Fund Manager

Short Description (80 chars):
  Secure offline chit fund manager.
  Not even we can see your data.

Full Description:
  Kuber is the most secure chit fund management
  app in India. Built for foremen and small
  finance companies managing chit groups.

  🔐 MILITARY-GRADE SECURITY
  • AES-256 encryption — same as banks use
  • Your PIN encrypts ALL data — we cannot access it
  • Works 100% offline — data never leaves your phone
  • Even if our servers are hacked: zero user data

  🌏 12 INDIAN LANGUAGES
  தமிழ் | हिंदी | తెలుగు | ಕನ್ನಡ | മലയാളം
  मराठी | ગુજરાતી | বাংলা | ਪੰਜਾਬੀ | ଓଡ଼ିଆ | اردو

  📊 COMPLETE CHIT MANAGEMENT
  • Auction, Lucky Draw, Fixed order chits
  • Automatic dividend & instalment calculation
  • WhatsApp receipts & payment reminders
  • Detailed reports & PDF export

  ☁️ ENCRYPTED GOOGLE DRIVE BACKUP
  • Backup encrypted BEFORE leaving your phone
  • Without your PIN = unreadable to anyone

  Free: 1 chit, 25 members
  Pro: ₹299/month — unlimited everything

Keywords:
  chit fund, chit fund manager, chitty, kuri,
  offline accounting, Tamil finance app,
  secure chit app, chit fund software India

Category: Finance
Rating: Everyone