<template>
  <div class="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-100 selection:bg-primary-500/20 selection:text-primary-600">
    <!-- Subtle Gradient Background (Linear/Vercel SaaS vibe) -->
    <div class="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(20,184,166,0.08),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(20,184,166,0.12),rgba(9,9,11,0))]"></div>

    <!-- Desktop Sidebar -->
    <AppSidebar />

    <!-- Main App Container -->
    <div
      class="relative z-10 flex min-h-screen flex-col transition-all duration-300"
      :class="[sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64']"
    >
      <!-- Modern Topbar / Header -->
      <AppHeader />

      <!-- Page Content -->
      <main class="flex-1 px-4 py-6 sm:px-6 md:px-8 max-w-7xl w-full mx-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/styles/onboarding.css'
import { computed, onMounted } from 'vue'
import { useAppStore } from '@/stores'
import { useAuthStore } from '@/stores/auth'
import { useOnboardingTour } from '@/composables/useOnboardingTour'
import { useOnboardingStore } from '@/stores/onboarding'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'

const appStore = useAppStore()
const authStore = useAuthStore()
const sidebarCollapsed = computed(() => appStore.sidebarCollapsed)
const isAdmin = computed(() => authStore.user?.role === 'admin')

const { replayTour } = useOnboardingTour({
  storageKey: isAdmin.value ? 'admin_guide' : 'user_guide',
  autoStart: true
})

const onboardingStore = useOnboardingStore()

onMounted(() => {
  onboardingStore.setReplayCallback(replayTour)
})

defineExpose({ replayTour })
</script>
