<template>
  <div class="min-h-screen bg-[#f8fafc] text-slate-900 dark:bg-[#090d16] dark:text-slate-100 font-sans selection:bg-blue-500 selection:text-white transition-colors duration-200">
    <!-- Top Sticky Bar for switching mock tabs -->
    <div class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#090d16]/80 sm:px-8">
      <div class="mx-auto flex max-w-7xl items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm shadow-sm">
            S2
          </div>
          <span class="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
            设计稿预览看板 (Mock Preview)
          </span>
        </div>

        <!-- Tab Selector -->
        <div class="flex items-center rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            type="button"
            @click="activeTab = 'home'"
            :class="[
              'rounded-lg px-3.5 py-1.5 text-xs font-semibold transition',
              activeTab === 'home'
                ? 'bg-white text-blue-600 shadow-xs dark:bg-slate-900 dark:text-blue-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            ]"
          >
            🏠 首页大盘 (HomeView)
          </button>
          <button
            type="button"
            @click="activeTab = 'plaza'"
            :class="[
              'rounded-lg px-3.5 py-1.5 text-xs font-semibold transition',
              activeTab === 'plaza'
                ? 'bg-white text-blue-600 shadow-xs dark:bg-slate-900 dark:text-blue-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            ]"
          >
            ⚡ 模型广场 (ModelPlaza)
          </button>
          <button
            type="button"
            @click="activeTab = 'setup'"
            :class="[
              'rounded-lg px-3.5 py-1.5 text-xs font-semibold transition',
              activeTab === 'setup'
                ? 'bg-white text-blue-600 shadow-xs dark:bg-slate-900 dark:text-blue-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            ]"
          >
            🚀 安装向导 (SetupWizard)
          </button>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="toggleDark"
            class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            title="切换深浅色"
          >
            <span v-if="isDark">☀️</span>
            <span v-else>🌙</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ==================== TAB 1: 首页大盘设计稿 (Linear / Vercel 极简 SaaS 风格) ==================== -->
    <div v-if="activeTab === 'home'" class="min-h-[calc(100vh-61px)] flex flex-col justify-between">
      <!-- Hero Section -->
      <section class="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        <!-- Glows & Grid Pattern Background -->
        <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div class="absolute -top-40 left-1/2 -translate-x-1/2 h-[450px] w-[900px] rounded-full bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-teal-400/10 blur-[100px] dark:from-blue-600/20 dark:via-purple-600/15"></div>
          <div class="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] opacity-60"></div>
        </div>

        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <!-- Announcement Pill -->
          <div class="flex justify-center">
            <div class="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-medium text-blue-700 backdrop-blur-sm dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300">
              <span class="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>Sub2API v2.0 现已支持 Claude 3.7 Sonnet & Reasoning 计费</span>
              <span class="text-blue-400 dark:text-blue-500">→</span>
            </div>
          </div>

          <!-- Hero Main Title & Subtitle -->
          <div class="mt-8 text-center">
            <h1 class="text-4xl font-extrabold tracking-tight sm:text-6xl sm:leading-[1.15]">
              下一代统一高可用
              <span class="bg-gradient-to-r from-blue-600 via-indigo-500 to-teal-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-teal-300">
                AI 网关与订阅分发
              </span>
            </h1>
            <p class="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              聚合 Claude、OpenAI、DeepSeek、Gemini 与主流大模型平台，支持智能负载均衡、故障无感切换、动态阶梯计费与全渠道 Token 级管控。
            </p>

            <!-- Call to Actions -->
            <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500 hover:shadow-blue-600/35 active:scale-[0.98]">
                立即开启控制台
                <svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                查看实时模型广场
              </button>
            </div>
          </div>

          <!-- Hero Code / Terminal Demo Component (Modern Vercel Card Style) -->
          <div class="mt-16 sm:mt-20 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-900/95 p-1 shadow-2xl backdrop-blur-xl dark:border-slate-800">
            <!-- Terminal Header -->
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
            <!-- Terminal Code Body -->
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

          <!-- Feature Grid (3 Columns) -->
          <div class="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div class="group relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-blue-500/30 dark:border-slate-800/80 dark:bg-slate-900/50">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="mt-4 text-base font-bold text-slate-900 dark:text-white">高可用负载 & 故障重试</h3>
              <p class="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-normal">
                支持多上游账号并发加权调度，遇 429、500、超时自动在毫秒级无感降级转移至健康通道。
              </p>
            </div>

            <div class="group relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-indigo-500/30 dark:border-slate-800/80 dark:bg-slate-900/50">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                </svg>
              </div>
              <h3 class="mt-4 text-base font-bold text-slate-900 dark:text-white">精细化多维计费引擎</h3>
              <p class="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-normal">
                支持 Token 阶梯、Prompt Cache 命中计费、Reasoning 独立计费与峰谷时段动态倍率。
              </p>
            </div>

            <div class="group relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-teal-500/30 dark:border-slate-800/80 dark:bg-slate-900/50">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 class="mt-4 text-base font-bold text-slate-900 dark:text-white">企业级凭据与订阅安全</h3>
              <p class="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-normal">
                支持分组专属通道、白名单 IP 绑定、Passkey 免密硬件登录与 TOTP 二次安全认证。
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Clean Footer -->
      <footer class="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 dark:border-slate-800/80 dark:bg-[#090d16] dark:text-slate-400">
        <p>&copy; 2026 Sub2API. All rights reserved. 现代化 AI 网关与订阅管理系统</p>
      </footer>
    </div>

    <!-- ==================== TAB 2: 模型广场设计稿 (Modern Filter & Card/Table Hybrid) ==================== -->
    <div v-else class="min-h-[calc(100vh-61px)] flex flex-col justify-between">
      <main class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        <!-- Header Title Banner -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6 dark:border-slate-800">
          <div>
            <div class="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
              ⚡ 实时可用模型与公开透明定价
            </div>
            <h1 class="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              模型广场 (Model Plaza)
            </h1>
            <p class="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              浏览各服务分组可用的大模型列表、多维定价体系（输入/输出/Prompt缓存）与生效倍率
            </p>
          </div>

          <div class="flex items-center gap-3">
            <div class="relative w-full sm:w-64">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                v-model="modelSearch"
                placeholder="搜索模型，如 sonnet, gpt-4o..."
                class="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <!-- Filter Chips Bar (平台 / 分组 / 倍率) -->
        <div class="mt-6 space-y-3.5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/40">
          <!-- 平台选择 -->
          <div class="flex items-center gap-3">
            <span class="w-12 shrink-0 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">平台</span>
            <div class="flex flex-wrap items-center gap-2">
              <button
                v-for="p in ['全部平台', 'Claude', 'OpenAI', 'DeepSeek', 'Gemini', 'Grok']"
                :key="p"
                :class="[
                  'rounded-lg px-3 py-1.5 text-xs font-semibold transition',
                  selectedPlat === p
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                ]"
                @click="selectedPlat = p"
              >
                {{ p }}
              </button>
            </div>
          </div>

          <!-- 分组选择 -->
          <div class="flex items-center gap-3">
            <span class="w-12 shrink-0 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">分组</span>
            <div class="flex flex-wrap items-center gap-2">
              <button
                v-for="g in ['全部分组', '⚡ 极速稳定专线 (1.0x)', '🚀 VIP 高并发专线 (1.2x)', '💎 Claude 深度专属 (1.5x)']"
                :key="g"
                :class="[
                  'rounded-lg px-3 py-1.5 text-xs font-semibold transition',
                  selectedGroup === g
                    ? 'bg-slate-900 text-white shadow-xs dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                ]"
                @click="selectedGroup = g"
              >
                {{ g }}
              </button>
            </div>
          </div>
        </div>

        <!-- Group Sections with Modern Pricing Table & Cards -->
        <div class="mt-8 space-y-8">
          
          <!-- Group Card 1: 极速稳定专线 (Anthropic / Claude) -->
          <div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800/80 dark:bg-slate-900/60">
            <!-- Group Header -->
            <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <div class="flex items-center gap-3">
                <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 font-black text-xs">
                  C
                </span>
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-base font-bold text-slate-900 dark:text-white">Anthropic 专线分组</h2>
                    <span class="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-mono font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                      倍率: 1.0x
                    </span>
                    <span class="rounded-md bg-purple-50 px-2 py-0.5 text-[11px] font-semibold text-purple-700 dark:bg-purple-950/40 dark:text-purple-400">
                      🛡️ 专属通道
                    </span>
                  </div>
                  <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    支持 Claude 3.5 / 3.7 全系列，支持 Prompt Caching 与 Thinking 思考链
                  </p>
                </div>
              </div>

              <div class="text-xs text-slate-400">
                共 3 个可用模型
              </div>
            </div>

            <!-- Modern Table (Desktop) / Cards (Mobile) -->
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-400">
                    <th class="py-3 px-6">模型名称 (Model)</th>
                    <th class="py-3 px-4">实际扣费 (Input / 1M)</th>
                    <th class="py-3 px-4">实际扣费 (Output / 1M)</th>
                    <th class="py-3 px-4">Prompt 缓存写入 / 读取</th>
                    <th class="py-3 px-4 text-slate-400">官方原价参考</th>
                    <th class="py-3 px-6 text-right">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                  <!-- Row 1: Claude 3.7 Sonnet -->
                  <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    <td class="py-4 px-6 font-sans">
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-slate-900 dark:text-white">claude-3-7-sonnet-20250219</span>
                        <span class="rounded bg-orange-100 px-1.5 py-0.5 text-[10px] font-semibold text-orange-800 dark:bg-orange-950/50 dark:text-orange-300">NEW</span>
                      </div>
                      <span class="text-[11px] text-slate-400 font-sans">旗舰推理与混合思维模型</span>
                    </td>
                    <td class="py-4 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      $3.00 <span class="text-[10px] text-slate-400 font-normal font-sans">/ 1M</span>
                    </td>
                    <td class="py-4 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      $15.00 <span class="text-[10px] text-slate-400 font-normal font-sans">/ 1M</span>
                    </td>
                    <td class="py-4 px-4 text-slate-600 dark:text-slate-300">
                      <div>写: $3.75 <span class="text-[10px] text-slate-400">/ 1M</span></div>
                      <div>读: $0.30 <span class="text-[10px] text-slate-400">/ 1M</span></div>
                    </td>
                    <td class="py-4 px-4 text-slate-400 text-[11px]">
                      $3.00 / $15.00
                    </td>
                    <td class="py-4 px-6 text-right font-sans">
                      <button class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        复制名称
                      </button>
                    </td>
                  </tr>

                  <!-- Row 2: Claude 3.5 Sonnet -->
                  <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    <td class="py-4 px-6 font-sans">
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-slate-900 dark:text-white">claude-3-5-sonnet-20241022</span>
                        <span class="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-800 dark:bg-blue-950/50 dark:text-blue-300">POPULAR</span>
                      </div>
                      <span class="text-[11px] text-slate-400 font-sans">编码与逻辑最强基准模型</span>
                    </td>
                    <td class="py-4 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      $3.00 <span class="text-[10px] text-slate-400 font-normal font-sans">/ 1M</span>
                    </td>
                    <td class="py-4 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      $15.00 <span class="text-[10px] text-slate-400 font-normal font-sans">/ 1M</span>
                    </td>
                    <td class="py-4 px-4 text-slate-600 dark:text-slate-300">
                      <div>写: $3.75 <span class="text-[10px] text-slate-400">/ 1M</span></div>
                      <div>读: $0.30 <span class="text-[10px] text-slate-400">/ 1M</span></div>
                    </td>
                    <td class="py-4 px-4 text-slate-400 text-[11px]">
                      $3.00 / $15.00
                    </td>
                    <td class="py-4 px-6 text-right font-sans">
                      <button class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        复制名称
                      </button>
                    </td>
                  </tr>

                  <!-- Row 3: Claude 3.5 Haiku -->
                  <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    <td class="py-4 px-6 font-sans">
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-slate-900 dark:text-white">claude-3-5-haiku-20241022</span>
                      </div>
                      <span class="text-[11px] text-slate-400 font-sans">极速轻量低延迟模型</span>
                    </td>
                    <td class="py-4 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      $0.80 <span class="text-[10px] text-slate-400 font-normal font-sans">/ 1M</span>
                    </td>
                    <td class="py-4 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      $4.00 <span class="text-[10px] text-slate-400 font-normal font-sans">/ 1M</span>
                    </td>
                    <td class="py-4 px-4 text-slate-600 dark:text-slate-300">
                      <div>写: $1.00 <span class="text-[10px] text-slate-400">/ 1M</span></div>
                      <div>读: $0.08 <span class="text-[10px] text-slate-400">/ 1M</span></div>
                    </td>
                    <td class="py-4 px-4 text-slate-400 text-[11px]">
                      $0.80 / $4.00
                    </td>
                    <td class="py-4 px-6 text-right font-sans">
                      <button class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        复制名称
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Group Card 2: DeepSeek 满血专线 -->
          <div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800/80 dark:bg-slate-900/60">
            <!-- Group Header -->
            <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-4 dark:border-slate-800">
              <div class="flex items-center gap-3">
                <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 font-black text-xs">
                  DS
                </span>
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-base font-bold text-slate-900 dark:text-white">DeepSeek 官方满血分组</h2>
                    <span class="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-mono font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                      倍率: 1.0x
                    </span>
                  </div>
                  <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    DeepSeek V3 / R1 官方直连，全网高性价比推理之选
                  </p>
                </div>
              </div>

              <div class="text-xs text-slate-400">
                共 2 个可用模型
              </div>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider dark:border-slate-800 dark:bg-slate-950/30 dark:text-slate-400">
                    <th class="py-3 px-6">模型名称 (Model)</th>
                    <th class="py-3 px-4">实际扣费 (Input / 1M)</th>
                    <th class="py-3 px-4">实际扣费 (Output / 1M)</th>
                    <th class="py-3 px-4">Prompt 缓存命中</th>
                    <th class="py-3 px-4 text-slate-400">官方原价参考</th>
                    <th class="py-3 px-6 text-right">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                  <!-- Row 1: DeepSeek R1 -->
                  <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    <td class="py-4 px-6 font-sans">
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-slate-900 dark:text-white">deepseek-reasoner (R1)</span>
                        <span class="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-semibold text-purple-800 dark:bg-purple-950/50 dark:text-purple-300">REASONING</span>
                      </div>
                      <span class="text-[11px] text-slate-400 font-sans">满血深度思考模型 (64K 思考链)</span>
                    </td>
                    <td class="py-4 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      $0.55 <span class="text-[10px] text-slate-400 font-normal font-sans">/ 1M</span>
                    </td>
                    <td class="py-4 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      $2.19 <span class="text-[10px] text-slate-400 font-normal font-sans">/ 1M</span>
                    </td>
                    <td class="py-4 px-4 text-slate-600 dark:text-slate-300">
                      命中: $0.14 <span class="text-[10px] text-slate-400">/ 1M</span>
                    </td>
                    <td class="py-4 px-4 text-slate-400 text-[11px]">
                      $0.55 / $2.19
                    </td>
                    <td class="py-4 px-6 text-right font-sans">
                      <button class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        复制名称
                      </button>
                    </td>
                  </tr>

                  <!-- Row 2: DeepSeek V3 -->
                  <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    <td class="py-4 px-6 font-sans">
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-slate-900 dark:text-white">deepseek-chat (V3)</span>
                      </div>
                      <span class="text-[11px] text-slate-400 font-sans">高性价比通用大模型</span>
                    </td>
                    <td class="py-4 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      $0.27 <span class="text-[10px] text-slate-400 font-normal font-sans">/ 1M</span>
                    </td>
                    <td class="py-4 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      $1.10 <span class="text-[10px] text-slate-400 font-normal font-sans">/ 1M</span>
                    </td>
                    <td class="py-4 px-4 text-slate-600 dark:text-slate-300">
                      命中: $0.07 <span class="text-[10px] text-slate-400">/ 1M</span>
                    </td>
                    <td class="py-4 px-4 text-slate-400 text-[11px]">
                      $0.27 / $1.10
                    </td>
                    <td class="py-4 px-6 text-right font-sans">
                      <button class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                        复制名称
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      <!-- Clean Footer -->
      <footer class="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 dark:border-slate-800/80 dark:bg-[#090d16] dark:text-slate-400">
        <p>&copy; 2026 Sub2API. All rights reserved. 实时模型计费规则与费率看板</p>
      </footer>
    </div>

    <!-- ==================== TAB 3: 安装向导设计稿 (Linear / Vercel 极简 SaaS 风格) ==================== -->
    <div v-if="activeTab === 'setup'" class="min-h-[calc(100vh-61px)] flex flex-col justify-between py-10 px-4 sm:px-6">
      <!-- Glows & Grid Pattern Background -->
      <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div class="absolute -top-40 left-1/2 -translate-x-1/2 h-[450px] w-[900px] rounded-full bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-teal-400/10 blur-[100px] dark:from-blue-600/20 dark:via-purple-600/15"></div>
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]"></div>
      </div>

      <div class="mx-auto w-full max-w-2xl">
        <!-- Logo & Title -->
        <div class="mb-8 text-center">
          <div class="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xl shadow-lg shadow-blue-500/20">
            S2
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Sub2API 安装初始化向导</h1>
          <p class="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">只需 4 步，轻松完成高可用 AI 网关服务与存储引擎配置</p>
        </div>

        <!-- Modern Step Indicator -->
        <div class="mb-8 rounded-2xl border border-slate-200/80 bg-white/70 p-3 sm:p-4 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/60">
          <div class="flex items-center justify-between">
            <template v-for="(step, index) in mockSetupSteps" :key="step.id">
              <!-- Step Item -->
              <div
                class="flex flex-1 items-center cursor-pointer group"
                @click="mockSetupStep = index"
              >
                <div class="flex items-center gap-2.5">
                  <div
                    :class="[
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-all shadow-xs',
                      mockSetupStep > index
                        ? 'bg-blue-600 text-white shadow-blue-500/20'
                        : mockSetupStep === index
                          ? 'bg-blue-600 text-white ring-4 ring-blue-500/20 shadow-blue-500/30'
                          : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                    ]"
                  >
                    <svg v-if="mockSetupStep > index" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span v-else>{{ index + 1 }}</span>
                  </div>
                  <div class="hidden sm:block text-left">
                    <p
                      :class="[
                        'text-xs font-semibold leading-tight transition-colors',
                        mockSetupStep >= index
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-400 dark:text-slate-500'
                      ]"
                    >
                      {{ step.title }}
                    </p>
                    <p class="text-[10px] text-slate-400 dark:text-slate-500">Step {{ index + 1 }}</p>
                  </div>
                </div>
              </div>

              <!-- Connecting Line -->
              <div
                v-if="index < mockSetupSteps.length - 1"
                :class="[
                  'mx-2 h-0.5 w-6 sm:w-10 rounded-full transition-colors',
                  mockSetupStep > index ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'
                ]"
              ></div>
            </template>
          </div>
        </div>

        <!-- Main Card Container -->
        <div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/80">
          <!-- Step 1: Database -->
          <div v-if="mockSetupStep === 0" class="space-y-6">
            <div>
              <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🗄️</span> 数据库配置 (PostgreSQL)
              </h2>
              <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Sub2API 使用 PostgreSQL 存储核心账号、渠道、路由规则及 Token 消耗流水。
              </p>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div class="sm:col-span-2">
                <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">主机地址</label>
                <input
                  v-model="mockDb.host"
                  type="text"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                  placeholder="localhost"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">端口</label>
                <input
                  v-model="mockDb.port"
                  type="number"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                  placeholder="5432"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">数据库用户名</label>
                <input
                  v-model="mockDb.user"
                  type="text"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                  placeholder="postgres"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">数据库密码</label>
                <input
                  v-model="mockDb.password"
                  type="password"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">数据库名称</label>
                <input
                  v-model="mockDb.dbname"
                  type="text"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                  placeholder="sub2api"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">SSL 连接模式</label>
                <select
                  v-model="mockDb.sslmode"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950 cursor-pointer"
                >
                  <option value="disable">禁用 (disable)</option>
                  <option value="require">要求加密 (require)</option>
                  <option value="verify-ca">验证 CA (verify-ca)</option>
                  <option value="verify-full">完全验证 (verify-full)</option>
                </select>
              </div>
            </div>

            <!-- Test Connection Button -->
            <button
              type="button"
              @click="mockTestDb"
              class="w-full inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700 active:scale-[0.99] cursor-pointer"
            >
              <svg v-if="mockDbTesting" class="mr-2 h-4 w-4 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else-if="mockDbConnected" class="mr-2 h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>{{ mockDbTesting ? '正在测试数据库连通性...' : mockDbConnected ? '数据库连接成功' : '测试数据库连接' }}</span>
            </button>
          </div>

          <!-- Step 2: Redis -->
          <div v-if="mockSetupStep === 1" class="space-y-6">
            <div>
              <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>⚡</span> Redis 缓存与分布式锁配置
              </h2>
              <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                用于高效网关限流 (RPM/TPM)、分布式调度仲裁、用户 Session 及实时指标统计。
              </p>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div class="sm:col-span-2">
                <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Redis 主机地址</label>
                <input
                  v-model="mockRedis.host"
                  type="text"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                  placeholder="localhost"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">端口</label>
                <input
                  v-model="mockRedis.port"
                  type="number"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                  placeholder="6379"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">用户名 (可选)</label>
                <input
                  v-model="mockRedis.username"
                  type="text"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                  placeholder="默认留空"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">密码 (可选)</label>
                <input
                  v-model="mockRedis.password"
                  type="password"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">DB 编号</label>
                <input
                  v-model="mockRedis.db"
                  type="number"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                  placeholder="0"
                />
              </div>
            </div>

            <!-- TLS Toggle Card -->
            <div class="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/40">
              <div>
                <p class="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">启用 TLS 安全加密连接</p>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">连接 Upstash / 云厂商托管 Redis 时使用 TLS (公共 CA 证书)</p>
              </div>
              <button
                type="button"
                @click="mockRedis.enable_tls = !mockRedis.enable_tls"
                :class="[
                  'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                  mockRedis.enable_tls ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                    mockRedis.enable_tls ? 'translate-x-5' : 'translate-x-0'
                  ]"
                />
              </button>
            </div>

            <!-- Test Redis Connection Button -->
            <button
              type="button"
              @click="mockTestRedis"
              class="w-full inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700 active:scale-[0.99] cursor-pointer"
            >
              <svg v-if="mockRedisTesting" class="mr-2 h-4 w-4 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else-if="mockRedisConnected" class="mr-2 h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>{{ mockRedisTesting ? '正在测试 Redis 连通性...' : mockRedisConnected ? 'Redis 连接成功' : '测试 Redis 连接' }}</span>
            </button>
          </div>

          <!-- Step 3: Admin -->
          <div v-if="mockSetupStep === 2" class="space-y-6">
            <div>
              <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>👑</span> 超级管理员账户初始化
              </h2>
              <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                创建首个初始超级管理员账户，享有全站最高控制权限与后台配置能力。
              </p>
            </div>

            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">管理员邮箱</label>
              <input
                v-model="mockAdmin.email"
                type="email"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">管理员登录密码</label>
              <input
                v-model="mockAdmin.password"
                type="password"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                placeholder="至少 8 个字符（包含字母与数字）"
              />
            </div>

            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">确认登录密码</label>
              <input
                v-model="mockAdmin.confirmPassword"
                type="password"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                placeholder="请再次输入登录密码"
              />
              <p v-if="mockAdmin.confirmPassword && mockAdmin.password !== mockAdmin.confirmPassword" class="mt-1 text-xs text-rose-500 font-medium">
                两次输入的密码不一致
              </p>
            </div>
          </div>

          <!-- Step 4: Ready to Install -->
          <div v-if="mockSetupStep === 3" class="space-y-6">
            <div>
              <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>📋</span> 配置清单核对与安装确认
              </h2>
              <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
                请确认以下基础设施与管理员配置无误，点击下方按钮将自动执行数据库迁移并启动服务。
              </p>
            </div>

            <div class="space-y-3">
              <!-- Summary: DB -->
              <div class="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">数据库存储</span>
                  <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>已就绪
                  </span>
                </div>
                <p class="mt-2 font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {{ mockDb.user }}@{{ mockDb.host }}:{{ mockDb.port }}/{{ mockDb.dbname }}
                </p>
              </div>

              <!-- Summary: Redis -->
              <div class="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Redis 缓存</span>
                  <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>已就绪
                  </span>
                </div>
                <p class="mt-2 font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {{ mockRedis.host }}:{{ mockRedis.port }} (DB {{ mockRedis.db }}) {{ mockRedis.enable_tls ? '• TLS 加密' : '' }}
                </p>
              </div>

              <!-- Summary: Admin -->
              <div class="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">初始管理员邮箱</span>
                  <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                    超级管理员
                  </span>
                </div>
                <p class="mt-2 font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {{ mockAdmin.email || 'admin@example.com' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="mt-8 flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
            <button
              v-if="mockSetupStep > 0"
              type="button"
              @click="mockSetupStep--"
              class="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              上一步
            </button>
            <div v-else></div>

            <button
              v-if="mockSetupStep < 3"
              type="button"
              @click="mockSetupStep++"
              class="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-500 active:scale-[0.98] cursor-pointer"
            >
              下一步
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            <button
              v-else
              type="button"
              class="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] cursor-pointer"
            >
              🚀 立即执行安装与初始化
            </button>
          </div>
        </div>
      </div>

      <!-- Clean Footer -->
      <footer class="mt-8 text-center text-xs text-slate-400 dark:text-slate-600">
        &copy; 2026 Sub2API Open Source System Setup
      </footer>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const activeTab = ref<'home' | 'plaza' | 'setup'>('setup')
