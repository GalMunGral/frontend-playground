import DOMElement from './DOMElement.js';
import List from './List.js';

const root = new DOMElement(
  {
    primaryFont: 'Courier',
    secondaryFont: 'Arial'
  },
  {
    tagName: 'div',
    eventListener: {
      click: function(e) {
        if (e.target instanceof HTMLButtonElement) {
          let propOwner = e.target.node.getPropOwner('input');
          this.props.secondaryFont = propOwner.props.input;
        }
      }
    }
  },
  List(),
  new DOMElement(
    {
      input: 'Type here!'
    }, 
    {
      tagName: 'div'
    },
    new DOMElement(
      {},
      {
        tagName: 'input',
        value: {
          value: v => v,
          dependencies: ['input']
        },
        style: {
          display: {
            value: () => 'block',
            dependencies: []
          }
        },
        eventListener: {
          focus: function(e) {
            let propOwner = this.getPropOwner('input');
            propOwner.props.input = '';
          },
          keyup: function(e) {
            let propOwner = this.getPropOwner('input');
            propOwner.props.input = e.target.value;
          }
        }
      }    
    ),
    new DOMElement(
      {},
      {
        tagName: 'button',
        innerHTML: {
          value: () => 'Update secondary Font',
          dependencies: []
        }
      }    
    )
  )
).render();

document.body.append(root.element);
