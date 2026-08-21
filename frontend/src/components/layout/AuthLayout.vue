<template>
  <div class="relative min-h-screen overflow-hidden bg-slate-950 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
    <!-- Atmospheric Background Effects -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary-600/15 blur-[120px]" />
      <div class="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]" />
      <div class="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-emerald-600/10 blur-[120px]" />
      <div
        class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      />
    </div>

    <!-- Content Container -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Top Brand Header -->
      <div class="mb-6 flex items-center justify-between">
        <router-link to="/login" class="flex items-center gap-3 group">
          <div class="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/5 p-2 ring-1 ring-white/10 backdrop-blur-md transition-all group-hover:scale-105 group-hover:ring-primary-500/30 shadow-inner-white">
            <img :src="siteLogo || '/logo.svg'" alt="Logo" class="h-full w-full object-contain" />
          </div>
          <span class="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-primary-400">
            {{ siteName }}
          </span>
        </router-link>

        <router-link
          to="/login"
          class="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <Icon name="arrowLeft" size="sm" class="h-3.5 w-3.5" />
          <span>{{ t('auth.backToLogin') }}</span>
        </router-link>
      </div>

      <!-- Card Container (Skeuomorphic Dark Panel) -->
      <div class="rounded-2xl border border-white/10 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/60 ring-1 ring-white/5">
        <slot />
      </div>

      <!-- Footer Slot -->
      <div v-if="$slots.footer" class="mt-6 text-center text-sm">
        <slot name="footer" />
      </div>

      <!-- Copyright -->
      <div class="mt-8 text-center text-xs text-slate-500">
        &copy; {{ currentYear }} {{ siteName }}. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores'
import { sanitizeUrl } from '@/utils/url'
import Icon from '@/components/icons/Icon.vue'

const { t } = useI18n()
const appStore = useAppStore()

const siteName = computed(() => appStore.siteName || 'Sub2API')
const siteLogo = computed(() => sanitizeUrl(appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const currentYear = computed(() => new Date().getFullYear())

onMounted(() => {
  if (!appStore.publicSettingsLoaded) {
    appStore.fetchPublicSettings()
  }
})
</script>
