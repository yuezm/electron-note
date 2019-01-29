const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
import MarkdownIt from 'markdown-it';
import Tree from './Tree';

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
function makeMdToHtml() {
  const md = new MarkdownIt();
  const titleTree = new Tree();

  // 增加关联ID的规则
  md.core.ruler.push('attachId', state => {
    const tags = [ 'h1', 'h2', 'h3' ];
    const tokens = state.tokens;

    for (let i = 0; i < tokens.length; i++) {
      const Token = tokens[ i ];
      const tag = Token.tag;

      // 检测是否为开始标签,只有开始标签才需要绑定关联ID
      if (tags.includes(tag) && Token.type === 'heading_open') {
        // 开始标签紧接是文字内容
        const contentToken = tokens[ i + 1 ];
        let content = '';
        if (contentToken.type === 'inline' && contentToken.tag === '') {
          content = contentToken.content;
        }

        // 给 h1,h2.h3设置锚点ID
        Token.attrs = [
          [ 'id', titleTree.setTitleTree(Number(tag.slice(1)), content) ],
        ];
      }
    }
  });
  return function(content) {
    titleTree.setDefault();
    return {
      html: md.render(content),
      tree: titleTree.h0LevelTree.children,
    };
  };
}

/**
 *
 * @param {string} data 所要计算的字符串
 * @return {string} 16进制的hash值
 */
function computeHash(data) {
  const sec = crypto.createHash('sha1');
  sec.update(data);
  return sec.digest('hex');
}

function readBaseDir(basePath, dirPath = '') {
  const targetDir = fs.readdirSync(basePath);

  return targetDir.map(item => {
    const baseName = splitFilename(item);
    const menuInfo = {
      name: path.join(dirPath, baseName),
      label: baseName,
    };
    if (!item.endsWith('.md')) {
      menuInfo.type = 'subMenu';
      menuInfo.children = readBaseDir(path.join(basePath, item), item);
    }
    return menuInfo;
  });
}

export { splitFilename, computeHash, readBaseDir };
export const markIt = makeMdToHtml();
