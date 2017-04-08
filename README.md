# gent-css

> `gentcss`是一种类似`BEM`的css命名规范, `postcss-gentcss`是一个[postcss](https://github.com/postcss/postcss)插件，用来将css代码转换为`gentcss`规范。

## gentcss命名规范

> 命名分为四部分：组件、节点、角色、状态, 每部分都采用驼峰命名方式，只能包含字符数字。

```css
.libName-componentName-elementName {
  /**/
}

.libName-componentName-elementName.libName-is-roleName {
  /**/
}

.libName-componentName-elementName.libName-has-stateName {
  /**/
}
```

## 书写

> 编写时，类名用两个中划线(`--`)分割，左边标识这个类名是`gentcss`的哪一种，右边标识对应的名字。

- .comp--componentName: 组件
- .elem--elementName: 节点，必须包含在组件内，为组件的直接子元素
- .is--roleName: 角色
- .has--stateName: 状态
- .sel--componentName-elementName: 直接生产节点选择器，不用包含在组件内

## 实例

输入：
```scss
.comp--componentName {
  background: #fff;

  .elem--elementName {
    line-height: 24px;

    &.is--roleNameA {
      background: red;
    }

    &.is--roleNameB {
      background: blue;
    }

    &.has--stateName {
      cursor: not-allowed;
    }
  }
}

.sel--componentName-elementName {
  line-height: 24px;

  &.has--stateName {
    cursor: not-allowed;
  }
}
```

输出：
```scss
.gent-componentName {
  background: #fff
}

.gent-componentName-elementName {
  line-height: 24px;

  &.gent-is-roleNameA {
    background: red;
  }

  &.gent-is-roleNameB {
    background: blue;
  }

  &.gent-has-stateName {
    cursor: not-allowed;
  }
}

.gent-componentName-elementName {
  line-height: 24px;

  &.gent-has-stateName {
    cursor: not-allowed;
  }
}
```

## 配置

```js
var gentcss = require('postcss-gentcss');

postcss([
  gentcss({
    // 类库名称
    libName: 'gent',

    // 组件前缀
    componentInputPrefix: 'comp--',

    // 节点前缀
    elementInputPrefix: 'elem--',

    // 角色前缀
    roleInputPrefix: 'is--',

    // 状态前缀
    stateInputPrefix: 'has--',

    // 选择器前缀
    selectorInputPrefix: 'sel--'
  })
])
```
