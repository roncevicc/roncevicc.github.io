// Prikazuje kurseve sa 'localStorage'
function getCoursesFromStorage() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    return courses;
}

function saveCourse(course) {
    const courses = getCoursesFromStorage();
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
}

// Prikazuje kurseve
function displayCourses(filterType = "all") {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = ""; // Resetuje listu

    const courses = getCoursesFromStorage();
    const filteredCourses = filterType === "all" ? courses : courses.filter(course => course.type.toLowerCase() === filterType.toLowerCase());

    filteredCourses.forEach(course => {
        const courseItem = document.createElement("div");
        courseItem.classList.add("course-item");
        courseItem.innerHTML = `
            <h3>${course.name}</h3>
            <p><strong>Type:</strong> ${course.type}</p>
            <p><strong>Teacher:</strong> ${course.teacher}</p>
            <p>${course.description}</p>
            <p><strong>Mode:</strong> ${course.online ? "Online" : "Offline"}</p>
        `;
        courseList.appendChild(courseItem);
    });
}
// Funkcija za prikaz kurseva
function displayCourses() {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = ""; // Očistimo prethodne kurseve

    // Uzimamo kurseve iz LocalStorage
    const courses = JSON.parse(localStorage.getItem('courses')) || [];

    // Prolazimo kroz kurseve i prikazujemo ih
    courses.forEach(course => {
        const courseItem = document.createElement("div");
        courseItem.classList.add("course-item");

        courseItem.innerHTML = `
            <h3>${course.name}</h3>
            <p><strong>Type:</strong> ${course.type}</p>
            <p><strong>Teacher:</strong> ${course.teacher}</p>
            <p>${course.description}</p>
        `;
        
        courseList.appendChild(courseItem);
    });
}

// Pozivamo funkciju da prikaže kurseve kada se stranica učita
window.onload = displayCourses;

// Dodavanje novog kursa
document.getElementById("addCourseForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const courseName = document.getElementById("courseName").value;
    const courseType = document.getElementById("courseType").value;
    const teacherName = document.getElementById("teacherName").value;
    const description = document.getElementById("description").value;
    const isOnline = document.getElementById("isOnline").checked;

    const newCourse = {
        name: courseName,
        type: courseType,
        teacher: teacherName,
        description: description,
        online: isOnline
    };

    // Sačuvaj kurs u localStorage
    saveCourse(newCourse);

    // Prikazivanje poruke o uspešnom dodavanju kursa
    alert("Course added successfully!");

    // Resetuj formu
    document.getElementById("addCourseForm").reset();

    // Prikaz novih kurseva
    displayCourses();
});

// Filtriranje kurseva
document.getElementById("filter-type").addEventListener("change", (e) => {
    displayCourses(e.target.value);
});

// Prikaz svih kurseva po učitavanju stranice
displayCourses();




















// Funkcija za prikaz kurseva
function displayCourses() {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = ""; // Očistimo prethodne kurseve

    // Uzimamo kurseve iz LocalStorage
    const courses = JSON.parse(localStorage.getItem('courses')) || [];

    // Prolazimo kroz kurseve i prikazujemo ih
    courses.forEach(course => {
        const courseItem = document.createElement("div");
        courseItem.classList.add("course-item");

        courseItem.innerHTML = `
            <h3>${course.name}</h3>
            <p><strong>Type:</strong> ${course.type}</p>
            <p><strong>Teacher:</strong> ${course.teacher}</p>
            <p>${course.description}</p>
        `;
        
        courseList.appendChild(courseItem);
    });
}

// Pozivamo funkciju da prikaže kurseve kada se stranica učita
window.onload = displayCourses;


























// Funkcija za prikaz kurseva
function displayCourses() {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = ""; // Očistimo prethodne kurseve

    // Uzimamo kurseve iz LocalStorage
    const courses = JSON.parse(localStorage.getItem('courses')) || [];

    // Prolazimo kroz kurseve i prikazujemo ih
    courses.forEach(course => {
        const courseItem = document.createElement("div");
        courseItem.classList.add("course-item");

        courseItem.innerHTML = `
            <h3>${course.name}</h3>
            <p><strong>Type:</strong> ${course.type}</p>
            <p><strong>Teacher:</strong> ${course.teacher}</p>
            <p>${course.description}</p>
            <p><strong>Mode:</strong> ${course.online ? "Online" : "Offline"}</p>
        `;
        
        courseList.appendChild(courseItem);
    });
}

