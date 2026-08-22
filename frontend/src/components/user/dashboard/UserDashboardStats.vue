<template>
  <div class="space-y-4">
    <!-- Row 1: Core Financial & Traffic Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Balance Card -->
      <div v-if="!isSimple" class="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/60">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('dashboard.balance') }}</span>
          <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
            <span class="font-bold text-sm">$</span>
          </div>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-2xl font-black tracking-tight text-emerald-600 dark:text-emerald-400 font-mono">
            ${{ formatBalance(balance) }}
          </span>
          <span class="text-[11px] text-slate-400">USD</span>
        </div>
        <div class="mt-3 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60">
          <span class="text-[11px] text-slate-400">{{ t('common.available') }}</span>
          <router-link to="/payment" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
            {{ t('dashboard.recharge') || '立即充值' }} →
          </router-link>
        </div>
      </div>

      <!-- Today Cost Card -->
      <div class="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/60">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('dashboard.todayCost') }}</span>
          <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
            <Icon name="dollar" size="sm" />
          </div>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-2xl font-black tracking-tight text-purple-600 dark:text-purple-400 font-mono" :title="t('dashboard.actual')">
            ${{ formatCost(stats?.today_actual_cost || 0) }}
          </span>
          <span class="text-[11px] text-slate-400 font-mono" :title="t('dashboard.standard')">
            / ${{ formatCost(stats?.today_cost || 0) }}
          </span>
        </div>
        <div class="mt-3 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60 text-[11px]">
          <span class="text-slate-400">{{ t('common.total') }}</span>
          <span class="font-mono font-semibold text-slate-700 dark:text-slate-300">
            ${{ formatCost(stats?.total_actual_cost || 0) }}
          </span>
        </div>
      </div>

      <!-- Today Requests Card -->
      <div class="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/60">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('dashboard.todayRequests') }}</span>
          <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <Icon name="chart" size="sm" />
          </div>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-mono">
            {{ formatNumber(stats?.today_requests || 0) }}
          </span>
          <span class="text-[11px] text-emerald-600 font-semibold font-mono">
            {{ formatDuration(stats?.average_duration_ms || 0) }}
          </span>
        </div>
        <div class="mt-3 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60 text-[11px]">
          <span class="text-slate-400">{{ t('common.total') }}</span>
          <span class="font-mono font-semibold text-slate-700 dark:text-slate-300">
            {{ formatNumber(stats?.total_requests || 0) }}
          </span>
        </div>
      </div>

      <!-- API Keys Status Card -->
      <div class="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/60">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('dashboard.apiKeys') }}</span>
          <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
            <Icon name="key" size="sm" />
          </div>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-mono">
            {{ stats?.active_api_keys || 0 }}
          </span>
          <span class="text-[11px] text-slate-400">/ {{ stats?.total_api_keys || 0 }} {{ t('common.total') }}</span>
        </div>
        <div class="mt-3 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60 text-[11px]">
          <span class="text-slate-400">{{ t('common.status') }}</span>
          <router-link to="/keys" class="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            {{ t('dashboard.manageKeys') || '密钥管理' }} →
          </router-link>
        </div>
      </div>
    </div>

    <!-- Row 2: Token Breakdown & Performance Throughput -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Today Tokens -->
      <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/60">
        <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('dashboard.todayTokens') }}</span>
        <p class="mt-2 text-2xl font-bold font-mono text-slate-900 dark:text-white">
          {{ formatTokens(stats?.today_tokens || 0) }}
        </p>
        <div class="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <span class="text-blue-500">In: {{ formatTokens(stats?.today_input_tokens || 0) }}</span>
          <span>•</span>
          <span class="text-purple-500">Out: {{ formatTokens(stats?.today_output_tokens || 0) }}</span>
          <span>•</span>
          <span class="text-teal-500">Cache: {{ formatTokens((stats?.today_cache_creation_tokens || 0) + (stats?.today_cache_read_tokens || 0)) }}</span>
        </div>
      </div>

      <!-- Total Tokens -->
      <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/60">
        <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('dashboard.totalTokens') }}</span>
        <p class="mt-2 text-2xl font-bold font-mono text-slate-900 dark:text-white">
          {{ formatTokens(stats?.total_tokens || 0) }}
        </p>
        <div class="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <span>In: {{ formatTokens(stats?.total_input_tokens || 0) }}</span>
          <span>•</span>
          <span>Out: {{ formatTokens(stats?.total_output_tokens || 0) }}</span>
        </div>
      </div>

      <!-- Performance RPM / TPM -->
      <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/60">
        <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('dashboard.performance') }}</span>
        <div class="mt-2 flex items-baseline gap-3">
          <span class="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
            {{ formatTokens(stats?.rpm || 0) }}
          </span>
          <span class="text-xs text-slate-400 font-mono">RPM</span>
          <span class="text-sm font-semibold font-mono text-violet-500">
            {{ formatTokens(stats?.tpm || 0) }} TPM
          </span>
        </div>
        <div class="mt-2.5 text-[11px] text-slate-400">
          {{ t('dashboard.avgResponse') }}: {{ formatDuration(stats?.average_duration_ms || 0) }}
        </div>
      </div>

      <!-- Average Latency & Health -->
      <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/60">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ t('dashboard.avgResponse') }}</span>
          <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>{{ t('common.normal') || '正常' }}
          </span>
        </div>
        <p class="mt-2 text-2xl font-bold font-mono text-slate-900 dark:text-white">
          {{ formatDuration(stats?.average_duration_ms || 0) }}
        </p>
        <p class="mt-2.5 text-[11px] text-slate-400">
          {{ t('dashboard.averageTime') }}
        </p>
      </div>
    </div>

    <!-- Row 3: Per-platform breakdown -->
    <div v-if="!isSimple && platformCards.length > 0" class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/60">
      <div class="mb-4 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-bold text-slate-900 dark:text-white">{{ t('dashboard.platformBreakdown') }}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {{ t('dashboard.platformCount', { count: sortedPlatforms.length }) }}
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in platformCards"
          :key="item.platform"
          :class="[
            'rounded-xl border p-4 transition',
            item.isOther
              ? 'border-dashed border-slate-300 bg-slate-50/60 dark:border-slate-700 dark:bg-slate-950/30'
              : 'border-slate-200/80 bg-slate-50/40 dark:border-slate-800 dark:bg-slate-950/40'
          ]"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-slate-900 dark:text-white">
              {{ item.isOther ? t('dashboard.platformOther') : platformLabel(item.platform) }}
            </span>
            <span class="font-mono text-sm font-bold text-purple-600 dark:text-purple-400" :title="t('dashboard.actual')">
              ${{ formatCost(item.total_actual_cost) }}
            </span>
          </div>
          <div class="mt-3 space-y-1.5 text-xs">
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400">{{ t('dashboard.todayCost') }}</span>
              <span class="font-mono font-semibold text-slate-900 dark:text-white">${{ formatCost(item.today_actual_cost) }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400">{{ t('dashboard.requests') }}</span>
              <span class="font-mono text-slate-700 dark:text-slate-300">
                {{ item.total_requests > 0 ? formatNumber(item.total_requests) : '-' }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-500 dark:text-slate-400">{{ t('dashboard.tokens') }}</span>
              <span class="font-mono text-slate-700 dark:text-slate-300">
                {{ item.total_tokens > 0 ? formatTokens(item.total_tokens) : '-' }}
              </span>
            </div>
          </div>

          <!-- Quota Section -->
          <div v-if="hasAnyLimit(item.quota) && !item.isOther" class="mt-3 space-y-1.5 border-t border-slate-200/80 pt-2.5 dark:border-slate-800">
            <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {{ t('dashboard.platformQuota.title') }}
            </p>
            <template v-for="w in (['daily', 'weekly', 'monthly'] as const)" :key="w">
              <div v-if="quotaVal(item.quota, `${w}_limit_usd`) != null" class="space-y-1">
                <template v-if="(quotaVal(item.quota, `${w}_limit_usd`) as number) === 0">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-slate-600 dark:text-slate-300">{{ t(`dashboard.platformQuota.${w}`) }}</span>
                    <span class="font-mono text-rose-500 font-bold">{{ t('dashboard.platformQuota.disabled') }}</span>
                  </div>
                  <div class="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div class="h-full w-full rounded-full bg-rose-500" />
                  </div>
                </template>
                <template v-else>
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-slate-600 dark:text-slate-300">{{ t(`dashboard.platformQuota.${w}`) }}</span>
                    <span class="font-mono text-slate-700 dark:text-slate-200">
                      ${{ formatUsd((quotaVal(item.quota, `${w}_usage_usd`) as number) ?? 0) }} / ${{ formatUsd(quotaVal(item.quota, `${w}_limit_usd`) as number) }}
                    </span>
                  </div>
                  <div class="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      class="h-full rounded-full transition-all"
                      :class="quotaBarClass(calcPercent((quotaVal(item.quota, `${w}_usage_usd`) as number) ?? 0, quotaVal(item.quota, `${w}_limit_usd`) as number))"
                      :style="{ width: calcPercent((quotaVal(item.quota, `${w}_usage_usd`) as number) ?? 0, quotaVal(item.quota, `${w}_limit_usd`) as number) + '%' }"
                    />
                  </div>
                  <p v-if="quotaVal(item.quota, `${w}_window_resets_at`)" class="text-[10px] text-slate-400">
                    {{ t('dashboard.platformQuota.resetsAt', { time: formatResetTime(quotaVal(item.quota, `${w}_window_resets_at`) as string) }) }}
                  </p>
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
import type { UserDashboardStats as UserStatsType } from '@/api/usage'
import type { PlatformQuotaItem } from '@/types'

interface FusedPlatformCard {
  platform: string
  total_actual_cost: number
  today_actual_cost: number
  total_requests: number
  total_tokens: number
  isOther?: boolean
  quota?: PlatformQuotaItem
}

const props = defineProps<{
  stats: UserStatsType
  balance: number
  isSimple: boolean
  platformQuotas?: PlatformQuotaItem[] | null
}>()
const { t } = useI18n()

const PLATFORM_LABELS: Record<string, string> = {
  anthropic: 'Claude',
  openai: 'OpenAI',
  gemini: 'Gemini',
  antigravity: 'Antigravity',
  grok: 'Grok'
}

const platformLabel = (p: string) => PLATFORM_LABELS[p] ?? p

const sortedPlatforms = computed(() => {
  const list = props.stats?.by_platform ?? []
  return [...list].sort((a, b) => b.total_actual_cost - a.total_actual_cost)
})

const OTHER_THRESHOLD = 0.0001
const platformCards = computed<FusedPlatformCard[]>(() => {
  const byPlat = new Map<string, (typeof sortedPlatforms.value)[number]>()
  for (const item of props.stats?.by_platform ?? []) byPlat.set(item.platform, item)

  const byQuota = new Map<string, PlatformQuotaItem>()
  for (const q of props.platformQuotas ?? []) byQuota.set(q.platform, q)

  const platforms = new Set<string>([...byPlat.keys(), ...byQuota.keys()])
  const PLATFORM_ORDER = ['anthropic', 'openai', 'gemini', 'antigravity', 'grok']
  const cards: FusedPlatformCard[] = []

  for (const p of platforms) {
    const stat = byPlat.get(p)
    cards.push({
      platform: p,
      total_actual_cost: stat?.total_actual_cost ?? 0,
      today_actual_cost: stat?.today_actual_cost ?? 0,
      total_requests: stat?.total_requests ?? 0,
      total_tokens: stat?.total_tokens ?? 0,
      quota: byQuota.get(p),
    })
  }

  cards.sort((a, b) => {
    const ai = PLATFORM_ORDER.indexOf(a.platform)
    const bi = PLATFORM_ORDER.indexOf(b.platform)
    if (ai === -1 && bi === -1) return a.platform.localeCompare(b.platform)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })

  const total = props.stats?.total_actual_cost ?? 0
  const today = props.stats?.today_actual_cost ?? 0
  const sumTotal = cards.reduce((s, c) => s + c.total_actual_cost, 0)
  const sumToday = cards.reduce((s, c) => s + c.today_actual_cost, 0)
  const diffTotal = Math.max(0, total - sumTotal)
  const diffToday = Math.max(0, today - sumToday)

  if (diffTotal > OTHER_THRESHOLD || diffToday > OTHER_THRESHOLD) {
    cards.push({
      platform: '__other__',
      total_actual_cost: diffTotal,
      today_actual_cost: diffToday,
      total_requests: 0,
      total_tokens: 0,
      isOther: true,
    })
  }

  return cards
})

type QuotaWindow = 'daily' | 'weekly' | 'monthly'
type QuotaField = `${QuotaWindow}_limit_usd` | `${QuotaWindow}_usage_usd` | `${QuotaWindow}_window_resets_at`

function quotaVal(q: PlatformQuotaItem | undefined, key: QuotaField): PlatformQuotaItem[QuotaField] {
  return q?.[key]
}

function hasAnyLimit(q: PlatformQuotaItem | undefined): boolean {
  if (!q) return false
  return q.daily_limit_usd != null || q.weekly_limit_usd != null || q.monthly_limit_usd != null
}

function calcPercent(usage: number, limit: number): number {
  if (!limit || limit <= 0) return 0
  return Math.min(100, Math.max(0, Math.round((usage / limit) * 100)))
}

function quotaBarClass(p: number): string {
  if (p >= 95) return 'bg-rose-500'
  if (p >= 75) return 'bg-amber-500'
  return 'bg-emerald-500'
}

const usdFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
function formatUsd(n: number): string {
  if (!Number.isFinite(n)) return '0.00'
  return usdFormatter.format(n)
}

function formatResetTime(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString(undefined, {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

const formatBalance = (b: number) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(b)

const formatNumber = (n: number) => n.toLocaleString()
const formatCost = (c: number) => c.toFixed(4)
const formatTokens = (t: number) => {
  if (t >= 1_000_000) return `${(t / 1_000_000).toFixed(1)}M`
  if (t >= 1000) return `${(t / 1000).toFixed(1)}K`
  return t.toString()
}
const formatDuration = (ms: number) => ms >= 1000 ? `${(ms / 1000).toFixed(2)}s` : `${ms.toFixed(0)}ms`
</script>
