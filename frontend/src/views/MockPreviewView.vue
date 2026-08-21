<template>
  <div class="min-h-screen bg-[#f4f6fa] text-slate-800 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
    <!-- Top Navigation Bar -->
    <header class="flex h-16 w-full items-center justify-between px-6 sm:px-10 bg-transparent">
      <div class="flex items-center gap-3">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3b82f6] shadow-sm">
          <span class="font-black text-white text-sm tracking-tight">S2</span>
        </div>
        <span class="text-xl font-bold tracking-tight text-slate-900">Sub2API</span>
      </div>

      <div class="flex items-center gap-3">
        <a
          href="/login"
          class="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
        >
          已有账号？去登录
        </a>
      </div>
    </header>

    <!-- Main Content Area: Centered Auth Card -->
    <main class="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div class="w-full max-w-[1020px] overflow-hidden rounded-[24px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col md:flex-row">
        
        <!-- Left Side: Brand Showcase Panel -->
        <div class="relative w-full md:w-[46%] bg-gradient-to-br from-[#eff5ff] via-[#f1f6ff] to-[#e8f1fd] p-8 sm:p-10 lg:p-12 flex flex-col justify-between overflow-hidden">
          
          <!-- 3D Glass Layer Elements in Background -->
          <div class="pointer-events-none absolute right-[-40px] top-[10%] h-[320px] w-[260px] rotate-[22deg] rounded-3xl bg-gradient-to-br from-white/70 via-blue-200/25 to-blue-400/20 backdrop-blur-md border border-white/80 shadow-[0_15px_35px_rgba(59,130,246,0.12)]"></div>
          <div class="pointer-events-none absolute right-[30px] top-[26%] h-[280px] w-[220px] rotate-[22deg] rounded-3xl bg-gradient-to-br from-white/60 via-blue-100/30 to-blue-300/15 backdrop-blur-sm border border-white/70 shadow-[0_10px_25px_rgba(59,130,246,0.08)]"></div>

          <!-- Brand Info -->
          <div class="relative z-10">
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200/80 bg-white shadow-sm mb-6">
              <span class="text-base font-bold text-[#3b82f6]">S2</span>
            </div>

            <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">
              Sub2API
            </h1>
            <p class="mt-2 text-sm text-slate-500 font-normal">
              下一代 AI 网关与订阅管理平台
            </p>
          </div>

          <!-- Feature Bullets -->
          <div class="relative z-10 mt-12 space-y-6">
            <!-- Item 1 -->
            <div class="flex items-center gap-4">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e0ecff] text-[#3b82f6]">
                <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900">高效稳定</h3>
                <p class="text-xs text-slate-500 mt-0.5">极速响应，高可用架构</p>
              </div>
            </div>

            <!-- Item 2 -->
            <div class="flex items-center gap-4">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e0ecff] text-[#3b82f6]">
                <svg class="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900">安全可靠</h3>
                <p class="text-xs text-slate-500 mt-0.5">多重防护，数据安全无忧</p>
              </div>
            </div>

            <!-- Item 3 -->
            <div class="flex items-center gap-4">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e0ecff] text-[#3b82f6]">
                <svg class="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="2"/>
                  <rect x="14" y="3" width="7" height="7" rx="2"/>
                  <rect x="14" y="14" width="7" height="7" rx="2"/>
                  <rect x="3" y="14" width="7" height="7" rx="2"/>
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900">灵活易用</h3>
                <p class="text-xs text-slate-500 mt-0.5">简洁的 API 管理与订阅体验</p>
              </div>
            </div>
          </div>

        </div>

        <!-- Right Side: Registration Form -->
        <div class="w-full md:w-[54%] bg-white p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
          <div>
            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              创建新账号
            </h2>
            <p class="mt-2 text-sm text-slate-500">
              注册您的 Sub2API 账号开启高效体验
            </p>
          </div>

          <form @submit.prevent="handleRegister" class="mt-8 space-y-4">
            <!-- Email Field -->
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1.5">
                电子邮箱
              </label>
              <input
                v-model="email"
                type="email"
                placeholder="name@example.com"
                required
                class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4374f6] focus:ring-4 focus:ring-[#4374f6]/10"
              />
            </div>

            <!-- Password Field -->
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1.5">
                设置密码
              </label>
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="至少 6 位字符"
                  required
                  class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-11 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4374f6] focus:ring-4 focus:ring-[#4374f6]/10"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition"
                >
                  <svg v-if="showPassword" class="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                  <svg v-else class="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Invitation Code (Optional) -->
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1.5">
                邀请码 <span class="text-slate-400 font-normal">(选填)</span>
              </label>
              <input
                v-model="invitationCode"
                type="text"
                placeholder="如有邀请码请输入"
                class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4374f6] focus:ring-4 focus:ring-[#4374f6]/10"
              />
            </div>

            <!-- Promo Code (Optional) -->
            <div>
              <label class="block text-xs font-medium text-slate-700 mb-1.5">
                优惠码 <span class="text-slate-400 font-normal">(选填)</span>
              </label>
              <input
                v-model="promoCode"
                type="text"
                placeholder="如有优惠码请输入"
                class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#4374f6] focus:ring-4 focus:ring-[#4374f6]/10"
              />
            </div>

            <!-- Terms & Agreement Checkbox -->
            <div class="flex items-center gap-2 pt-1">
              <input
                id="agreeTerms"
                v-model="agreeTerms"
                type="checkbox"
                class="h-4 w-4 rounded border-slate-300 text-[#3b82f6] focus:ring-[#3b82f6]/20 cursor-pointer"
              />
              <label for="agreeTerms" class="text-xs text-slate-500 cursor-pointer select-none">
                我已阅读并同意
                <a href="#" class="text-[#3b82f6] hover:underline" @click.prevent>服务条款</a>
                和
                <a href="#" class="text-[#3b82f6] hover:underline" @click.prevent>隐私政策</a>
              </label>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full mt-2 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#4374f6] to-[#3b82f6] py-3.5 px-4 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition duration-150 hover:shadow-lg hover:shadow-blue-500/30 hover:brightness-105 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>立即注册</span>
            </button>

            <!-- OAuth Divider & Options -->
            <div class="relative my-6 pt-2">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-slate-100"></div>
              </div>
              <div class="relative flex justify-center text-xs">
                <span class="bg-white px-4 text-slate-400 font-normal">或者通过以下方式快捷注册</span>
              </div>
            </div>

            <!-- OAuth Grid -->
            <div class="grid grid-cols-2 gap-3">
              <!-- GitHub Button -->
              <button
                type="button"
                class="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 px-4 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
              >
                <svg class="h-4 w-4 text-slate-900 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </button>

              <!-- LinuxDo Button -->
              <button
                type="button"
                class="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 px-4 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
              >
                <svg class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="m7.44,0s.09,0,.13,0c.09,0,.19,0,.28,0,.14,0,.29,0,.43,0,.09,0,.18,0,.27,0q.12,0,.25,0t.26.08c.15.03.29.06.44.08,1.97.38,3.78,1.47,4.95,3.11.04.06.09.12.13.18.67.96,1.15,2.11,1.3,3.28q0,.19.09.26c0,.15,0,.29,0,.44,0,.04,0,.09,0,.13,0,.09,0,.19,0,.28,0,.14,0,.29,0,.43,0,.09,0,.18,0,.27,0,.08,0,.17,0,.25q0,.19-.08.26c-.03.15-.06.29-.08.44-.38,1.97-1.47,3.78-3.11,4.95-.06.04-.12.09-.18.13-.96.67-2.11,1.15-3.28,1.3q-.19,0-.26.09c-.15,0-.29,0-.44,0-.04,0-.09,0-.13,0-.09,0-.19,0-.28,0-.14,0-.29,0-.43,0-.09,0-.18,0-.27,0-.08,0-.17,0-.25,0q-.19,0-.26-.08c-.15-.03-.29-.06-.44-.08-1.97-.38-3.78-1.47-4.95-3.11q-.07-.09-.13-.18c-.67-.96-1.15-2.11-1.3-3.28q0-.19-.09-.26c0-.15,0-.29,0-.44,0-.04,0-.09,0-.13,0-.09,0-.19,0-.28,0-.14,0-.29,0-.43,0-.09,0-.18,0-.27,0-.08,0-.17,0-.25,0q-.19,0-.26.09c-.15.03-.29.06-.44.08-1.97.38-3.78,1.47-4.95,3.11q-.07.09-.13.18c-.67.96-1.15 2.11-1.3 3.28q0 .19.09.26c0 .15 0 .29 0 .44 0 .04 0 .09 0 .13 0 .09 0 .19 0 .28 0 .14 0 .29 0 .43 0 .09 0 .18 0 .27 0 .08 0 .17 0 .25q0 .19.08.26c.03.15.06.29.08.44.38 1.97 1.47 3.78 3.11 4.95.06.04.12.09.18.13C4.42.73,5.57.26,6.74.1,7,.07,7.15,0,7.44,0Z" fill="#E95420"/>
                </svg>
                <span>LINUX DO</span>
              </button>
            </div>
          </form>

          <!-- Footer Text -->
          <div class="mt-6 text-center text-xs text-slate-500">
            已有账号？
            <a href="/login" class="font-semibold text-[#3b82f6] hover:text-[#2563eb] transition ml-1">
              立即登录
            </a>
          </div>

        </div>

      </div>
    </main>

    <!-- Footer Copyright -->
    <footer class="py-6 text-center text-xs text-slate-400">
      &copy; 2026 Sub2API. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const invitationCode = ref('')
const promoCode = ref('')
const agreeTerms = ref(true)
const showPassword = ref(false)
const loading = ref(false)

function handleRegister() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    alert('Mock 注册演示成功！')
  }, 1000)
}
</script>