// Pozivamo funkciju da prikaže kurseve kada se stranica učita
window.onload = displayCourses;





































function displayCourses() {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = ""; // Očistimo prethodne kurseve

    // Uzimamo kurseve iz LocalStorage
    const courses = JSON.parse(localStorage.getItem('courses')) || [];

    // Prolazimo kroz kurseve i prikazujemo ih
    courses.forEach((course, index) => {
        const courseItem = document.createElement("div");
        courseItem.classList.add("course-item");

        courseItem.innerHTML = `
            <h3>${course.name}</h3>
            <p><strong>Type:</strong> ${course.type}</p>
            <p><strong>Teacher:</strong> ${course.teacher}</p>
            <p>${course.description}</p>
            <p><strong>Mode:</strong> ${course.online ? "Online" : "Offline"}</p>
            <button class="delete-button" data-index="${index}">Delete</button>
        `;
        
        courseList.appendChild(courseItem);

        // Ako je kurs online, preusmeravamo ga na online-courses.html
        if (course.online) {
            const onlineCourseList = document.getElementById("online-course-list");
            const onlineCourseItem = document.createElement("div");
            onlineCourseItem.classList.add("course-item");

            onlineCourseItem.innerHTML = `
                <h3>${course.name}</h3>
                <p><strong>Type:</strong> ${course.type}</p>
                <p><strong>Teacher:</strong> ${course.teacher}</p>
                <p>${course.description}</p>
                <p><strong>Mode:</strong> ${course.online ? "Online" : "Offline"}</p>
            `;

            onlineCourseList.appendChild(onlineCourseItem);
        }
    });

    // Dodajemo event listener za brisanje kurseva
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            deleteCourse(index);
        });
    });
}

// Funkcija za brisanje kursa
function deleteCourse(index) {
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.splice(index, 1); // Brišemo kurs sa određenog indeksa
    localStorage.setItem('courses', JSON.stringify(courses)); // Spremamo ažurirane kurseve

    // Ponovo učitavamo kursnu listu nakon brisanja
    displayCourses();
}

window.onload = displayCourses;
























