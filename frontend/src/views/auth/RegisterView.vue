<template>
  <div class="min-h-screen bg-[#f4f6fa] text-slate-800 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
    <!-- Top Navigation Bar -->
    <header class="flex h-16 w-full items-center justify-between px-6 sm:px-10 bg-transparent">
      <div class="flex items-center gap-3">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3b82f6] shadow-sm overflow-hidden">
          <img v-if="siteLogo" :src="siteLogo" alt="Logo" class="h-6 w-6 object-contain" />
          <span v-else class="font-black text-white text-sm tracking-tight">S2</span>
        </div>
        <span class="text-xl font-bold tracking-tight text-slate-900">{{ siteName }}</span>
      </div>
    </header>

    <!-- Main Content Area: Centered Auth Card -->
    <main class="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 py-4 sm:py-6">
      <div class="w-full max-w-[1020px] min-h-[580px] overflow-hidden rounded-[24px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col md:flex-row my-auto">
        
        <!-- Left Side: Brand Showcase Panel -->
        <AuthBrandPanel />

        <!-- Right Side: Registration Form -->
        <div class="w-full md:w-[54%] bg-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
          <div class="my-auto">
            <div>
              <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {{ t('auth.createAccount') }}
              </h2>
              <p class="mt-2 text-sm text-slate-500">
                {{ t('auth.signUpToStart', { siteName }) }}
              </p>
            </div>

          <!-- Registration Disabled Message -->
          <div
            v-if="!registrationEnabled && settingsLoaded"
            class="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800"
          >
            <div class="flex items-start gap-3">
              <Icon name="exclamationCircle" size="md" class="text-amber-500 flex-shrink-0 mt-0.5" />
              <p class="text-sm">
                {{ t('auth.registrationDisabled') }}
              </p>
            </div>
          </div>

          <form v-else @submit.prevent="handleRegister" class="mt-8 space-y-4">
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-xs font-semibold text-slate-700 mb-1.5">
                {{ t('auth.emailLabel') }}
              </label>
              <div class="relative">
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  autofocus
                  autocomplete="email"
                  :disabled="registrationActionDisabled"
                  :placeholder="t('auth.emailPlaceholder')"
                  class="w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4374f6] focus:ring-4 focus:ring-[#4374f6]/10"
                  :class="errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200'"
                />
              </div>
              <p v-if="errors.email" class="mt-1.5 text-xs text-red-500">{{ errors.email }}</p>
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="block text-xs font-semibold text-slate-700 mb-1.5">
                {{ t('auth.passwordLabel') }}
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  autocomplete="new-password"
                  :disabled="registrationActionDisabled"
                  :placeholder="t('auth.createPasswordPlaceholder')"
                  class="w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4374f6] focus:ring-4 focus:ring-[#4374f6]/10"
                  :class="errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200'"
                />
                <button
                  type="button"
                  :disabled="registrationActionDisabled"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                >
                  <Icon v-if="showPassword" name="eyeOff" size="md" />
                  <Icon v-else name="eye" size="md" />
                </button>
              </div>
              <p v-if="errors.password" class="mt-1.5 text-xs text-red-500">{{ errors.password }}</p>
            </div>

            <!-- Invitation Code (Required when enabled) -->
            <div v-if="invitationCodeEnabled">
              <label for="invitation_code" class="block text-xs font-semibold text-slate-700 mb-1.5">
                {{ t('auth.invitationCodeLabel') }}
              </label>
              <div class="relative">
                <input
                  id="invitation_code"
                  v-model="formData.invitation_code"
                  type="text"
                  :disabled="registrationActionDisabled"
                  :placeholder="t('auth.invitationCodePlaceholder')"
                  class="w-full rounded-xl border bg-white px-4 py-3 pr-10 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4374f6] focus:ring-4 focus:ring-[#4374f6]/10"
                  :class="{
                    'border-green-500 focus:border-green-500 focus:ring-green-500/10': invitationValidation.valid,
                    'border-red-500 focus:border-red-500 focus:ring-red-500/10': invitationValidation.invalid || errors.invitation_code,
                    'border-slate-200': !invitationValidation.valid && !invitationValidation.invalid && !errors.invitation_code
                  }"
                  @input="handleInvitationCodeInput"
                />
                <div v-if="invitationValidating" class="absolute inset-y-0 right-0 flex items-center pr-3.5">
                  <svg class="h-4 w-4 animate-spin text-slate-400" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <div v-else-if="invitationValidation.valid" class="absolute inset-y-0 right-0 flex items-center pr-3.5">
                  <Icon name="checkCircle" size="md" class="text-green-500" />
                </div>
                <div v-else-if="invitationValidation.invalid || errors.invitation_code" class="absolute inset-y-0 right-0 flex items-center pr-3.5">
                  <Icon name="exclamationCircle" size="md" class="text-red-500" />
                </div>
              </div>
              <p v-if="errors.invitation_code" class="mt-1.5 text-xs text-red-500">{{ errors.invitation_code }}</p>
              <transition name="fade">
                <div v-if="invitationValidation.valid" class="mt-2 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">
                  <Icon name="checkCircle" size="sm" class="text-green-600" />
                  <span>{{ t('auth.invitationCodeValid') }}</span>
                </div>
              </transition>
            </div>

            <!-- Affiliate Invitation Code (Optional) -->
            <div v-else-if="affiliateEnabled" data-testid="affiliate-invitation-field">
              <label for="affiliate_code" class="block text-xs font-semibold text-slate-700 mb-1.5">
                {{ t('auth.invitationCodeLabel') }} <span class="text-slate-400 font-normal">({{ t('common.optional') }})</span>
              </label>
              <input
                id="affiliate_code"
                v-model="formData.aff_code"
                type="text"
                :disabled="registrationActionDisabled"
                :placeholder="t('auth.invitationCodePlaceholder')"
                class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4374f6] focus:ring-4 focus:ring-[#4374f6]/10"
              />
            </div>

            <!-- Promo Code (Optional) -->
            <div v-if="promoCodeEnabled">
              <label for="promo_code" class="block text-xs font-semibold text-slate-700 mb-1.5">
                {{ t('auth.promoCodeLabel') }} <span class="text-slate-400 font-normal">({{ t('common.optional') }})</span>
              </label>
              <div class="relative">
                <input
                  id="promo_code"
                  v-model="formData.promo_code"
                  type="text"
                  :disabled="registrationActionDisabled"
                  :placeholder="t('auth.promoCodePlaceholder')"
                  class="w-full rounded-xl border bg-white px-4 py-3 pr-10 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4374f6] focus:ring-4 focus:ring-[#4374f6]/10"
                  :class="{
                    'border-green-500 focus:border-green-500 focus:ring-green-500/10': promoValidation.valid,
                    'border-red-500 focus:border-red-500 focus:ring-red-500/10': promoValidation.invalid,
                    'border-slate-200': !promoValidation.valid && !promoValidation.invalid
                  }"
                  @input="handlePromoCodeInput"
                />
                <div v-if="promoValidating" class="absolute inset-y-0 right-0 flex items-center pr-3.5">
                  <svg class="h-4 w-4 animate-spin text-slate-400" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <div v-else-if="promoValidation.valid" class="absolute inset-y-0 right-0 flex items-center pr-3.5">
                  <Icon name="checkCircle" size="md" class="text-green-500" />
                </div>
                <div v-else-if="promoValidation.invalid" class="absolute inset-y-0 right-0 flex items-center pr-3.5">
                  <Icon name="exclamationCircle" size="md" class="text-red-500" />
                </div>
              </div>
              <transition name="fade">
                <div v-if="promoValidation.valid" class="mt-2 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">
                  <Icon name="gift" size="sm" class="text-green-600" />
                  <span>{{ t('auth.promoCodeValid', { amount: promoValidation.bonusAmount?.toFixed(2) }) }}</span>
                </div>
              </transition>
            </div>

            <!-- Turnstile Widget -->
            <div v-if="captchaChallenge.captchaEnabled.value" data-testid="registration-turnstile" class="pt-1">
              <TurnstileWidget
                ref="turnstileRef"
                :turnstile-enabled="captchaChallenge.turnstileEnabled.value"
                :turnstile-site-key="captchaChallenge.turnstileSiteKey.value"
                :tencent-enabled="captchaChallenge.tencentCaptchaEnabled.value"
                :tencent-app-id="captchaChallenge.tencentCaptchaAppId.value"
                :tencent-region="captchaChallenge.tencentCaptchaRegion.value"
                :aliyun-enabled="captchaChallenge.aliyunCaptchaEnabled.value"
                :aliyun-scene-id="captchaChallenge.aliyunCaptchaSceneId.value"
                :aliyun-prefix="captchaChallenge.aliyunCaptchaPrefix.value"
                :aliyun-region="captchaChallenge.aliyunCaptchaRegion.value"
                @verify="captchaChallenge.onTurnstileVerify"
                @expire="captchaChallenge.onTurnstileExpire"
                @error="captchaChallenge.onTurnstileError"
              />
            </div>

            <!-- Login Agreement Prompt / Checkbox -->
            <div v-if="loginAgreement.loginAgreementEnabled.value" class="pt-1">
              <LoginAgreementPrompt
                :accepted="loginAgreement.agreementAccepted.value"
                :documents="loginAgreement.loginAgreementDocuments.value"
                :mode="loginAgreement.loginAgreementMode.value"
                :updated-at="loginAgreement.loginAgreementUpdatedAt.value"
                :visible="loginAgreement.showAgreementModal.value"
                @accept="loginAgreement.acceptLoginAgreement"
                @reject="() => loginAgreement.rejectLoginAgreement('register')"
                @open="loginAgreement.showAgreementModal.value = true"
              />
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="registrationActionDisabled || (captchaChallenge.turnstileEnabled.value && !captchaChallenge.turnstileToken.value)"
              class="w-full mt-2 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#4374f6] to-[#3b82f6] py-3.5 px-4 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition duration-150 hover:shadow-lg hover:shadow-blue-500/30 hover:brightness-105 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <svg
                v-if="isLoading"
                class="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <Icon v-else name="userPlus" size="md" class="mr-2" />
              {{
                isLoading
                  ? t('auth.processing')
                  : emailVerifyEnabled
                    ? t('auth.continue')
                    : t('auth.createAccount')
              }}
            </button>

            <!-- OAuth Divider & Buttons -->
            <div v-if="showOAuthLogin" class="space-y-3 pt-3">
              <div class="relative my-4">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-slate-100"></div>
                </div>
                <div class="relative flex justify-center text-xs">
                  <span class="bg-white px-4 text-slate-400 font-normal">
                    {{ t('auth.oauthOrContinue') }}
                  </span>
                </div>
              </div>

              <EmailOAuthButtons
                :disabled="registrationActionDisabled"
                :aff-code="formData.aff_code"
                :github-enabled="githubOAuthEnabled"
                :google-enabled="googleOAuthEnabled"
                :show-divider="false"
                @start="handleOAuthStart"
              />

              <LinuxDoOAuthSection
                v-if="linuxdoOAuthEnabled"
                :disabled="registrationActionDisabled"
                :aff-code="formData.aff_code"
                :show-divider="false"
                @start="handleOAuthStart"
              />
              <WechatOAuthSection
                v-if="wechatOAuthEnabled"
                :disabled="registrationActionDisabled"
                :aff-code="formData.aff_code"
                :show-divider="false"
                @start="handleOAuthStart"
              />
              <OidcOAuthSection
                v-if="oidcOAuthEnabled"
                :disabled="registrationActionDisabled"
                :provider-name="oidcOAuthProviderName"
                :aff-code="formData.aff_code"
                :show-divider="false"
                @start="handleOAuthStart"
              />
            </div>
          </form>

          <!-- Footer Links -->
          <div class="mt-6 text-center text-xs text-slate-500">
            {{ t('auth.alreadyHaveAccount') }}
            <router-link
              to="/login"
              class="font-semibold text-[#3b82f6] hover:text-[#2563eb] transition ml-1"
            >
              {{ t('auth.signIn') }}
            </router-link>
          </div>
          </div>
        </div>

      </div>
    </main>

    <!-- Footer Copyright -->
    <footer class="py-6 text-center text-xs text-slate-400">
      &copy; {{ currentYear }} {{ siteName }}. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AuthBrandPanel from '@/components/auth/AuthBrandPanel.vue'
