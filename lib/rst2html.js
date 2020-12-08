/**
 * @author "Troy Howard" <http://blog.thoward37.me/>
 */
import restructured from 'restructured';

/**
 * Primary entry point/export. Given a raw RST string, returns the HTML
 * equivalent. Can be customized with a specific intent spacing (defaults to
 * 2). Note that this is the only export from the module--all other methods
 * are internal and documented for development purposes only.
 * @param {String} rstSource 
 * @param {Number} indent 
 * @returns {String} HTML equivalent to the given ReStructuredText, including class labels
 */
const rst2html = (rstSource, indent = 2) => {
  const parsedRST = restructured.parse(rstSource);
  return render_any(parsedRST, 0, 2)
};

/**
 * Workhorse. Arbitrary rendering routine that maps to specific functions
 * depending on element type. Includes arguments for level in doc tree
 * (defaults to 0) and intent spacing (defaults to 2). Recursively invoked
 * throughout doc tree; supports unknown nodes for easier extension as the
 * "restructured" module is developed.
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to this node in the doc tree (and its children)
 */
const render_any = (element, level = 0, indent = 2) => {
  switch (element.type) {
    case 'document':
      return render_document(element, level, indent);
    case 'section':
      return render_section(element, level, indent);
    case 'transition':
      return render_transition(element, level, indent);
    case 'paragraph':
      return render_paragraph(element, level, indent);
    case 'bullet_list':
      return render_bullet_list(element, level, indent);
    case 'enumerated_list':
      return render_enumerated_list(element, level, indent);
    case 'definition_list':
      return render_definition_list(element, level, indent);
    case 'list_item':
      return render_list_item(element, level, indent);
    case 'line':
      return render_line(element, level, indent);
    case 'line_block':
      return render_line_block(element, level, indent);
    case 'literal_block':
      return render_literal_block(element, level, indent);
    case 'block_quote':
      return render_block_quote(element, level, indent);
    case 'interpreted_text':
      return render_interpreted_text(element, level, indent);
    case 'text':
      return render_text(element, level, indent);
    case 'emphasis':
      return render_emphasis(element, level, indent);
    case 'strong':
      return render_strong(element, level, indent);
    case 'literal':
      return render_literal(element, level, indent);
    default:
      return render_unknown(element, level, indent)
  }
}

/**
 * Rendering routine when no known element type is supported for this node in
 * the doc tree. Depending on whether or not the node has children, will
 * forward to blcok or leaf rendering routing with an "rst-unknown" class.
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to an unknown/unsupported node in the doc tree
 */
const render_unknown = (element, level = 0, indent = 2) => {
  if (element.children) {
    return render_block_element('div', `rst-unknown rst-${element.type}`, element, level, indent)
  } else {
    return render_leaf_element('div', `rst-unknown rst-${element.type}`, element, level, indent)
  }
}

/**
 * Renders the top-level document node as a block element.
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to a document node in the doc tree
 */
const render_document = (element, level = 0, indent = 2) => {
  return render_block_element('div', 'rst-document', element, level, indent)
}

/**
 * Renders a specific section node. This includes the title (first child) and
 * all subsequent children, wrapped in a section block.
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to a section node in the doc tree
 */
const render_section = (element, level = 0, indent = 2) => {
  const indentString = ' '.repeat(level * indent);
  const title = render_title(element.depth, element.children[0], level + 1, indent);
  const children = element.children.slice(1).map(e => render_any(e, level + 1, indent)).join('\n')
  return `${indentString}<div class="rst-section">\n${title}${children}${indentString}</div>\n`;
}

/**
 * Renders a specific title, mapping header element numerical value (e.g.,
 * <h1/>, <h2/>, etc.) to the element depth within the document.
 * @param {Number} depth   - Integer value of "depth" (e.g., heading level)
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to a title node in the doc tree
 */
const render_title = (depth, element, level = 0, indent = 2) => {
  const titleTag = `h${depth}`;
  const titleClassName = `rst-title-${depth}`;
  return render_block_element(titleTag, titleClassName, element, level, indent)
}

/**
 * TODO: Currently forward to render_unknown() until transition support is implemented.
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to a transition node in the doc tree
 */
const render_transition = (element, level = 0, indent = 2) => {
  return render_unknown(element, level, indent)
}

/**
 * Renders a paragraph node in the doc tree as a <p/> element.
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to a paragraph node in the doc tree
 */
const render_paragraph = (element, level = 0, indent = 2) => {
  return render_block_element('p', 'rst-paragraph', element, level, indent)
}

/**
 * Renders an unordered list (<ul/>) from a bullet-list
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to the bullet list node in the doc tree
 */
const render_bullet_list = (element, level = 0, indent = 2) => {
  return render_block_element('ul', 'rst-bullet-list', element, level, indent)
}

/**
 * Renders an enumerated list as an <ol/> (ordered list) element
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to the enumerated list node in the doc tree
 */
const render_enumerated_list = (element, level = 0, indent = 2) => {
  return render_block_element('ol', 'rst-enumerated-list', element, level, indent)
}

/**
 * TODO: Currently forward to render_unknown() until definition list support is implemented.
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to an RST definition list (currently as unknown <div/>)
 */
const render_definition_list = (element, level = 0, indent = 2) => {
  return render_unknown(element, level, indent)
}

/**
 * Renders an individual list item as a <li/> element
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to an individual list item node in the doc tree
 */
const render_list_item = (element, level = 0, indent = 2) => {
  return render_block_element('li', 'rst-list-item', element, level, indent)
}

/**
 * Renders an individual line within a <div/> element. Right now this means it
 * appears as a block element--but RST source may be agnostic to line break
 * enforcement, so this may be better off as an inline (e.g., <span/>) with
 * appropriate spacing between adjacent nodes within a paragraph.
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to an individual line node in the doc tree
 */
