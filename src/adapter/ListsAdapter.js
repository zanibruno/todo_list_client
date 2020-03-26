class ListsAdapter {

    constructor() {
        this.baseURL = "http://localhost:3000/lists"
    }

    getLists() {
        return fetch(this.baseURL)
        .then(res => res.json())
    }
//
    create(name) {
        const list = {
            name: name
        }
        return fetch(this.baseURL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(list)
        })
        .then(res => res.json())


    }
//
    update(name, id) {
        const list = {
            name: name,
        }
        return fetch(`${this.baseURL}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(list)
        })
        .then(res => res.json())
    }
//
//     // ITEMS
//
//     createItems(name, description, id) {
//         const item = {
//             name: name,
//             description: description
//         }
//         return fetch(`${this.baseURL}/${id}/items`, {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify({item})
//         })
//         .then(res => res.json())
//     }
//
//     deleteItems(id) {
//         return fetch(`http://localhost:3000/items/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'content-type': 'application/json'
//             }
//         })
//     }
//
//
}
