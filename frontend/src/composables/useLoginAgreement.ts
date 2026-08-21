import { ref, computed, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores'
import type { LoginAgreementDocument, PublicSettings } from '@/types'

const LOGIN_AGREEMENT_STORAGE_KEY = 'sub2api_login_agreement_consent'

export interface LoginAgreementState {
  loginAgreementEnabled: Ref<boolean>
  loginAgreementMode: Ref<'modal' | 'checkbox' | string>
  loginAgreementUpdatedAt: Ref<string>
  loginAgreementRevision: Ref<string>
  loginAgreementDocuments: Ref<LoginAgreementDocument[]>
  agreementAccepted: Ref<boolean>
  showAgreementModal: Ref<boolean>
  agreementGateActive: Ref<boolean>
  applyLoginAgreementSettings: (settings: Partial<PublicSettings>) => void
  acceptLoginAgreement: () => void
  rejectLoginAgreement: (context?: 'login' | 'register') => void
  checkAgreementGateOrPrompt: (context?: 'login' | 'register') => boolean
}

export function useLoginAgreement(): LoginAgreementState {
  const { t } = useI18n()
  const appStore = useAppStore()

  const loginAgreementEnabled = ref<boolean>(false)
  const loginAgreementMode = ref<'modal' | 'checkbox' | string>('modal')
  const loginAgreementUpdatedAt = ref<string>('')
  const loginAgreementRevision = ref<string>('')
  const loginAgreementDocuments = ref<LoginAgreementDocument[]>([])
  const agreementAccepted = ref<boolean>(false)
  const showAgreementModal = ref<boolean>(false)

  const agreementGateActive = computed(
    () => loginAgreementEnabled.value && !agreementAccepted.value
  )

  function applyLoginAgreementSettings(settings: Partial<PublicSettings>): void {
    const documents = Array.isArray(settings.login_agreement_documents)
      ? settings.login_agreement_documents.filter((doc) => doc.title?.trim())
      : []
    loginAgreementDocuments.value = documents
    loginAgreementEnabled.value = settings.login_agreement_enabled === true && documents.length > 0
    loginAgreementMode.value = settings.login_agreement_mode === 'checkbox' ? 'checkbox' : 'modal'
    loginAgreementUpdatedAt.value = settings.login_agreement_updated_at || ''
    loginAgreementRevision.value =
      settings.login_agreement_revision ||
      `${loginAgreementUpdatedAt.value}:${documents.map((doc) => `${doc.id}:${doc.title}`).join('|')}`

    agreementAccepted.value =
      !loginAgreementEnabled.value || hasAcceptedLoginAgreement(loginAgreementRevision.value)
    showAgreementModal.value =
      loginAgreementEnabled.value && !agreementAccepted.value && loginAgreementMode.value !== 'checkbox'
  }

  function hasAcceptedLoginAgreement(revision: string): boolean {
    if (!revision) {
      return false
    }
    try {
      const raw = localStorage.getItem(LOGIN_AGREEMENT_STORAGE_KEY)
      if (!raw) {
        return false
      }
      const parsed = JSON.parse(raw) as { revision?: string }
      return parsed.revision === revision
    } catch {
      return false
    }
  }

  function acceptLoginAgreement(): void {
    if (loginAgreementRevision.value) {
      localStorage.setItem(
        LOGIN_AGREEMENT_STORAGE_KEY,
        JSON.stringify({
          revision: loginAgreementRevision.value,
          accepted_at: new Date().toISOString()
        })
      )
    }
    agreementAccepted.value = true
    showAgreementModal.value = false
  }

  function rejectLoginAgreement(context: 'login' | 'register' = 'login'): void {
    localStorage.removeItem(LOGIN_AGREEMENT_STORAGE_KEY)
    agreementAccepted.value = false
    showAgreementModal.value = false
    const warningText =
      context === 'register'
        ? t('legal.loginAgreementPrompt.registerRejectedWarning')
        : t('legal.loginAgreementPrompt.loginRejectedWarning')
    appStore.showWarning(warningText)
  }

  function checkAgreementGateOrPrompt(context: 'login' | 'register' = 'login'): boolean {
    if (!agreementGateActive.value) return true
    const warningText =
      context === 'register'
        ? t('legal.loginAgreementPrompt.registerRequiredWarning')
        : t('legal.loginAgreementPrompt.loginRequiredWarning')
    appStore.showWarning(warningText)
    if (loginAgreementMode.value !== 'checkbox') {
      showAgreementModal.value = true
    }
    return false
  }

  return {
    loginAgreementEnabled,
    loginAgreementMode,
    loginAgreementUpdatedAt,
    loginAgreementRevision,
    loginAgreementDocuments,
    agreementAccepted,
    showAgreementModal,
    agreementGateActive,
    applyLoginAgreementSettings,
    acceptLoginAgreement,
    rejectLoginAgreement,
    checkAgreementGateOrPrompt
  }
}