const isDark = ref(false)

const selectedPlat = ref('全部平台')
const selectedGroup = ref('全部分组')
const modelSearch = ref('')

// Mock Setup Wizard State
const mockSetupStep = ref(0)
const mockSetupSteps = [
  { id: 'database', title: '数据库配置' },
  { id: 'redis', title: 'Redis 配置' },
  { id: 'admin', title: '管理员账户' },
  { id: 'complete', title: '完成安装' }
]

const mockDb = reactive({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '',
  dbname: 'sub2api',
  sslmode: 'disable'
})
const mockDbTesting = ref(false)
const mockDbConnected = ref(true)

function mockTestDb() {
  mockDbTesting.value = true
  setTimeout(() => {
    mockDbTesting.value = false
    mockDbConnected.value = true
  }, 600)
}

const mockRedis = reactive({
  host: 'localhost',
  port: 6379,
  username: '',
  password: '',
  db: 0,
  enable_tls: false
})
const mockRedisTesting = ref(false)
const mockRedisConnected = ref(true)

function mockTestRedis() {
  mockRedisTesting.value = true
  setTimeout(() => {
    mockRedisTesting.value = false
    mockRedisConnected.value = true
  }, 600)
}

const mockAdmin = reactive({
  email: 'admin@example.com',
  password: 'Password123!',
  confirmPassword: 'Password123!'
})

function toggleDark() {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>
