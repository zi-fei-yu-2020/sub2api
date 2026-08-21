<template>
  <!-- Custom Home Content: Full Page Mode -->
  <div v-if="hasHomeContent" class="min-h-screen">
    <!-- iframe mode -->
    <iframe
      v-if="isHomeContentUrl"
      :src="homeContent.trim()"
      class="h-screen w-full border-0"
      allowfullscreen
    ></iframe>
    <!-- HTML mode - SECURITY: homeContent is admin-only setting, XSS risk is acceptable -->
    <div v-else v-html="homeContent"></div>
  </div>

  <!-- Compact Home Page -->
  <div
    v-else-if="compactHomeEnabled"
    data-testid="compact-home"
    class="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-[#090d16] dark:text-white"
  >
    <header class="border-b border-slate-200/80 px-4 py-4 sm:px-6 dark:border-slate-800">
      <nav class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div class="flex min-w-0 flex-1 items-center gap-3">
          <img
            :src="siteLogo || '/logo.svg'"
            alt="Logo"
            class="h-9 w-9 shrink-0 rounded-lg object-contain"
          />
          <span class="min-w-0 truncate text-base font-bold tracking-tight text-slate-900 dark:text-white">{{ siteName }}</span>
        </div>
        <div class="flex max-w-full shrink-0 flex-wrap items-center justify-end gap-2">
          <LocaleSwitcher />
          <a
            v-if="docUrl"
            :href="docUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            :title="t('home.viewDocs')"
          >
            <Icon name="book" size="md" />
          </a>
          <button
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            :title="isDark ? t('home.switchToLight') : t('home.switchToDark')"
            @click="toggleTheme"
          >
            <Icon v-if="isDark" name="sun" size="md" />
            <Icon v-else name="moon" size="md" />
          </button>
          <router-link
            :to="isAuthenticated ? dashboardPath : '/login'"
            class="inline-flex h-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 px-4 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-500"
          >
            {{ isAuthenticated ? t('home.dashboard') : t('home.login') }}
          </router-link>
        </div>
      </nav>
    </header>

    <main class="flex min-w-0 flex-1 items-center justify-center px-4 py-16 sm:px-6">
      <div class="min-w-0 max-w-2xl text-center">
        <img
          :src="siteLogo || '/logo.svg'"
          alt="Logo"
          class="mx-auto mb-6 h-20 w-20 rounded-2xl object-contain shadow-sm"
        />
        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl dark:text-white">{{ siteName }}</h1>
        <p class="mt-4 whitespace-pre-wrap text-base text-slate-600 dark:text-slate-300">{{ siteSubtitle }}</p>
        <router-link
          :to="isAuthenticated ? dashboardPath : '/login'"
          class="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-500"
        >
          {{ isAuthenticated ? t('home.goToDashboard') : t('home.login') }}
        </router-link>
      </div>
    </main>

    <footer class="border-t border-slate-200/80 px-4 py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
      &copy; {{ currentYear }} {{ siteName }}. All rights reserved.
    </footer>
  </div>

  <!-- Modern SaaS Default Home Page (Linear / Vercel style) -->
  <div
    v-else
    class="relative flex min-h-screen flex-col overflow-hidden bg-[#f8fafc] text-slate-900 transition-colors duration-200 dark:bg-[#090d16] dark:text-slate-100"
  >
    <!-- Background Gradient and Dot/Grid Pattern -->
    <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        class="absolute -top-40 left-1/2 -translate-x-1/2 h-[450px] w-[900px] rounded-full bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-teal-400/10 blur-[100px] dark:from-blue-600/20 dark:via-purple-600/15"
      ></div>
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]"
      ></div>
    </div>

    <!-- Header Navigation -->
    <header class="relative z-20 px-6 py-4">
      <nav class="mx-auto flex max-w-6xl items-center justify-between">
        <!-- Logo & Site Name -->
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-blue-600 shadow-md">
            <img v-if="siteLogo" :src="siteLogo" alt="Logo" class="h-full w-full object-contain" />
            <span v-else class="text-base font-black tracking-tight text-white">S2</span>
          </div>
          <span class="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{{ siteName }}</span>
        </div>

        <!-- Right Controls: Locale + Docs + Theme + Auth -->
        <div class="flex items-center gap-3">
          <!-- Language Switcher -->
          <LocaleSwitcher />

          <!-- Documentation Link -->
          <a
            v-if="docUrl"
            :href="docUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            :title="t('home.viewDocs')"
          >
            <Icon name="book" size="md" />
          </a>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            :title="isDark ? t('home.switchToLight') : t('home.switchToDark')"
          >
            <Icon v-if="isDark" name="sun" size="md" />
            <Icon v-else name="moon" size="md" />
          </button>

          <!-- Login / Dashboard Action -->
          <router-link
            v-if="isAuthenticated"
            :to="dashboardPath"
            class="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            <span
              class="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white"
            >
              {{ userInitial }}
            </span>
            <span>{{ t('home.dashboard') }}</span>
          </router-link>
          <router-link
            v-else
            to="/login"
            class="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-500 active:scale-[0.98]"
          >
            {{ t('home.login') }}
          </router-link>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 flex-1 px-6 pt-10 pb-20">
      <div class="mx-auto max-w-6xl">
        <!-- Hero Top Banner / Badge -->
        <div class="flex justify-center">
          <div class="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-1 text-xs font-medium text-blue-700 backdrop-blur-sm dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300">
            <span class="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>{{ siteSubtitle || '高可用 AI 智能路由与统一计费网关' }}</span>
          </div>
        </div>

        <!-- Hero Section -->
        <div class="mt-8 text-center">
          <h1 class="text-4xl font-extrabold tracking-tight sm:text-6xl sm:leading-[1.15] text-slate-900 dark:text-white">
            下一代统一高可用
            <span class="bg-gradient-to-r from-blue-600 via-indigo-500 to-teal-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-teal-300">
              AI 网关与订阅分发
            </span>
          </h1>
          <p class="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            聚合 Claude、OpenAI、DeepSeek、Gemini 与主流大模型平台，支持智能负载均衡、故障无感切换、动态阶梯计费与全渠道 Token 级管控。
          </p>

          <!-- Primary CTAs -->
          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <router-link
              :to="isAuthenticated ? dashboardPath : '/login'"
              class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500 hover:shadow-blue-600/35 active:scale-[0.98]"
            >
              {{ isAuthenticated ? t('home.goToDashboard') : t('home.getStarted') }}
              <Icon name="arrowRight" size="md" class="ml-2" :stroke-width="2" />
            </router-link>
            <router-link
              to="/model-plaza"
              class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer"
            >
              {{ t('modelPlaza.title') }}
            </router-link>
          </div>
        </div>

        <!-- Terminal Demo Card -->
        <div class="mt-16 sm:mt-20 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900/95 p-1 shadow-2xl backdrop-blur-xl dark:border-slate-800">
          <div class="flex items-center justify-between border-b border-slate-800 px-4 py-3 bg-slate-950/60 rounded-t-xl">
            <div class="flex items-center gap-2">
              <div class="h-3 w-3 rounded-full bg-rose-500/80"></div>
              <div class="h-3 w-3 rounded-full bg-amber-500/80"></div>
              <div class="h-3 w-3 rounded-full bg-emerald-500/80"></div>
              <span class="ml-2 text-xs font-mono text-slate-400">curl -X POST https://api.sub2api.com/v1/chat/completions</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-medium text-emerald-400 border border-emerald-500/20">
                200 OK • 182ms
              </span>
              <span class="text-xs font-mono text-slate-500">JSON</span>
            </div>
          </div>
          <div class="p-4 sm:p-6 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto">
            <div class="text-slate-500">// 1. 标准 OpenAI / Claude 协议 100% 无缝兼容</div>
            <div class="mt-2"><span class="text-indigo-400">curl</span> https://api.yourdomain.com/v1/chat/completions \</div>
            <div class="pl-4"><span class="text-blue-400">-H</span> <span class="text-emerald-300">"Authorization: Bearer sk-sub2api-8f92b7c4d..."</span> \</div>
            <div class="pl-4"><span class="text-blue-400">-H</span> <span class="text-emerald-300">"Content-Type: application/json"</span> \</div>
            <div class="pl-4"><span class="text-blue-400">-d</span> '{</div>
            <div class="pl-8"><span class="text-amber-300">"model"</span>: <span class="text-emerald-300">"claude-3-7-sonnet-20250219"</span>,</div>
            <div class="pl-8"><span class="text-amber-300">"messages"</span>: [{<span class="text-amber-300">"role"</span>: <span class="text-emerald-300">"user"</span>, <span class="text-amber-300">"content"</span>: <span class="text-emerald-300">"Hello Sub2API!"</span>}],</div>
            <div class="pl-8"><span class="text-amber-300">"stream"</span>: <span class="text-purple-400">true</span></div>
            <div class="pl-4">}'</div>
          </div>
        </div>

        <!-- Features Grid -->
        <div class="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div class="group relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-blue-500/30 dark:border-slate-800/80 dark:bg-slate-900/50">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <Icon name="server" size="md" />
            </div>
            <h3 class="mt-4 text-base font-bold text-slate-900 dark:text-white">
              {{ t('home.features.unifiedGateway') }}
            </h3>
            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {{ t('home.features.unifiedGatewayDesc') }}
            </p>
          </div>

          <div class="group relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-indigo-500/30 dark:border-slate-800/80 dark:bg-slate-900/50">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
              <Icon name="swap" size="md" />
            </div>
            <h3 class="mt-4 text-base font-bold text-slate-900 dark:text-white">
              {{ t('home.features.multiAccount') }}
            </h3>
            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {{ t('home.features.multiAccountDesc') }}
            </p>
          </div>

          <div class="group relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-teal-500/30 dark:border-slate-800/80 dark:bg-slate-900/50">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
              <Icon name="chart" size="md" />
            </div>
            <h3 class="mt-4 text-base font-bold text-slate-900 dark:text-white">
              {{ t('home.features.balanceQuota') }}
            </h3>
            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {{ t('home.features.balanceQuotaDesc') }}
            </p>
          </div>
        </div>

        <!-- Supported Providers -->
        <div class="mt-20 text-center">
          <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {{ t('home.providers.title') }}
          </h2>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {{ t('home.providers.description') }}
          </p>
        </div>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <!-- Claude -->
          <div class="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-4 py-2.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900/60">
            <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 text-xs font-black text-white">C</div>
            <span class="text-xs font-semibold text-slate-800 dark:text-slate-200">{{ t('home.providers.claude') }}</span>
            <span class="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">{{ t('home.providers.supported') }}</span>
          </div>

          <!-- GPT -->
          <div class="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-4 py-2.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900/60">
            <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-xs font-black text-white">O</div>
            <span class="text-xs font-semibold text-slate-800 dark:text-slate-200">OpenAI</span>
            <span class="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">{{ t('home.providers.supported') }}</span>
          </div>

          <!-- DeepSeek -->
          <div class="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-4 py-2.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900/60">
            <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-black text-white">DS</div>
            <span class="text-xs font-semibold text-slate-800 dark:text-slate-200">DeepSeek</span>
            <span class="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">{{ t('home.providers.supported') }}</span>
          </div>

          <!-- Gemini -->
          <div class="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-4 py-2.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900/60">
            <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-black text-white">G</div>
            <span class="text-xs font-semibold text-slate-800 dark:text-slate-200">{{ t('home.providers.gemini') }}</span>
            <span class="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">{{ t('home.providers.supported') }}</span>
          </div>

          <!-- Grok -->
          <div class="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-4 py-2.5 shadow-2xs dark:border-slate-800 dark:bg-slate-900/60">
            <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-xs font-black text-white dark:bg-slate-800">X</div>
            <span class="text-xs font-semibold text-slate-800 dark:text-slate-200">Grok</span>
            <span class="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">{{ t('home.providers.supported') }}</span>
          </div>
        </div>

      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-200/80 bg-white py-8 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-[#090d16] dark:text-slate-400">
      <div class="mx-auto max-w-6xl px-6 flex items-center justify-center">
        <div>
          &copy; {{ currentYear }} {{ siteName }}. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const appStore = useAppStore()
const authStore = useAuthStore()

// Site config
const siteName = computed(() => appStore.siteName)
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || '')
const siteLogo = computed(() => appStore.siteLogo)
const docUrl = computed(() => appStore.docUrl)
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')
const compactHomeEnabled = computed(() => appStore.cachedPublicSettings?.compact_home_enabled || false)

// Check if custom home content exists
const hasHomeContent = computed(() => {
  return homeContent.value && homeContent.value.trim().length > 0
})

// Check if homeContent is a URL
const isHomeContentUrl = computed(() => {
  if (!hasHomeContent.value) return false
  const content = homeContent.value.trim()
  return content.startsWith('http://') || content.startsWith('https://')
})

// Theme
const isDark = ref(document.documentElement.classList.contains('dark'))

// Auth state
const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => isAdmin.value ? '/admin/dashboard' : '/dashboard')
const userInitial = computed(() => {
  const user = authStore.user
  if (!user || !user.email) return 'U'
  return user.email.charAt(0).toUpperCase()
})

// Current year for footer
const currentYear = computed(() => new Date().getFullYear())

// Toggle theme
function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
}

onMounted(() => {
  initTheme()
  authStore.checkAuth()
  if (!appStore.publicSettingsLoaded) {
    appStore.fetchPublicSettings()
  }
})
</script>
