<template>
  <div class="edit-container">
    <div class="edit-title">
      <Input placeholder="请输入title" v-model="title" style="width: 100%" />
      <Button class="edit-confirm" type="info" @click="saveEdit">保存</Button>
      <Button type="default" @click="cancelEdit">取消</Button>
    </div>
    <div class="edit-markdown">
      <mavon-editor ref="mdEdit" v-model="mdContent" @save="saveFile" @imgAdd="addImage" />
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
      dirName: '',
      title: '',
      oldTitle: '',

      mdContent: '',
      titleChanged: '',
    };
  },
  methods: {
    initEditContent(path) {
      this.mdContent = this.readFile(path);
    },

    handelTitle(t) {
      const title = atob(t);
      if (title.includes('/')) {
        this.dirName = path.dirname(title);
        this.oldTitle = this.title = path.basename(title);
      } else {
        this.oldTitle = this.title = title;
      }
      return title;
    },

    readFile(filePath) {
      if (!filePath) {
        return;
      }
      const p = path.join(this.baseDir, filePath + '.md');
      return fs.readFileSync(p)
        .toString();
    },

    saveFile(v) {
      if (!this.title) {
        return;
      }
      const realTitle = path.join(this.dirName, this.title);
      const realPath = path.join(this.baseDir, realTitle + '.md');

      if (this.oldTitle !== this.title && this.oldTitle !== '') {
        fs.renameSync(path.join(this.baseDir, this.dirName, this.oldTitle + '.md'), realPath);
        this.$store.commit('SET_TITLE', realTitle);
      }
      fs.writeFileSync(realPath, v);
      this.$router.push('/');
    },

    saveEdit() {
      this.saveFile(this.mdContent);
    },

    cancelEdit() {
      this.$router.push('/');
    },

    addImage(imgName, img) {
      const { name } = img;
      const realyPath = path.join('/home/yzm/electron-note/images', name);
      fs.createReadStream(img.path).pipe(fs.createWriteStream(realyPath));
      this.$refs.mdEdit.$img2Url(imgName, realyPath);
    },
  },
  created() {
    const title = this.$route.params.title;
    if (title !== 'add') {
      this.initEditContent(this.handelTitle(title));
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
