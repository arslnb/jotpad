let Inline = Quill.import('blots/inline');

class StackBlot extends Inline {
    static create(data) {
      let node = super.create();
      // Sanitize url value if desired
      node.setAttribute('stackid', data.stackid);
      node.setAttribute('stacktype', data.stacktype);
      // Okay to set other non-format related attributes
      // These are invisible to Parchment so must be static
      node.setAttribute('class', 'stack-ref');
      return node;
    }
  
    static formats(node) {
      // We will only be called with a node already
      // determined to be a Link blot, so we do
      // not need to check ourselves
      let data = {
        'stackid': node.getAttribute('stackid'),
        'stacktype': node.getAttribute('stacktype')
      }
      return data
    }
  }


StackBlot.blotName = 'stack';
StackBlot.tagName = 'div';

Quill.register(StackBlot);