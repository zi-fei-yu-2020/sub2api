<template>
  <div class="space-y-6">
    <!-- 页头(独立形态下展示标题;后台形态 AppHeader 已有页面标题) -->
    <div v-if="!embedded" class="border-b border-slate-200/80 pb-6 dark:border-slate-800">
      <div class="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
        ⚡ 实时可用模型与公开透明定价
      </div>
      <h1 class="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        {{ t('modelPlaza.title') }}
      </h1>
      <p class="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
        {{ t('modelPlaza.description') }}
      </p>
    </div>

    <!-- 全局价格说明(管理员配置,Markdown) -->
    <div
      v-if="descriptionHtml"
      class="plaza-description rounded-2xl border border-slate-200/80 bg-white p-5 text-xs text-slate-700 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/60 dark:text-slate-300 leading-relaxed"
      v-html="descriptionHtml"
    ></div>

    <!-- 未登录提示 -->
    <div
      v-if="!isAuthenticated"
      class="flex items-center gap-2 rounded-xl bg-blue-50/70 border border-blue-100 p-3 text-xs text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300"
    >
      <Icon name="infoCircle" size="sm" class="shrink-0" />
      <span>{{ t('modelPlaza.anonymousHint') }}</span>
    </div>

    <!-- 加载/错误/空 -->
    <div v-if="loading" class="flex min-h-[240px] items-center justify-center">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-blue-600/25 border-t-blue-600 dark:border-blue-400/25 dark:border-t-blue-400"></div>
    </div>
    <div
      v-else-if="error"
      class="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-8 text-center text-xs font-semibold text-rose-600 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-400"
    >
      {{ t('modelPlaza.loadFailed') }}
    </div>
    <template v-else>
      <!-- 筛选区:平台 → 分组 → 倍率 -->
      <PlazaFilterBar
        :platforms="platforms"
        :groups="groupOptions"
        :rates="rates"
        :platform="selectedPlatform"
        :group-id="selectedGroupId"
        :rate="selectedRate"
        :search="searchQuery"
        @update:platform="selectedPlatform = $event"
        @update:group-id="selectedGroupId = $event"
        @update:rate="selectedRate = $event"
        @update:search="searchQuery = $event"
      />

      <!-- 分组分节的模型清单(默认按生效倍率升序) -->
      <div v-if="filteredGroups.length > 0" class="space-y-6">
        <PlazaGroupSection v-for="g in filteredGroups" :key="g.id" :group="g" />
      </div>
      <div
        v-else
        class="rounded-2xl border border-dashed border-slate-300 px-5 py-12 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400"
      >
        {{ searchActive ? t('modelPlaza.noSearchResult') : t('modelPlaza.empty') }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import Icon from '@/components/icons/Icon.vue'
import PlazaFilterBar from './PlazaFilterBar.vue'
import PlazaGroupSection from './PlazaGroupSection.vue'
import type { ModelPlazaGroup, ModelPlazaResponse } from '@/api/modelPlaza'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{
  response: ModelPlazaResponse | null
  loading: boolean
  error?: boolean
  /** 后台内嵌形态(AppLayout 内):隐藏页头。 */
  embedded?: boolean
}>()

const { t } = useI18n()
const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)

const selectedPlatform = ref<string>('all')
const selectedGroupId = ref<number | 'all'>('all')
const selectedRate = ref<number | 'all'>('all')
const searchQuery = ref('')

const searchActive = computed(() => searchQuery.value.trim() !== '')

const descriptionHtml = computed(() => {
  const md = props.response?.description?.trim()
  if (!md) return ''
  return DOMPurify.sanitize(marked.parse(md) as string)
})

function effectiveRate(g: ModelPlazaGroup): number {
  return g.user_rate_multiplier ?? g.rate_multiplier
}

const platforms = computed(() =>
  [...new Set((props.response?.groups ?? []).map((g) => g.platform).filter(Boolean))].sort()
)

const groupOptions = computed(() =>
  (props.response?.groups ?? []).map((g) => ({
    id: g.id,
    name: g.name,
    platform: g.platform,
    rate: effectiveRate(g)
  }))
)

const rates = computed(() =>
  [...new Set((props.response?.groups ?? []).map((g) => effectiveRate(g)))].sort((a, b) => a - b)
)

const filteredGroups = computed(() => {
  const all = props.response?.groups ?? []
  const query = searchQuery.value.trim().toLowerCase()

  return all
    .filter((g) => {
      if (selectedPlatform.value !== 'all' && g.platform !== selectedPlatform.value) return false
      if (selectedGroupId.value !== 'all' && g.id !== selectedGroupId.value) return false
      if (selectedRate.value !== 'all' && effectiveRate(g) !== selectedRate.value) return false
      return true
    })
    .map((g) => {
      if (!query) return g
      const matched = g.models.filter((m) => m.name.toLowerCase().includes(query))
      return { ...g, models: matched }
    })
    .filter((g) => !query || g.models.length > 0)
    .sort((a, b) => effectiveRate(a) - effectiveRate(b))
})

watch(
  () => props.response,
  () => {
    selectedPlatform.value = 'all'
    selectedGroupId.value = 'all'
    selectedRate.value = 'all'
    searchQuery.value = ''
  }
)
</script>