const render_line = (element, level = 0, indent = 2) => {
  return render_block_element('div', 'rst-line', element, level, indent)
}

/**
 * Renders a blocked line within a <div/> element.
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to an individual line block node in the doc tree
 */
const render_line_block = (element, level = 0, indent = 2) => {
  return render_block_element('div', 'rst-line-block', element, level, indent)
}

/**
 * Renders a literal block node as a <pre/> element.
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to a literal block node in the doc tree
 */
const render_literal_block = (element, level = 0, indent = 2) => {
  return render_block_element('pre', 'rst-literal-block', element, level, indent)
}

/**
 * Renders a block quote as a <blockquote/> element.
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to a block quote node in the doc tree 
 */
const render_block_quote = (element, level = 0, indent = 2) => {
  return render_block_element('blockquote', 'rst-block-quote', element, level, indent)
}

/**
 * Renders a text node within a <span/> element.
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalnt to a text node in the doc tree
 */
const render_text = (element, level = 0, indent = 2) => {
  return render_leaf_element('span', 'rst-text', element, level, indent)
}

/**
 * Renders an "interpreted text" node within a <span/> element. This can be
 * translated in two ways depending on the "role" attribute assigned to the doc
 * tree node.
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to an interpreted text node in the doc tree
 */
const render_interpreted_text = (element, level = 0, indent = 2) => {
  const className = 'rst-interpreted_text' + (element.role ? ` rst-role-${element.role}` : '')
  return render_inline_element('span', className, element, level, indent)
}

/**
 * Renders an "emphasis" node within an <em/> element.
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to an "emphasis" text node in the doc tree
 */
const render_emphasis = (element, level = 0, indent = 2) => {
  return render_inline_element('em', 'rst-emphasis', element, level, indent)
}

/**
 * Renders an "strong" node as an "inline" <strong/> element.
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to a "strong" text node in the doc tree
 */
const render_strong = (element, level = 0, indent = 2) => {
  return render_inline_element('strong', 'rst-strong', element, level, indent)
}

/**
 * Renders a "literal" node as an inline <tt/> element.
 * @param {Object} element - Document tree node returned from restructured.parse()
 * @param {Number} level   - Current level within the document tree
 * @param {Number} indent  - Indent spacing passed from rst2html()
 * @returns {String}       - HTML equivalent to a "literal" text node in the doc tree
 */
const render_literal = (element, level = 0, indent = 2) => {
  return render_inline_element('tt', 'rst-literal', element, level, indent)
}

/**
 * One of three primary rendering methods. This method is used when the doc
 * tree node in question has no children and therefore will not recurse. TODO:
 * Implement indentation?
 * @param {String} tag       - Element tag name to use in rendering the DOM node
 * @param {String} className - Class (or space-delimited classes) assigned to the element
 * @param {String} element   - Doc tree node for which the "value" will be used to populate the text content of the element
 * @param {Number} level     - Level within doc tree for which indentation will be applied
 * @param {Number} indent    - Spaces per indentation level
 * @returns {String}         - HTML equivalent to the given doc tree node, rendered using the given element attributes
 */
const render_leaf_element = (tag, className, element, level = 0, indent = 2) => {
  const indentString = ' '.repeat(level * indent);
  return `<${tag} class="${className}">${element.value.replace(/\n$/, "")}</${tag}>`;
}

/**
 * One of three primary rendering methods. This method is used when the doc
 * tree node has children, and therefore will recurse using the "render_any()"
 * method. While level and indentation will be forwarded (and level
 * incremented) for the recurseive call, it will NOT be used when rendering the
 * actual DOM element content, because this is an INLINE element. According to
 * the RST document model (though this may need to be verified with the
 * "restructured" module implementation), such nodes should not have text
 * content of their own.
 * @param {String} tag       - Element tag name to use in rendering the DOM node
 * @param {String} className - Class (or space-delimited classes) assigned to the element
 * @param {String} element   - Doc tree node for which the "value" will be used to populate the text content of the element
 * @param {Number} level     - Level within doc tree for which indentation will be applied
 * @param {Number} indent    - Spaces per indentation level
 * @returns {String}         - HTML equivalent to the given doc tree node, including children
 */
const render_inline_element = (tag, className, element, level = 0, indent = 2) => {
  const children = element.children.map(e => render_any(e, level + 1, indent)).join('')
  return `<${tag} class="${className}">${children}</${tag}>`;
}

/**
 * One of three primary rendering methods. This method is used when the doc
 * tree node has children, and therefore will recurse using the "render_any()"
 * method. Level and indentation will be forwarded (and level incremented) for
 * the recurseive call, and indentation WILL be used when rendering the actual
 * DOM element content (as well as each newline-delimited child) because this
 * is an BLOCK element. According to the RST document model (though this may
 * need to be verified with the "restructured" module implementation), such
 * nodes should not have text content of their own.
 * @param {String} tag       - Element tag name to use in rendering the DOM node
 * @param {String} className - Class (or space-delimited classes) assigned to the element
 * @param {String} element   - Doc tree node for which the "value" will be used to populate the text content of the element
 * @param {Number} level     - Level within doc tree for which indentation will be applied
 * @param {Number} indent    - Spaces per indentation level
 * @returns {String}         - HTML equivalent to the given doc tree node, including children
 */
const render_block_element = (tag, className, element, level = 0, indent = 2) => {
  const indentString = ' '.repeat(level * indent);
  const children = element.children.map(e => render_any(e, level + 1, indent)).join('')
  return `${indentString}<${tag} class="${className}">\n${children}\n${indentString}</${tag}>\n`;
}

module.exports = rst2html;
