let xhreq = new XMLHttpRequest();
let url = "https://recruit.ainimal.io/friend_list";
xhreq.open("GET", url);
xhreq.send();


/*******************************************************************************
 *  animal : 1 - 3 -> three kinds of aninals                                   *
 *      1. penguin : https://cdn-icons-png.flaticon.com/512/1752/1752614.png   *
 *      2. panda : https://cdn-icons-png.flaticon.com/512/1752/1752610.png     *
 *      3. hippo : https://cdn-icons-png.flaticon.com/512/1752/1752598.png     *
 *                                                                             *
 * *****************************************************************************          
 *  type : 1 - 5 -> five kinds of characteristics      *
 *******************************************************/

window.onresize = function () {
    setHeight(document.querySelector('.container'), 8);
}

xhreq.onload = function () {

    let response = JSON.parse(this.response);
    let container = document.querySelector(".container");

    setHeight(container, response.length);

    for (let i = 0; i < response.length; i++) {

        let friend_container = document.createElement('div');
        let friend_box = document.createElement('div');

        friend_container.className = 'friend_container';
        friend_box.className = 'friend_box';

        container.appendChild(friend_container);
        friend_container.appendChild(friend_box);
        friend_container.appendChild(createProfile(response[i].id, response[i].gmail, response[i].comtags));
        friend_box.appendChild(createAnimal(response[i].animal));
        friend_box.appendChild(createDescription(response[i].nickname, response[i].sign));
        friend_box.appendChild(createGender(response[i].gender, response[i].last_message_timestamp));
    }

    addFriendAct();
}


// 動態設定container高度
function setHeight(container, box_num) {
    let height_unit = 34;
    if (window.innerWidth > 900) {
        box_num = Math.ceil(box_num / 2);
    }
    container.style.height = (height_unit * box_num + 5) + "vh";
}


function createAnimal(animal_num) {

    let animal_container = document.createElement('div');
    let animal = document.createElement('img')

    animal.className = 'animal';
    animal_container.className = 'animal_container';

    switch (animal_num) {

        case 1:
            animal.src = 'https://cdn-icons-png.flaticon.com/512/1752/1752614.png';
            break;

        case 2:
            animal.src = 'https://cdn-icons-png.flaticon.com/512/1752/1752610.png'
            break;

        default:
            animal.src = 'https://cdn-icons-png.flaticon.com/512/1752/1752598.png'

    }

    animal_container.appendChild(animal);
    return animal_container;
}

function createDescription(n, s) {
    let description_container = document.createElement('div');
    let nickname = document.createElement('p');
    let sign = document.createElement('p');

    description_container.className = 'description_container';
    nickname.className = 'nickname';
    nickname.innerHTML = n;
    sign.className = 'sign';
    sign.innerHTML = s;

    description_container.appendChild(nickname);
    description_container.appendChild(sign);

    return description_container;
}

function createGender(g, t) {
    let gender = document.createElement('img');
    let detail_container = document.createElement('div');
    let time = document.createElement('p');
    let gender_container = document.createElement('div');

    detail_container.className = 'detail_container';
    gender_container.className = 'gender_container';
    time.className = 'time';
    gender.className = 'gender';

    if (g === "male") {
        gender.src = 'https://cdn-icons-png.flaticon.com/512/2284/2284890.png';
    } else {
        gender.src = 'https://cdn-icons-png.flaticon.com/512/2284/2284886.png';
    }

    time.innerHTML = t;

    gender_container.appendChild(gender);
    detail_container.appendChild(gender_container);
    detail_container.appendChild(time);
    return detail_container;
}

function createProfile(i, g, c) {
    let profile = document.createElement('div');
    profile.className = 'profile';

    if (!c) {
        // c is null
        c = "無";
    }
    let innerhtml = "<p>ID : " + i + "</p>" + "<p>電子信箱 : " + g + "</p>" + "<p>共同興趣 : " + c + "</p>";

    profile.innerHTML = innerhtml;

    return profile;
}

function addFriendAct() {

    let friend_box = document.getElementsByClassName('friend_box');
    let friend_container = document.getElementsByClassName('friend_container');
    let profile = document.getElementsByClassName('profile');

    console.log(friend_box.length);
    var open = new Array(friend_box.container);

    for (let i = 0; i < friend_box.length; i++) {
        open[i] = false;
        friend_box[i].onclick = function () {

            if (open[i]) {
                friend_box[i].style.backgroundColor = "#a8dba8";//"#a8dba8";
                friend_container[i].style.height = 12 + 'vh';
                profile[i].style.display = 'none';
            } else {
                // close
                profile[i].style.display = 'flex';
                friend_container[i].style.height = 30 + "vh";
                friend_box[i].style.backgroundColor = "#79bd9a";
            }

            open[i] = !open[i];
        }
    }
}
