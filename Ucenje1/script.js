const courseForm = document.getElementById('addCourseForm');
const coursesContainer = document.getElementById('courses-container');
const isOnlineCheckbox = document.getElementById('isOnline');
const scheduleInput = document.getElementById('schedule');
const scheduleContainer = document.getElementById('scheduleContainer');

// Funkcija za prikaz kurseva
function displayCourses() {
    coursesContainer.innerHTML = '';  // Očisti prethodne kurseve

    // Preuzimanje kurseva iz localStorage
    const courses = JSON.parse(localStorage.getItem("courses")) || [];

    console.log("Prikaz kurseva:", courses); // Logovanje kurseva da proverimo da li su pravilno preuzeti

    // Kreiraj kartice za svaki kurs
    courses.forEach((course, index) => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

        courseCard.innerHTML = `
            <h3>${course.name}</h3>
            <p><strong>Type:</strong> ${course.type}</p>
            <p><strong>Teacher:</strong> ${course.teacher}</p>
            <p><strong>Description:</strong> ${course.description}</p>
            <p><strong>Status:</strong> ${course.online ? "Online" : "Offline"}</p>
            ${course.online ? `<p><strong>Schedule:</strong> ${course.schedule}</p>` : ''}
            <button onclick="editCourse(${index})">Edit</button>
            <button onclick="deleteCourse(${index})">Delete</button>
        `;

        coursesContainer.appendChild(courseCard);
    });
}

// Funkcija za dodavanje kursa
courseForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('courseName').value.trim();
    const type = document.getElementById('courseType').value.trim();
    const teacher = document.getElementById('teacherName').value.trim();
    const description = document.getElementById('description').value.trim();
    const online = isOnlineCheckbox.checked;
    const schedule = scheduleInput.value.trim();

    // Validacija unosa
    if (!name || !type || !teacher || !description) {
        alert('Please fill in all fields');
        return;
    }

    // Kreiranje novog kursa
    const newCourse = {
        name,
        type,
        teacher,
        description,
        online,
        schedule: online ? schedule : null,
    };

    // Preuzimanje kurseva iz localStorage
    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    
    // Dodavanje novog kursa
    courses.push(newCourse);
    
    // Čuvanje novih kurseva u localStorage
    localStorage.setItem("courses", JSON.stringify(courses));

    console.log("Kursevi nakon dodavanja:", courses); // Logovanje novih kurseva

    // Ažuriranje prikaza kurseva
    displayCourses();

    // Resetovanje forme
    courseForm.reset();
    scheduleInput.style.display = 'none'; // Sakrij input za datum ako kurs nije online
});

// Funkcija za prikazivanje inputa za datum kad je kurs online
isOnlineCheckbox.addEventListener('change', function() {
    if (isOnlineCheckbox.checked) {
        scheduleInput.style.display = 'inline-block'; // Prikazivanje inputa za datum
    } else {
        scheduleInput.style.display = 'none'; // Sakrij datum input
    }
});

// Funkcija za brisanje kursa
function deleteCourse(index) {
    const courses = JSON.parse(localStorage.getItem("courses"));
    courses.splice(index, 1);  // Brišemo kurs sa odgovarajuće pozicije
    localStorage.setItem("courses", JSON.stringify(courses));

    console.log("Kursevi nakon brisanja:", courses); // Logovanje kurseva nakon brisanja

    displayCourses();  // Osvježavanje liste kurseva
}

// Funkcija za editovanje kursa
function editCourse(index) {
    const courses = JSON.parse(localStorage.getItem("courses"));
    const course = courses[index];

    // Prepunjavamo formu sa podacima kursa koji želimo da izmenimo
    document.getElementById("courseName").value = course.name;
    document.getElementById("courseType").value = course.type;
    document.getElementById("teacherName").value = course.teacher;
    document.getElementById("description").value = course.description;
    document.getElementById("isOnline").checked = course.online;
    if (course.online) {
        document.getElementById("schedule").style.display = 'inline-block';
        document.getElementById("schedule").value = course.schedule;
    } else {
        document.getElementById("schedule").style.display = 'none';
    }

    // Menjamo dugme u formi na "Update" za ažuriranje kursa
    courseForm.onsubmit = function(event) {
        event.preventDefault();

        course.name = document.getElementById("courseName").value;
        course.type = document.getElementById("courseType").value;
        course.teacher = document.getElementById("teacherName").value;
        course.description = document.getElementById("description").value;
        course.online = document.getElementById("isOnline").checked;
        course.schedule = document.getElementById("schedule").value;

        courses[index] = course;
        localStorage.setItem("courses", JSON.stringify(courses));

        console.log("Kursevi nakon ažuriranja:", courses); // Logovanje kurseva nakon ažuriranja

        // Ažuriranje prikaza kurseva
        displayCourses();
        
        // Vraćamo formu u početno stanje
        courseForm.onsubmit = arguments.callee;
        courseForm.reset();
    };
}

// Funkcija za učitavanje kurseva prilikom učitavanja stranice
document.addEventListener("DOMContentLoaded", function() {
    displayCourses();
});

















document.getElementById('addCourseForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Sprečava ponovno učitavanje stranice

    // Uzimamo vrednosti sa forme
    const courseName = document.getElementById('courseName').value;
    const courseType = document.getElementById('courseType').value;
    const teacherName = document.getElementById('teacherName').value;
    const description = document.getElementById('description').value;
    const isOnline = document.getElementById('isOnline').checked;

    // Kreiramo objekat sa unetim podacima
    const newCourse = {
        name: courseName,
        type: courseType,
        teacher: teacherName,
        description: description,
        online: isOnline
    };

    // Uzimamo postojeće kurseve iz LocalStorage (ako ih ima), ili pravimo prazan niz
    let courses = JSON.parse(localStorage.getItem('courses')) || [];

    // Dodajemo novi kurs u niz
    courses.push(newCourse);

    // Spremamo ažurirani niz kurseva u LocalStorage
    localStorage.setItem('courses', JSON.stringify(courses));

    // Resetujemo formu nakon što je kurs sačuvan
    document.getElementById('addCourseForm').reset();

    alert('Course added successfully!');
});

















function displayOnlineCourses() {
    const onlineCourseList = document.getElementById("online-course-list");
    onlineCourseList.innerHTML = ""; // Očistimo prethodne online kurseve

    // Uzimamo sve kurseve iz LocalStorage
    const courses = JSON.parse(localStorage.getItem('courses')) || [];

    // Filtriramo kurseve koji su online
    const onlineCourses = courses.filter(course => course.online);

    // Prolazimo kroz online kurseve i prikazujemo ih
    onlineCourses.forEach(course => {
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
    });
}

window.onload = displayOnlineCourses;
























// Login form submission
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      if (response.ok) {
        const { authToken } = await response.json();
        localStorage.setItem('authToken', authToken);
        window.location.href = '/dashboard';
      } else {
        // Display an error message
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  });
  
  // Logout functionality
  document.getElementById('logoutButton').addEventListener('click', async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  });