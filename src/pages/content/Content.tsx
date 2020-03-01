import Vue, { CreateElement } from 'vue';
import Component from 'vue-class-component';
import { VNode } from 'vue/types/umd';
import { Button, Icon } from 'ant-design-vue';

import { readFileSync } from 'fs';

import { addExt, transMDToHtml } from '@/helper';
import { join } from 'path';

@Component({
  components: {
    'a-button': Button,
    'a-icon': Icon,
  },
  beforeRouteUpdate(to, from, next) {
    next();
    (this as Content).handlePathChanged();
  },
})
export default class Content extends Vue {
  private htmlText: string = '';
  private filePath: string = '';

  created(): void {
    this.handlePathChanged();
  }


  handlePathChanged() {
    this.filePath = join(this.$config.doc, addExt(this.$route.params.id));
    this.getContent();
  };

  getContent(): void {
    this.htmlText = transMDToHtml(readFileSync(this.filePath).toString());
  }

  handleRouteToEdit(): void {
    this.$router.push(`/editor/${ this.$route.params.id }`);
  }


  render(h: CreateElement): VNode {
    return (
      <div>
        <div class="over-h" style="height:50px;">
          <a-icon type="edit" className="pull-right" style="font-size:20px" on-click={ this.handleRouteToEdit } />
        </div>

        {
          h('div', {
            domProps: {
              innerHTML: this.htmlText,
            },
          })
        }
      </div>
    );
  }
}
