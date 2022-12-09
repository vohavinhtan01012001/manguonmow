var courseApi = "http://localhost:3000/courses"

function start() {
    getCourses(renderCourses);
    handleCreateForm();
    hanldeUpdateCourse();
}

start();

//functions
function getCourses(callback) {
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}


//tạo course
function createCourse(data) {
    var opstion = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(courseApi, opstion)
        .then(function (response) {
            response.json();
        })
        .then(callback);

}
//xóa course
function handleDeleteCourse(id) {
    var opstion = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(courseApi + "/" + id, opstion)
        .then(function (response) {
            response.json();
        })
        .then(function () {
            var courseItem = document.querySelector(".course-item-" + id);
            if (courseItem) {
                courseItem.remove();
            }
        });
}
//cập nhật course
function UpdateCourse(item) {
    var opstion = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }
    fetch(courseApi + "/" + item.id, opstion)
        .then(function (response) {
            response.json();
        })
        .then(function(){
            getCourses(function(formData){
                var courseItem = document.querySelector(".course-item-" + formData.id);
                if (courseItem) {
                    courseItem.add( `
                        <li class="course-item-${formData.id}">
                            <h4>${formData.name}</h4>
                            <p>${formData.description}</p>
                            <button onclick="handleDeleteCourse(${formData.id})">Xóa</button>
                        </li>
                    `)
                }
            });
        });
}

function renderCourses(courses) {
    var listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(function (courses) {
        return `
            <li class="course-item-${courses.id}">
                <h4>${courses.name}</h4>
                <p>${courses.description}</p>
                <button onclick="handleDeleteCourse(${courses.id})">Xóa</button>
            </li>
        `;
    });
    listCoursesBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value
        var description = document.querySelector('input[name="description"]').value
        var formData = {
            name: name,
            description: description,
        };
        createCourse(formData,function(){
            getCourses(function(courses){
                var courseItem = document.querySelector(".course-item-" + id);
                if (courseItem) {
                    courses.push(courseItem.innerText);
                }
            })
        });
    }
}

function hanldeUpdateCourse(){
    var updateBtn = document.querySelector("#update");
    updateBtn.onclick = function(){
        var id = document.querySelector("input[name='id']").value;
        var name = document.querySelector('input[name="name"]').value
        var description = document.querySelector('input[name="description"]').value
        var formData = {
            id:id,
            name: name,
            description: description,
        };
        UpdateCourse(formData);
    }
}