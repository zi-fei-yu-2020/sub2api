<template>
  <AuthLayout>
    <div class="space-y-6">
      <!-- Title -->
      <div>
        <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {{ t('auth.forgotPasswordTitle') }}
        </h2>
        <p class="mt-2 text-sm text-slate-500">
          {{ t('auth.forgotPasswordHint') }}
        </p>
      </div>

      <!-- Success State -->
      <div v-if="isSubmitted" class="space-y-6">
        <div class="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <div class="flex flex-col items-center gap-3 text-center">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Icon name="checkCircle" size="lg" />
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-900">
                {{ t('auth.resetEmailSent') }}
              </h3>
              <p class="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {{ t('auth.resetEmailSentHint') }}
              </p>
            </div>
          </div>
        </div>

        <div class="text-center">
          <router-link
            to="/login"
            class="inline-flex items-center gap-2 text-xs font-semibold text-[#3b82f6] hover:text-[#2563eb] transition"
          >
            <Icon name="arrowLeft" size="sm" />
            {{ t('auth.backToLogin') }}
          </router-link>
        </div>
      </div>

      <!-- Form State -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Email Input -->
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
              :disabled="isLoading"
              class="w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4374f6] focus:ring-4 focus:ring-[#4374f6]/10"
              :class="errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200'"
              :placeholder="t('auth.emailPlaceholder')"
            />
          </div>
          <p v-if="errors.email" class="mt-1.5 text-xs text-red-500">{{ errors.email }}</p>
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
          class="w-full mt-2 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#4374f6] to-[#3b82f6] py-3.5 px-4 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition duration-150 hover:shadow-lg hover:shadow-blue-500/30 hover:brightness-105 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
          <span v-else>{{ isLoading ? t('auth.sendingResetLink') : t('auth.sendResetLink') }}</span>
        </button>

        <!-- Back to Login Link -->
        <div class="pt-2 text-center text-xs text-slate-500">
          <router-link
            to="/login"
            class="font-semibold text-[#3b82f6] hover:text-[#2563eb] transition inline-flex items-center gap-1"
          >
            <Icon name="arrowLeft" size="xs" />
            <span>{{ t('auth.backToLogin') }}</span>
          </router-link>
        </div>
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
