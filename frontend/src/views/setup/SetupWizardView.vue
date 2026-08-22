<template>
  <div class="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#f8fafc] text-slate-900 transition-colors duration-200 dark:bg-[#090d16] dark:text-slate-100 py-10 px-4 sm:px-6">
    <!-- Glows & Dot/Grid Pattern Background -->
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        class="absolute -top-40 left-1/2 -translate-x-1/2 h-[450px] w-[900px] rounded-full bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-teal-400/10 blur-[100px] dark:from-blue-600/20 dark:via-purple-600/15"
      ></div>
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]"
      ></div>
    </div>

    <div class="mx-auto w-full max-w-2xl">
      <!-- Logo & Title -->
      <div class="mb-8 text-center">
        <div
          class="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xl shadow-lg shadow-blue-500/20"
        >
          <Icon name="cog" size="lg" class="text-white" />
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {{ t('setup.title') }}
        </h1>
        <p class="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {{ t('setup.description') }}
        </p>
      </div>

      <!-- Modern Step Indicator -->
      <div class="mb-8 rounded-2xl border border-slate-200/80 bg-white/70 p-3 sm:p-4 shadow-sm backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/60">
        <div class="flex items-center justify-between">
          <template v-for="(step, index) in steps" :key="step.id">
            <!-- Step Item -->
            <div
              class="flex flex-1 items-center cursor-pointer group"
              @click="currentStep > index ? (currentStep = index) : null"
            >
              <div class="flex items-center gap-2.5">
                <div
                  :class="[
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-all shadow-xs',
                    currentStep > index
                      ? 'bg-blue-600 text-white shadow-blue-500/20'
                      : currentStep === index
                        ? 'bg-blue-600 text-white ring-4 ring-blue-500/20 shadow-blue-500/30'
                        : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                  ]"
                >
                  <Icon
                    v-if="currentStep > index"
                    name="check"
                    size="sm"
                    :stroke-width="2.5"
                  />
                  <span v-else>{{ index + 1 }}</span>
                </div>
                <div class="hidden sm:block text-left">
                  <p
                    :class="[
                      'text-xs font-semibold leading-tight transition-colors',
                      currentStep >= index
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
              v-if="index < steps.length - 1"
              :class="[
                'mx-2 h-0.5 w-6 sm:w-10 rounded-full transition-colors',
                currentStep > index ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'
              ]"
            ></div>
          </template>
        </div>
      </div>

      <!-- Main Step Container Card -->
      <div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/80">
        <!-- Step 1: Database -->
        <div v-if="currentStep === 0" class="space-y-6">
          <div>
            <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🗄️</span> {{ t('setup.database.title') }}
            </h2>
            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {{ t('setup.database.description') }}
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="sm:col-span-2">
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {{ t('setup.database.host') }}
              </label>
              <input
                v-model="formData.database.host"
                type="text"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                placeholder="localhost"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {{ t('setup.database.port') }}
              </label>
              <input
                v-model.number="formData.database.port"
                type="number"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                placeholder="5432"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {{ t('setup.database.username') }}
              </label>
              <input
                v-model="formData.database.user"
                type="text"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                placeholder="postgres"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {{ t('setup.database.password') }}
              </label>
              <input
                v-model="formData.database.password"
                type="password"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                :placeholder="t('setup.database.passwordPlaceholder')"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {{ t('setup.database.databaseName') }}
              </label>
              <input
                v-model="formData.database.dbname"
                type="text"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                placeholder="sub2api"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {{ t('setup.database.sslMode') }}
              </label>
              <select
                v-model="formData.database.sslmode"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950 cursor-pointer"
              >
                <option value="disable">{{ t('setup.database.ssl.disable') }} (disable)</option>
                <option value="require">{{ t('setup.database.ssl.require') }} (require)</option>
                <option value="verify-ca">{{ t('setup.database.ssl.verifyCa') }} (verify-ca)</option>
                <option value="verify-full">{{ t('setup.database.ssl.verifyFull') }} (verify-full)</option>
              </select>
            </div>
          </div>

          <!-- Test Connection Button -->
          <button
            type="button"
            @click="testDatabaseConnection"
            :disabled="testingDb"
            class="w-full inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700 active:scale-[0.99] cursor-pointer"
          >
            <svg
              v-if="testingDb"
              class="-ml-1 mr-2 h-4 w-4 animate-spin text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <Icon
              v-else-if="dbConnected"
              name="check"
              size="md"
              class="mr-2 text-emerald-500"
              :stroke-width="2.5"
            />
            {{
              testingDb
                ? t('setup.status.testing')
                : dbConnected
                  ? t('setup.status.success')
                  : t('setup.status.testConnection')
            }}
          </button>
        </div>

        <!-- Step 2: Redis -->
        <div v-if="currentStep === 1" class="space-y-6">
          <div>
            <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>⚡</span> {{ t('setup.redis.title') }}
            </h2>
            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {{ t('setup.redis.description') }}
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="sm:col-span-2">
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {{ t('setup.redis.host') }}
              </label>
              <input
                v-model="formData.redis.host"
                type="text"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                placeholder="localhost"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {{ t('setup.redis.port') }}
              </label>
              <input
                v-model.number="formData.redis.port"
                type="number"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                placeholder="6379"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {{ t('setup.redis.username') }}
              </label>
              <input
                v-model="formData.redis.username"
                type="text"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                :placeholder="t('setup.redis.usernamePlaceholder')"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {{ t('setup.redis.password') }}
              </label>
              <input
                v-model="formData.redis.password"
                type="password"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                :placeholder="t('setup.redis.passwordPlaceholder')"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {{ t('setup.redis.database') }}
              </label>
              <input
                v-model.number="formData.redis.db"
                type="number"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
                placeholder="0"
              />
            </div>
          </div>

          <!-- TLS Toggle Card -->
          <div class="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/40">
            <div>
              <p class="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                {{ t('setup.redis.enableTls') }}
              </p>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">
                {{ t('setup.redis.enableTlsHint') }}
              </p>
            </div>
            <Toggle v-model="formData.redis.enable_tls" />
          </div>

          <!-- Test Redis Connection Button -->
          <button
            type="button"
            @click="testRedisConnection"
            :disabled="testingRedis"
            class="w-full inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700 active:scale-[0.99] cursor-pointer"
          >
            <svg
              v-if="testingRedis"
              class="-ml-1 mr-2 h-4 w-4 animate-spin text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <Icon
              v-else-if="redisConnected"
              name="check"
              size="md"
              class="mr-2 text-emerald-500"
              :stroke-width="2.5"
            />
            {{
              testingRedis
                ? t('setup.status.testing')
                : redisConnected
                  ? t('setup.status.success')
                  : t('setup.status.testConnection')
            }}
          </button>
        </div>

        <!-- Step 3: Admin -->
        <div v-if="currentStep === 2" class="space-y-6">
          <div>
            <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>👑</span> {{ t('setup.admin.title') }}
            </h2>
            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {{ t('setup.admin.description') }}
            </p>
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {{ t('setup.admin.email') }}
            </label>
            <input
              v-model="formData.admin.email"
              type="email"
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {{ t('setup.admin.password') }}
            </label>
            <input
              v-model="formData.admin.password"
              type="password"
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
              :placeholder="t('setup.admin.passwordPlaceholder')"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              {{ t('setup.admin.confirmPassword') }}
            </label>
            <input
              v-model="confirmPassword"
              type="password"
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:focus:border-blue-400 dark:focus:bg-slate-950"
              :placeholder="t('setup.admin.confirmPasswordPlaceholder')"
            />
            <p
              v-if="confirmPassword && formData.admin.password !== confirmPassword"
              class="mt-1.5 text-xs font-medium text-rose-500"
            >
              {{ t('setup.admin.passwordMismatch') }}
            </p>
          </div>
        </div>

        <!-- Step 4: Complete -->
        <div v-if="currentStep === 3" class="space-y-6">
          <div>
            <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>📋</span> {{ t('setup.ready.title') }}
            </h2>
            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {{ t('setup.ready.description') }}
            </p>
          </div>

          <div class="space-y-3">
            <div class="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/40">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {{ t('setup.ready.database') }}
                </span>
                <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>{{ t('setup.status.success') }}
                </span>
              </div>
              <p class="mt-2 font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {{ formData.database.user }}@{{ formData.database.host }}:{{
                  formData.database.port
                }}/{{ formData.database.dbname }}
              </p>
            </div>

            <div class="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/40">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {{ t('setup.ready.redis') }}
                </span>
                <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>{{ t('setup.status.success') }}
                </span>
              </div>
              <p class="mt-2 font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {{ formData.redis.host }}:{{ formData.redis.port }} (DB {{ formData.redis.db }})
                {{ formData.redis.enable_tls ? '• TLS' : '' }}
              </p>
            </div>

            <div class="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/40">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {{ t('setup.ready.adminEmail') }}
                </span>
                <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                  {{ t('setup.admin.title') }}
                </span>
              </div>
              <p class="mt-2 font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {{ formData.admin.email }}
              </p>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800/50 dark:bg-red-900/20"
        >
          <div class="flex items-start gap-3">
            <Icon name="exclamationCircle" size="md" class="flex-shrink-0 text-red-500" />
            <p class="text-xs sm:text-sm text-red-700 dark:text-red-400">{{ errorMessage }}</p>
          </div>
        </div>

        <!-- Success Message -->
        <div
          v-if="installSuccess"
          class="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800/50 dark:bg-green-900/20"
        >
          <div class="flex items-start gap-3">
            <svg
              v-if="!serviceReady"
              class="h-5 w-5 flex-shrink-0 animate-spin text-green-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <Icon v-else name="checkCircle" size="md" class="flex-shrink-0 text-green-500" />
            <div>
              <p class="text-sm font-medium text-green-700 dark:text-green-400">
                {{ t('setup.status.completed') }}
              </p>
              <p class="mt-1 text-xs text-green-600 dark:text-green-500">
                {{
                  serviceReady
                    ? t('setup.status.redirecting')
                    : t('setup.status.restarting')
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- Navigation Action Buttons -->
        <div class="mt-8 flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
          <button
            v-if="currentStep > 0 && !installSuccess"
            type="button"
            @click="currentStep--"
            class="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
          >
            <Icon name="chevronLeft" size="sm" :stroke-width="2" />
            {{ t('common.back') }}
          </button>
          <div v-else></div>

          <button
            v-if="currentStep < 3"
            type="button"
            @click="nextStep"
            :disabled="!canProceed"
            class="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] cursor-pointer"
          >
            {{ t('common.next') }}
            <Icon name="chevronRight" size="sm" :stroke-width="2" />
          </button>

          <button
            v-else-if="!installSuccess"
            type="button"
            @click="performInstall"
            :disabled="installing"
            class="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] cursor-pointer"
          >
            <svg
              v-if="installing"
              class="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ installing ? t('setup.status.installing') : t('setup.status.completeInstallation') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Clean Footer -->
    <footer class="mt-8 text-center text-xs text-slate-400 dark:text-slate-600">
      &copy; 2026 Sub2API Open Source System Setup
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { testDatabase, testRedis, install, type InstallRequest } from '@/api/setup'
import { buildGatewayUrl } from '@/api/client'
import Toggle from '@/components/common/Toggle.vue'
import Icon from '@/components/icons/Icon.vue'

const { t } = useI18n()

const steps = computed(() => [
  { id: 'database', title: t('setup.database.title') },
  { id: 'redis', title: t('setup.redis.title') },
  { id: 'admin', title: t('setup.admin.title') },
  { id: 'complete', title: t('setup.ready.title') }
])

const currentStep = ref(0)
const errorMessage = ref('')
const installSuccess = ref(false)

// Connection test states
const testingDb = ref(false)
const testingRedis = ref(false)
const dbConnected = ref(false)
const redisConnected = ref(false)
const installing = ref(false)
const confirmPassword = ref('')
const serviceReady = ref(false)

// Default server port
const getCurrentPort = (): number => {
  const port = window.location.port
  if (port) {
    return parseInt(port, 10)
  }

  return window.location.protocol === 'https:' ? 443 : 80
}

const formData = reactive<InstallRequest>({
  database: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '',
    dbname: 'sub2api',
    sslmode: 'disable'
  },
  redis: {
    host: 'localhost',
    port: 6379,
    username: '',
    password: '',
    db: 0,
    enable_tls: false
  },
  admin: {
    email: '',
    password: ''
  },
  server: {
    host: '0.0.0.0',
    port: getCurrentPort(), // Use current port from browser
    mode: 'release'
  }
})

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 0:
      return dbConnected.value
    case 1:
      return redisConnected.value
    case 2:
      return (
        formData.admin.email &&
        formData.admin.password.length >= 8 &&
        formData.admin.password === confirmPassword.value
      )
    default:
      return true
  }
})