import LinuxDoOAuthSection from '@/components/auth/LinuxDoOAuthSection.vue'
import OidcOAuthSection from '@/components/auth/OidcOAuthSection.vue'
import WechatOAuthSection from '@/components/auth/WechatOAuthSection.vue'
import EmailOAuthButtons from '@/components/auth/EmailOAuthButtons.vue'
import LoginAgreementPrompt from '@/components/auth/LoginAgreementPrompt.vue'
import Icon from '@/components/icons/Icon.vue'
import TurnstileWidget from '@/components/CaptchaChallenge.vue'
import { useAuthStore, useAppStore } from '@/stores'
import { useCaptchaChallenge } from '@/composables/useCaptchaChallenge'
import { useLoginAgreement } from '@/composables/useLoginAgreement'
import {
  buildOAuthLoginStartURL,
  getPublicSettings,
  isWeChatWebOAuthEnabled,
  startOAuthLogin,
  type OAuthLoginStart,
  validatePromoCode,
  validateInvitationCode
} from '@/api/auth'
import { buildAuthErrorMessage } from '@/utils/authError'
import { extractApiErrorCode, extractI18nErrorMessage } from '@/utils/apiError'
import {
  formatRegistrationEmailSuffixWhitelistForMessage,
  isRegistrationEmailSuffixAllowed,
  normalizeRegistrationEmailSuffixWhitelist
} from '@/utils/registrationEmailPolicy'
import {
  clearAffiliateReferralCode,
  loadAffiliateReferralCode,
  resolveAffiliateReferralCode
} from '@/utils/oauthAffiliate'
import { sanitizeUrl } from '@/utils/url'

