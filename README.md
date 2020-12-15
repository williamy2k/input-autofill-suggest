# input-autofill-suggest

List of options or suggestions which appears when an `<input>` is focussed.

<img src="https://i.ibb.co/kHPZS3q/Untitled-1-dragged.png" width="200" alt="Screenshot of an input box with input autofill suggest options showing below">

## Usage

    <div class="autoBox">
      <input data-options="Red, Blue, Green, Yellow">
    </div>

## Setup

Include the CSS in `<head>` (optional, you could adapt your own styles based on the `.autoBox` and `.autoBox-visible` classes):

    <link href="https://cdn.jsdelivr.net/gh/williamy2k/input-autofill-suggest/inputautofillsuggest.css" rel="stylesheet">

Include at the end of `<body>`:

    <script src="//unpkg.com/string-similarity/umd/string-similarity.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/williamy2k/input-autofill-suggest/inputautofillsuggest.js"></script>
