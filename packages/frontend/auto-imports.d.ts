/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// Generated by unplugin-auto-import
// biome-ignore lint: disable
export {}
declare global {
  const EffectScope: typeof import('vue')['EffectScope']
  const ElMessage: typeof import('element-plus/es')['ElMessage']
  const ElMessageBox: typeof import('element-plus/es')['ElMessageBox']
  const IconEpMonitor: typeof import('~icons/ep/monitor')['default']
  const IconHugeiconsTaskEdit02: typeof import('~icons/hugeicons/task-edit02')['default']
  const IconMaterialSymbolsBarChart4BarsRounded: typeof import('~icons/material-symbols/bar-chart4-bars-rounded')['default']
  const addNewMonitor: typeof import('./src/api/monitor')['addNewMonitor']
  const addNewTask: typeof import('./src/api/task')['addNewTask']
  const axios: typeof import('./src/api/axios')['default']
  const computed: typeof import('vue')['computed']
  const copyTaskById: typeof import('./src/api/task')['copyTaskById']
  const createApp: typeof import('vue')['createApp']
  const createRouter: typeof import('vue-router')['createRouter']
  const createWebHistory: typeof import('vue-router')['createWebHistory']
  const customRef: typeof import('vue')['customRef']
  const dayjs: typeof import('dayjs')['default']
  const defineAsyncComponent: typeof import('vue')['defineAsyncComponent']
  const defineComponent: typeof import('vue')['defineComponent']
  const deleteMonitorById: typeof import('./src/api/monitor')['deleteMonitorById']
  const deleteTaskById: typeof import('./src/api/task')['deleteTaskById']
  const effectScope: typeof import('vue')['effectScope']
  const execMonitorById: typeof import('./src/api/monitor')['execMonitorById']
  const execTaskById: typeof import('./src/api/task')['execTaskById']
  const getCronExecTimes: typeof import('./src/api/monitor')['getCronExecTimes']
  const getCurrentInstance: typeof import('vue')['getCurrentInstance']
  const getCurrentScope: typeof import('vue')['getCurrentScope']
  const getEmailVerifyCode: typeof import('./src/api/login')['getEmailVerifyCode']
  const getMonitorById: typeof import('./src/api/monitor')['getMonitorById']
  const getMonitorList: typeof import('./src/api/monitor')['getMonitorList']
  const getMonitorRecord: typeof import('./src/api/monitor')['getMonitorRecord']
  const getTaskById: typeof import('./src/api/task')['getTaskById']
  const getTaskList: typeof import('./src/api/task')['getTaskList']
  const getTaskRecord: typeof import('./src/api/task')['getTaskRecord']
  const h: typeof import('vue')['h']
  const inject: typeof import('vue')['inject']
  const isProxy: typeof import('vue')['isProxy']
  const isReactive: typeof import('vue')['isReactive']
  const isReadonly: typeof import('vue')['isReadonly']
  const isRef: typeof import('vue')['isRef']
  const judgeCronTime: typeof import('./src/api/monitor')['judgeCronTime']
  const login: typeof import('./src/api/login')['login']
  const markRaw: typeof import('vue')['markRaw']
  const nextTick: typeof import('vue')['nextTick']
  const onActivated: typeof import('vue')['onActivated']
  const onBeforeMount: typeof import('vue')['onBeforeMount']
  const onBeforeRouteLeave: typeof import('vue-router')['onBeforeRouteLeave']
  const onBeforeRouteUpdate: typeof import('vue-router')['onBeforeRouteUpdate']
  const onBeforeUnmount: typeof import('vue')['onBeforeUnmount']
  const onBeforeUpdate: typeof import('vue')['onBeforeUpdate']
  const onDeactivated: typeof import('vue')['onDeactivated']
  const onErrorCaptured: typeof import('vue')['onErrorCaptured']
  const onMounted: typeof import('vue')['onMounted']
  const onRenderTracked: typeof import('vue')['onRenderTracked']
  const onRenderTriggered: typeof import('vue')['onRenderTriggered']
  const onScopeDispose: typeof import('vue')['onScopeDispose']
  const onServerPrefetch: typeof import('vue')['onServerPrefetch']
  const onUnmounted: typeof import('vue')['onUnmounted']
  const onUpdated: typeof import('vue')['onUpdated']
  const onWatcherCleanup: typeof import('vue')['onWatcherCleanup']
  const provide: typeof import('vue')['provide']
  const reactive: typeof import('vue')['reactive']
  const readonly: typeof import('vue')['readonly']
  const ref: typeof import('vue')['ref']
  const registerUser: typeof import('./src/api/login')['registerUser']
  const resolveComponent: typeof import('vue')['resolveComponent']
  const shallowReactive: typeof import('vue')['shallowReactive']
  const shallowReadonly: typeof import('vue')['shallowReadonly']
  const shallowRef: typeof import('vue')['shallowRef']
  const sleep: typeof import('./src/utils/index')['sleep']
  const stopMonitorById: typeof import('./src/api/monitor')['stopMonitorById']
  const toRaw: typeof import('vue')['toRaw']
  const toRef: typeof import('vue')['toRef']
  const toRefs: typeof import('vue')['toRefs']
  const toValue: typeof import('vue')['toValue']
  const triggerRef: typeof import('vue')['triggerRef']
  const unref: typeof import('vue')['unref']
  const updateMonitorById: typeof import('./src/api/monitor')['updateMonitorById']
  const updateTaskById: typeof import('./src/api/task')['updateTaskById']
  const useAttrs: typeof import('vue')['useAttrs']
  const useCssModule: typeof import('vue')['useCssModule']
  const useCssVars: typeof import('vue')['useCssVars']
  const useId: typeof import('vue')['useId']
  const useLink: typeof import('vue-router')['useLink']
  const useModel: typeof import('vue')['useModel']
  const useRoute: typeof import('vue-router')['useRoute']
  const useRouter: typeof import('vue-router')['useRouter']
  const useSlots: typeof import('vue')['useSlots']
  const useTemplateRef: typeof import('vue')['useTemplateRef']
  const watch: typeof import('vue')['watch']
  const watchEffect: typeof import('vue')['watchEffect']
  const watchPostEffect: typeof import('vue')['watchPostEffect']
  const watchSyncEffect: typeof import('vue')['watchSyncEffect']
}
// for type re-export
declare global {
  // @ts-ignore
  export type { Component, ComponentPublicInstance, ComputedRef, DirectiveBinding, ExtractDefaultPropTypes, ExtractPropTypes, ExtractPublicPropTypes, InjectionKey, PropType, Ref, MaybeRef, MaybeRefOrGetter, VNode, WritableComputedRef, FunctionalComponent } from 'vue'
  import('vue')
  // @ts-ignore
  export type { RouteRecordRaw } from 'vue-router'
  import('vue-router')
  // @ts-ignore
  export type { FormInstance } from 'element-plus'
  import('element-plus')
  // @ts-ignore
  export type { ILoginData, IEmailVerifyCodeParams, IRegisterParams } from './src/api/login'
  import('./src/api/login')
  // @ts-ignore
  export type { IMonitorType, IMonitorWithId, IMonitorData, IMonitorListData, IMonitorRecord, IMonitorRecordData, IJudgeCronTime } from './src/api/monitor'
  import('./src/api/monitor')
  // @ts-ignore
  export type { ITaskType, ITaskData, ITaskListData, ITaskWithId, ITaskField, ITaskRecord, ITaskRecordData } from './src/api/task'
  import('./src/api/task')
}
