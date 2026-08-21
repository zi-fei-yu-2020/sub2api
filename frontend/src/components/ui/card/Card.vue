<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/utils/cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-xl border border-zinc-200/80 bg-white text-zinc-950 shadow-xs transition-all dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-50 backdrop-blur-xs',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