async function testDatabaseConnection() {
  testingDb.value = true
  errorMessage.value = ''
  dbConnected.value = false

  try {
    await testDatabase(formData.database)
    dbConnected.value = true
  } catch (error: unknown) {
    const err = error as { response?: { data?: { detail?: string; message?: string } }; message?: string }
    errorMessage.value =
      err.response?.data?.detail || err.response?.data?.message || err.message || 'Connection failed'
  } finally {
    testingDb.value = false
  }
}

async function testRedisConnection() {
  testingRedis.value = true
  errorMessage.value = ''
  redisConnected.value = false

  try {
    await testRedis(formData.redis)
    redisConnected.value = true
  } catch (error: unknown) {
    const err = error as { response?: { data?: { detail?: string; message?: string } }; message?: string }
    errorMessage.value =
      err.response?.data?.detail || err.response?.data?.message || err.message || 'Connection failed'
  } finally {
    testingRedis.value = false
  }
}

function nextStep() {
  if (canProceed.value) {
    errorMessage.value = ''
    currentStep.value++
  }
}

async function performInstall() {
  installing.value = true
  errorMessage.value = ''

  try {
    await install(formData)
    installSuccess.value = true
    // Start polling for service restart
    waitForServiceRestart()
  } catch (error: unknown) {
    const err = error as { response?: { data?: { detail?: string; message?: string } }; message?: string }
    errorMessage.value =
      err.response?.data?.detail || err.response?.data?.message || err.message || 'Installation failed'
  } finally {
    installing.value = false
  }
}

// Wait for service to restart and become available
async function waitForServiceRestart() {
  const maxAttempts = 60 // Increase to 60 attempts, ~60 seconds max
  const interval = 1000 // 1 second between attempts

  // Wait a moment for the service to start restarting
  await new Promise((resolve) => setTimeout(resolve, 3000))

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      // Use setup status endpoint as it tells us the real mode
      // Service might return 404 or connection refused while restarting
      const response = await fetch(buildGatewayUrl('/setup/status'), {
        method: 'GET',
        cache: 'no-store'
      })

      if (response.ok) {
        const data = await response.json()
        // If needs_setup is false, service has restarted in normal mode
        if (data.data && !data.data.needs_setup) {
          serviceReady.value = true
          // Redirect to login page after a short delay
          setTimeout(() => {
            window.location.href = '/login'
          }, 1500)
          return
        }
      }
    } catch {
      // Service not ready or network error during restart, continue polling
    }

    await new Promise((resolve) => setTimeout(resolve, interval))
  }

  // If we reach here, service didn't restart in time
  // Show a message to refresh manually
  errorMessage.value = t('setup.status.timeout')
}
</script>
