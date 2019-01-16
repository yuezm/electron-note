<template>
  <div class="edit-container">
    <div class="edit-title">
      <Input placeholder="请输入title" :value="title" style="width: 100%" @input="inputTitle" />
      <Button class="edit-confirm" type="info" @click="saveEdit">保存</Button>
      <Button type="default" @click="cancelEdit">取消</Button>
    </div>
    <div class="edit-markdown">
      <mavon-editor v-model="value" @save="saveFile" />
    </div>
  </div>
</template>
<script>
const path = require('path');
const fs = require('fs');
import { mapGetters } from 'vuex';

export default {
  name: 'electron-note-edit',
  computed: {
    ...mapGetters({
      title: 'GET_TITLE',
      baseDir: 'GET_BASE_DIR',
    }),
  },
  data() {
    return {
      value: '',
      titleChanged: '',
    };
  },
  methods: {
    readFile(filePath) {
      if (!filePath) {
        return;
      }
      const p = path.join(this.baseDir, filePath + '.md');
      this.value = fs.readFileSync(p)
        .toString();
    },

    saveFile(v) {
      if (!this.title) {
        return;
      }

      if (this.titleChanged !== '' && this.titleChanged !== this.title) {
        fs.writeFileSync(path.join(this.baseDir, this.titleChanged + '.md'), v);
        fs.unlinkSync(path.join(this.baseDir, this.title + '.md'));
        this.$store.commit('SET_TITLE', this.titleChanged);
      } else {
        fs.writeFileSync(path.join(this.baseDir, this.title + '.md'), v);
      }
      this.$router.push('/');
    },

    saveEdit() {
      this.saveFile(this.value);
    },

    cancelEdit() {
      this.$router.push('/');
    },

    inputTitle(v) {
      this.titleChanged = v;
    },
  },
  created() {
    this.readFile(this.title);
  },
};
</script>
<style scoped lang="less">
@import "../assets/style/global.less";

.edit-title {
  margin-bottom: 20px;
  display: flex;
  & > div {
    margin-right: 20px;
  }
  button {
    width: 100px;
    margin-right: 10px;
  }
}

.edit-container {
  padding: 10px;
}

.edit-confirm {
  background-color: @CONTENT_TREE_H3;
}
</style>
