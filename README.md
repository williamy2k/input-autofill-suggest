# input-autofill-suggest

List of options or suggestions which appears when an `<input>` is focussed.

## Usage

    <div class="autoBox">
      <input data-options="Red, Blue, Green, Yellow">
    </div>

## Setup

Include the CSS in `<head>` (optional, you could adapt your own styles based on the `.autoBox` and `.autoBox-visible` classes):

    <link href="inputautofillsuggest.css" rel="stylesheet">

Include at the end of `<body>`:

    <script src="//unpkg.com/string-similarity/umd/string-similarity.min.js"></script>`
    <script src="inputautofillsuggest.js"></script>`
