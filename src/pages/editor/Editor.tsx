import Vue, { CreateElement, VNode } from 'vue';
import Component from 'vue-class-component';
import { Row, Col, Input, Icon, message } from 'ant-design-vue';


import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/css/css';
import 'codemirror/mode/vue/vue';
import 'codemirror/mode/sql/sql';
import 'codemirror/lib/codemirror.css';

// 搜索配置
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/jump-to-line';

// 折叠配置
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/markdown-fold';
import 'codemirror/addon/fold/foldgutter.css';

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { addExt, isEmpty, transMDToHtml } from '@/helper';

@Component({
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-textarea': Input.TextArea,
    'a-icon': Icon,
  },
})

export default class Editor extends Vue {
  private markdownText: string = '';
  private htmlText: string = '';
  private timer: number = 0;

  private filePath: string = '';

  created(): void {
    this.filePath = join(this.$config.doc, addExt(this.$route.params.id));
    this.getContent();
  }


  mounted(): void {
    const myCodeMirror = CodeMirror.fromTextArea(document.getElementById('textareaEditor') as HTMLTextAreaElement, {
      mode: 'markdown',
      lineNumbers: true,
      lineWrapping: true,
      tabSize: 2,
      foldGutter: true,
      gutters: [ 'CodeMirror-linenumbers', 'CodeMirror-foldgutter' ],
    });

    myCodeMirror.setValue(this.markdownText);


    myCodeMirror.on('change', (cm: CodeMirror.Editor) => {
      this.handleMarkedIt(cm.getValue());
    });

    // myCodeMirror.on('cursorActivity', (cm: CodeMirror.Editor) => {
    //   const cursorPosition: CodeMirror.Position = cm.getCursor();
    //   if (!isEmpty(cursorPosition.sticky)) {
    //     console.log(cm.getLineHandle(cursorPosition.line));
    //   }
    // });
  }

  getContent(): void {
    this.markdownText = readFileSync(this.filePath).toString();
    this.htmlText = transMDToHtml(this.markdownText);
  }

  handleMarkedIt(markText: string) {
    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.htmlText = transMDToHtml(markText);
      this.markdownText = markText;
    }, 800);
  }

  handleBackToContent(): void {
    this.$router.push(`/content/${ this.$route.params.id }`);
  }

  saveEditor(): void {
    writeFileSync(this.filePath, this.markdownText);
    message.success('操作成功');
  }

  render(h: CreateElement): VNode {
    return (
      <a-row type="flex" class="full-hw over-a">
        <div class="editor-action-container">
          <a-icon type="rollback" title="回退" on-click={ this.handleBackToContent } />
          <a-icon type="save" title="保存" on-click={ this.saveEditor } />
        </div>

        <a-col span={ 12 } className="editor-split pad-r-m">
          <textarea id="textareaEditor" />
        </a-col>
        <a-col span={ 12 } className="pad-l-m">
          { h('div', { domProps: { innerHTML: this.htmlText }, attrs: { class: 'editor-html full-hw pad-s' } }) }
        </a-col>
      </a-row>
    );
  }
}
