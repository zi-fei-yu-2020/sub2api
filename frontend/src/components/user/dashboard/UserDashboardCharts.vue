<template>
  <div class="space-y-6">
    <!-- Date Range & Granularity Filter Card -->
    <div class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/60 backdrop-blur-md">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-3">
          <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">{{ t('dashboard.timeRange') }}:</span>
          <DateRangePicker
            :start-date="startDate"
            :end-date="endDate"
            @update:startDate="$emit('update:startDate', $event)"
            @update:endDate="$emit('update:endDate', $event)"
            @change="$emit('dateRangeChange', $event)"
          />
          <button
            type="button"
            @click="$emit('refresh')"
            :disabled="loading"
            class="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 cursor-pointer"
          >
            <svg v-if="loading" class="h-3.5 w-3.5 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            {{ t('common.refresh') }}
          </button>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">{{ t('dashboard.granularity') }}:</span>
          <div class="w-28">
            <Select
              :model-value="granularity"
              :options="[{ value: 'day', label: t('dashboard.day') }, { value: 'hour', label: t('dashboard.hour') }]"
              @update:model-value="$emit('update:granularity', $event)"
              @change="$emit('granularityChange')"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Model Distribution Chart -->
      <div class="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/60">
        <div v-if="loading" class="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-xs dark:bg-slate-900/60">
          <LoadingSpinner size="md" />
        </div>
        <div class="mb-4">
          <h3 class="text-sm font-bold text-slate-900 dark:text-white">{{ t('dashboard.modelDistribution') }}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">按模型划分的 Token 消耗与标准/实际花费</p>
        </div>

        <div class="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <div class="h-44 w-44 shrink-0">
            <Doughnut v-if="modelData" :data="modelData" :options="doughnutOptions" />
            <div v-else class="flex h-full items-center justify-center text-xs text-slate-400">
              {{ t('dashboard.noDataAvailable') }}
            </div>
          </div>
          <div class="max-h-48 w-full min-w-0 flex-1 overflow-auto font-mono text-xs">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-100 bg-slate-50/70 text-slate-500 dark:border-slate-800 dark:bg-slate-950/30 font-sans font-semibold">
                  <th class="py-2 px-2 text-left">{{ t('dashboard.model') }}</th>
                  <th class="py-2 px-2 text-right">{{ t('dashboard.requests') }}</th>
                  <th class="py-2 px-2 text-right">{{ t('dashboard.tokens') }}</th>
                  <th class="py-2 px-2 text-right">{{ t('dashboard.actual') }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
                <tr v-for="model in models" :key="model.model" class="hover:bg-slate-50/60 dark:hover:bg-slate-800/30">
                  <td class="max-w-[120px] truncate py-1.5 px-2 font-medium text-slate-900 dark:text-white font-sans" :title="model.model">
                    {{ model.model }}
                  </td>
                  <td class="py-1.5 px-2 text-right text-slate-600 dark:text-slate-400">
                    {{ formatNumber(model.requests) }}
                  </td>
                  <td class="py-1.5 px-2 text-right text-slate-600 dark:text-slate-400">
                    {{ formatTokens(model.total_tokens) }}
                  </td>
                  <td class="py-1.5 px-2 text-right font-bold text-emerald-600 dark:text-emerald-400">
                    ${{ formatCost(model.actual_cost) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Token Usage Trend Chart -->
      <TokenUsageTrend :trend-data="trend" :loading="loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import DateRangePicker from '@/components/common/DateRangePicker.vue'
import Select from '@/components/common/Select.vue'
import { Doughnut } from 'vue-chartjs'
import TokenUsageTrend from '@/components/charts/TokenUsageTrend.vue'
import type { TrendDataPoint, ModelStat } from '@/types'
import { formatCostFixed as formatCost, formatNumberLocaleString as formatNumber, formatTokensK as formatTokens } from '@/utils/format'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler)

const props = defineProps<{ loading: boolean, startDate: string, endDate: string, granularity: string, trend: TrendDataPoint[], models: ModelStat[] }>()
defineEmits(['update:startDate', 'update:endDate', 'update:granularity', 'dateRangeChange', 'granularityChange', 'refresh'])
const { t } = useI18n()

const modelData = computed(() => !props.models?.length ? null : {
  labels: props.models.map((m: ModelStat) => m.model),
  datasets: [{
    data: props.models.map((m: ModelStat) => m.total_tokens),
    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']
  }]
})

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context: any) => `${context.label}: ${formatTokens(context.parsed)} tokens`
      }
    }
  }
}
</script>
