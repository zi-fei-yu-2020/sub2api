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

        <!-- Right Side: Login Form -->
        <div class="w-full md:w-[54%] bg-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
          <div class="my-auto">
            <div>
              <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {{ t('auth.welcomeBack') }}
              </h2>
              <p class="mt-2 text-sm text-slate-500">
                {{ t('auth.signInToAccount') }}
              </p>
            </div>

            <form @submit.prevent="handleLogin" class="mt-8 space-y-4">
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
                  :disabled="authActionDisabled"
                  :placeholder="t('auth.emailPlaceholder')"
                  class="w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4374f6] focus:ring-4 focus:ring-[#4374f6]/10"
                  :class="errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200'"
                />
              </div>
              <p v-if="errors.email" class="mt-1.5 text-xs text-red-500">{{ errors.email }}</p>
            </div>

            <!-- Password Field -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label for="password" class="text-xs font-semibold text-slate-700">
                  {{ t('auth.passwordLabel') }}
                </label>
                <router-link
                  v-if="passwordResetEnabled && !backendModeEnabled"
                  to="/forgot-password"
                  class="text-xs font-semibold text-[#3b82f6] hover:text-[#2563eb] transition"
                >
                  {{ t('auth.forgotPassword') }}
                </router-link>
              </div>
              <div class="relative">
                <input
                  id="password"
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  autocomplete="current-password"
                  :disabled="authActionDisabled"
                  :placeholder="t('auth.passwordPlaceholder')"
                  class="w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4374f6] focus:ring-4 focus:ring-[#4374f6]/10"
                  :class="errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200'"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  :disabled="authActionDisabled"
                  class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                >
                  <Icon v-if="showPassword" name="eyeOff" size="md" />
                  <Icon v-else name="eye" size="md" />
                </button>
              </div>
              <p v-if="errors.password" class="mt-1.5 text-xs text-red-500">{{ errors.password }}</p>
            </div>

            <!-- Turnstile Widget -->
            <div v-if="captchaChallenge.captchaEnabled.value" class="pt-1">
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

            <!-- Login Agreement Prompt -->
            <LoginAgreementPrompt
              v-if="loginAgreement.loginAgreementEnabled.value"
              :accepted="loginAgreement.agreementAccepted.value"
              :documents="loginAgreement.loginAgreementDocuments.value"
              :mode="loginAgreement.loginAgreementMode.value"
              :updated-at="loginAgreement.loginAgreementUpdatedAt.value"
              :visible="loginAgreement.showAgreementModal.value"
              @accept="loginAgreement.acceptLoginAgreement"
              @reject="() => loginAgreement.rejectLoginAgreement('login')"
              @open="loginAgreement.showAgreementModal.value = true"
            />

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="authActionDisabled || (captchaChallenge.turnstileEnabled.value && !captchaChallenge.turnstileToken.value)"
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
              <Icon v-else name="login" size="md" class="mr-2" />
              <span>{{ isLoading ? t('auth.signingIn') : t('auth.signIn') }}</span>
            </button>

            <!-- OAuth / Passkey Section -->
            <div v-if="showPasskeyLogin || showOAuthLogin" class="space-y-3 pt-3">
              <div class="relative my-4">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-slate-100"></div>
                </div>
                <div class="relative flex justify-center text-xs">
                  <span class="bg-white px-4 text-slate-400 font-normal">{{ t('auth.oauthOrContinue') }}</span>
                </div>
              </div>

              <!-- Passkey Login -->
              <button
                v-if="showPasskeyLogin"
                type="button"
                class="btn-secondary w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 px-4 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] cursor-pointer"
                :disabled="authActionDisabled"
                @click="handlePasskeyLogin"
              >
                <svg class="h-4 w-4 text-slate-600 fill-none stroke-current stroke-2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                </svg>
                <span>{{ passkeyLoading ? t('auth.passkeySigningIn') : t('auth.passkeySignIn') }}</span>
              </button>

              <!-- OAuth Buttons -->
              <div class="space-y-3">
                <EmailOAuthButtons
                  :disabled="authActionDisabled"
                  :github-enabled="githubOAuthEnabled"
                  :google-enabled="googleOAuthEnabled"
                  :show-divider="false"
                  @start="handleOAuthStart"
                />

                <LinuxDoOAuthSection
                  v-if="linuxdoOAuthEnabled"
                  :disabled="authActionDisabled"
                  :show-divider="false"
                  @start="handleOAuthStart"
                />
                <DingTalkOAuthSection
                  v-if="dingtalkOAuthEnabled"
                  :disabled="authActionDisabled"
                  :show-divider="false"
                  @start="handleOAuthStart"
                />
                <WechatOAuthSection
                  v-if="wechatOAuthEnabled"
                  :disabled="authActionDisabled"
                  :show-divider="false"
                  @start="handleOAuthStart"
                />
                <OidcOAuthSection
                  v-if="oidcOAuthEnabled"
                  :disabled="authActionDisabled"
                  :provider-name="oidcOAuthProviderName"
                  :show-divider="false"
                  @start="handleOAuthStart"
                />
              </div>
            </div>
          </form>

          <!-- Footer Text for Mobile / Below Card -->
          <div v-if="!backendModeEnabled" class="mt-6 text-center text-xs text-slate-500">
            {{ t('auth.dontHaveAccount') }}
            <router-link
              to="/register"
              class="font-semibold text-[#3b82f6] hover:text-[#2563eb] transition ml-1"
            >
              {{ t('auth.signUp') }}
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

    <!-- 2FA Modal -->
    <TotpLoginModal
      v-if="show2FAModal"
      ref="totpModalRef"
      :temp-token="totpTempToken"
      :user-email-masked="totpUserEmailMasked"
      @verify="handle2FAVerify"
      @cancel="handle2FACancel"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AuthBrandPanel from '@/components/auth/AuthBrandPanel.vue'
