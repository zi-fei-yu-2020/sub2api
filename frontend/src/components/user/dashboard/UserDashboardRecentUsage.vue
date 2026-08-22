<template>
  <div class="rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800/80 dark:bg-slate-900/60 overflow-hidden">
    <div class="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
      <div>
        <h2 class="text-sm font-bold text-slate-900 dark:text-white">{{ t('dashboard.recentUsage') }}</h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ t('dashboard.last7Days') }}</p>
      </div>
      <router-link
        to="/usage"
        class="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
      >
        {{ t('dashboard.viewAllUsage') }}
        <Icon name="arrowRight" size="xs" />
      </router-link>
    </div>
    <div class="p-5 sm:p-6">
      <div v-if="loading" class="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
      <div v-else-if="data.length === 0" class="py-8">
        <EmptyState :title="t('dashboard.noUsageRecords')" :description="t('dashboard.startUsingApi')" />
      </div>
      <div v-else class="space-y-3">
        <div
          v-for="log in data"
          :key="log.id"
          class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 transition-colors hover:bg-slate-100/80 dark:border-slate-800/60 dark:bg-slate-950/40 dark:hover:bg-slate-800/60"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <Icon name="beaker" size="sm" />
            </div>
            <div class="min-w-0">
              <p class="text-xs font-bold text-slate-900 dark:text-white truncate">{{ log.model }}</p>
              <p class="text-[10px] text-slate-400 font-mono">{{ formatDateTime(log.created_at) }}</p>
            </div>
          </div>
          <div class="text-right shrink-0">
            <p class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
              ${{ formatCost(log.actual_cost) }}
            </p>
            <p class="text-[10px] text-slate-400 font-mono">
              {{ (log.input_tokens + log.output_tokens).toLocaleString() }} tokens
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import Icon from '@/components/icons/Icon.vue'
import { formatDateTime } from '@/utils/format'
import type { UsageLog } from '@/types'

defineProps<{
  data: UsageLog[]
  loading: boolean
}>()
const { t } = useI18n()
const formatCost = (c: number) => c.toFixed(4)
</script>
