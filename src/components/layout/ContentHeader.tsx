import Vue from 'vue';
import Component from 'vue-class-component';
import { VNode } from 'vue/types/umd';
import { Button, Form, Icon, Input, message, Modal } from 'ant-design-vue';
import { Getter } from 'vuex-class';

import { renameSync, writeFileSync } from 'fs';
import { join } from 'path';

import { EModalType, IMenuItem } from '@/types';
import { addExt } from '@/helper';


@Component({
  components: {
    'a-button': Button,
    'a-modal': Modal,
    'a-input': Input,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-icon': Icon,
  },
})
export default class ContentHeader extends Vue {
  private modalTitle: string = '新建Note';
  private modalVisible: boolean = false;
  private modalFormData: any;
  private modalType: EModalType = EModalType.ADD;

  @Getter('GET_SELECT_MENU') selectMenu!: IMenuItem;

  beforeCreate(): void {
    this.modalFormData = this.$form.createForm(this, {
      props: {
        title: '',
      },
    });
  }

  handleAddNote(): void {
    this.modalTitle = '新建Note';
    this.modalVisible = true;
    this.modalType = EModalType.ADD;
  }

  handleEditNote(): void {
    this.modalTitle = '编辑Note';
    this.modalVisible = true;
    this.modalType = EModalType.EDIT;

    this.$nextTick(() => {
      this.modalFormData.setFieldsValue({ title: this.selectMenu.title });
    });
  }

  handleModalConfirm(e: any): void {
    e.preventDefault();
    if (this.modalType === EModalType.ADD) {
      writeFileSync(
        join(this.$config.doc, addExt(this.modalTitle)),
        '');
    } else {
      if (this.selectMenu.title === this.modalTitle) {
        this.modalVisible = false;
        return;
      }
      renameSync(
        this.selectMenu.path,
        join(this.$config.doc, addExt(this.modalFormData.getFieldValue('title'))),
      );

      window.location.reload();
    }
    message.success('操作成功');
    this.modalVisible = false;
  }

  handleModalCancel(): void {
    this.modalVisible = false;
  }

  render(): VNode {
    return (
      <div>
        <div class="over-h" style="padding:5px 10px">
          <h3 class="pull-left">{this.selectMenu ? this.selectMenu.title : ''}</h3>
          <a-icon type="edit" style="font-size:14px;" on-click={this.handleEditNote}/>

          <a-icon type="diff" class="pull-right" style="font-size:20px;" on-click={this.handleAddNote}/>
        </div>

        <a-modal title={this.modalTitle} visible={this.modalVisible} footer={null} on-cancel={this.handleModalCancel}>
          <a-form form={this.modalFormData} layout="horizontal" labelCol={{ span: 4 }} wrapperCol={{ span: 19 }}
                  on-submit={this.handleModalConfirm}>
            <a-form-item label="Note名称">
              <a-input v-decorator={['title', { rules: [{ required: true, message: '标题不能为空' }] }]}/>
            </a-form-item>

            <a-form-item wrapper-col={{ span: 5, offset: 20 }}>
              <a-button type="primary" html-type="submit">确定</a-button>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    );
  }
}
