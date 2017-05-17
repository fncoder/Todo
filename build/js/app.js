'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Todo = function () {
  var components = {
    enter: document.querySelector('.todo'),
    contentAll: document.querySelector('.list-all'),
    complete: document.querySelector('.list-complete'),
    incompleted: document.querySelector('.list-incompleted'),
    removeBtn: document.getElementsByClassName('remove'),
    items: document.getElementsByClassName('content-list__item'),
    switched: document.querySelector('.switch input'),
    live: document.querySelector('.status'),
    content: document.querySelector('.things'),
    activeTabs: document.querySelector('.active-tabs'),
    tabs: document.querySelectorAll('.tabs'),
    contentList: document.querySelectorAll('.content-list')
  };

  var things = [];
  var status = false;
  var id = 0;

  var getStatus = function getStatus() {
    if (!status) {
      status = true;
      components.live.classList.remove('off');
      components.live.classList.add('on');
    } else {
      components.live.classList.remove('on');
      components.live.classList.add('off');
      status = false;
    }
    init();
  };

  var CreateElement = function CreateElement() {
    var _this = this;

    _classCallCheck(this, CreateElement);

    this.id = id++;
    this.subject = components.content.value;
    things.push(this);

    this.createItem = function () {
      _this.newItem = document.createElement('LI');
      _this.removeBtn = document.createElement('SPAN');
      _this.checkbox = document.createElement('INPUT');
      _this.apply = document.createElement('SPAN');
      _this.label = document.createElement('LABEL');
      _this.checkbox.type = 'checkbox';
      _this.newItem.classList.add('content-list__item');
      _this.removeBtn.classList.add('remove');
      _this.newItem.setAttribute('data-name', _this.id);
      _this.textNode = document.createTextNode(_this.subject);
      _this.newItem.appendChild(_this.label);
      _this.label.appendChild(_this.checkbox);
      _this.label.appendChild(_this.apply);
      _this.newItem.appendChild(_this.textNode);
      _this.newItem.appendChild(_this.removeBtn);
      components.contentAll.appendChild(_this.newItem);
      components.content.value = '';
      _this.cloneItem = _this.newItem.cloneNode(true);
      _this.cloneItem.removeChild(_this.cloneItem.children[0]);
      _this.cloneItem.removeChild(_this.cloneItem.children[0]);
      components.incompleted.appendChild(_this.cloneItem);
    };

    this.removeItem = function () {
      if (!_this.checkbox.checked) {
        components.incompleted.removeChild(_this.cloneItem);
        components.contentAll.removeChild(_this.newItem);
        things.splice(_this.id, 1);

        for (var i = 0; i < things.length; i++) {
          things[i].id = i;
          components.items[i].setAttribute('data-name', i);
        }

        id = things.length;
      }
    };

    this.checkedItem = function () {
      if (!_this.checkbox.checked) {
        components.incompleted.removeChild(_this.cloneItem);
        components.complete.appendChild(_this.cloneItem);
      } else {
        components.complete.removeChild(_this.cloneItem);
        components.incompleted.appendChild(_this.cloneItem);
      }
    };
  };

  var enterItem = function enterItem(e) {
    if (e.keyCode === 13 && status) {
      new CreateElement();
      things.forEach(function (item, index) {
        if (index === things.length - 1) {
          things[index].createItem();
        }
      });
    }
  };

  var removeItem = function removeItem(e) {
    var target = e.target;
    var dataName = target.parentNode.getAttribute('data-name');
    if (target.tagName === 'SPAN') {
      things[dataName].removeItem();
    } else if (target.tagName === 'LABEL') {
      things[dataName].checkedItem();
    }
  };

  var changeTabs = function changeTabs(e) {
    if (e.target.tagName === 'SPAN') {
      var dataTab = parseFloat(e.target.getAttribute('data-tab'));
      for (var i = 0, length = components.tabs.length; i < length; i++) {
        components.tabs[i].classList.remove('tab-active');
        components.contentList[i].style.display = 'none';
      }
      e.target.classList.add('tab-active');
      components.contentList[dataTab].style.display = 'block';
    }
  };

  var init = function init() {
    components.switched.addEventListener('click', getStatus);

    if (status) {
      components.content.addEventListener('keypress', enterItem);
      components.contentAll.addEventListener('click', removeItem);
      components.activeTabs.addEventListener('click', changeTabs);
    } else {
      components.content.removeEventListener('click', enterItem);
      components.contentAll.removeEventListener('click', removeItem);
      components.activeTabs.removeEventListener('click', changeTabs);
    }
  };

  return {
    init: init
  };
}();

Todo.init();