import Vue from 'vue';
import { INoteConfig } from '@/types/index';

declare module 'vue/types/vue' {

  interface Vue {
    $config: INoteConfig
  }
}
