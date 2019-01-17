// ------ 标题组件树 ------
class Tree {
  constructor() {
    // h0LevelTree是为了保持统一格式,简化代码,最后返回值是它的children
    this.h0LevelTree = {
      href: '',
      children: [],
    };
    this.setDefault();
  }

  /**
   * 生成标题树
   * @param {number} level number enmu [1,2,3] 分别对应 h1,h2,h3
   * @param {string} content 标题内容
   * @return {*} 锚点内容
   */
  setTitleTree(level, content) {
    let levelTree = this['h' + (level - 1) + 'LevelTree'];
    if (!levelTree) {
      levelTree = {
        href: '',
        tag: '',
        content: '',
        children: [],
      };
      this['h' + (level - 2) + 'LevelTree'].children.push(levelTree);
    }
    const { children, href } = levelTree;
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

  setDefault() {
    this.h0LevelTree.children = [];
    this.h1LevelTree = null;
    this.h2LevelTree = null;
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

export default Tree;