import LinuxDoOAuthSection from '@/components/auth/LinuxDoOAuthSection.vue'
import DingTalkOAuthSection from '@/components/auth/DingTalkOAuthSection.vue'
import OidcOAuthSection from '@/components/auth/OidcOAuthSection.vue'
import WechatOAuthSection from '@/components/auth/WechatOAuthSection.vue'
import EmailOAuthButtons from '@/components/auth/EmailOAuthButtons.vue'
import LoginAgreementPrompt from '@/components/auth/LoginAgreementPrompt.vue'
import TotpLoginModal from '@/components/auth/TotpLoginModal.vue'
import Icon from '@/components/icons/Icon.vue'
import TurnstileWidget from '@/components/CaptchaChallenge.vue'
import { useAuthStore, useAppStore } from '@/stores'
import { useCaptchaChallenge } from '@/composables/useCaptchaChallenge'
import { useLoginAgreement } from '@/composables/useLoginAgreement'
import {
  buildOAuthLoginStartURL,
  getPublicSettings,
  isTotp2FARequired,
  isWeChatWebOAuthEnabled,
  startOAuthLogin,
  type OAuthLoginStart
} from '@/api/auth'
import type { TotpLoginResponse } from '@/types'
import { extractI18nErrorMessage } from '@/utils/apiError'
import { clearAllAffiliateReferralCodes } from '@/utils/oauthAffiliate'
import { sanitizeUrl } from '@/utils/url'

const { t } = useI18n()

// ==================== Router & Stores ====================

const router = useRouter()
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
const passkeyLoading = ref<boolean>(false)
const errorMessage = ref<string>('')
const showPassword = ref<boolean>(false)
const publicSettingsLoaded = ref<boolean>(false)

// Public settings flags
const linuxdoOAuthEnabled = ref<boolean>(false)
const dingtalkOAuthEnabled = ref<boolean>(false)
const wechatOAuthEnabled = ref<boolean>(false)
const backendModeEnabled = ref<boolean>(false)
const oidcOAuthEnabled = ref<boolean>(false)
const oidcOAuthProviderName = ref<string>('OIDC')
const githubOAuthEnabled = ref<boolean>(false)
const googleOAuthEnabled = ref<boolean>(false)
const passwordResetEnabled = ref<boolean>(false)
const passkeyEnabled = ref<boolean>(false)

// 2FA state
const show2FAModal = ref<boolean>(false)
const totpTempToken = ref<string>('')
const totpUserEmailMasked = ref<string>('')
const totpModalRef = ref<InstanceType<typeof TotpLoginModal> | null>(null)

// Turnstile template ref
const turnstileRef = captchaChallenge.turnstileRef

const formData = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: '',
  turnstile: ''
})

const validationToastMessage = computed(
  () => errors.email || errors.password || errors.turnstile || ''
)

const authActionDisabled = computed(
  () => isLoading.value || passkeyLoading.value || !publicSettingsLoaded.value || loginAgreement.agreementGateActive.value
)

const showPasskeyLogin = computed(
  () => passkeyEnabled.value && typeof window.PublicKeyCredential !== 'undefined'
)

const showOAuthLogin = computed(
  () =>
    !backendModeEnabled.value &&
    (linuxdoOAuthEnabled.value ||
      dingtalkOAuthEnabled.value ||
      wechatOAuthEnabled.value ||
      oidcOAuthEnabled.value ||
      githubOAuthEnabled.value ||
      googleOAuthEnabled.value)
)

watch(validationToastMessage, (value, previousValue) => {
  if (value && value !== previousValue) {
    appStore.showError(value)
  }
})

// ==================== Lifecycle ====================

