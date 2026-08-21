<template>
  <div class="plaza-pricing-table overflow-x-auto" :style="accentStyle">
    <table class="w-full min-w-[860px] table-fixed border-collapse text-xs tabular-nums">
      <colgroup>
        <col class="w-[24%]" />
        <col class="w-[10%]" />
        <col class="w-[10%]" />
        <col class="w-[14%]" />
        <col class="w-[10%]" />
        <col class="w-[10%]" />
        <col class="w-[12%]" />
        <col class="w-[10%]" />
      </colgroup>
      <thead>
        <tr
          class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/70 dark:bg-slate-950/40"
        >
          <th
            rowspan="2"
            class="border-r border-slate-100 py-3 pl-6 pr-4 text-left align-middle dark:border-slate-800"
          >
            {{ t('modelPlaza.table.model') }}
          </th>
          <th colspan="3" class="pz-bg pt-2 text-center">
            <div class="pz-title border-b pb-2 font-bold">
              {{ t('modelPlaza.table.paidPrice') }}
              <span class="pz-unit ml-1 normal-case font-normal">{{ t('modelPlaza.table.unitPerMillion') }}</span>
            </div>
          </th>
          <th
            colspan="3"
            class="border-l border-slate-100 pt-2 text-center dark:border-slate-800"
          >
            <div class="border-b border-slate-200 pb-2 text-slate-400 dark:border-slate-700 dark:text-slate-500">
              {{ t('modelPlaza.table.officialPrice') }}
              <span class="ml-1 normal-case font-normal text-slate-400 dark:text-slate-500">{{ t('modelPlaza.table.unitPerMillion') }}</span>
            </div>
          </th>
          <th
            rowspan="2"
            class="border-l border-slate-100 py-3 pl-3 pr-6 text-right align-middle dark:border-slate-800"
          >
            {{ t('modelPlaza.table.rate') }}
          </th>
        </tr>
        <tr
          class="border-b border-slate-100 text-left text-[11px] font-semibold uppercase leading-4 tracking-wide text-slate-400 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-500"
        >
          <th class="pz-bg px-3 py-2 font-medium">{{ t('modelPlaza.table.input') }}</th>
          <th class="pz-bg px-3 py-2 font-medium">{{ t('modelPlaza.table.output') }}</th>
          <th class="pz-bg px-3 py-2 font-medium">{{ t('modelPlaza.table.cache') }}</th>
          <th class="border-l border-slate-100 px-3 py-2 font-medium dark:border-slate-800">
            {{ t('modelPlaza.table.input') }}
          </th>
          <th class="px-3 py-2 font-medium">{{ t('modelPlaza.table.output') }}</th>
          <th class="px-3 py-2 font-medium">{{ t('modelPlaza.table.cache') }}</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
        <tr
          v-for="m in sortedModels"
          :key="`${m.platform}:${m.name}`"
          class="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
        >
          <!-- 模型名 + 复制按钮 -->
          <td class="border-r border-slate-100 py-3 pl-6 pr-4 align-middle dark:border-slate-800 font-sans">
            <div class="flex items-center justify-between gap-2">
              <div class="flex flex-wrap items-center gap-1.5 min-w-0">
                <span class="font-bold text-slate-900 dark:text-white truncate">{{ m.name }}</span>
                <span
                  v-if="platform && m.platform !== platform"
                  :class="[
                    'inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold',
                    platformBadgeLightClass(m.platform)
                  ]"
                >
                  {{ platformLabel(m.platform) }}
                </span>
                <span
                  v-if="billingMode(m) !== BILLING_MODE_TOKEN"
                  class="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {{ billingModeLabel(m) }}
                </span>
              </div>
              <button
                type="button"
                @click="copyModelName(m.name)"
                class="shrink-0 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
                :title="t('common.copy')"
              >
                <Icon name="copy" size="xs" />
              </button>
            </div>
          </td>

          <!-- token 计费:输入 / 输出(阶梯内联)/ 缓存(写/读) -->
          <template v-if="billingMode(m) === BILLING_MODE_TOKEN">
            <td class="pz-cell px-3 py-3 align-middle font-semibold text-slate-900 dark:text-slate-100">
              <template v-if="tokenIntervals(m).length">
                <div
                  v-for="(iv, idx) in tokenIntervals(m)"
                  :key="idx"
                  class="whitespace-nowrap text-xs leading-5"
                >
                  <span class="mr-1 font-sans font-normal text-slate-400 dark:text-slate-500">{{ tierLabel(iv) }}</span>
                  {{ paidPerMillion(iv.input_price) }}
                </div>
              </template>
              <template v-else>{{ paidPerMillion(m.pricing?.input_price) }}</template>
            </td>
            <td class="pz-cell px-3 py-3 align-middle font-semibold text-slate-900 dark:text-slate-100">
              <template v-if="tokenIntervals(m).length">
                <div
                  v-for="(iv, idx) in tokenIntervals(m)"
                  :key="idx"
                  class="whitespace-nowrap text-xs leading-5"
                >
                  <span class="mr-1 font-sans font-normal text-slate-400 dark:text-slate-500">{{ tierLabel(iv) }}</span>
                  {{ paidPerMillion(iv.output_price) }}
                </div>
              </template>
              <template v-else>{{ paidPerMillion(m.pricing?.output_price) }}</template>
            </td>
            <td class="pz-cell px-3 py-3 align-middle">
              <div
                v-if="hasCachePricing(m)"
                class="space-y-0.5 text-xs text-slate-700 dark:text-slate-300"
              >
                <div>
                  <span class="font-sans text-[10px] text-slate-400">{{ t('modelPlaza.table.cacheWrite') }}</span>
                  {{ paidPerMillion(m.pricing?.cache_write_price) }}
                </div>
                <div>
                  <span class="font-sans text-[10px] text-slate-400">{{ t('modelPlaza.table.cacheRead') }}</span>
                  {{ paidPerMillion(m.pricing?.cache_read_price) }}
                </div>
              </div>
              <span v-else class="text-slate-400 dark:text-slate-600">-</span>
            </td>
          </template>

          <!-- 非 token 计费:按次/按图 (占满实付 3 列) -->
          <template v-else>
            <td colspan="3" class="pz-cell px-4 py-3 align-middle font-semibold text-slate-900 dark:text-slate-100">
              <template v-if="requestIntervals(m).length">
                <div
                  v-for="(iv, idx) in requestIntervals(m)"
                  :key="idx"
                  class="whitespace-nowrap text-xs leading-5"
                >
                  <span class="mr-1 font-sans font-normal text-slate-400 dark:text-slate-500">{{ tierLabel(iv) }}</span>
                  {{ paidRequestPrice(m, iv.per_request_price) }}
                  <span class="font-sans font-normal text-slate-400">{{ perUnitSuffix(m) }}</span>
                </div>
              </template>
              <template v-else>
                <span>{{ paidRequestPrice(m, m.pricing?.per_request_price) }}</span>
                <span class="font-sans font-normal text-slate-400">{{ perUnitSuffix(m) }}</span>
              </template>
            </td>
          </template>

          <!-- 官方参考价:输入 / 输出 / 缓存 -->
          <template v-if="m.official_pricing">
            <td class="border-l border-slate-100 px-3 py-3 align-middle text-slate-400 dark:border-slate-800 dark:text-slate-500">
              {{ official(m.official_pricing.input_price) }}
            </td>
            <td class="px-3 py-3 align-middle text-slate-400 dark:text-slate-500">
              {{ official(m.official_pricing.output_price) }}
            </td>
            <td class="px-3 py-3 align-middle text-slate-400 dark:text-slate-500">
              <div v-if="hasOfficialCache(m.official_pricing)" class="space-y-0.5 text-xs">
                <div>
                  <span class="font-sans text-[10px] text-slate-400">{{ t('modelPlaza.table.cacheWrite') }}</span>
                  {{ official(m.official_pricing.cache_write_price) }}
                </div>
                <div>
                  <span class="font-sans text-[10px] text-slate-400">{{ t('modelPlaza.table.cacheRead') }}</span>
                  {{ official(m.official_pricing.cache_read_price) }}
                </div>
              </div>
              <span v-else>-</span>
            </td>
          </template>
          <template v-else>
            <td colspan="3" class="border-l border-slate-100 px-3 py-3 text-center align-middle text-slate-400 dark:border-slate-800 dark:text-slate-600 font-sans">
              -
            </td>
          </template>

          <!-- 生效倍率:专属倍率生效时划线原倍率 -->
          <td class="border-l border-slate-100 py-3 pl-3 pr-6 text-right align-middle dark:border-slate-800 font-sans">
            <template v-if="hasCustomRate">
              <span class="mr-1 text-slate-400 line-through dark:text-slate-500">{{ rateMultiplier }}x</span>
              <span class="font-bold text-blue-600 dark:text-blue-400">{{ effectiveRate }}x</span>
            </template>
            <span v-else class="font-bold text-slate-700 dark:text-slate-300">{{ effectiveRate }}x</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'
