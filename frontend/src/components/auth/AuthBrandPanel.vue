<template>
  <div class="relative w-full md:w-[46%] bg-gradient-to-br from-[#eff5ff] via-[#f1f6ff] to-[#e8f1fd] p-8 sm:p-10 lg:p-12 flex flex-col justify-between overflow-hidden">
    <!-- 3D Glass Layer Elements in Background -->
    <div class="pointer-events-none absolute right-[-40px] top-[10%] h-[320px] w-[260px] rotate-[22deg] rounded-3xl bg-gradient-to-br from-white/70 via-blue-200/25 to-blue-400/20 backdrop-blur-md border border-white/80 shadow-[0_15px_35px_rgba(59,130,246,0.12)]"></div>
    <div class="pointer-events-none absolute right-[30px] top-[26%] h-[280px] w-[220px] rotate-[22deg] rounded-3xl bg-gradient-to-br from-white/60 via-blue-100/30 to-blue-300/15 backdrop-blur-sm border border-white/70 shadow-[0_10px_25px_rgba(59,130,246,0.08)]"></div>

    <!-- Brand Info -->
    <div class="relative z-10">
      <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200/80 bg-white shadow-sm mb-6 overflow-hidden">
        <img v-if="siteLogo" :src="siteLogo" alt="Logo" class="h-7 w-7 object-contain" />
        <span v-else class="text-base font-bold text-[#3b82f6]">S2</span>
      </div>

      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">
        {{ siteName }}
      </h1>
      <p class="mt-2 text-sm text-slate-500 font-normal">
        {{ siteSubtitle }}
      </p>
    </div>

    <!-- Feature Bullets -->
    <div class="relative z-10 my-8 space-y-6">
      <!-- Item 1 -->
      <div class="flex items-center gap-4">
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e0ecff] text-[#3b82f6]">
          <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z"/>
          </svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-slate-900">{{ t('landing.features.performance.title', '高效稳定') }}</h3>
          <p class="text-xs text-slate-500 mt-0.5">{{ t('landing.features.performance.desc', '极速响应，高可用架构') }}</p>
        </div>
      </div>

      <!-- Item 2 -->
      <div class="flex items-center gap-4">
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e0ecff] text-[#3b82f6]">
          <svg class="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-slate-900">{{ t('landing.features.security.title', '安全可靠') }}</h3>
          <p class="text-xs text-slate-500 mt-0.5">{{ t('landing.features.security.desc', '多重防护，数据安全无忧') }}</p>
        </div>
      </div>

      <!-- Item 3 -->
      <div class="flex items-center gap-4">
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e0ecff] text-[#3b82f6]">
          <svg class="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="2"/>
            <rect x="14" y="3" width="7" height="7" rx="2"/>
            <rect x="14" y="14" width="7" height="7" rx="2"/>
            <rect x="3" y="14" width="7" height="7" rx="2"/>
          </svg>
        </div>
        <div>
          <h3 class="text-sm font-bold text-slate-900">{{ t('landing.features.flexible.title', '灵活易用') }}</h3>
          <p class="text-xs text-slate-500 mt-0.5">{{ t('landing.features.flexible.desc', '简洁的 API 管理与订阅体验') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores'
import { sanitizeUrl } from '@/utils/url'

const { t } = useI18n()
const appStore = useAppStore()

const siteName = computed(() => appStore.siteName || 'Sub2API')
const siteLogo = computed(() => sanitizeUrl(appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || '下一代 AI 网关与订阅管理平台')
</script>
