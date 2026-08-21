<template>
  <AuthLayout>
    <div class="space-y-6">
      <!-- Title -->
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-white">
          {{ t('auth.forgotPasswordTitle') }}
        </h2>
        <p class="mt-2 text-sm text-slate-400">
          {{ t('auth.forgotPasswordHint') }}
        </p>
      </div>

      <!-- Success State -->
      <div v-if="isSubmitted" class="space-y-6">
        <div class="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5 backdrop-blur-sm">
          <div class="flex flex-col items-center gap-3 text-center">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <Icon name="checkCircle" size="lg" />
            </div>
            <div>
              <h3 class="text-base font-semibold text-emerald-300">
                {{ t('auth.resetEmailSent') }}
              </h3>
              <p class="mt-1.5 text-xs sm:text-sm text-emerald-400/80 leading-relaxed">
                {{ t('auth.resetEmailSentHint') }}
              </p>
            </div>
          </div>
        </div>

        <div class="text-center">
          <router-link
            to="/login"
            class="inline-flex items-center gap-2 text-sm font-medium text-primary-400 transition-colors hover:text-primary-300"
          >
            <Icon name="arrowLeft" size="sm" />
            {{ t('auth.backToLogin') }}
          </router-link>
        </div>
      </div>

      <!-- Form State -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Email Input -->
        <div class="space-y-1.5">
          <label for="email" class="text-xs font-semibold uppercase tracking-wider text-slate-300">
            {{ t('auth.emailLabel') }}
          </label>
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Icon name="mail" size="md" class="text-slate-400" />
            </div>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              autofocus
              autocomplete="email"
              :disabled="isLoading"
              class="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 pl-11 pr-4 text-sm text-white placeholder-slate-500 backdrop-blur-sm transition-all focus:border-primary-500/50 focus:bg-slate-950/90 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-50"
              :class="{ 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20': errors.email }"
              :placeholder="t('auth.emailPlaceholder')"
            />
          </div>
          <p v-if="errors.email" class="text-xs text-rose-400">{{ errors.email }}</p>
        </div>

        <!-- Captcha Widget -->
        <div v-if="captchaEnabled" class="pt-1">
          <TurnstileWidget
            ref="turnstileRef"
            :turnstile-enabled="turnstileEnabled"
            :turnstile-site-key="turnstileSiteKey"
            :tencent-enabled="tencentCaptchaEnabled"
            :tencent-app-id="tencentCaptchaAppId"
            :tencent-region="tencentCaptchaRegion"
            :aliyun-enabled="aliyunCaptchaEnabled"
            :aliyun-scene-id="aliyunCaptchaSceneId"
            :aliyun-prefix="aliyunCaptchaPrefix"
            :aliyun-region="aliyunCaptchaRegion"
            @verify="onTurnstileVerify"
            @expire="onTurnstileExpire"
            @error="onTurnstileError"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading || (turnstileEnabled && !turnstileToken)"
          class="relative mt-2 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 px-4 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:scale-[1.01] hover:shadow-primary-500/40 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          <svg
            v-if="isLoading"
            class="h-4 w-4 animate-spin text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <Icon v-else name="mail" size="md" />
          <span>{{ isLoading ? t('auth.sendingResetLink') : t('auth.sendResetLink') }}</span>
        </button>
      </form>
    </div>

    <!-- Footer -->
    <template #footer>
      <p class="text-slate-400">
        {{ t('auth.rememberedPassword') }}
        <router-link
          to="/login"
          class="font-medium text-primary-400 transition-colors hover:text-primary-300 hover:underline"
        >
          {{ t('auth.signIn') }}
        </router-link>
      </p>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { AuthLayout } from '@/components/layout'
import Icon from '@/components/icons/Icon.vue'
import TurnstileWidget from '@/components/CaptchaChallenge.vue'
import { useAppStore } from '@/stores'
import { getPublicSettings, forgotPassword } from '@/api/auth'
import { useCaptchaChallenge } from '@/composables/useCaptchaChallenge'

const { t } = useI18n()
const appStore = useAppStore()

const isLoading = ref<boolean>(false)
const isSubmitted = ref<boolean>(false)
const errorMessage = ref<string>('')

const {
  turnstileEnabled,
  turnstileSiteKey,
  tencentCaptchaEnabled,
  tencentCaptchaAppId,
  tencentCaptchaRegion,
  aliyunCaptchaEnabled,
  aliyunCaptchaSceneId,
  aliyunCaptchaPrefix,
  aliyunCaptchaRegion,
  turnstileToken,
  captchaError,
  turnstileRef,
  captchaEnabled,
  onTurnstileVerify,
  onTurnstileExpire,
  onTurnstileError,
  resetCaptchaProof,
  acquireActionProof,
  applyCaptchaSettings,
  buildCaptchaProofPayload
} = useCaptchaChallenge()

const formData = reactive({
  email: ''
})

const errors = reactive({
  email: '',
  turnstile: ''
})

watch(captchaError, (val) => {
  errors.turnstile = val
})

const validationToastMessage = computed(() => errors.email || errors.turnstile || '')

watch(validationToastMessage, (value, previousValue) => {
  if (value && value !== previousValue) {
    appStore.showError(value)
  }
})

onMounted(async () => {
  try {
    const settings = await getPublicSettings()
    applyCaptchaSettings(settings)
  } catch (error) {
    console.error('Failed to load public settings:', error)
  }
})

function validateForm(): boolean {
  errors.email = ''
  errors.turnstile = ''

  let isValid = true

  // Email validation
  if (!formData.email.trim()) {
    errors.email = t('auth.emailRequired')
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = t('auth.invalidEmail')
    isValid = false
  }

  // Turnstile validation
  if (turnstileEnabled.value && !turnstileToken.value) {
    errors.turnstile = t('auth.completeVerification')
    isValid = false
  }

  return isValid
}

async function handleSubmit(): Promise<void> {
  errorMessage.value = ''

  if (!validateForm()) {
    return
  }

  if (!(await acquireActionProof())) {
    return
  }

  isLoading.value = true

  try {
    const captchaPayload = buildCaptchaProofPayload()
    await forgotPassword({
      email: formData.email,
      ...captchaPayload
    })

    isSubmitted.value = true
    appStore.showSuccess(t('auth.resetEmailSent'))
  } catch (error: unknown) {
    const err = error as { message?: string; response?: { data?: { detail?: string } } }

    if (err.response?.data?.detail) {
      errorMessage.value = err.response.data.detail
    } else if (err.message) {
      errorMessage.value = err.message
    } else {
      errorMessage.value = t('auth.sendResetLinkFailed')
    }

    appStore.showError(errorMessage.value)
  } finally {
    if (captchaEnabled.value) {
      resetCaptchaProof()
    }
    isLoading.value = false
  }
}
</script>
