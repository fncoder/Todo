'use strict'

const Todo = (() => {
  const components = {
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
  }

  const things = []
  let status = false
  let id = 0

  const getStatus = () => {
    if (!status) {
      status = true
      components.live.classList.remove('off')
      components.live.classList.add('on')
    } else {
      components.live.classList.remove('on')
      components.live.classList.add('off')
      status = false
    }
    init()
  }

  class CreateElement {
    constructor () {
      this.id = id++
      this.subject = components.content.value
      things.push(this)

      this.createItem = () => {
        this.newItem = document.createElement('LI')
        this.removeBtn = document.createElement('SPAN')
        this.checkbox = document.createElement('INPUT')
        this.apply = document.createElement('SPAN')
        this.label = document.createElement('LABEL')
        this.checkbox.type = 'checkbox'
        this.newItem.classList.add('content-list__item')
        this.removeBtn.classList.add('remove')
        this.newItem.setAttribute('data-name', this.id)
        this.textNode = document.createTextNode(this.subject)
        this.newItem.appendChild(this.label)
        this.label.appendChild(this.checkbox)
        this.label.appendChild(this.apply)
        this.newItem.appendChild(this.textNode)
        this.newItem.appendChild(this.removeBtn)
        components.contentAll.appendChild(this.newItem)
        components.content.value = ''
        this.cloneItem = this.newItem.cloneNode(true)
        this.cloneItem.removeChild(this.cloneItem.children[0])
        this.cloneItem.removeChild(this.cloneItem.children[0])
        components.incompleted.appendChild(this.cloneItem)
      }

      this.removeItem = () => {
        if (!this.checkbox.checked) {
          components.incompleted.removeChild(this.cloneItem)
          components.contentAll.removeChild(this.newItem)
          things.splice(this.id, 1)

          for (let i = 0; i < things.length; i++) {
            things[i].id = i
            components.items[i].setAttribute('data-name', i)
          }

          id = things.length
        }
      }

      this.checkedItem = () => {
        if (!this.checkbox.checked) {
          components.incompleted.removeChild(this.cloneItem)
          components.complete.appendChild(this.cloneItem)
        } else {
          components.complete.removeChild(this.cloneItem)
          components.incompleted.appendChild(this.cloneItem)
        }
      }
    }
}

  const enterItem = (e) => {
    if (e.keyCode === 13 && status) {
      new CreateElement()
      things.forEach(function (item, index) {
        if (index === things.length - 1) {
          things[index].createItem()
        }
      })
    }
  }

  const removeItem = (e) => {
    const target = e.target
    const dataName = target.parentNode.getAttribute('data-name')
    if (target.tagName === 'SPAN') {
      things[dataName].removeItem()
    } else if (target.tagName === 'LABEL') {
      things[dataName].checkedItem()
    }
  }

  const changeTabs = (e) => {
    if (e.target.tagName === 'SPAN') {
      let dataTab = parseFloat(e.target.getAttribute('data-tab'))
      for (let i = 0, length = components.tabs.length; i < length; i++) {
        components.tabs[i].classList.remove('tab-active')
        components.contentList[i].style.display = 'none'
      }
      e.target.classList.add('tab-active')
      components.contentList[dataTab].style.display = 'block'
    }
  }

  const init = () => {
    components.switched.addEventListener('click', getStatus)

    if (status) {
      components.content.addEventListener('keypress', enterItem)
      components.contentAll.addEventListener('click', removeItem)
      components.activeTabs.addEventListener('click', changeTabs)
    } else {
      components.content.removeEventListener('click', enterItem)
      components.contentAll.removeEventListener('click', removeItem)
      components.activeTabs.removeEventListener('click', changeTabs)
    }
  }

  return {
    init: init
  }
})()

Todo.init()
