<template>
  <header
    class="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#090d16]/80"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
      <!-- 左:站点 logo + 名称 -->
      <router-link to="/" class="flex min-w-0 items-center gap-3">
        <template v-if="settings">
          <span
            class="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-600 text-white shadow-sm"
          >
            <img v-if="siteLogo" :src="siteLogo" alt="Logo" class="h-full w-full object-contain" />
            <span v-else class="text-sm font-black tracking-tight text-white">S2</span>
          </span>
          <span class="truncate text-base font-bold tracking-tight text-slate-900 dark:text-white">
            {{ siteName }}
          </span>
        </template>
        <template v-else>
          <span class="h-9 w-9 flex-shrink-0 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" aria-hidden="true"></span>
          <span class="h-5 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" aria-hidden="true"></span>
        </template>
      </router-link>

      <!-- 右:语言切换 + 控制台/登录入口 -->
      <div class="flex items-center gap-3">
        <LocaleSwitcher />

        <RouterLink
          v-if="isAuthenticated"
          :to="backTarget"
          class="inline-flex flex-shrink-0 items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          {{ t('modelPlaza.nav.backToDashboard') }}
        </RouterLink>
        <RouterLink
          v-else
          :to="{ path: '/login', query: { redirect: '/models' } }"
          class="inline-flex flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-500 active:scale-[0.98]"
        >
          {{ t('modelPlaza.nav.login') }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import { sanitizeUrl } from '@/utils/url'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const appStore = useAppStore()
const authStore = useAuthStore()

const settings = computed(() => appStore.cachedPublicSettings)
const siteName = computed(() => settings.value?.site_name || 'Sub2API')
const siteLogo = computed(() =>
  sanitizeUrl(settings.value?.site_logo || '', { allowRelative: true, allowDataUrl: true })
)
const isAuthenticated = computed(() => authStore.isAuthenticated)
const backTarget = computed(() => (authStore.isAdmin ? '/admin/dashboard' : '/dashboard'))
</script>
