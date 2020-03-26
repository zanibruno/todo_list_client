class Lists {
    constructor() {
        this.lists = []
        this.adapter = new ListsAdapter()
        this.fetchAndLoadLists()
        this.domElements()
        this.initListeners()
    // }
    //
    fetchAndLoadLists() {
        this.adapter.getLists()
        .then(lists => {
            lists.forEach(list => this.lists.push(new List(list)))
        })
        .then( () => {
            this.renderLists()
        })
    }
    //
    domElements() {
        this.listsBox = document.getElementById( 'lists-container' )
        this.listForm = document.getElementById( 'list-form' )
        this.listNameField = document.getElementById( 'list-name' )
        this.itemFormBox = document.getElementById( 'items-form-box' )
        this.itemsBox = document.querySelector( '.bottom' )
    // }
    //
    initListeners() {
        this.listForm.addEventListener('submit', this.createList.bind(this))
        this.listsBox.addEventListener('dblclick', this.editList.bind(this))
        this.listsBox.addEventListener('blur', this.updateList.bind(this))
        this.listsBox.addEventListener('click', this.renderItems.bind(this))
        this.itemFormBox.addEventListener('submit', this.createItem.bind(this))
    // }
    //
    createList(e) {
        e.preventDefault()
        const name = this.listNameField.value
        debugger
        this.adapter.create(name)
        .then( list => {
            this.lists.push(new List(list))
            this.listNameField.value = ''
            this.renderLists()
        })
    }
    //
    editList(e) {
        const list = e.target
        list.contentEditable = true
        list.focus()
        list.classList.add( 'edit' )
    }

    updateList(e) {
        const list = e.target
        list.contentEditable = false
        list.classList.remove('edit')
        const name = list.innerHTML
        const id = list.dataset.id
        this.adapter.update(name, id)
    }
    //
    //
    renderLists() {
        this.listsBox.innerHTML = this.lists.map(list => list.renderListName()).join('')
        debugger
    }
    //
    // // ITEMS *******************************
    //
    // renderItems(e) {
    // const listId = e.target.dataset.id
    // this.itemFormBox.innerHTML = this.renderItemForm(listId)
    // const items = this.lists.map(list => list.items.map(item => {
    //     if (listId == item.list_id) {
    //         return `<div class="item-list" data-itemid="${item.id}" data-listid="${listId}"><h4>${item.name}</h4>${item.description}<br><button class="delete-btn">Delete</button></div>`
    //     }
    // }))
    // this.itemsBox.innerHTML = items.join('')
    // const item = document.querySelector('.bottom')
    // item.addEventListener('click', this.handleDelete.bind(this))
    // }
    //
    // renderItemForm(listId) {
    //     return `<form data-listid="${listId}" id="item-form">
    //     <input type="text" id="item-name" placeholder="Name" required>
    //     <textarea type="text" id="item-description" placeholder="Description" required></textarea>
    //     <input type="submit" value="Boom!">
    //     </form>
    //     `
    // }
    //
    // createItem = (e) => {
    //     e.preventDefault()
    //     this.listId = parseInt(e.target.dataset.listid)
    //     const name = document.getElementById( 'item-name').value
    //     const description = document.getElementById('item-description').value
    //     this.adapter.createItems(name, description, this.listId)
    //     .then(item => {
    //         this.lists.find((list) => list.id === this.listId).items.push(item)
    //         this.renderNewItem(item)
    //         debugger
    //     })
    //     document.getElementById('item-name').value = ''
    //     document.getElementById('item-description').value=''
    // }
    //
    // renderNewItem(item) {
    //     return this.itemsBox.innerHTML += `<div class="item-list" data-itemid="${item.id}" data-listid="${item.list_id}"><h4>${item.name}</h4>${item.description}<br><button class="delete-btn">Delete</button></div>`
    // }
    //
    // handleDelete(e) {
    //     if(e.target && e.target.matches('button.delete-btn')) {
    //         this.deleteItem(e)
    //         e.stopPropagation()
    //     }
    // }
    //
    // deleteItem(e) {
    //     this.itemId = parseInt(e.target.parentElement.dataset.itemid)
    //     this.adapter.deleteItems(this.itemId)
    //     const listId = parseInt(e.target.parentElement.dataset.listid)
    //     const list = this.lists.find((list) => list.id === listId)
    //     debugger
    //     e.target.parentElement.remove()
    //     list.items = list.items.filter((item) => list.id !== this.itemId)
    // }


}
