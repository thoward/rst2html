const rst2html = require('./rst2html');

const expectedHTMLOutput = `<div class="rst-document">
  <div class="rst-section">
    <h1 class="rst-title-1">
<span class="rst-text">Title</span>
    </h1>
    <p class="rst-paragraph">
<span class="rst-text">This is a paragraph.</span>
    </p>

    <p class="rst-paragraph">
<span class="rst-text">Paragraphs contain text and may contain inline markup: </span><em class="rst-emphasis"><span class="rst-text">emphasis</span></em><span class="rst-text">, </span><strong class="rst-strong"><span class="rst-text">strong emphasis</span></strong><span class="rst-text">, </span><tt class="rst-literal"><span class="rst-text">inline literals</span></tt><span class="rst-text">.</span>
    </p>

    <div class="rst-section">
      <h2 class="rst-title-2">
<span class="rst-text">Bullet Lists</span>
      </h2>
      <ul class="rst-bullet-list">
        <li class="rst-list-item">
          <p class="rst-paragraph">
<span class="rst-text">A bullet list</span>
          </p>
          <ul class="rst-bullet-list">
            <li class="rst-list-item">
              <p class="rst-paragraph">
<span class="rst-text">Nested bullet list</span>
              </p>

            </li>
            <li class="rst-list-item">
              <p class="rst-paragraph">
<span class="rst-text">Nested item 2.</span>
              </p>

            </li>

          </ul>

        </li>
        <li class="rst-list-item">
          <p class="rst-paragraph">
<span class="rst-text">Item 2.</span>
          </p>
          <p class="rst-paragraph">
<span class="rst-text">Paragraph 2 of item 2.</span>
          </p>
          <ul class="rst-bullet-list">
            <li class="rst-list-item">
              <p class="rst-paragraph">
<span class="rst-text">Nested bullet list.</span>
              </p>

            </li>

          </ul>

        </li>

      </ul>
    </div>

    <div class="rst-section">
      <h2 class="rst-title-2">
<span class="rst-text">Enumerated Lists</span>
      </h2>
      <ol class="rst-enumerated-list">
        <li class="rst-list-item">
          <p class="rst-paragraph">
<span class="rst-text">A enumerated list</span>
          </p>

        </li>
        <li class="rst-list-item">
          <p class="rst-paragraph">
<span class="rst-text">Item 2.</span>
          </p>

        </li>

      </ol>
    </div>

    <div class="rst-section">
      <h2 class="rst-title-2">
<span class="rst-text">Definition Lists</span>
      </h2>
      <div class="rst-unknown rst-definition_list">
        <div class="rst-unknown rst-definition_list_item">
          <div class="rst-unknown rst-term">
<span class="rst-text">Term</span>
          </div>
          <div class="rst-unknown rst-definition">
            <p class="rst-paragraph">
<span class="rst-text">Definition</span>
            </p>

          </div>

        </div>
        <div class="rst-unknown rst-definition_list_item">
          <div class="rst-unknown rst-term">
<span class="rst-text">Term</span>
          </div>
          <div class="rst-unknown rst-definition">
            <p class="rst-paragraph">
<span class="rst-text">Definition paragraph 1.</span>
            </p>
            <p class="rst-paragraph">
<span class="rst-text">Definition paragraph 2.</span>
            </p>

          </div>

        </div>

      </div>
    </div>

    <div class="rst-section">
      <h2 class="rst-title-2">
<span class="rst-text">Literal Blocks</span>
      </h2>
      <pre class="rst-literal-block">
<span class="rst-text">console.log('Hello, world!');</span>
      </pre>
    </div>

    <div class="rst-section">
      <h2 class="rst-title-2">
<span class="rst-text">Line Blocks</span>
      </h2>
      <div class="rst-line-block">
        <div class="rst-line">
<span class="rst-text">A one, two, a one two three four</span>
        </div>
        <div class="rst-line">

        </div>
        <div class="rst-line">
<span class="rst-text">Half a bee, philosophically,</span>
        </div>
        <div class="rst-line-block">
          <div class="rst-line">
<span class="rst-text">must, ipso facto, half not be.</span>
          </div>

        </div>

      </div>
    </div>

    <div class="rst-section">
      <h2 class="rst-title-2">
<span class="rst-text">Block Quotes</span>
      </h2>
      <p class="rst-paragraph">
<span class="rst-text">Block quotes consist of indented body elements:</span>
      </p>

      <blockquote class="rst-block-quote">
        <p class="rst-paragraph">
<span class="rst-text">My theory by A. Elk. Brackets Miss, brackets.</span><span class="rst-text">This theory goes as follows and begins now.</span><span class="rst-text">All brontosauruses are thin at one end, much much thicker in the middle and then thin again at the far end.</span><span class="rst-text">That is my theory, it is mine, and belongs to me and I own it, and what it is too.</span>
        </p>

      </blockquote>
    </div>
  </div>

</div>
`;

const rstSource = `
=====
Title
=====

This is a paragraph.

Paragraphs contain text and may contain inline markup: *emphasis*, **strong emphasis**, \`\`inline literals\`\`.

Bullet Lists
------------

- A bullet list

  - Nested bullet list
  - Nested item 2.

- Item 2.

  Paragraph 2 of item 2.

  - Nested bullet list.

Enumerated Lists
----------------

1. A enumerated list
2. Item 2.

Definition Lists
----------------

Term
  Definition

Term
  Definition paragraph 1.

  Definition paragraph 2.

Literal Blocks
--------------

::

  console.log('Hello, world!');

Line Blocks
-----------

| A one, two, a one two three four
|
| Half a bee, philosophically,
|   must, ipso facto, half not be.

Block Quotes
------------

Block quotes consist of indented body elements:

  My theory by A. Elk. Brackets Miss, brackets.
  This theory goes as follows and begins now.
  All brontosauruses are thin at one end, much much thicker in the middle and then thin again at the far end.
  That is my theory, it is mine, and belongs to me and I own it, and what it is too.
`;

test('should return HTML', () => {
  var actualOutput = rst2html(rstSource)
  // console.log(actualOutput)
  expect(actualOutput).toBe(expectedHTMLOutput);
});