function displayCourses() {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = ""; // Očistimo prethodne kurseve

    // Uzimamo kurseve iz LocalStorage
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const currentUser = localStorage.getItem("currentUser"); // Uzmi ime trenutnog korisnika

    // Prolazimo kroz kurseve i prikazujemo ih
    courses.forEach((course, index) => {
        const courseItem = document.createElement("div");
        courseItem.classList.add("course-item");

        courseItem.innerHTML = `
            <h3>${course.name}</h3>
            <p><strong>Type:</strong> ${course.type}</p>
            <p><strong>Teacher:</strong> ${course.teacher}</p>
            <p>${course.description}</p>
            <p><strong>Mode:</strong> ${course.online ? "Online" : "Offline"}</p>
            <p><strong>Added by:</strong> ${course.username}</p>
        `;
        
        // Dodajemo dugme za brisanje samo ako je trenutni korisnik isti kao korisnik koji je dodao kurs
        if (currentUser === course.username) {
            courseItem.innerHTML += `
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
        }

        courseList.appendChild(courseItem);

        // Ako je kurs online, preusmeravamo ga na online-courses.html
        if (course.online) {
            const onlineCourseList = document.getElementById("online-course-list");
            const onlineCourseItem = document.createElement("div");
            onlineCourseItem.classList.add("course-item");

            onlineCourseItem.innerHTML = `
                <h3>${course.name}</h3>
                <p><strong>Type:</strong> ${course.type}</p>
                <p><strong>Teacher:</strong> ${course.teacher}</p>
                <p>${course.description}</p>
                <p><strong>Mode:</strong> ${course.online ? "Online" : "Offline"}</p>
            `;

            onlineCourseList.appendChild(onlineCourseItem);
        }
    });

    // Dodajemo event listener za brisanje kurseva
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            deleteCourse(index);
        });
    });
}

// Funkcija za brisanje kursa
function deleteCourse(index) {
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.splice(index, 1); // Brišemo kurs sa određenog indeksa
    localStorage.setItem('courses', JSON.stringify(courses)); // Spremamo ažurirane kurseve

    // Ponovo učitavamo kursnu listu nakon brisanja
    displayCourses();
}

// Funkcija za dodavanje kursa
document.getElementById("addCourseForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // Prikupljamo podatke iz forme
    const courseName = document.getElementById("courseName").value;
    const courseType = document.getElementById("courseType").value;
    const teacherName = document.getElementById("teacherName").value;
    const description = document.getElementById("description").value;
    const isOnline = document.getElementById("isOnline").checked;
    const username = document.getElementById("username").value; // Korisničko ime
    const course = { name: courseName, type: courseType, teacher: teacherName, description, online: isOnline, username };

    // Uzimamo kurseve iz LocalStorage
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.push(course);

    // Spremamo kurseve u LocalStorage
    localStorage.setItem('courses', JSON.stringify(courses));

    // Očistimo formu i učitamo kurseve ponovo
    document.getElementById("addCourseForm").reset();
    displayCourses();
});

// Funkcija za postavljanje trenutnog korisnika
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    localStorage.setItem("currentUser", username);
});


































// Funkcija za prikazivanje kurseva
function displayCourses() {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = ""; // Očistimo prethodne kurseve

    // Uzimamo kurseve iz localStorage
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const currentUser = localStorage.getItem("currentUser"); // Uzmi trenutnog korisnika iz localStorage

    // Prolazimo kroz kurseve i prikazujemo ih
    courses.forEach((course, index) => {
        const courseItem = document.createElement("div");
        courseItem.classList.add("course-item");

        courseItem.innerHTML = `
            <h3>${course.name}</h3>
            <p><strong>Type:</strong> ${course.type}</p>
            <p><strong>Teacher:</strong> ${course.teacher}</p>
            <p>${course.description}</p>
            <p><strong>Mode:</strong> ${course.online ? "Online" : "Offline"}</p>
            <p><strong>Added by:</strong> ${course.username}</p>
        `;

        // Dodajemo dugme za brisanje samo ako je trenutni korisnik isti kao korisnik koji je dodao kurs
        if (currentUser === course.username) {
            courseItem.innerHTML += `
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
        }

        courseList.appendChild(courseItem);

        // Dodavanje događaja za brisanje kursa
        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                deleteCourse(index);
            });
        });
    });
}

// Funkcija za brisanje kursa
function deleteCourse(index) {
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.splice(index, 1); // Brišemo kurs sa određenog indeksa
    localStorage.setItem('courses', JSON.stringify(courses)); // Spremamo ažurirane kurseve
    displayCourses(); // Ponovno učitavamo kursnu listu nakon brisanja
}

// Funkcija za dodavanje kursa
document.getElementById("addCourseForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // Prikupljamo podatke iz forme
    const courseName = document.getElementById("courseName").value;
    const courseType = document.getElementById("courseType").value;
    const teacherName = document.getElementById("teacherName").value;
    const description = document.getElementById("description").value;
    const isOnline = document.getElementById("isOnline").checked;
    const username = localStorage.getItem("currentUser"); // Korisničko ime iz localStorage

    const course = { name: courseName, type: courseType, teacher: teacherName, description, online: isOnline, username };

    // Uzimamo kurseve iz LocalStorage
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.push(course);

    // Spremamo kurseve u LocalStorage
    localStorage.setItem('courses', JSON.stringify(courses));

    // Očistimo formu i učitavamo kurseve ponovo
    document.getElementById("addCourseForm").reset();
    displayCourses();
});

// Pozivanje funkcije za prikaz kurseva prilikom učitavanja stranice
document.addEventListener("DOMContentLoaded", displayCourses);
