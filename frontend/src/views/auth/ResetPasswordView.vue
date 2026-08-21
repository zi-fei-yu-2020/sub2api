<template>
  <AuthLayout>
    <div class="space-y-6">
      <!-- Title -->
      <div>
        <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {{ t('auth.resetPasswordTitle') }}
        </h2>
        <p class="mt-2 text-sm text-slate-500">
          {{ t('auth.resetPasswordHint') }}
        </p>
      </div>

      <!-- Invalid Link State -->
      <div v-if="isInvalidLink" class="space-y-6">
        <div class="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <div class="flex flex-col items-center gap-3 text-center">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <Icon name="exclamationCircle" size="lg" />
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-900">
                {{ t('auth.invalidResetLink') }}
              </h3>
              <p class="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {{ t('auth.invalidResetLinkHint') }}
              </p>
            </div>
          </div>
        </div>

        <div class="text-center">
          <router-link
            to="/forgot-password"
            class="inline-flex items-center gap-2 text-xs font-semibold text-[#3b82f6] hover:text-[#2563eb] transition"
          >
            {{ t('auth.requestNewResetLink') }}
          </router-link>
        </div>
      </div>

      <!-- Success State -->
      <div v-else-if="isSuccess" class="space-y-6">
        <div class="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <div class="flex flex-col items-center gap-3 text-center">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Icon name="checkCircle" size="lg" />
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-900">
                {{ t('auth.passwordResetSuccess') }}
              </h3>
              <p class="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {{ t('auth.passwordResetSuccessHint') }}
              </p>
            </div>
          </div>
        </div>

        <div class="text-center">
          <router-link
            to="/login"
            class="w-full flex items-center justify-center rounded-xl bg-gradient-to-r from-[#4374f6] to-[#3b82f6] py-3.5 px-4 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition duration-150 hover:shadow-lg hover:shadow-blue-500/30 hover:brightness-105 active:scale-[0.99] cursor-pointer"
          >
            <Icon name="login" size="md" class="mr-2" />
            <span>{{ t('auth.signIn') }}</span>
          </router-link>
        </div>
      </div>

      <!-- Form State -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Email (readonly) -->
        <div>
          <label for="email" class="block text-xs font-semibold text-slate-700 mb-1.5">
            {{ t('auth.emailLabel') }}
          </label>
          <input
            id="email"
            :value="email"
            type="email"
            readonly
            disabled
            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
          />
        </div>

        <!-- New Password Input -->
        <div>
          <label for="password" class="block text-xs font-semibold text-slate-700 mb-1.5">
            {{ t('auth.newPassword') }}
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              required
              autocomplete="new-password"
              :disabled="isLoading"
              class="w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4374f6] focus:ring-4 focus:ring-[#4374f6]/10"
              :class="errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200'"
              :placeholder="t('auth.newPasswordPlaceholder')"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
            >
              <Icon v-if="showPassword" name="eyeOff" size="md" />
              <Icon v-else name="eye" size="md" />
            </button>
          </div>
          <p v-if="errors.password" class="mt-1.5 text-xs text-red-500">{{ errors.password }}</p>
        </div>

        <!-- Confirm Password Input -->
        <div>
          <label for="confirmPassword" class="block text-xs font-semibold text-slate-700 mb-1.5">
            {{ t('auth.confirmPassword') }}
          </label>
          <div class="relative">
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              required
              autocomplete="new-password"
              :disabled="isLoading"
              class="w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4374f6] focus:ring-4 focus:ring-[#4374f6]/10"
              :class="errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-200'"
              :placeholder="t('auth.confirmPasswordPlaceholder')"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
            >
              <Icon v-if="showConfirmPassword" name="eyeOff" size="md" />
              <Icon v-else name="eye" size="md" />
            </button>
          </div>
          <p v-if="errors.confirmPassword" class="mt-1.5 text-xs text-red-500">{{ errors.confirmPassword }}</p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
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
          <span v-else>{{ isLoading ? t('auth.resettingPassword') : t('auth.resetPassword') }}</span>
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
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { AuthLayout } from '@/components/layout'
import Icon from '@/components/icons/Icon.vue'
import { useAppStore } from '@/stores'
import { resetPassword } from '@/api/auth'

const { t } = useI18n()
const route = useRoute()
const appStore = useAppStore()

const isLoading = ref<boolean>(false)
const isSuccess = ref<boolean>(false)
const errorMessage = ref<string>('')
const showPassword = ref<boolean>(false)
const showConfirmPassword = ref<boolean>(false)

const email = ref<string>('')
const token = ref<string>('')

const formData = reactive({
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  password: '',
  confirmPassword: ''
})

const validationToastMessage = computed(
  () => errors.password || errors.confirmPassword || ''
)

watch(validationToastMessage, (value, previousValue) => {
  if (value && value !== previousValue) {
    appStore.showError(value)
  }
})

const isInvalidLink = computed(() => !email.value || !token.value)

onMounted(() => {
  email.value = (route.query.email as string) || ''
  token.value = (route.query.token as string) || ''

  if (!email.value || !token.value) {
    appStore.showError(t('auth.invalidResetLink'))
  }
})

function validateForm(): boolean {
  errors.password = ''
  errors.confirmPassword = ''

  let isValid = true

  if (!formData.password) {
    errors.password = t('auth.passwordRequired')
    isValid = false
  } else if (formData.password.length < 6) {
    errors.password = t('auth.passwordMinLength')
    isValid = false
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = t('auth.confirmPasswordRequired')
    isValid = false
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = t('auth.passwordsDoNotMatch')
    isValid = false
  }

  return isValid
}

async function handleSubmit(): Promise<void> {
  errorMessage.value = ''

  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    await resetPassword({
      email: email.value,
      token: token.value,
      new_password: formData.password
    })

    isSuccess.value = true
    appStore.showSuccess(t('auth.passwordResetSuccess'))
  } catch (error: unknown) {
    const err = error as { message?: string; response?: { data?: { detail?: string } } }

    if (err.response?.data?.detail) {
      errorMessage.value = err.response.data.detail
    } else if (err.message) {
      errorMessage.value = err.message
    } else {
      errorMessage.value = t('auth.resetPasswordFailed')
    }

    appStore.showError(errorMessage.value)
  } finally {
    isLoading.value = false
  }
}
</script>
