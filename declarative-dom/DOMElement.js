export default class DOMElement {
  constructor(
    props, {
      tagName,
      innerHTML,
      value,
      className,
      style,
      eventListener
    },
    ...children
  ) {
    this.ownerTable = {};
    this.dependentTable = {};
    this._props = props;
    this.props = {};
    for (let key in props) {
      Object.defineProperty(this.props, key, {
        get: function() { return this._props[key]; }.bind(this),
        set: function(newValue) {
          this._props[key] = newValue;
          this.dependentTable[key].forEach(entry => {
            entry.node.evaluate(
              entry.object,
              entry.attribute,
              entry.value,
              entry.dependencies
            )
          })
        }.bind(this)
      })
    }
    this.element = document.createElement(tagName);
    this.element.node = this;
    this.innerHTML = innerHTML;
    this.value = value;
    this.class = className;
    this.style = style;
    this.children = children;
    children.forEach(node => {
      this.element.append(node.element);
      node.parent = this;
    })
    if (eventListener) {
      Object.entries(eventListener).forEach((
        [event, listener]
      ) => {
        this.element.addEventListener(
          event,
          listener.bind(this)
        )
      })
    }
  }

  getPropOwner(key, dependent) {
    if (this.ownerTable[key]) {
      return this.ownerTable[key];
    }
    let curNode = this;
    while (curNode) {
      if (curNode.props.hasOwnProperty(key)) {
        this.ownerTable[key] = curNode;
        if (!curNode.dependentTable[key]) {
          curNode.dependentTable[key] = [];
        }
        if (dependent) {
          curNode.dependentTable[key].push(dependent);
        }
        return curNode;
      }
      curNode = curNode.parent;
    }
    throw Error(`Property ${key} not found in ancestors`);
  }
  
  evaluate(object, attribute, value, dependencies) {
    let params = dependencies.map(key => {
      let owner = this.getPropOwner(key, {
        node: this,
        object,
        attribute,
        value,
        dependencies
      });
      return owner.props[key];
    });
    object[attribute] = value(...params);
  }

  render() {
    if (this.innerHTML) {
      this.evaluate(
        this.element,
        'innerHTML',
        this.innerHTML.value,
        this.innerHTML.dependencies
      )
    }

    if (this.value) {
      this.evaluate(
        this.element,
        'value',
        this.value.value,
        this.value.dependencies
      )
    }
    
    if (this.class) {
      this.evaluate(
        this.element,
        'className',
        this.class.value,
        this.class.dependencies
      )
    }
    
    if (this.style) {
      Object.entries(this.style).forEach((
        [property, { value, dependencies }]
      ) => {
        this.evaluate(
          this.element.style,
          property,
          value,
          dependencies
        );
      });
    }

    if (this.children.length !== 0) {
      this.children.forEach(node => node.render());
    }
    return this;
  }
}