import { formatScaled } from '@/utils/pricing'
import { platformAccentColor, platformBadgeLightClass, platformLabel } from '@/utils/platformColors'
import { useClipboard } from '@/composables/useClipboard'
import {
  BILLING_MODE_TOKEN,
  BILLING_MODE_IMAGE,
  type BillingMode
} from '@/constants/channel'
import type { PlazaModel } from '@/api/modelPlaza'
import type { UserPricingInterval } from '@/api/channels'

const props = defineProps<{
  models: PlazaModel[]
  platform?: string
  rateMultiplier: number
  userRateMultiplier?: number | null
  imageRateIndependent?: boolean
  imageRateMultiplier?: number | null
}>()

const { t } = useI18n()
const { copyToClipboard } = useClipboard()

const accentStyle = computed(() => ({ '--plaza-accent': platformAccentColor(props.platform ?? '') }))
const PER_MILLION = 1_000_000

const sortedModels = computed(() => {
  return [...props.models].sort((a, b) => {
    const ta = billingMode(a) === BILLING_MODE_TOKEN
    const tb = billingMode(b) === BILLING_MODE_TOKEN
    if (ta !== tb) return ta ? -1 : 1
    const pa = a.official_pricing?.output_price ?? null
    const pb = b.official_pricing?.output_price ?? null
    if (pa != null && pb != null && pa !== pb) return pb - pa
    if (pa != null && pb == null) return -1
    if (pa == null && pb != null) return 1
    return b.name.localeCompare(a.name)
  })
})

