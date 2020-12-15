document.querySelectorAll('.autoBox').forEach(autoBox => {
  var options = autoBox.children[0].getAttribute('data-options').split(/[,]+/);

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
      autoBox.children[0].blur();
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
        autoBox.children[0].blur();
      });
      reorderedList.appendChild(listItem);
    });
    autoBox.children[1].replaceChildren(...reorderedList.children);
  });

  autoBox.children[0].addEventListener('focus', function () {
    autoBox.children[1].classList.add('autoBox-visible');
  });
  autoBox.children[0].addEventListener('blur', function () {
    autoBox.children[1].classList.remove('autoBox-visible');
  });
});
