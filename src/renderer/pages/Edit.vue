<template>
  <div class="edit-container">
    <div class="edit-title">
      <Input placeholder="请输入title" v-model="title" style="width: 100%" />
      <Button class="edit-confirm" type="info" @click="saveEdit">保存</Button>
      <Button type="default" @click="cancelEdit">取消</Button>
    </div>
    <div class="edit-markdown">
      <mavon-editor v-model="mdContent" @save="saveFile" />
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
      baseDir: 'GET_BASE_DIR',
    }),
  },
  data() {
    return {
      title: '',
      oldTitle: '',

      mdContent: '',
      titleChanged: '',
    };
  },
  methods: {
    readFile(filePath) {
      if (!filePath) {
        return;
      }
      const p = path.join(this.baseDir, filePath + '.md');
      this.mdContent = fs.readFileSync(p)
        .toString();
    },

    saveFile(v) {
      if (!this.title) {
        return;
      }
      fs.writeFileSync(path.join(this.baseDir, this.title + '.md'), v);
      if (this.oldTitle !== this.title && this.oldTitle !== '') {
        fs.unlinkSync(path.join(this.baseDir, this.oldTitle + '.md'));
        this.$store.commit('SET_TITLE', this.title);
      }
      this.$router.push('/');
    },

    saveEdit() {
      this.saveFile(this.mdContent);
    },

    cancelEdit() {
      this.$router.push('/');
    },
  },
  created() {
    this.title = this.$route.params.title;
    if (this.title !== 'add') {
      this.readFile(this.title);
      this.oldTitle = this.title;
    } else {
      this.title = '';
    }
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
