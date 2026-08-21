<template>
  <div class="min-h-screen bg-[#f4f6fa] text-slate-800 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
    <!-- Top Navigation Bar -->
    <header class="flex h-16 w-full items-center justify-between px-6 sm:px-10 bg-transparent">
      <router-link to="/login" class="flex items-center gap-3">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3b82f6] shadow-sm overflow-hidden">
          <img v-if="siteLogo" :src="siteLogo" alt="Logo" class="h-6 w-6 object-contain" />
          <span v-else class="font-black text-white text-sm tracking-tight">S2</span>
        </div>
        <span class="text-xl font-bold tracking-tight text-slate-900">{{ siteName }}</span>
      </router-link>
    </header>

    <!-- Main Content Container: Centered Card -->
    <main class="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 py-4 sm:py-6">
      <div class="w-full max-w-[480px] overflow-hidden rounded-[24px] bg-white p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 my-auto">
        <slot />
      </div>
    </main>

    <!-- Footer Copyright -->
    <footer class="py-6 text-center text-xs text-slate-400">
      &copy; {{ currentYear }} {{ siteName }}. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAppStore } from '@/stores'
import { sanitizeUrl } from '@/utils/url'

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