const effectiveRate = computed(() => props.userRateMultiplier ?? props.rateMultiplier)
const hasCustomRate = computed(
  () => props.userRateMultiplier != null && props.userRateMultiplier !== props.rateMultiplier
)

function billingMode(m: PlazaModel): BillingMode {
  return (m.pricing?.billing_mode || BILLING_MODE_TOKEN) as BillingMode
}

function billingModeLabel(m: PlazaModel): string {
  return billingMode(m) === BILLING_MODE_IMAGE
    ? t('modelPlaza.table.perImage')
    : t('modelPlaza.table.perRequest')
}

const MIN_DECIMALS = 2

function paidPerMillion(value: number | null | undefined): string {
  if (value == null) return '-'
  return formatScaled(value * effectiveRate.value, PER_MILLION, MIN_DECIMALS)
}

function usesIndependentImageRate(m: PlazaModel): boolean {
  return billingMode(m) === BILLING_MODE_IMAGE && props.imageRateIndependent === true
}

function requestRate(m: PlazaModel): number {
  return usesIndependentImageRate(m) ? (props.imageRateMultiplier ?? 1) : effectiveRate.value
}

function paidRequestPrice(m: PlazaModel, value: number | null | undefined): string {
  if (value == null) return '-'
  return formatScaled(value * requestRate(m), 1, MIN_DECIMALS)
}

function official(value: number | null | undefined): string {
  if (value == null) return '-'
  return formatScaled(value, PER_MILLION, MIN_DECIMALS)
}

function perUnitSuffix(m: PlazaModel): string {
  return billingMode(m) === BILLING_MODE_IMAGE
    ? t('modelPlaza.table.perUnitImage')
    : t('modelPlaza.table.perUnitRequest')
}

function hasCachePricing(m: PlazaModel): boolean {
  return m.pricing?.cache_write_price != null || m.pricing?.cache_read_price != null
}

function hasOfficialCache(o: NonNullable<PlazaModel['official_pricing']>): boolean {
  return o.cache_write_price != null || o.cache_read_price != null || o.cache_write_1h_price != null
}

function tokenIntervals(m: PlazaModel): UserPricingInterval[] {
  return m.pricing?.intervals ?? []
}

function requestIntervals(m: PlazaModel): UserPricingInterval[] {
  return (m.pricing?.intervals ?? []).filter((iv) => iv.per_request_price != null)
}

function tierLabel(iv: UserPricingInterval): string {
  if (iv.tier_label) return iv.tier_label
  const { min_tokens: min, max_tokens: max } = iv
  if (max == null) return `>${formatTokenCount(min)}`
  if (min === 0) return `≤${formatTokenCount(max)}`
  return `${formatTokenCount(min)}–${formatTokenCount(max)}`
}

function formatTokenCount(n: number): string {
  if (n >= 1_000_000) return `${trimZero(n / 1_000_000)}M`
  if (n >= 1_000) return `${trimZero(n / 1_000)}K`
  return String(n)
}

function trimZero(n: number): string {
  return String(Math.round(n * 100) / 100)
}

function copyModelName(name: string) {
  void copyToClipboard(name)
}
</script>

<style scoped>
.plaza-pricing-table {
  --pz-title: color-mix(in srgb, var(--plaza-accent) 88%, black);
  --pz-bg: color-mix(in srgb, var(--plaza-accent) 7%, transparent);
  --pz-bg-hover: color-mix(in srgb, var(--plaza-accent) 13%, transparent);
}

.dark .plaza-pricing-table {
  --pz-title: color-mix(in srgb, var(--plaza-accent) 70%, white);
  --pz-bg: color-mix(in srgb, var(--plaza-accent) 6%, transparent);
  --pz-bg-hover: color-mix(in srgb, var(--plaza-accent) 10%, transparent);
}

.pz-bg,
.pz-cell {
  background-color: var(--pz-bg);
}

.pz-cell {
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

tbody tr:hover .pz-cell {
  background-color: var(--pz-bg-hover);
}

.pz-title {
  color: var(--plaza-accent);
  color: var(--pz-title);
  border-color: color-mix(in srgb, var(--pz-title) 30%, transparent);
}

.pz-unit {
  color: color-mix(in srgb, var(--pz-title) 62%, transparent);
}
</style>
