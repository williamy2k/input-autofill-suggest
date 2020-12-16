# input-autofill-suggest

List of options or suggestions which appears when an `<input>` is focussed.

<img src="https://i.ibb.co/kHPZS3q/Untitled-1-dragged.png" width="200" alt="Screenshot of an input box with input autofill suggest options showing below">

## Usage

### Individual Boxes

#### Supply options as data attribute

    <div id="my-auto-input-box">
      <input data-options="Red, Blue, Green, Yellow">
    </div>
    
    <script>
        document.querySelector('#my-auto-input-box').inputAutofillSuggest();
    </script>
    
#### Supply options as array argument

    <div id="my-auto-input-box">
      <input>
    </div>
    
    <script>
        document.querySelector('#my-auto-input-box').inputAutofillSuggest(['Red', 'Blue', 'Green', 'Yellow']);
    </script>

#### Supply options from URL

Requires you to supply:
1. A URL which can be `fetch()`ed as JSON
2. A function which converts the fetched JSON into an Array, that will be used as the input options list


```
<div id="my-auto-input-box">
  <input>
</div>

<script>
  function extractionFunction(inputJSON) { return Object.values(inputJSON); }
  document.querySelector('#my-auto-input-box').inputAutofillSuggest('https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json', extractionFunction);
</script>
```

### Multiple Boxes

Only supports providing options as `data-options` attribute.

    <div class="my-auto-input-boxes">
      <input data-options="Red, Blue, Green, Yellow">
    </div>
    
    <div class="my-auto-input-boxes">
      <input data-options="Cafe, Petrol Station, Restaurant, Office, Museum">
    </div>
    
    <div class="my-auto-input-boxes">
      <input data-options="Phone, Laptop, Desktop, Tablet">
    </div>
    
    <script>
        document.querySelectorAll('.my-auto-input-boxes').inputAutofillSuggest();
    </script>

## Setup

Include the CSS in `<head>` (optional, you could adapt your own styles based on the `.inputAutoSuggAutoBox` and `.inputAutoSuggAutoBox-visible` classes):

    <link href="https://cdn.jsdelivr.net/gh/williamy2k/input-autofill-suggest/inputautofillsuggest.css" rel="stylesheet">

Include at the end of `<body>`:

    <script src="//unpkg.com/string-similarity/umd/string-similarity.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/williamy2k/input-autofill-suggest/inputautofillsuggest.js"></script>