const { t, locale } = useI18n()

// ==================== Router & Stores ====================

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const appStore = useAppStore()
const captchaChallenge = useCaptchaChallenge()
const loginAgreement = useLoginAgreement()

// Brand info
const siteName = computed(() => appStore.siteName || 'Sub2API')
const siteLogo = computed(() => sanitizeUrl(appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const currentYear = computed(() => new Date().getFullYear())

// ==================== State ====================

const isLoading = ref<boolean>(false)
const settingsLoaded = ref<boolean>(false)
const errorMessage = ref<string>('')
const showPassword = ref<boolean>(false)

// Public settings
const registrationEnabled = ref<boolean>(true)
const emailVerifyEnabled = ref<boolean>(false)
const promoCodeEnabled = ref<boolean>(true)
const invitationCodeEnabled = ref<boolean>(false)
const affiliateEnabled = ref<boolean>(false)
const linuxdoOAuthEnabled = ref<boolean>(false)
const wechatOAuthEnabled = ref<boolean>(false)
const oidcOAuthEnabled = ref<boolean>(false)
const oidcOAuthProviderName = ref<string>('OIDC')
const githubOAuthEnabled = ref<boolean>(false)
const googleOAuthEnabled = ref<boolean>(false)
const registrationEmailSuffixWhitelist = ref<string[]>([])
const emailDomainQuotaEnabled = ref<boolean>(false)

// Captcha template ref
const turnstileRef = captchaChallenge.turnstileRef

// Promo code validation
const promoValidating = ref<boolean>(false)
const promoValidation = reactive({
  valid: false,
  invalid: false,
  bonusAmount: null as number | null,
  message: ''
})
let promoValidateTimeout: ReturnType<typeof setTimeout> | null = null

// Invitation code validation
const invitationValidating = ref<boolean>(false)
const invitationValidation = reactive({
  valid: false,
  invalid: false,
  message: ''
})
let invitationValidateTimeout: ReturnType<typeof setTimeout> | null = null

const formData = reactive({
  email: '',
  password: '',
  promo_code: '',
  invitation_code: '',
  aff_code: ''
})

const errors = reactive({
  email: '',
  password: '',
  turnstile: '',
  invitation_code: ''
})

const validationToastMessage = computed(() =>
  errors.email ||
  errors.password ||
  (invitationValidation.invalid ? invitationValidation.message : '') ||
  errors.invitation_code ||
  (promoValidation.invalid ? promoValidation.message : '') ||
  errors.turnstile ||
  ''
)

const showOAuthLogin = computed(
  () =>
    linuxdoOAuthEnabled.value ||
    wechatOAuthEnabled.value ||
    oidcOAuthEnabled.value ||
    githubOAuthEnabled.value ||
    googleOAuthEnabled.value
)

const registrationActionDisabled = computed(
  () => isLoading.value || !settingsLoaded.value || loginAgreement.agreementGateActive.value
)

watch(validationToastMessage, (value, previousValue) => {
  if (value && value !== previousValue) {
    appStore.showError(value)
  }
})

function syncAffiliateReferralCode(): string {
  const code = resolveAffiliateReferralCode(route.query.aff, route.query.aff_code)
  if (code) {
    formData.aff_code = code
  }
  return code
}

// ==================== Lifecycle ====================

onMounted(async () => {
  syncAffiliateReferralCode()

  try {
    const settings = await getPublicSettings()
    captchaChallenge.applyCaptchaSettings(settings)
    registrationEnabled.value = settings.registration_enabled
    emailVerifyEnabled.value = settings.email_verify_enabled
    promoCodeEnabled.value = settings.promo_code_enabled
    invitationCodeEnabled.value = settings.invitation_code_enabled
    affiliateEnabled.value = settings.affiliate_enabled
    linuxdoOAuthEnabled.value = settings.linuxdo_oauth_enabled
    wechatOAuthEnabled.value = isWeChatWebOAuthEnabled(settings)
    oidcOAuthEnabled.value = settings.oidc_oauth_enabled
    oidcOAuthProviderName.value = settings.oidc_oauth_provider_name || 'OIDC'
    githubOAuthEnabled.value = settings.github_oauth_enabled
    googleOAuthEnabled.value = settings.google_oauth_enabled
    registrationEmailSuffixWhitelist.value = normalizeRegistrationEmailSuffixWhitelist(
      settings.registration_email_suffix_whitelist || []
    )
    emailDomainQuotaEnabled.value = settings.registration_email_domain_quota_enabled === true
    loginAgreement.applyLoginAgreementSettings(settings)

    // Read promo code from URL parameter only if promo code is enabled
    if (promoCodeEnabled.value) {
      const promoParam = route.query.promo as string
      if (promoParam) {
        formData.promo_code = promoParam
        await validatePromoCodeDebounced(promoParam)
      }
    }
    syncAffiliateReferralCode()
  } catch (error) {
    console.error('Failed to load public settings:', error)
  } finally {
    settingsLoaded.value = true
  }
})

watch(
  () => [route.query.aff, route.query.aff_code],
  () => {
    syncAffiliateReferralCode()
  }
)

onUnmounted(() => {
  if (promoValidateTimeout) {
    clearTimeout(promoValidateTimeout)
  }
  if (invitationValidateTimeout) {
    clearTimeout(invitationValidateTimeout)
  }
})

// ==================== Promo Code Validation ====================

function handlePromoCodeInput(): void {
  const code = formData.promo_code.trim()

  promoValidation.valid = false
  promoValidation.invalid = false
  promoValidation.bonusAmount = null
  promoValidation.message = ''

  if (!code) {
    promoValidating.value = false
    return
  }

  if (promoValidateTimeout) {
    clearTimeout(promoValidateTimeout)
  }

  promoValidateTimeout = setTimeout(() => {
    validatePromoCodeDebounced(code)
  }, 500)
}

async function validatePromoCodeDebounced(code: string): Promise<void> {
  if (!code.trim()) return

  promoValidating.value = true

  try {
    const result = await validatePromoCode(code)

    if (result.valid) {
      promoValidation.valid = true
      promoValidation.invalid = false
      promoValidation.bonusAmount = result.bonus_amount || 0
      promoValidation.message = ''
    } else {
      promoValidation.valid = false
      promoValidation.invalid = true
      promoValidation.bonusAmount = null
      promoValidation.message = getPromoErrorMessage(result.error_code)
    }
  } catch (error) {
    console.error('Failed to validate promo code:', error)
    promoValidation.valid = false
    promoValidation.invalid = true
    promoValidation.message = t('auth.promoCodeInvalid')
  } finally {
    promoValidating.value = false
  }
}

function getPromoErrorMessage(errorCode?: string): string {
  switch (errorCode) {
    case 'PROMO_CODE_NOT_FOUND':
      return t('auth.promoCodeNotFound')
    case 'PROMO_CODE_EXPIRED':
      return t('auth.promoCodeExpired')
    case 'PROMO_CODE_DISABLED':
      return t('auth.promoCodeDisabled')
    case 'PROMO_CODE_MAX_USED':
      return t('auth.promoCodeMaxUsed')
    case 'PROMO_CODE_ALREADY_USED':
      return t('auth.promoCodeAlreadyUsed')
    default:
      return t('auth.promoCodeInvalid')
  }
}

// ==================== Invitation Code Validation ====================

function handleInvitationCodeInput(): void {
  const code = formData.invitation_code.trim()

  invitationValidation.valid = false
  invitationValidation.invalid = false
  invitationValidation.message = ''
  errors.invitation_code = ''

  if (!code) {
    return
  }

  if (invitationValidateTimeout) {
    clearTimeout(invitationValidateTimeout)
  }

  invitationValidateTimeout = setTimeout(() => {
    validateInvitationCodeDebounced(code)
  }, 500)
}

async function validateInvitationCodeDebounced(code: string): Promise<void> {
  invitationValidating.value = true

  try {
    const result = await validateInvitationCode(code)

    if (result.valid) {
      invitationValidation.valid = true
      invitationValidation.invalid = false
      invitationValidation.message = ''
    } else {
      invitationValidation.valid = false
      invitationValidation.invalid = true
      invitationValidation.message = getInvitationErrorMessage(result.error_code)
    }
  } catch {
    invitationValidation.valid = false
    invitationValidation.invalid = true
    invitationValidation.message = t('auth.invitationCodeInvalid')
  } finally {
    invitationValidating.value = false
  }
}

function getInvitationErrorMessage(errorCode?: string): string {
  switch (errorCode) {
    case 'INVITATION_CODE_NOT_FOUND':
    case 'INVITATION_CODE_INVALID':
    case 'INVITATION_CODE_USED':
    case 'INVITATION_CODE_DISABLED':
    default:
      return t('auth.invitationCodeInvalid')
  }
}

async function handleOAuthStart(request: OAuthLoginStart): Promise<void> {
  if (registrationActionDisabled.value) return

  if (!captchaChallenge.actionCaptchaEnabled.value) {
    window.location.href = buildOAuthLoginStartURL(request)
    return
  }

  isLoading.value = true
  try {
    const ok = await captchaChallenge.acquireActionProof()
    if (!ok) return

    const proof = captchaChallenge.buildActionCaptchaRequestProof()
    if (!proof) return
    const result = await startOAuthLogin(request, proof)
    window.location.href = result.authorize_url
  } catch (error: unknown) {
    errorMessage.value = extractI18nErrorMessage(
      error,
      t,
      'auth.errors',
      t('auth.turnstileFailed')
    )
    appStore.showError(errorMessage.value)
  } finally {
    captchaChallenge.resetCaptchaProof()
    isLoading.value = false
  }
}

// ==================== Validation ====================

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function buildEmailSuffixNotAllowedMessage(): string {
  const normalizedWhitelist = normalizeRegistrationEmailSuffixWhitelist(
    registrationEmailSuffixWhitelist.value
  )
  if (normalizedWhitelist.length === 0) {
    return t('auth.emailSuffixNotAllowed')
  }
  const separator = String(locale.value || '').toLowerCase().startsWith('zh') ? '、' : ', '
  return t('auth.emailSuffixNotAllowedWithAllowed', {
    suffixes: formatRegistrationEmailSuffixWhitelistForMessage(normalizedWhitelist, {
      separator,
      more: (count) => t('auth.emailSuffixAllowedMore', { count })
    })
  })
}

function validateForm(): boolean {
  errors.email = ''
  errors.password = ''
  errors.turnstile = ''
  errors.invitation_code = ''

  let isValid = true

  if (!loginAgreement.checkAgreementGateOrPrompt('register')) {
    return false
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = t('auth.emailRequired')
    isValid = false
  } else if (!validateEmail(formData.email)) {
    errors.email = t('auth.invalidEmail')
    isValid = false
  } else if (
    !emailDomainQuotaEnabled.value &&
    !isRegistrationEmailSuffixAllowed(formData.email, registrationEmailSuffixWhitelist.value)
  ) {
    errors.email = buildEmailSuffixNotAllowedMessage()
    isValid = false
  }

  // Password validation
  if (!formData.password) {
    errors.password = t('auth.passwordRequired')
    isValid = false
  } else if (formData.password.length < 6) {
    errors.password = t('auth.passwordMinLength')
    isValid = false
  }

  // Invitation code validation (required when enabled)
  if (invitationCodeEnabled.value) {
    if (!formData.invitation_code.trim()) {
      errors.invitation_code = t('auth.invitationCodeRequired')
      isValid = false
    }
  }

  // Turnstile validation
  if (captchaChallenge.turnstileEnabled.value && !captchaChallenge.turnstileToken.value) {
    errors.turnstile = t('auth.completeVerification')
    isValid = false
  }

  return isValid
}

// ==================== Form Handlers ====================

async function handleRegister(): Promise<void> {
  errorMessage.value = ''

  if (!validateForm()) {
    return
  }

  // Check promo code validation status
  if (formData.promo_code.trim()) {
    if (promoValidating.value) {
      errorMessage.value = t('auth.promoCodeValidating')
      return
    }
    if (promoValidation.invalid) {
      errorMessage.value = t('auth.promoCodeInvalidCannotRegister')
      return
    }
  }

  // Check invitation code validation status (if enabled and code provided)
  if (invitationCodeEnabled.value) {
    if (invitationValidating.value) {
      errorMessage.value = t('auth.invitationCodeValidating')
      return
    }
    if (invitationValidation.invalid) {
      errorMessage.value = t('auth.invitationCodeInvalidCannotRegister')
      return
    }
    if (formData.invitation_code.trim() && !invitationValidation.valid) {
      errorMessage.value = t('auth.invitationCodeValidating')
      await validateInvitationCodeDebounced(formData.invitation_code.trim())
      if (!invitationValidation.valid) {
        errorMessage.value = t('auth.invitationCodeInvalidCannotRegister')
        return
      }
    }
  }

  if (!(await captchaChallenge.acquireActionProof())) {
    return
  }

  isLoading.value = true

  try {
    const affCode = formData.aff_code.trim() || loadAffiliateReferralCode()
    if (affCode) {
      formData.aff_code = affCode
    }

    const proof = captchaChallenge.buildCaptchaProofPayload()

    // If email verification is enabled, redirect to verification page
    if (emailVerifyEnabled.value) {
      sessionStorage.setItem(
        'register_data',
        JSON.stringify({
          email: formData.email,
          password: formData.password,
          ...proof,
          promo_code: formData.promo_code || undefined,
          invitation_code: formData.invitation_code || undefined,
          ...(affCode ? { aff_code: affCode } : {})
        })
      )

      await router.push('/email-verify')
      return
    }

    // Otherwise, directly register
    await authStore.register({
      email: formData.email,
      password: formData.password,
      ...proof,
      promo_code: formData.promo_code || undefined,
      invitation_code: formData.invitation_code || undefined,
      ...(affCode ? { aff_code: affCode } : {})
    })
    clearAffiliateReferralCode()

    appStore.showSuccess(t('auth.accountCreatedSuccess', { siteName: siteName.value }))
    await router.push('/dashboard')
  } catch (error: unknown) {
    errorMessage.value = buildRegistrationErrorMessage(error, t('auth.registrationFailed'))
    appStore.showError(errorMessage.value)
  } finally {
    if (captchaChallenge.captchaEnabled.value) {
      captchaChallenge.resetCaptchaProof()
    }
    isLoading.value = false
  }
}

function buildRegistrationErrorMessage(error: unknown, fallback: string): string {
  if (extractApiErrorCode(error) === 'EMAIL_DOMAIN_REGISTRATION_LIMIT') {
    return t('auth.emailDomainRegistrationLimit')
  }
  return buildAuthErrorMessage(error, { fallback })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
