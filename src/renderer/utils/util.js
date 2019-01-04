const path = require('path');
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

// ------ 标题组件树 ------
class StorageTitle {
  constructor() {
    this.titleTree = [];
    this.h1LevelTree = null;
  }

  /**
   * 生成标题树
   * @param {number} level number enmu [1,2,3] 分别对应 h1,h2,h3
   * @param {string} content 标题内容
   * @return {*} 锚点内容
   */
  setTitleTree(level, content) {
    if (level === 1) {
      const href = StorageTitle.formatHref(content);
      this.h1LevelTree = {
        tag: 'h1',
        content,
        href,
        children: [],
      };
      this.titleTree.push(this.h1LevelTree);
      return href;
    }

    const { children, href } = this['h' + (level - 1) + 'LevelTree'];
    const nowHref = StorageTitle.formatHref(href, content);
    this['h' + level + 'LevelTree'] = {
      tag: 'h' + level,
      content,
      href: nowHref,
      children: [],
    };
    children.push(this['h' + level + 'LevelTree']);
    return nowHref;
  }

  /**
   * 格式化标题,防止部分字段不能作为id  parentId+...+childId
   * @param {string } href 上一级的id
   * @param {string} connection 本级的id
   * @return {string} 返回上一级和本级的结合,防止出现覆盖
   */
  static formatHref(href, connection = '') {
    const re = /[^a-z|A-Z|0-9|-|_|:|\.]/;
    return (
      href.replace(re, '') +
      (connection ? '_' + connection.replace(re, '') : '')
    );
  }
}

/**
 * 分割文件,取消后缀名
 * @param {string} filename 文件全名
 * @param {string} extName 后缀名 默认为.md
 * @return {string} 返回文件名
 */
function splitFilename(filename, extName = '.md') {
  return path.basename(filename, extName);
}

/**
 * 将md语法转为html
 * @param {string} content md字符串
 * @return {*} 返回当前标题树及转换好的html字符串
 */
function markIt(content) {
  const titleTree = new StorageTitle();

  md.core.ruler.push('attachId', state => {
    const tags = [ 'h1', 'h2', 'h3' ];
    const tokens = state.tokens;

    for (let i = 0; i < tokens.length; i++) {
      const Token = tokens[i];
      const tag = Token.tag;

      if (tags.includes(tag) && Token.type === 'heading_open') {
        const contentToken = tokens[i + 1];
        let content = '';
        if (contentToken.type === 'inline' && contentToken.tag === '') {
          content = contentToken.content;
        }

        // 给 h1,h2.h3设置锚点ID
        Token.attrs = [
          ['id', titleTree.setTitleTree(Number(tag.slice(1)), content)],
        ];
      }
    }
  });
  return {
    html: md.render(content),
    tree: titleTree.titleTree,
  };
}

export { splitFilename, markIt };