onMounted(async () => {
  const expiredFlag = sessionStorage.getItem('auth_expired')
  if (expiredFlag) {
    sessionStorage.removeItem('auth_expired')
    const message = t('auth.reloginRequired')
    errorMessage.value = message
    appStore.showWarning(message)
  }

  try {
    const settings = await getPublicSettings()
    captchaChallenge.applyCaptchaSettings(settings)
    linuxdoOAuthEnabled.value = settings.linuxdo_oauth_enabled
    dingtalkOAuthEnabled.value = settings.dingtalk_oauth_enabled ?? false
    wechatOAuthEnabled.value = isWeChatWebOAuthEnabled(settings)
    backendModeEnabled.value = settings.backend_mode_enabled
    oidcOAuthEnabled.value = settings.oidc_oauth_enabled
    oidcOAuthProviderName.value = settings.oidc_oauth_provider_name || 'OIDC'
    githubOAuthEnabled.value = settings.github_oauth_enabled
    googleOAuthEnabled.value = settings.google_oauth_enabled
    passwordResetEnabled.value = settings.password_reset_enabled
    passkeyEnabled.value = settings.passkey_enabled === true
    loginAgreement.applyLoginAgreementSettings(settings)
  } catch (error) {
    console.error('Failed to load public settings:', error)
  } finally {
    publicSettingsLoaded.value = true
  }
})

// ==================== Validation ====================

function validateForm(): boolean {
  errors.email = ''
  errors.password = ''
  errors.turnstile = ''

  let isValid = true

  if (!loginAgreement.checkAgreementGateOrPrompt('login')) {
    return false
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = t('auth.emailRequired')
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = t('auth.invalidEmail')
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

  // Turnstile validation
  if (captchaChallenge.turnstileEnabled.value && !captchaChallenge.turnstileToken.value) {
    errors.turnstile = t('auth.completeVerification')
    isValid = false
  }

  return isValid
}

// ==================== Form Handlers ====================

async function handleLogin(): Promise<void> {
  errorMessage.value = ''

  if (!validateForm()) {
    return
  }

  if (!(await captchaChallenge.acquireActionProof())) {
    return
  }

  isLoading.value = true

  try {
    const proof = captchaChallenge.buildCaptchaProofPayload()
    const response = await authStore.login({
      email: formData.email,
      password: formData.password,
      ...proof
    })

    if (isTotp2FARequired(response)) {
      const totpResponse = response as TotpLoginResponse
      totpTempToken.value = totpResponse.temp_token || ''
      totpUserEmailMasked.value = totpResponse.user_email_masked || ''
      show2FAModal.value = true
      isLoading.value = false
      return
    }

    clearAllAffiliateReferralCodes()
    appStore.showSuccess(t('auth.loginSuccess'))

    const redirectTo = (router.currentRoute.value.query.redirect as string) || '/dashboard'
    await router.push(redirectTo)
  } catch (error: unknown) {
    errorMessage.value = extractI18nErrorMessage(error, t, 'auth.errors', t('auth.loginFailed'))
    appStore.showError(errorMessage.value)
  } finally {
    if (captchaChallenge.captchaEnabled.value) {
      captchaChallenge.resetCaptchaProof()
    }
    isLoading.value = false
  }
}

async function handlePasskeyLogin(): Promise<void> {
  if (!loginAgreement.checkAgreementGateOrPrompt('login')) {
    return
  }

  passkeyLoading.value = true
  try {
    let proof = undefined
    if (captchaChallenge.actionCaptchaEnabled.value) {
      const ok = await captchaChallenge.acquireActionProof()
      if (!ok) return
      proof = captchaChallenge.buildActionCaptchaRequestProof()
    }

    await authStore.loginWithPasskey(proof)
    clearAllAffiliateReferralCodes()
    appStore.showSuccess(t('auth.loginSuccess'))
    const redirectTo = (router.currentRoute.value.query.redirect as string) || '/dashboard'
    await router.push(redirectTo)
  } catch (error: unknown) {
    const fallback = error instanceof DOMException && error.name === 'NotAllowedError'
      ? t('auth.passkeyCancelled')
      : t('auth.passkeyFailed')
    errorMessage.value = extractI18nErrorMessage(error, t, 'auth.errors', fallback)
    appStore.showError(errorMessage.value)
  } finally {
    if (captchaChallenge.actionCaptchaEnabled.value) {
      captchaChallenge.resetCaptchaProof()
    }
    passkeyLoading.value = false
  }
}

async function handleOAuthStart(request: OAuthLoginStart): Promise<void> {
  if (authActionDisabled.value) return

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

// ==================== 2FA Handlers ====================

async function handle2FAVerify(code: string): Promise<void> {
  if (totpModalRef.value) {
    totpModalRef.value.setVerifying(true)
  }

  try {
    await authStore.login2FA(totpTempToken.value, code)
    show2FAModal.value = false
    clearAllAffiliateReferralCodes()
    appStore.showSuccess(t('auth.loginSuccess'))

    const redirectTo = (router.currentRoute.value.query.redirect as string) || '/dashboard'
    await router.push(redirectTo)
  } catch (error: unknown) {
    const err = error as { message?: string; response?: { data?: { message?: string } } }
    const message = err.response?.data?.message || err.message || t('profile.totp.loginFailed')

    if (totpModalRef.value) {
      totpModalRef.value.setError(message)
      totpModalRef.value.setVerifying(false)
    }
  }
}

function handle2FACancel(): void {
  show2FAModal.value = false
  totpTempToken.value = ''
  totpUserEmailMasked.value = ''
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
