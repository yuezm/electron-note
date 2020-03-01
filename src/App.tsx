import Component from 'vue-class-component';
import Vue from 'vue';
import { Layout, Breadcrumb } from 'ant-design-vue';
import { VNode } from 'vue/types/umd';

import MenuLayout from '@/components/layout/Menu';
import ContentHeader from '@/components/layout/ContentHeader';

@Component({
  components: {
    'a-layout': Layout,
    'a-layout-sider': Layout.Sider,
    'a-layout-header': Layout.Header,
    'a-layout-content': Layout.Content,
    'a-breadcrumb': Breadcrumb,
    'a-breadcrumb-item': Breadcrumb.Item,
    MenuLayout,
  },
})
export default class App extends Vue {
  private layoutContentStyle = {
    padding: '12px',
    background: '#fff',
    height: '400px',
  };

  created(): void {
    this.layoutContentStyle.height =
      document.documentElement.clientHeight - 59 + 'px';
  }

  render(): VNode {
    return (
      <a-layout class="full-hw">
        <a-layout-sider trigger={ null } collapsible>
          <MenuLayout />
        </a-layout-sider>

        <a-layout style="padding: 0 12px 12px">
          <ContentHeader />
          <a-layout-content style={ this.layoutContentStyle }>
            <router-view />
          </a-layout-content>
        </a-layout>
      </a-layout>
    );
  }
}


