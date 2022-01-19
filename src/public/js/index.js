const tokenn = window.localStorage.getItem('token')
const id = window.localStorage.getItem('id')
if(!tokenn && !id) {
    window.location = '/login'
}

let onlineUserId;

async function render() {
    let users = await request('/users', 'GET')
    let messages = await request('/messages', 'GET')
    mesUser.innerHTML = ''
    let filterUsers = []
    for (let user of users) {
        for (let mes of messages) {
            if(user.userId == mes.receivingUserId) {
                filterUsers.push(user)
            }
        }
    }

    filterUsers.forEach( user => {
        let div = document.createElement('div')
        div.setAttribute('class', 'row sideBar-body')
        div.innerHTML = 
        `
        <div class="col-sm-3 col-xs-3 sideBar-avatar">
        <div class="avatar-icon">
          <img src="https://bootdey.com/img/Content/avatar/avatar4.png">
        </div>
      </div>
      <div class="col-sm-9 col-xs-9 sideBar-main">
        <div class="row">
          <div class="col-sm-8 col-xs-8 sideBar-name">
            <span class="name-meta">${user.username}
          </span>
          </div>
          <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
            <span class="time-meta pull-right">18:18
          </span>
          </div>
        </div>
      </div>
        `
        div.onclick = () => {
            renderMessages(user.userId)
            onlineUserId = user.userId
        }

        mesUser.append(div)

    })

    users.forEach( user => {
        let div = document.createElement('div')
        div.setAttribute('class', 'row sideBar-body')
        div.innerHTML = `
        <div class="col-sm-3 col-xs-3 sideBar-avatar">
        <div class="avatar-icon">
          <img src="https://bootdey.com/img/Content/avatar/avatar5.png">
        </div>
      </div>
      <div class="col-sm-9 col-xs-9 sideBar-main">
        <div class="row">
          <div class="col-sm-8 col-xs-8 sideBar-name">
            <span class="name-meta">${user.username}
          </span>
          </div>
          <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
            <span class="time-meta pull-right">
          </span>
          </div>
        </div>
      </div>
        `

        div.onclick = () => {
            renderNotMessages(user.userId)
            onlineUserId = user.userId
        }

        userss.append(div)
    })
}

async function renderNotMessages(resId) {
    let users = await request('/users', 'GET')
    onlineUser.innerHTML = null
    conversation.innerHTML = null
    users.forEach( user => {
        if(user.userId == resId) {
            let name = user.username
            let span = document.createElement('span')
            span.innerHTML = `
            <div class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
            <div class="heading-avatar-icon">
              <img src="https://bootdey.com/img/Content/avatar/avatar6.png">
            </div>
          </div>
          <div class="col-sm-8 col-xs-7 heading-name">
            <a class="heading-name-meta">${name}
            </a>
            <span class="heading-online">Online</span>
          </div>
          <div class="col-sm-1 col-xs-1  heading-dot pull-right">
            <i class="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
          </div>
            `
            onlineUser.append(span)
            onlineUserId = user.userId

        }
    })
    
}

async function renderMessages(resId, messagess, resUsers) {
    let users = resUsers ? resUsers : await request('/users', 'GET')
    let messages = messagess ? messagess : await request('/messages', 'GET')
    onlineUser.innerHTML = null
    conversation.innerHTML = null
    messages.forEach( mes => {
        if(mes.userId == id && mes.receivingUserId == resId) {
            users.forEach( user => {
                if(mes.receivingUserId == user.userId) {
                    let name = user.username
                    let span = document.createElement('span')
                    span.innerHTML = `
                    <div class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
                    <div class="heading-avatar-icon">
                      <img src="https://bootdey.com/img/Content/avatar/avatar6.png">
                    </div>
                  </div>
                  <div class="col-sm-8 col-xs-7 heading-name">
                    <a class="heading-name-meta">${name}
                    </a>
                    <span class="heading-online">Online</span>
                  </div>
                  <div class="col-sm-1 col-xs-1  heading-dot pull-right">
                    <i class="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
                  </div>
                    `
                    onlineUser.append(span)

                }

            })
            mes.message.forEach( mess => {
                if(mess.me) {
                    let div = document.createElement('div')
                    div.setAttribute('class', 'row message-body')
                    div.innerHTML = `
                    <div class="col-sm-12 message-main-sender">
                    <div class="sender">
                      <div class="message-text">
                        ${mess.messageText}
                      </div>
                      <span class="message-time pull-right">
                        ${time(mess.date)}
                      </span>
                    </div>
                  </div>
                    `
                    conversation.append(div)
                } if(mess.receiver) {
                    let div = document.createElement('div')
                    div.setAttribute('class', 'row message-body')
                    div.innerHTML = `
                    <div class="col-sm-12 message-main-receiver">
                    <div class="receiver">
                      <div class="message-text">
                       ${mess.messageText}
                      </div>
                      <span class="message-time pull-right">
                        ${time(mess.date)}
                      </span>
                    </div>
                  </div>
                    `
                    conversation.append(div)
                }
            })
        }
    })
}

sendbtn.addEventListener('click', event => {
    event.preventDefault()
    messagePost(onlineUserId, comment.value)
    comment.value = ''
    
})

setInterval(() => {
    renderMessages(onlineUserId)
    render()
}, 2000);


async function messagePost(res_id, message) {
    if(res_id && message) {
        let obj = {
            receivingUserId: res_id,
            meMessageText: message
        }
        let response = await request('/messages', 'POST', obj)
        renderMessages(onlineUserId, response.messages, response.users)
    }
}

function time(dateee) {
    const d = new Date(dateee)

    let y = '' + d.getFullYear()
    let m = '' + d.getMonth()+1
    let dat = '' + d.getDate()
    let h = '' + d.getHours()
    let min = '' + d.getMinutes()

    let date = `${y.padStart(4,'0')}-${m.padStart(2,'0')}-${dat.padStart(2, '0')} | ${h.padStart(2, '0')}:${min.padStart(2, '0')}`
    return date
}



render()