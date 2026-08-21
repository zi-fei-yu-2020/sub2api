import { ref, computed, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type TurnstileWidget from '@/components/CaptchaChallenge.vue'
import type { ActionCaptchaRequestProof, PublicSettings } from '@/types'

export interface CaptchaChallengeState {
  turnstileEnabled: Ref<boolean>
  turnstileSiteKey: Ref<string>
  tencentCaptchaEnabled: Ref<boolean>
  tencentCaptchaAppId: Ref<string>
  tencentCaptchaRegion: Ref<string>
  aliyunCaptchaEnabled: Ref<boolean>
  aliyunCaptchaSceneId: Ref<string>
  aliyunCaptchaPrefix: Ref<string>
  aliyunCaptchaRegion: Ref<string>
  turnstileToken: Ref<string>
  tencentCaptchaRandstr: Ref<string>
  captchaError: Ref<string>
  turnstileRef: Ref<InstanceType<typeof TurnstileWidget> | null>
  actionCaptchaEnabled: Ref<boolean>
  captchaEnabled: Ref<boolean>
  onTurnstileVerify: (token: string, randstr?: string) => void
  onTurnstileExpire: () => void
  onTurnstileError: () => void
  resetCaptchaProof: () => void
  acquireActionProof: () => Promise<boolean>
  applyCaptchaSettings: (settings: Partial<PublicSettings>) => void
  buildCaptchaProofPayload: () => {
    turnstile_token?: string
    tencent_captcha_ticket?: string
    tencent_captcha_randstr?: string
  }
  buildActionCaptchaRequestProof: () => ActionCaptchaRequestProof | undefined
}

export function useCaptchaChallenge(): CaptchaChallengeState {
  const { t } = useI18n()

  const turnstileEnabled = ref<boolean>(false)
  const turnstileSiteKey = ref<string>('')
  const tencentCaptchaEnabled = ref<boolean>(false)
  const tencentCaptchaAppId = ref<string>('')
  const tencentCaptchaRegion = ref<string>('cn')
  const aliyunCaptchaEnabled = ref<boolean>(false)
  const aliyunCaptchaSceneId = ref<string>('')
  const aliyunCaptchaPrefix = ref<string>('')
  const aliyunCaptchaRegion = ref<string>('cn')

  const turnstileToken = ref<string>('')
  const tencentCaptchaRandstr = ref<string>('')
  const captchaError = ref<string>('')
  const turnstileRef = ref<InstanceType<typeof TurnstileWidget> | null>(null)

  const aliyunCaptchaReady = computed(
    () =>
      aliyunCaptchaEnabled.value &&
      Boolean(aliyunCaptchaSceneId.value) &&
      Boolean(aliyunCaptchaPrefix.value)
  )

  const actionCaptchaEnabled = computed(
    () =>
      (tencentCaptchaEnabled.value && Boolean(tencentCaptchaAppId.value)) ||
      aliyunCaptchaReady.value
  )

  const captchaEnabled = computed(
    () =>
      (turnstileEnabled.value && Boolean(turnstileSiteKey.value)) ||
      actionCaptchaEnabled.value
  )

  function applyCaptchaSettings(settings: Partial<PublicSettings>): void {
    turnstileEnabled.value = settings.turnstile_enabled === true
    turnstileSiteKey.value = settings.turnstile_site_key || ''
    tencentCaptchaEnabled.value = settings.tencent_captcha_enabled === true
    tencentCaptchaAppId.value = settings.tencent_captcha_app_id || ''
    tencentCaptchaRegion.value = settings.tencent_captcha_region || 'cn'
    aliyunCaptchaEnabled.value = settings.aliyun_captcha_enabled === true
    aliyunCaptchaSceneId.value = settings.aliyun_captcha_scene_id || ''
    aliyunCaptchaPrefix.value = settings.aliyun_captcha_prefix || ''
    aliyunCaptchaRegion.value = settings.aliyun_captcha_region || 'cn'
  }

  function onTurnstileVerify(token: string, randstr = ''): void {
    turnstileToken.value = token
    tencentCaptchaRandstr.value = randstr
    captchaError.value = ''
  }

  function onTurnstileExpire(): void {
    turnstileToken.value = ''
    tencentCaptchaRandstr.value = ''
    captchaError.value = t('auth.turnstileExpired')
  }

  function onTurnstileError(): void {
    turnstileToken.value = ''
    tencentCaptchaRandstr.value = ''
    captchaError.value = t('auth.turnstileFailed')
  }

  function resetCaptchaProof(): void {
    turnstileRef.value?.reset()
    turnstileToken.value = ''
    tencentCaptchaRandstr.value = ''
    captchaError.value = ''
  }

  async function acquireActionProof(): Promise<boolean> {
    if (!actionCaptchaEnabled.value) return true

    const proof = await turnstileRef.value?.verifyAction()
    if (!proof) return false

    turnstileToken.value = proof.token
    tencentCaptchaRandstr.value = proof.randstr
    return true
  }

  function buildCaptchaProofPayload() {
    return {
      turnstile_token:
        turnstileEnabled.value || aliyunCaptchaEnabled.value ? turnstileToken.value : undefined,
      tencent_captcha_ticket: tencentCaptchaEnabled.value ? turnstileToken.value : undefined,
      tencent_captcha_randstr: tencentCaptchaEnabled.value
        ? tencentCaptchaRandstr.value
        : undefined
    }
  }

  function buildActionCaptchaRequestProof(): ActionCaptchaRequestProof | undefined {
    if (!actionCaptchaEnabled.value) return undefined
    if (tencentCaptchaEnabled.value) {
      return {
        tencent_captcha_ticket: turnstileToken.value,
        tencent_captcha_randstr: tencentCaptchaRandstr.value
      }
    }
    return { turnstile_token: turnstileToken.value }
  }

  return {
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
    tencentCaptchaRandstr,
    captchaError,
    turnstileRef,
    actionCaptchaEnabled,
    captchaEnabled,
    onTurnstileVerify,
    onTurnstileExpire,
    onTurnstileError,
    resetCaptchaProof,
    acquireActionProof,
    applyCaptchaSettings,
    buildCaptchaProofPayload,
    buildActionCaptchaRequestProof
  }
}
