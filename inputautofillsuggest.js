Element.prototype.inputAutofillSuggest = function (autofilldata, extractionFunc) {
  if (autofilldata == undefined) {
    inputAutofillSugOptionsList(this, false);
  } else {
    inputAutofillSugOptionsList(this, autofilldata, extractionFunc);
  }
}

NodeList.prototype.inputAutofillSuggest = function () {
  this.forEach(item => {
    inputAutofillSugOptionsList(item, false);
  });
}

function inputAutofillSugOptionsList(autoBox, autofilldata, extractionFunc) {
  if (!autofilldata) {
    var options = autoBox.children[0].getAttribute('data-options').split(/[,]+/);
    inputAutofillSug(autoBox, options); // Go ahead using data attribute
  } else if (Array.isArray(autofilldata)) {
    var options = autofilldata;
    inputAutofillSug(autoBox, options); // Go ahead using a provided array
  } else if (isUrl(autofilldata)) {
    // load from url
    console.log('Loading from URL');
    console.log(autofilldata)
    fetch(autofilldata)
      .then(response => response.json())
      .then(json => {
        inputAutofillSug(autoBox, extractionFunc(json));
      });
    // Go ahead by fetching from a URL
  } else {
    console.log('Input Autofill Suggest Error: Unable to obtain a valid options listing as neither an array or URL was passed as an argument.');
  }
}


function inputAutofillSug(autoBox, options) {

  autoBox.classList.add('inputAutoSuggAutoBox');
  let list = document.createElement('ul');
  options.forEach(option => {
    let listItem = document.createElement('li');
    let listItemText = document.createTextNode(option);
    listItem.appendChild(listItemText);
    listItem.addEventListener('mousedown', function (e) {
      e.preventDefault();
      autoBox.children[0].value = option;
    });
    listItem.addEventListener('mouseup', function () {
      if (autoBox.children[1].getBoundingClientRect().height >= autoBox.children[1].clientHeight) autoBox.children[0].blur();
    });
    list.appendChild(listItem);
  });
  autoBox.appendChild(list);

  autoBox.addEventListener('keyup', function () {
    // Update list order
    let query = autoBox.children[0].value;
    let weightedOptions = stringSimilarity.findBestMatch(query, options).ratings;

    weightedOptions.sort(function (a, b) {
      let aR = a.rating;
      let bR = b.rating;
      if (aR < bR) return 1;
      if (aR > bR) return -1;
      return 0;
    });

    let reorderedList = document.createElement('ul');
    weightedOptions.forEach(weightedOption => {
      let listItem = document.createElement('li');
      let listItemText = document.createTextNode(weightedOption.target);
      listItem.appendChild(listItemText);
      listItem.addEventListener('mousedown', function (e) {
        e.preventDefault();
        autoBox.children[0].value = weightedOption.target;
      });
      listItem.addEventListener('mouseup', function () {
        if (autoBox.children[1].getBoundingClientRect().height >= autoBox.children[1].clientHeight) autoBox.children[0].blur();
      });
      reorderedList.appendChild(listItem);
    });
    autoBox.children[1].replaceChildren(...reorderedList.children);
  });

  autoBox.children[0].addEventListener('focus', function () {
    autoBox.children[1].classList.add('inputAutoSuggAutoBox-visible');
  });
  autoBox.children[0].addEventListener('blur', function () {
    autoBox.children[1].classList.remove('inputAutoSuggAutoBox-visible');
  });
}

function isUrl(str) {
  let isU = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i').test(str);
  return isU;
}
