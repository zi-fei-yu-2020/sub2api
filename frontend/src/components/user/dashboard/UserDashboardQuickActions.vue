<template>
  <div class="rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800/80 dark:bg-slate-900/60 overflow-hidden">
    <div class="border-b border-slate-100 px-6 py-4 dark:border-slate-800">
      <h2 class="text-sm font-bold text-slate-900 dark:text-white">{{ t('dashboard.quickActions') }}</h2>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">常用服务与控制台快捷通道</p>
    </div>
    <div class="space-y-2.5 p-4 sm:p-5">
      <!-- Create API Key -->
      <button
        @click="router.push('/keys')"
        class="group flex w-full items-center gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-left transition hover:border-blue-500/30 hover:bg-blue-50/40 dark:border-slate-800/60 dark:bg-slate-950/40 dark:hover:border-blue-500/30 dark:hover:bg-blue-950/30 cursor-pointer"
      >
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-transform group-hover:scale-105 dark:bg-blue-950/60 dark:text-blue-400">
          <Icon name="key" size="md" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-xs font-bold text-slate-900 dark:text-white">{{ t('dashboard.createApiKey') }}</p>
          <p class="text-[11px] text-slate-400">{{ t('dashboard.generateNewKey') }}</p>
        </div>
        <Icon
          name="chevronRight"
          size="sm"
          class="text-slate-400 transition-colors group-hover:text-blue-500"
        />
      </button>

      <!-- View Usage -->
      <button
        @click="router.push('/usage')"
        class="group flex w-full items-center gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-left transition hover:border-emerald-500/30 hover:bg-emerald-50/40 dark:border-slate-800/60 dark:bg-slate-950/40 dark:hover:border-emerald-500/30 dark:hover:bg-emerald-950/30 cursor-pointer"
      >
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-transform group-hover:scale-105 dark:bg-emerald-950/60 dark:text-emerald-400">
          <Icon name="chart" size="md" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-xs font-bold text-slate-900 dark:text-white">{{ t('dashboard.viewUsage') }}</p>
          <p class="text-[11px] text-slate-400">{{ t('dashboard.checkDetailedLogs') }}</p>
        </div>
        <Icon
          name="chevronRight"
          size="sm"
          class="text-slate-400 transition-colors group-hover:text-emerald-500"
        />
      </button>

      <!-- Batch Image Agent -->
      <button
        v-if="canUseBatchImage"
        @click="router.push('/batch-image')"
        class="group flex w-full items-center gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-left transition hover:border-purple-500/30 hover:bg-purple-50/40 dark:border-slate-800/60 dark:bg-slate-950/40 dark:hover:border-purple-500/30 dark:hover:bg-purple-950/30 cursor-pointer"
      >
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 transition-transform group-hover:scale-105 dark:bg-purple-950/60 dark:text-purple-400">
          <Icon name="sparkles" size="md" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-xs font-bold text-slate-900 dark:text-white">{{ t('dashboard.batchImageAgent') }}</p>
          <p class="text-[11px] text-slate-400">{{ t('dashboard.batchImageAgentDesc') }}</p>
        </div>
        <Icon
          name="chevronRight"
          size="sm"
          class="text-slate-400 transition-colors group-hover:text-purple-500"
        />
      </button>

      <!-- Redeem Gift Code -->
      <button
        @click="router.push('/redeem')"
        class="group flex w-full items-center gap-3.5 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-left transition hover:border-amber-500/30 hover:bg-amber-50/40 dark:border-slate-800/60 dark:bg-slate-950/40 dark:hover:border-amber-500/30 dark:hover:bg-amber-950/30 cursor-pointer"
      >
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 transition-transform group-hover:scale-105 dark:bg-amber-950/60 dark:text-amber-400">
          <Icon name="gift" size="md" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-xs font-bold text-slate-900 dark:text-white">{{ t('dashboard.redeemCode') }}</p>
          <p class="text-[11px] text-slate-400">{{ t('dashboard.addBalanceWithCode') }}</p>
        </div>
        <Icon
          name="chevronRight"
          size="sm"
          class="text-slate-400 transition-colors group-hover:text-amber-500"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
import { useBatchImageAccess } from '@/composables/useBatchImageAccess'
const router = useRouter()
const { t } = useI18n()
const { canUseBatchImage, refreshBatchImageAccess } = useBatchImageAccess()

onMounted(() => {
  void refreshBatchImageAccess()
})
</script>
